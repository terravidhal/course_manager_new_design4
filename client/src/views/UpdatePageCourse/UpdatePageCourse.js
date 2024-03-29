import React, {useState, useEffect} from 'react';
import './UpdatePageCourse.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import CourseForm from '../../components/CourseForm/CourseForm';




const UpdatePageCourse = (props) => {
  const userObjs = JSON.parse(localStorage.getItem('USER_OBJ')) || {};
  const userObjsRole = userObjs.role || 'default';
  const userObjsId = userObjs._id || 'default';
  
  const { id } = useParams();
  const [coursObj, setCoursObj] = useState({});
  const [loaded, setLoaded] = useState(false); // check if the data is available
  const navigate = useNavigate();
  const [errors, setErrors] = useState({}); 
  const [errors2, setErrors2] = useState({}); 


  useEffect(() => {
    if (userObjsRole === 'default' ||  userObjsRole === 'student') {
           navigate('/page404NotFound'); 
    }
  }, []);


  //get  data one specific course
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/courses/" + id,{withCredentials: true})
      .then((res) => {
        console.log("u++++++++++",res.data);
        setCoursObj(res.data);
        setLoaded(true); // data available => set "true"
      })
      .catch((err) => console.log(err));
      
    }, [id]); 



  // update one specific course
  const updateCourse = (coursObj) => {
    axios
      .patch(
        "http://localhost:8000/api/courses/" + id,

        coursObj,{withCredentials: true} 
      )
      .then((res) => {
       // console.log(res.data.course);
        setErrors({});
        if (userObjsRole === 'admin') {
          navigate("/admin-dashboard/courses");
        } else {
          navigate("/instructor-dashboard/courses");
        }
      })
      .catch(err=>{
        console.log("err//////", err)
        const errorResponse = err.response.data.errors; 
        // Set Errors
        setErrors2({errors:errorResponse});
        setErrors(errorResponse);
      }) 
  };



  return (
    <div className="UpdatePageCourse">
      <div className="page-top">
        <h1>Update courses</h1>
        <Link to="" onClick={()=>navigate(-1)}>
            <ion-icon name="arrow-back-circle-outline"></ion-icon>back 
        </Link>
      </div>
      <h4>Update your course</h4>
      
      <div className="page-content">
      {loaded === true ? 
        <CourseForm requestPostorPatch={updateCourse} 
        initialName={coursObj.course.name}
        initialLevel={coursObj.course.level}
        initialDescription={coursObj.course.description}
        initialTypeOfCourse={coursObj.course.typeOfCourse}
        initialLinkMeeting={coursObj.course.linkMeeting}
        initialDocumentsLink={coursObj.course.documentsLink}
        initialInstructorId={coursObj.course.instructor}
        initialadminId={userObjsId}
        initialInstructId={coursObj.course.instructor}
        initialDayOfWeek={coursObj.course.dayOfWeek}
        initialField={coursObj.course.field}
        initialStartTime={coursObj.course.startTime}
        initialEndTime={coursObj.course.endTime}
        initialDuration={coursObj.course.duration}
        initialStudents={coursObj.course.students}
        initialAvailableStudents={[]}
        userObjsRole={userObjsRole}
        errors={errors}
        errors2={errors2}
        create=""
        update="update"
        deletes=""
        setErrors = {setErrors} 
        iscreatePage={false}
        />
       : null}
       </div>
    </div>
  );

};


export default UpdatePageCourse;
