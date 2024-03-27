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
import DashboardAdminDashboard from "./components/DashboardAdminDashboard/DashboardAdminDashboard";
import CourseTableInstructor from "./components/CourseTableInstructor/CourseTableInstructor";
import UpdatePageInstructorPassword from "./views/UpdatePageInstructorPassword/UpdatePageInstructorPassword";
import ProfilPageAdmin from "./views/profilPageAdmin/profilPageAdmin";



const App = () => {
  const [renderPictureHeader, setRenderPictureHeader]= useState(false); 
  
  const userObjs = JSON.parse(localStorage.getItem("USER_OBJ")) || {};
  const userObjsRole = userObjs.role || "default";
  const userObjsId = userObjs._id || "default";
  const userObjsName = userObjs.name || "default";
  
  // lifting state update picture profile header and popup
   const updRender = (val) =>{
    setRenderPictureHeader(val);
  }


  return (
    <div className="App">
       
         <Routes>
           <Route path="/" element={<Navigate replace to="/home"  />} />  {/* redirection */}
           <Route path="/home" element={<HomeHome />} />
           <Route path="/register_instructor" element={<RegisterInstructor />} />
           <Route path="/register_student" element={<RegisterStudent />} />
           <Route path="/login_page" element={<Login />} />
           <Route path="/admin-dashboard" element={<AdminDashboard renderPictureHeader={renderPictureHeader} />} >
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
                      <ProfilPageAdmin 
                       renderPictureHeader={renderPictureHeader} 
                       updRender={updRender}
                      // url="admins" 
                      // id={userObjsId}
                       />}/>  
               <Route path="/admin-dashboard/studentsByCourse/:id" element={<StudentsByCourse />} /> 
               <Route path="/admin-dashboard/instructorByCourse/:id" element={<InstructorByCourse />} />  
               <Route path="/admin-dashboard/courses/addStudents/:id" element={<AddStudentsCourse />}/>      
           </Route> 
           <Route path="/wait-verification" element={<WaitVerification />} />
           <Route path="/instructor-dashboard" element={<InstructorDashboard renderPictureHeader={renderPictureHeader} />} >
               <Route path="/instructor-dashboard/courses" element={<CourseTableInstructor />} />
               <Route  path="/instructor-dashboard/settings" element={<UpdatePageInstructorPassword />}/>
               <Route  path="/instructor-dashboard/profile" element={ 
                      <ProfilPage 
                       renderPictureHeader={renderPictureHeader} 
                       updRender={updRender}
                       url="instructors" 
                       id={userObjsId} />}/>  
           </Route>
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
