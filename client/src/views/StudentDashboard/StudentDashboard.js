import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./StudentDashboard.css";
import ProfilPopup from "../../components/profilPopup/profilPopup";




const StudentDashboard = (props) => {
  const { renderPictureHeader } = props;
  const navigate = useNavigate();
   const [studentInfos, setStudentInfos] = useState({
    image: "",
  });

  const userObjs = JSON.parse(localStorage.getItem("USER_OBJ")) || {};
  const userObjsRole = userObjs.role || "default";
  const userObjsId = userObjs._id || "default";
  const userObjsName = userObjs.name || "default";

  console.log("userObjsRole+++++++++", userObjsRole);

  useEffect(() => {
    if (userObjsRole !== 'student' ) {
           navigate('/page404NotFound'); 
    }
  }, []);

  useEffect(() => {
    // active link auto
    const activeLinkAuto = () =>{
      document.querySelectorAll(".StudentDashboard li").forEach((item) => {
      
           if (item.classList.contains("crs") ) {
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
        const popupProfil = document.querySelector(".StudentDashboard .profilPopup");
        toggle.onclick = function () {
          navigation.classList.toggle("active");
          main.classList.toggle("active");
        };
        // add hovered class to selected list item
        let list = document.querySelectorAll(".StudentDashboard li");
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
    const popup = document.querySelector(".StudentDashboard .profilPopup");
    popup.classList.toggle('show');
  }

   //get  data one specific student
   useEffect(() => {
    axios
      .get("http://localhost:8000/api/students/"+ userObjsId,{withCredentials: true})
      .then((res) => {
        console.log("res.data.oneSingleStudent+++++++",res.data.oneSingleStudent);
        setStudentInfos({
          image: res.data.oneSingleStudent.image ,
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
    <div className="StudentDashboard">
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
            <li className="crs">
              <Link to="">
                <span class="icon">
                  <ion-icon name="home-outline"></ion-icon>
                </span>
                <span class="title">View Courses</span>
              </Link>
            </li>
            <li className="sett">
              <Link to="/student-dashboard/settings">
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
            { studentInfos.image === "" ?
                <img src="/assets/images/blank-profile.png" alt="" />
                : 
                <img src={`http://localhost:8000/${studentInfos.image}`} alt="" /> 
              } 
            </div>
              <ProfilPopup nameUrl="/student-dashboard" userObjsImage={studentInfos.image} userObjsRole={userObjsRole} userObjsName={userObjsName} />
          </div>
          <div class="details">
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
