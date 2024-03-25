import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  Navigate,
  Router,
  Outlet,
} from "react-router-dom";
import './contentAdminDashboard.css';
import CourseTable from '../CourseTable/CourseTable';
import UpdatePageCourse from '../../views/UpdatePageCourse/UpdatePageCourse';
import DetailsPageCourse from '../../views/DetailsPageCourse/DetailsPageCourse';
import UpdatePageStudent from '../../views/UpdatePageStudent/UpdatePageStudent';
import DetailsPageStudent from '../../views/DetailsPageStudent/DetailsPageStudent';
import InstructorTable from '../InstructorTable/InstructorTable';
import UpdatePageInsructor from '../../views/UpdatePageInsructor/UpdatePageInsructor';
import DetailsPageInsructor from '../../views/DetailsPageInsructor/DetailsPageInsructor';
import UpdateAdminPassword from '../../views/UpdateAdminPassword/UpdateAdminPassword';
import ProfilPage from '../../views/profilPage/profilPage';
import StudentTable from '../StudentTable/StudentTable';


const ContentAdminDashboard = () => (
  <div className="contentAdminDashboard">
    <Routes>
   
      <Route  path="/admin-dashboard/ContentAdminDashboard/courses" element={<CourseTable />}/>
      <Route  path="/admin-dashboard/courses/edit/:id" element={<UpdatePageCourse />}/>
      <Route  path="/admin-dashboard/courses/:id" element={<DetailsPageCourse />}/>
      <Route  path="/admin-dashboard/students" element={<StudentTable />}/>
      <Route  path="/admin-dashboard/students/edit/:id" element={<UpdatePageStudent />}/>
      <Route  path="/admin-dashboard/students/:id" element={<DetailsPageStudent />}/>
      <Route  path="/admin-dashboard/instructors" element={<InstructorTable />}/>
      <Route  path="/admin-dashboard/instructors/edit/:id" element={<UpdatePageInsructor />}/>
      <Route  path="/admin-dashboard/instructors/:id" element={<DetailsPageInsructor />}/>
      <Route  path="/admin-dashboard/settings" element={<UpdateAdminPassword />}/>
      <Route  path="/admin-dashboard/profile" element={<ProfilPage />}/>
    </Routes>
  </div>
);

export default ContentAdminDashboard;
