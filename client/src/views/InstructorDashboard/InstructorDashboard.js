import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./InstructorDashboard.css";
import CourseTableInstructor from "../../components/CourseTableInstructor/CourseTableInstructor";
import UpdatePageInstructorPassword from "../UpdatePageInstructorPassword/UpdatePageInstructorPassword";
import ProfilPopup from "../../components/profilPopup/profilPopup";
import ProfilPage from "../profilPage/profilPage";




const InstructorDashboard = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [display, setDisplay] = useState("courses");
  const navigate = useNavigate();

  const userObjs = JSON.parse(localStorage.getItem("USER_OBJ")) || {};
  const userObjsRole = userObjs.role || "default";
  const userObjsId = userObjs._id || "default";
  const userObjsIsInstructor = userObjs.isInstructor || "default";

  console.log("userObjRole+++++++++", userObjsRole);
  console.log("userObjsId+++++++++", userObjsId);
  console.log("userObjs.isInstructor+++++++++", userObjs.isInstructor);


  useEffect(() => {
    if (userObjsRole !== 'instructor' || userObjsIsInstructor === 'false') {
           navigate('/page404NotFound'); 
    }
  }, []);

  // check and update courses status
  useEffect(() => {
    const GetAllCoursesByInstructor = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/courses/instructor/" + userObjsId,
          { withCredentials: true }
        );
        const courses = response.data.coursesByInstructor;

        // Call the new function to update statuses
        const updatedCourses = updateCourseStatuses(courses);

        setAllCourses(updatedCourses);
      } catch (err) {
        console.error(err);
      }
    };

    GetAllCoursesByInstructor();
  }, []);

  //update courses
  const updateCourseStatuses = (courses) => {
    return courses.map((course) => {
      const currentDate = new Date().getDate(); // Get current day of the week
      const courseDate = new Date(course.dayOfWeek).getDate(); // Get day of the week from course

      const date = new Date();
      const hours = date.getHours(); // 11
      const minutes = date.getMinutes(); // 1
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      const currentTime = new Date(
        0,
        0,
        0,
        parseInt(formattedTime.split(":")[0]),
        parseInt(formattedTime.split(":")[1])
      );

      const startTIME = new Date(
        0,
        0,
        0,
        parseInt(course.startTime.split(":")[0]),
        parseInt(course.startTime.split(":")[1])
      );
      const endTIME = new Date(
        0,
        0,
        0,
        parseInt(course.endTime.split(":")[0]),
        parseInt(course.endTime.split(":")[1])
      );

      // console.log('currentDate > courseDate // currentTime > endTIME',currentDate > courseDate,currentTime > endTIME);
      // console.log('currentTime , endTIME',currentTime , endTIME);

      // Update status if current date is past the course's day and current time is past the course's end time
      if (currentDate > courseDate) {
        course.status = "resolved";
      } else if (currentDate === courseDate && currentTime > endTIME) {
        course.status = "resolved";
      } else {
        console.log("pending");
      }

      return course;
    });
  };

  // delete One specific course
  const deleteCourse = (courseId) => {
    axios
      .delete("http://localhost:8000/api/courses/" + courseId, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.result);
        setAllCourses(allCourses.filter((course) => course._id !== courseId)); 
      })
      .catch((err) => console.log(err));
  };

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
    this.classList.add("terra");
    navigation.classList.remove("active");
    main.classList.remove("active");
    popupProfil.classList.remove('show');

    if (this.classList.contains("crs")) {
      setDisplay("courses");
    } else if (this.classList.contains("sett")) {
      setDisplay("settings");
    } else if (this.classList.contains("profi")) {
      setDisplay("profile");
    } else {
      console.log("end");
    }
  }

  list.forEach((item) => item.addEventListener("click", activeLink));

  const displayProfil = () => {
    const popup = document.querySelector(".InstructorDashboard .profilPopup");
   // console.log(popup);
    popup.classList.toggle('show');
  }

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
              <Link to="">
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
               <img src="/assets/images/pic-1.jpg" alt="" />
            </div>
             <ProfilPopup />
          </div>
          <div class="cardBox">
            <div class="card">
              <div>
                <div class="numbers">{allCourses.length}</div>
                <div class="cardName">Courses</div>
              </div>

              <div class="iconBx">
                 <ion-icon name="school-outline"></ion-icon>
              </div>
            </div>
          </div>
          <div class="details">
            <div class="recentOrders">
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
                  allCourses={allCourses}
                  deleteCourse={deleteCourse}
                />
              ) : null}
              {display === "settings" ? (
                <UpdatePageInstructorPassword />
              ) : null}
              {display === "profile" ? (
                <ProfilPage setDisplay={setDisplay} url="instructors"/>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
