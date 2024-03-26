import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
  useParams,
  Navigate,
  Router,
} from "react-router-dom";
import AdminDashboard from "./views/AdminDashboard/AdminDashboard";
import CreatePageCourse from "./views/CreatePageCourse/CreatePageCourse";
import DetailsPageCourse from "./views/DetailsPageCourse/DetailsPageCourse";
import Login from "./views/Login/Login";
import RegisterStudent from "./views/RegisterStudent/RegisterStudent";
import CreatePageStudent from "./views/CreatePageStudent/CreatePageStudent";
import DetailsPageStudent from "./views/DetailsPageStudent/DetailsPageStudent";
import UpdatePageStudent from "./views/UpdatePageStudent/UpdatePageStudent";
import CreatePageInstructor from "./views/CreatePageInstructor/CreatePageInstructor";
import DetailsPageInsructor from "./views/DetailsPageInsructor/DetailsPageInsructor";
import UpdatePageInsructor from "./views/UpdatePageInsructor/UpdatePageInsructor";
import StudentsByCourse from "./views/StudentsByCourse/StudentsByCourse";
import InstructorByCourse from "./views/InstructorByCourse/InstructorByCourse";
import InstructorDashboard from "./views/InstructorDashboard/InstructorDashboard";
import WaitVerification from "./views/WaitVerification/WaitVerification";
import StudentDashboard from "./views/StudentDashboard/StudentDashboard";
import RegisterAdmin from "./views/RegisterAdmin/RegisterAdmin";
import RegisterInstructor from "./views/RegisterInstructor/RegisterInstructor";
import UpdatePageCourse from "./views/UpdatePageCourse/UpdatePageCourse";
import HomeHome from "./views/HomeHome/HomeHome";
import Page404NotFound from "./views/page404NotFound/page404NotFound";
import AddStudentsCourse from "./views/AddStudentsCourse/AddStudentsCourse";
import CourseTable from "./components/CourseTable/CourseTable";
import StudentTable from "./components/StudentTable/StudentTable";
import InstructorTable from "./components/InstructorTable/InstructorTable";
import UpdateAdminPassword from "./views/UpdateAdminPassword/UpdateAdminPassword";
import ProfilPage from "./views/profilPage/profilPage";
import CountUp from 'react-countup'
import DashboardAdminDashboard from "./components/DashboardAdminDashboard/DashboardAdminDashboard";







