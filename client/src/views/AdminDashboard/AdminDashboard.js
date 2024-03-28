import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import axios from "axios";
import { Link, useNavigate, useLocation, Route, Routes, NavLink, Outlet, } from "react-router-dom";
import ProfilPopup from "../../components/profilPopup/profilPopup";




const AdminDashboard = (props) => {

 const { renderPictureHeader } = props;
  const navigate = useNavigate(); 
  const [adminInfos, setAdminInfos] = useState({
    image: "",
  });
  const userObjs = JSON.parse(localStorage.getItem("USER_OBJ")) || {};
  const notifInstructorObjs = JSON.parse(localStorage.getItem("USER_INSTRUCTOR")) || {};
  const userObjsRole = userObjs.role || "default";
  const userObjsId = userObjs._id || "default";
  const userObjsName = userObjs.name || "default";
  

  console.log("userObjRole+++++++++", userObjsRole);
  console.log("notifInstructorObjs+++++++++", notifInstructorObjs);
 
  useEffect(() => {
    if (userObjsRole !== 'admin') {
      navigate('/page404NotFound'); 
    }
  }, []);

  useEffect(() => {
    // active link auto
    const activeLinkAuto = () =>{
      document.querySelectorAll(".AdminDashboard li").forEach((item) => {
           if (item.classList.contains("adm") ) {
             item.classList.add("terra");
           } 
      });
    } 
    activeLinkAuto();
    // handle click menu
    const handleClickGlobale = () =>{
        // Menu Toggle
        let toggle = document.querySelector(".toggle") || {};
        let navigation = document.querySelector(".navigation");
        let main = document.querySelector(".main");
        //popup profil
        const popupProfil = document.querySelector(".AdminDashboard .profilPopup");
        toggle.onclick = function () {
          navigation.classList.toggle("active");
          main.classList.toggle("active");
        };
        // add hovered class to selected list item
        let list = document.querySelectorAll(".AdminDashboard li");
      
        function activeLink() {
          list.forEach((item) => {
            item.classList.remove("terra");
          });
          this.classList.add("terra"); // 'this' fait reference à l'elt qui sera cliqué
          navigation.classList.remove("active");
          main.classList.remove("active");
          popupProfil.classList.remove('show');
        }
        list.forEach((item) => item.addEventListener("click", activeLink));
    } 
    handleClickGlobale();
  }, []);

  const displayProfil = () => {
    const popup = document.querySelector(".AdminDashboard .profilPopup");
    popup.classList.toggle('show');
  }

  //get  data one specific admin
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/admins/"+ userObjsId,{withCredentials: true})
      .then((res) => {
       // console.log("res.data.oneSingleAdmin+++++++",res.data.oneSingleAdmin);
        setAdminInfos({
          image: res.data.oneSingleAdmin.image ,
        });
      })
      .catch((err) => console.log(err));
      
    }, [userObjsId, renderPictureHeader]);


  const logout = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/api/logout", {}, { withCredentials: true })
      .then((res) => {
        console.log("deconnexion", res.data.message);
        localStorage.removeItem("USER_OBJ");
        navigate("/login_page");
      })
      .catch((err) => {
        console.log("Erreur de déconnexion +++++++++++", err);
      });
  };




  return (
    <div className="AdminDashboard">
      <div class="container">
        <div class="navigation">
          <ul>
            <li>
              <a href="#">
                <span class="icon">
                  <ion-icon name="logo-ionitron"></ion-icon>
                </span>
                <span class="title orange-color">
                  welcome{" " + userObjs.name}
                </span>
              </a>
            </li>
            <li className="adm">
              <Link to="">
                <span class="icon">
                  <ion-icon name="home-outline"></ion-icon>
                </span>
                <span class="title">Dashboard</span>
              </Link>
            </li>
            <li className="crs">
              <Link to="/admin-dashboard/courses">
                <span class="icon">
                  <ion-icon name="book-outline"></ion-icon>
                </span>
                <span class="title">Manage Courses</span>
              </Link>
            </li>
            <li className="ins">
              <Link to="/admin-dashboard/instructors">
                <span class="icon">
                  <ion-icon name="people-outline"></ion-icon>
                </span>
                <span class="title">Manage Instructors</span>
              </Link>
            </li>
            <li className="stud">
              <Link to="/admin-dashboard/students">
                <span class="icon">
                  <ion-icon name="people-circle-outline"></ion-icon>
                </span>
                <span class="title">Manage Students</span>
              </Link>
            </li>
            <li className="sett">
              <Link to="/admin-dashboard/settings">
                <span class="icon">
                  <ion-icon name="settings-outline"></ion-icon>
                </span>
                <span class="title">Settings</span>
              </Link>
            </li>
            <li>
              <Link to="">
                <span class="icon">
                  <ion-icon name="log-out-outline"></ion-icon>
                </span>
                <span class="title" onClick={logout}>
                  Sign Out
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div class="main  relative">
          <div class="topbar relative">
            <div class="toggle">
              <ion-icon name="menu-outline"></ion-icon>
            </div>
            <div class="user" onClick={displayProfil}>
              { adminInfos.image === "" ?
                <img src="/assets/images/blank-profile.png" alt="" />
                : 
                <img src={`http://localhost:8000/${adminInfos.image}`} alt="" /> 
              } 
            </div>
              <ProfilPopup nameUrl="/admin-dashboard" userObjsImage={adminInfos.image} userObjsRole={userObjsRole} userObjsName={userObjsName} />
          </div>
          <div class="details">
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
