import React, { useState, useEffect } from "react";
import "./DashboardAdminDashboard.css";
import axios from "axios";
import { Link, useNavigate, useLocation, Route, Routes, NavLink, Outlet, } from "react-router-dom";
import CountUp from 'react-countup';
import Chart from "../Chart/Chart";



import { Progress } from "antd";


const DashboardAdminDashboard = (props) => {

  const [allCourses, setAllCourses] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [allInstructors, setAllInstructors] = useState([]);
  const navigate = useNavigate(); 
  const userObjs = JSON.parse(localStorage.getItem("USER_OBJ")) || {};
  const userObjsRole = userObjs.role || "default";
  const userObjsId = userObjs._id || "default";
  const userObjsName = userObjs.name || "default";
  

  //console.log("userObjRole+++++++++", userObjsRole);
 // console.log("userObjsId+++++++++", userObjsId);



  useEffect(() => {
    if (userObjsRole !== 'admin') {
      navigate('/page404NotFound'); 
    }
  }, []);

   // check and update courses status
   useEffect(() => {
    const GetAllCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/courses", {
          withCredentials: true,
        });
        const courses = response.data.allDaCourses;
        console.log("courses------------", courses);
        // Call the new function to update statuses
        const updatedCourses = updateCourseStatuses(courses);
        setAllCourses(updatedCourses);
      } catch (err) {
        console.error(err);
      }
    };
    GetAllCourses();
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

  // get all students
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/students", { withCredentials: true })
      .then((res) => {
        setAllStudents(res.data);
        console.log("r+++++++", res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // get all instructors
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/instructors", { withCredentials: true })
      .then((res) => {
        setAllInstructors(res.data || []);
        console.log("r+++++++", res.data);
      })
      .catch((err) => console.log(err));
  }, []);




  
  

  
  

  




 

  return (
    <div className="DashboardAdminDashboard">
      <div class="cardBox">
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
      </div>
      {/* <div class="recentOrders">
         <div class="cardHeader">
             <h2>Recent Courses</h2>
             <Link className="blue-color" to="/admin-dashboard/courses/new">
               +Add
             </Link> 
          </div>
      </div> */}
      <div className="stats">
               <div className="featured">
                 <div className="top">
                   <h1 className="title">Total Revenue</h1>
                   <i class="fa-solid fa-ellipsis-vertical"></i>
                 </div>
                 <div className="bottom">
                   <div className="featuredChart">
                     <Progress type="circle" percent={75} />
                   </div>
                   <p className="title">Total sales made today</p>
                   <p className="amount">$420</p>
                   <p className="desc">
                     Previous transactions processing. Last payments may not be included.
                   </p>
                   <div className="summary">
                     <div className="item">
                       <div className="itemTitle">Target</div>
                       <div className="itemResult negative">
                       <i class="fa-solid fa-chevron-down"></i>
                         <div className="resultAmount">$12.4k</div>
                       </div>
                     </div>
                     <div className="item">
                       <div className="itemTitle">Last Week</div>
                       <div className="itemResult positive">
                         <i class="fa-solid fa-chevron-down"></i>
                         <div className="resultAmount">$12.4k</div>
                       </div>
                     </div>
                     <div className="item">
                       <div className="itemTitle">Last Month</div>
                       <div className="itemResult positive">
                         <i class="fa-solid fa-chevron-down"></i>
                         <div className="resultAmount">$12.4k</div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="chart">
                  <Chart 
                  allCourses={allCourses}
                  allStudents={allStudents}
                  allInstructors={allInstructors}
                  title="Last 12 Months (registrations)" 
                  aspect={1.8 / 1} />
               </div>
      </div>
    </div>
  );
};

export default DashboardAdminDashboard;