const App = () => {
/*  const [allCourses, setAllCourses] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [allInstructors, setAllInstructors] = useState([]);*/
 /* const [adminInfos, setAdminInfos] = useState({
    image: "",
  });*/
  const [renderPictureHeader, setRenderPictureHeader]= useState(false); 
  
 // const [display, setDisplay] = useState("courses");
 /* const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false); */


  const userObjs = JSON.parse(localStorage.getItem("USER_OBJ")) || {};
  const userObjsRole = userObjs.role || "default";
  const userObjsId = userObjs._id || "default";
  const userObjsName = userObjs.name || "default";
  
  console.log("userObjRole+++++++++", userObjsRole);
  console.log("userObjsId+++++++++", userObjsId);

 
/*
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
    setLoading2(true);
    axios
      .get("http://localhost:8000/api/students", { withCredentials: true })
      .then((res) => {
        setAllStudents(res.data);
        setLoading2(false);
        console.log("r+++++++", res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // get all instructors
  useEffect(() => {
    setLoading3(true);
    axios
      .get("http://localhost:8000/api/instructors", { withCredentials: true })
      .then((res) => {
        setAllInstructors(res.data || []);
        setLoading3(false);
        console.log("r+++++++", res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  */

   // lifting state update picture profile header and popup
   const updRender = (val) =>{
    setRenderPictureHeader(val);
  }


  //get  data one specific admin
 /* useEffect(() => {
    axios
      .get("http://localhost:8000/api/admins/"+ userObjsId,{withCredentials: true})
      .then((res) => {
        console.log("res.data.oneSingleAdmin+++++++",res.data.oneSingleAdmin);
        setAdminInfos({
          image: res.data.oneSingleAdmin.image ,
        });
      })
      .catch((err) => console.log(err));
      
    }, [userObjsId, renderPictureHeader]); */

 

  // delete One specific course
  /*
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
  }; */

  // delete One specific student
 /* const deleteStudent = (studentId) => {
    axios
      .delete("http://localhost:8000/api/students/" + studentId, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.result);
        setAllStudents(
          allStudents.filter((student) => student._id !== studentId)
        );
      })
      .catch((err) => console.log(err));
  }; */

  // delete One specific instructor
 /* const deleteInstructor = (instructorId) => {
    axios
      .delete("http://localhost:8000/api/instructors/" + instructorId, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.result);
        setAllInstructors(
          allInstructors.filter((instructor) => instructor._id !== instructorId)
        );
      })
      .catch((err) => console.log(err));
  }; */

  

  

 
  


  return (
    <div className="App">
       
         <Routes>
           <Route path="/" element={<Navigate replace to="/home"  />} />  {/* redirection */}
           <Route path="/home" element={<HomeHome />} />
           <Route path="/register_instructor" element={<RegisterInstructor />} />
           <Route path="/register_student" element={<RegisterStudent />} />
           <Route path="/login_page" element={<Login />} />
           <Route path="/admin-dashboard" element={<AdminDashboard 
            // allCourses={allCourses}
            // allStudents={allStudents} 
           //  allInstructors={allInstructors}
             renderPictureHeader={renderPictureHeader} />} >
              <Route  index element={ <DashboardAdminDashboard />}/> 
              <Route  path="/admin-dashboard/courses" element={ <CourseTable />}/> 
              <Route path="/admin-dashboard/courses/new" element={<CreatePageCourse />} />
              <Route  path="/admin-dashboard/courses/edit/:id" element={<UpdatePageCourse />}/>
              <Route  path="/admin-dashboard/courses/:id" element={<DetailsPageCourse />}/>
              <Route  path="/admin-dashboard/students" element={ <StudentTable />}/>
              <Route path="/admin-dashboard/students/new" element={<CreatePageStudent />} />     
              <Route  path="/admin-dashboard/students/edit/:id" element={<UpdatePageStudent />}/>
              <Route  path="/admin-dashboard/students/:id" element={<DetailsPageStudent />}/>
              <Route  path="/admin-dashboard/instructors" element={<InstructorTable/>}/>
              <Route path="/admin-dashboard/instructors/new" element={<CreatePageInstructor />} />
              <Route  path="/admin-dashboard/instructors/edit/:id" element={<UpdatePageInsructor />}/>
              <Route  path="/admin-dashboard/instructors/:id" element={<DetailsPageInsructor />}/>
              <Route  path="/admin-dashboard/settings" element={<UpdateAdminPassword />}/>
              <Route  path="/admin-dashboard/profile" element={ 
                      <ProfilPage 
                       renderPictureHeader={renderPictureHeader} 
                       updRender={updRender}
                       url="admins" 
                       id={userObjsId} />}/>  
               <Route path="/admin-dashboard/studentsByCourse/:id" element={<StudentsByCourse />} /> 
               <Route path="/admin-dashboard/instructorByCourse/:id" element={<InstructorByCourse />} />  
               <Route path="/admin-dashboard/courses/addStudents/:id" element={<AddStudentsCourse />}/>      
           </Route> 
           <Route path="/wait-verification" element={<WaitVerification />} />
           <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
           <Route path="/student-dashboard" element={<StudentDashboard />} />
           {/* <Route path="/studentsByCourse/:id" element={<StudentsByCourse />} /> */}
           {/* <Route path="/instructorByCourse/:id" element={<InstructorByCourse />} /> */}
           {/* <Route path="/courses/new" element={<CreatePageCourse />} /> */}
           {/* <Route path="/students/new" element={<CreatePageStudent />} /> */}
           {/* <Route path="/instructors/new" element={<CreatePageInstructor />} /> */}
           {/* <Route path="/courses/edit/:id" element={<UpdatePageCourse />}/> */}
           {/* <Route path="/courses/addStudents/:id" element={<AddStudentsCourse />}/> */}
           {/* <Route path="/students/edit/:id" element={<UpdatePageStudent />}/> */}
           {/* <Route path="/instructors/edit/:id" element={<UpdatePageInsructor />}/> */}
           {/* <Route path="/courses/:id" element={<DetailsPageCourse />}/> */}
           {/* <Route path="/students/:id" element={<DetailsPageStudent />}/> */}
           {/* <Route path="/instructors/:id" element={<DetailsPageInsructor />}/> */}
           <Route path="/route/regist/loaded25" element={<RegisterAdmin />}/>
           <Route path="*" element={<Page404NotFound />}/>
           <Route path="/page404NotFound" element={<Page404NotFound />}/>
         </Routes>
       
    </div>
  );
}

export default App;
