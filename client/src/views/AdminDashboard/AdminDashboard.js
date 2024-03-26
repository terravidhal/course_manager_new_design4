import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import axios from "axios";
import { Link, useNavigate, useLocation, Route, Routes, NavLink, Outlet, } from "react-router-dom";
import CourseTable from "../../components/CourseTable/CourseTable";
import StudentTable from "../../components/StudentTable/StudentTable";
import InstructorTable from "../../components/InstructorTable/InstructorTable";
import UpdateAdminPassword from "../UpdateAdminPassword/UpdateAdminPassword";
import ProfilPopup from "../../components/profilPopup/profilPopup";
import ProfilPage from "../profilPage/profilPage";
import CountUp from 'react-countup';
import UpdatePageCourse from "../UpdatePageCourse/UpdatePageCourse";
import DetailsPageCourse from "../DetailsPageCourse/DetailsPageCourse";
import DetailsPageStudent from "../DetailsPageStudent/DetailsPageStudent";
import UpdatePageInsructor from "../UpdatePageInsructor/UpdatePageInsructor";
import DetailsPageInsructor from "../DetailsPageInsructor/DetailsPageInsructor";
import UpdatePageStudent from "../UpdatePageStudent/UpdatePageStudent";



const AdminDashboard = (props) => {
/*
  
  
  const [display, setDisplay] = useState("courses");
   const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [renderPictureHeader, setRenderPictureHeader]= useState(false); 
  const [allCourses, setAllCourses] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [allInstructors, setAllInstructors] = useState([]);
  */

 const {renderPictureHeader, allCourses, allStudents, allInstructors, } = props;
  const navigate = useNavigate(); 
  const [adminInfos, setAdminInfos] = useState({
    image: "",
  });
  const userObjs = JSON.parse(localStorage.getItem("USER_OBJ")) || {};
  const userObjsRole = userObjs.role || "default";
  const userObjsId = userObjs._id || "default";
  const userObjsName = userObjs.name || "default";
  

  console.log("userObjRole+++++++++", userObjsRole);
  console.log("userObjsId+++++++++", userObjsId);

  
  useEffect(() => {
    // active link auto
    const activeLinkAuto = () =>{
      /*if (localStorage.getItem('lastDisplayedView')) {
        setDisplay(localStorage.getItem('lastDisplayedView'));
        console.log('lastDisplayedView+++++++++++++++++', localStorage.getItem('lastDisplayedView'));
      }*/
      // active link 'li' auto
      document.querySelectorAll(".AdminDashboard li").forEach((item) => {
      
           if (item.classList.contains("adm") ) {
             item.classList.add("terra");
           } /*else if (item.classList.contains("stud") && localStorage.getItem('lastDisplayedView') === "students") {
             item.classList.add("terra");
           } else if (item.classList.contains("ins")) {
              item.classList.add("terra");
           } else if (item.classList.contains("sett") && localStorage.getItem('lastDisplayedView') === "settings") {
              item.classList.add("terra");
           }  else if (item.classList.contains("profi") && localStorage.getItem('lastDisplayedView') === "profile") {
             item.classList.add("terra");
           }else {
             console.log("end");
           }*/
           
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
      
          /*if (this.classList.contains("ins")) {
            setDisplay("instructors");
            localStorage.setItem('lastDisplayedView', "instructors");
          } else if (this.classList.contains("stud")) {
            setDisplay("students");
            localStorage.setItem('lastDisplayedView', "students");
          } else if (this.classList.contains("crs")) {
            setDisplay("courses");
             localStorage.setItem('lastDisplayedView', "courses");
          } else if (this.classList.contains("sett")) {
           setDisplay("settings");
             localStorage.setItem('lastDisplayedView', "settings");
          }  else if (this.classList.contains("profi")) {
            setDisplay("profile");
             localStorage.setItem('lastDisplayedView', "profile");
          }else {
            console.log("end");
          } */
        }
        list.forEach((item) => item.addEventListener("click", activeLink));
    } 
    handleClickGlobale();
  }, []);




  
  useEffect(() => {
    if (userObjsRole !== 'admin') {
      navigate('/page404NotFound'); 
    }
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
        console.log("res.data.oneSingleAdmin+++++++",res.data.oneSingleAdmin);
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
        if (userObjsRole === "student") {
          console.log("deconnexion", res.data.message);
          localStorage.removeItem("USER_OBJ");
          navigate("/login_page");
        } else if (userObjsRole === "instructor") {
          console.log("deconnexion", res.data.message);
          localStorage.removeItem("USER_OBJ");
          navigate("/login_page");
        } else if (userObjsRole === "admin") {
          console.log("deconnexion", res.data.message);
          localStorage.removeItem("USER_OBJ");
          navigate("/login_page");
        } else {
          console.error("Unexpected response:", res.data);
        }
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
              <ProfilPopup userObjsImage={adminInfos.image} userObjsRole={userObjsRole} userObjsName={userObjsName} />
          </div>
          {/* <div class="cardBox">
            <div class="card">
              <div>
                <div class="numbers">
                  <CountUp start={100}  end={allCourses.length} />
                </div>
                <div class="cardName">Courses</div>
              </div>
              <div class="iconBx">
                <ion-icon name="book-outline"></ion-icon>
              </div>
            </div>
            <div class="card">
              <div>
                <div class="numbers"><CountUp start={100} end={allInstructors.length}/></div>
                <div class="cardName">Instructors</div>
              </div>
              <div class="iconBx">
                <ion-icon name="school-outline"></ion-icon>
              </div>
            </div>
            <div class="card">
              <div>
                <div class="numbers"><CountUp start={100} end={allStudents.length}/></div>
                <div class="cardName">Students</div>
              </div>

              <div class="iconBx">
                <ion-icon name="people-outline"></ion-icon>
              </div>
            </div>
          </div> */}
          <div class="details">
            <Outlet/>
          </div>
        </div>
      </div>
            
    </div>
  );
};

export default AdminDashboard;
