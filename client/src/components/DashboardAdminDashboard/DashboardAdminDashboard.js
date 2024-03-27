import React, { useState, useEffect } from "react";
import "./DashboardAdminDashboard.css";
import axios from "axios";
import { Link, useNavigate, useLocation, Route, Routes, NavLink, Outlet, } from "react-router-dom";
import CountUp from 'react-countup';
import Chart from "../Chart/Chart";
import { Flex, Progress } from "antd";
import { getCoursesPercentage, getInstructorsPercentage, getStudentPercentage, mergeDataByIndex, processStudentData2, sumPositivePercentages } from "../../statistics/statistics";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { Avatar, Rate, Space, Table, Typography, Button, Input, Tag  } from "antd";
import { updateCourseStatuses } from "../../utiles/utiles";





const DashboardAdminDashboard = (props) => {

  const userObjs = JSON.parse(localStorage.getItem("USER_OBJ")) || {};
  const userObjsRole = userObjs.role || "default";
  const userObjsId = userObjs._id || "default";
  const userObjsName = userObjs.name || "default";
  const navigate = useNavigate(); 
  const [allCourses, setAllCourses] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [allInstructors, setAllInstructors] = useState([]);
  const [loading, setLoading] = useState(false);

  const datachart25 = mergeDataByIndex(allCourses, allInstructors, allStudents);
  const data25 = processStudentData2(datachart25);

  const percentagesStudents = getStudentPercentage(data25);
  console.log(Object.entries(percentagesStudents)[2]);
  // Calculer la somme des pourcentages
   const sumStud = sumPositivePercentages(percentagesStudents);
   console.log(`Somme des pourcentages: ${sumStud}%`);
  const percentagesCourses = getCoursesPercentage(data25);
  // Calculer la somme des pourcentages
   const sumCourses = sumPositivePercentages(percentagesCourses);
   console.log(`Somme des pourcentages: ${sumCourses}%`);
  const percentagesInstructors = getInstructorsPercentage(data25);
  // Calculer la somme des pourcentages
   const sumInstructors = sumPositivePercentages(percentagesInstructors);
   console.log(`Somme des pourcentages: ${sumInstructors}%`);
  

  let percentCoursesCurrentMonth = percentagesCourses[Object.entries(percentagesCourses)[new Date().getMonth()][0]];
  let totalCoursesCurrentMonth = (percentCoursesCurrentMonth * allCourses.length) / 100;

  let percentInstructorsCurrentMonth = percentagesInstructors[Object.entries(percentagesInstructors)[new Date().getMonth()][0]];
  let totalInstructorsCurrentMonth = (percentInstructorsCurrentMonth * allInstructors.length) / 100;

  let percentStudentsCurrentMonth = percentagesStudents[Object.entries(percentagesStudents)[new Date().getMonth()][0]];
  let totalStudentsCurrentMonth = (percentStudentsCurrentMonth * allStudents.length) / 100; 




   // check and update courses status
   useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    GetAllCourses();
  }, []);


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
        setAllInstructors(res.data);
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
      <div className="stats">
               <div className="featured">
                 <div className="top">
                   <h1 className="title">total percentage of data created on the site in 12 months </h1>
                   <i class="fa-solid fa-ellipsis-vertical"></i>
                 </div>
                 <div className="bottom">
                   <div className="featuredChart">
                   <Flex gap="small" >
                     <div style={{ width: 76, height: 76, }}>
                        <CircularProgressbar value={100} text={`${sumCourses}%`} strokeWidth={5}
                          styles={buildStyles({
                            // Colors
                            pathColor: '#09b4a6',
                            textColor: '#09b4a6',
                            trailColor: '#d6d6d6',
                            backgroundColor: '#3e98c7',
                          })}
                         />
                     </div>
                     <div style={{ width: 76, height: 76, }}>
                        <CircularProgressbar value={100} text={`${sumInstructors}%`} strokeWidth={5}
                          styles={buildStyles({
                            // Colors
                            pathColor: '#1d0dd4',
                            textColor: '#1d0dd4',
                            trailColor: '#d6d6d6',
                            backgroundColor: '#3e98c7',
                          })}
                         />
                     </div>
                     <div style={{ width: 76, height: 76, }}>
                        <CircularProgressbar value={100} text={`${sumStud}%`} strokeWidth={5}
                          styles={buildStyles({
                            // Colors
                            pathColor: '#f79623',
                            textColor: '#f79623',
                            trailColor: '#d6d6d6',
                            backgroundColor: '#3e98c7',
                          })}
                         />
                     </div>
                   </Flex>
                   </div>
                   <p className="title">current month</p>
                   <p className="amount">{Object.entries(percentagesStudents)[new Date().getMonth()][0]}</p>
                   <p className="desc">
                   over a period of 12 months, the percentage of data created on the site is distributed as follows
                   </p>
                   <div className="summary">
                     <div className="item">
                       <div className="itemTitle">Courses</div>
                       <div className="itemResult green">
                         <div className="resultAmount">
                          {Object.entries(percentagesStudents)[new Date().getMonth()][0]} :
                         ({totalCoursesCurrentMonth}/{allCourses.length})*{100} = {(totalCoursesCurrentMonth /allCourses.length)*100}% 
                          </div>
                       </div>
                     </div>
                     <div className="item">
                       <div className="itemTitle">Instructors</div>
                       <div className="itemResult blue">
                         <div className="resultAmount">
                          {Object.entries(percentagesStudents)[new Date().getMonth()][0]} :
                          ({totalInstructorsCurrentMonth}/{allInstructors.length})*{100} = {(totalInstructorsCurrentMonth /allInstructors.length)*100}% 
                          </div>
                       </div>
                     </div>
                     <div className="item">
                       <div className="itemTitle">Students</div>
                       <div className="itemResult orange">
                         <div className="resultAmount">
                          {Object.entries(percentagesStudents)[new Date().getMonth()][0]} :
                         ({totalStudentsCurrentMonth}/{allStudents.length})*{100} = {(totalStudentsCurrentMonth /allStudents.length)*100}% 
                          </div>
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
                  aspect={1.54 / 1} />
               </div>
      </div>
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
    </div>
  );
};

export default DashboardAdminDashboard;

