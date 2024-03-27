import React, { useState, useEffect } from "react";
import "./DashboardInstructorDashboard.css";
import axios from "axios";
import { Link, useNavigate, useLocation, Route, Routes, NavLink, Outlet, } from "react-router-dom";
import CountUp from 'react-countup';
import 'react-circular-progressbar/dist/styles.css';
import { Avatar, Rate, Space, Table, Typography, Button, Input, Tag  } from "antd";
import ChartInstructor from "../ChartInstructor/ChartInstructor";





const DashboardInstructorDashboard = (props) => {

  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allCourses, setAllCourses] = useState([]);

  const userObjs = JSON.parse(localStorage.getItem("USER_OBJ")) || {};
  const userObjsRole = userObjs.role || "default";
  const userObjsId = userObjs._id || "default";
  const userObjsIsInstructor = userObjs.isInstructor || "default";
  const userObjsName = userObjs.name || "default";

 // console.log("userObjsId+++++++++", userObjsId);



  // check and update courses status
  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
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

 


  return (
    <div className="DashboardInstructorDashboard">
      <div class="cardBox">
         <div class="card">
              <div>
                <div class="numbers"><CountUp start={100} end={allCourses.length}/></div>
                <div class="cardName">Courses</div>
              </div>

              <div class="iconBx">
                 <ion-icon name="school-outline"></ion-icon>
              </div>
         </div>
      </div>
      <div className="stats">
           <div className="chart">
              <ChartInstructor 
               allCourses={allCourses}
               title="Last 12 Months (courses created)" 
               aspect={1.54 / 1} />
           </div>
      </div>
      <div className="recent">
        <div class="recentOrderss">
         <div class="cardHeader">
       <h2>Recent Courses</h2>
         </div>
         <div className="CourseTable">
      <Table
        loading={loading}
        columns={[
          {
            title: "Photo",
            dataIndex: "image",
            render: (image) => {
                return ( image === "" ?
                   <Avatar src="/assets/images/blank-profile.png"  />
                : 
                 <Avatar src="/assets/images/OIG1.jfif" /> );
               
            },
          },
          {
            title: "Name of Course",
            dataIndex: "name",
          },
          {
            title: "Level",
            dataIndex: "level",
          },
          {
            title: "Field",
            dataIndex: "field",
          },
          {
            title: "Instructor",
            dataIndex: "instructor",
            render: (instructor) => {
              return (
                 userObjsId === instructor ? "Me" :
                     <Link  className="btt blue"  to={"/admin-dashboard/instructorByCourse/" + instructor}>
                       <ion-icon name="eye-outline"></ion-icon>
                     </Link>
              );
            },
          },
          {
            title: "Status",
            dataIndex: "status",
            render: (status) => {
              return (
                <>
                    <Tag color={`${
                        status === "pending"
                          ? "geekblue"
                          : "volcano"
                      }`}>
                       {status}
                   </Tag>
                </>
              );
            },
          },
        ]}
        dataSource={allCourses.slice(0,2)}
        pagination={{
          pageSize: 3,
        }}
      ></Table>
         </div>
        </div>
        <div class="recentCustomers">
           <div class="cardHeader">
               <h2>Recent Customers</h2>
           </div>
           <div className="stud-customers">
              <div className="stud-customers-items">
                          <div className="stud-img">
                            <img src="" alt="" />
                          </div>
                          <div className="stud-infos">
                            <div className="stud-name">terra</div>
                            <div className="stud-field">front-end developer</div>
                            <div className="stud-level">level 1</div>
                          </div>
              </div>
           </div>   
        </div>

      </div>
   </div>
  );
};

export default DashboardInstructorDashboard;


