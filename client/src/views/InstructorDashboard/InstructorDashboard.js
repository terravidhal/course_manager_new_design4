import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./InstructorDashboard.css";
import ProfilPopup from "../../components/profilPopup/profilPopup";





const InstructorDashboard = (props) => {
  
  const { renderPictureHeader } = props;
  const navigate = useNavigate();
  const [instructorInfos, setInstructorInfos] = useState({
    image: "",
  });

  const userObjs = JSON.parse(localStorage.getItem("USER_OBJ")) || {};
  const userObjsRole = userObjs.role || "default";
  const userObjsId = userObjs._id || "default";
  const userObjsIsInstructor = userObjs.isInstructor || "default";
  const userObjsName = userObjs.name || "default";

  console.log("userObjRole+++++++++", userObjsRole);



  useEffect(() => {
    if (userObjsRole !== 'instructor' || userObjsIsInstructor === 'false') {
           navigate('/page404NotFound'); 
    }
  }, []);


  useEffect(() => {
    // active link auto
    const activeLinkAuto = () =>{
      document.querySelectorAll(".InstructorDashboard li").forEach((item) => {
      
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
        const popupProfil = document.querySelector(".InstructorDashboard .profilPopup");
        toggle.onclick = function () {
          navigation.classList.toggle("active");
          main.classList.toggle("active");
        };
        // add hovered class to selected list item
        let list = document.querySelectorAll(".InstructorDashboard li");
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
    const popup = document.querySelector(".InstructorDashboard .profilPopup");
    popup.classList.toggle('show');
  }


  //get  data one specific instructor
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/instructors/"+ userObjsId,{withCredentials: true})
      .then((res) => {
        console.log("res.data.oneSingleInstructor+++++++",res.data.oneSingleInstructor);
        setInstructorInfos({
          image: res.data.oneSingleInstructor.image ,
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
    <div className="InstructorDashboard">
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
              <Link to="/instructor-dashboard/courses">
                <span class="icon">
                  <ion-icon name="home-outline"></ion-icon>
                </span>
                <span class="title">Manage Courses</span>
              </Link>
            </li>
            <li className="sett">
              <Link to="">
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
        <div class="main relative">
          <div class="topbar relative">
            <div class="toggle">
              <ion-icon name="menu-outline"></ion-icon>
            </div>
            <div class="user" onClick={displayProfil}>
            { instructorInfos.image === "" ?
                <img src="/assets/images/blank-profile.png" alt="" />
                : 
                <img src={`http://localhost:8000/${instructorInfos.image}`} alt="" /> 
              } 
            </div>
              <ProfilPopup userObjsImage={instructorInfos.image} userObjsRole={userObjsRole} userObjsName={userObjsName} />
          </div>
          {/* <div class="cardBox">
            <div class="card">
              <div>
                <div class="numbers">{allCourses.length}</div>
                <div class="cardName">Courses</div>
              </div>

              <div class="iconBx">
                 <ion-icon name="school-outline"></ion-icon>
              </div>
            </div>
          </div> */}
          <div class="details">
            {/* <div class="recentOrders">
              <div class="cardHeader">
              {display === "courses" ? (
                  <>
                    <h2>Recent Courses</h2>
                    <Link className="blue-color" to="/courses/new">
                      +Add
                    </Link>
                  </>
                ) : display === "settings" ? (
                  <>
                    <h2 className="pl-x">Change Password</h2>
                  </>
                )  :  display === "profile" ? (
                  <>
                    <h2 className="pl-x">Profile</h2>
                    <h2 class="blue-color" to="/instructors/new">
                      Update Profile
                    </h2>
                  </>
                )  : null}
              </div>
              {display === "courses" ? (
                <CourseTableInstructor
                  loading={loading}
                  allCourses={allCourses}
                  deleteCourse={deleteCourse}
                />
              ) : null}
              {display === "settings" ? (
                <UpdatePageInstructorPassword />
              ) : null}
              {display === "profile" ? (
                <ProfilPage renderPictureHeader={renderPictureHeader} 
                updRender={updRender}
                setDisplay={setDisplay} 
                url="instructors" 
                id={userObjsId}/>
              ) : null}
            </div> */}
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
