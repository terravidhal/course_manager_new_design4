import React, { useEffect, useState } from 'react';
import './InstructorByCourse.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';



const InstructorByCourse = () => {

  const userObjs = JSON.parse(localStorage.getItem('USER_OBJ')) || {};
  const userObjsRole = userObjs.role || 'default';
  const userObjsId = userObjs._id || 'default';
  
  console.log("userObjRole+++++++++", userObjsRole);
  console.log("userObjsId+++++++++", userObjsId);



  const [InstructByCourse, setInstructByCourse] = useState({});
  const {id} = useParams(); 
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false); 
  const [allCoursesSpec, setAllCoursesSpec] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  
  
  useEffect(() => {
    axios.get("http://localhost:8000/api/instructorOradmin/" + id,{withCredentials: true})
        .then( res => {
          console.log("u++++++++++",res.data.result);
          setInstructByCourse(res.data.result);
          setLoaded(true); 
        })
        .catch( err => console.log(err) );
  }, [id]); 



  useEffect(() => {
    axios.get("http://localhost:8000/api/courses/instructor2/" + id,{withCredentials: true})
        .then( res => {
          console.log("u*****5*****",res.data.coursesByInstructor);
          setAllCoursesSpec(res.data.coursesByInstructor);
        })
        .catch( err => console.log(err) );
  }, [id]); 


  useEffect(() => {
    axios.get("http://localhost:8000/api/reviews" ,{withCredentials: true})
        .then( res => {
          console.log("u**********",res.data.allReviews);
          setAllReviews(res.data.allReviews);
        })
        .catch( err => console.log(err) );
  }, []); 
   


  const filterReviewsByCourses = (reviews, courses) => {
    // Convert course IDs to an array
    const courseIds = courses.map(course => course._id);
  
    // Filter reviews based on course IDs
    const filteredReviews = reviews.filter(review => courseIds.includes(review.courseId));
  
    return filteredReviews;
  };

  const filteredReviews = filterReviewsByCourses(allReviews, allCoursesSpec);
  //console.log('filteredReviews', filteredReviews);

 
  
 
  return(
    <div className="InstructorByCourse">
      <div className="page-top">
        <h1>Instructor by course</h1>
        {
            userObjsRole === 'admin' ? (
                <Link to="/admin-dashboard">
                   <ion-icon name="arrow-back-circle-outline"></ion-icon>back to Home
                </Link>
            ) : userObjsRole === 'student' ? (
                <Link to="/student-dashboard">
                   <ion-icon name="arrow-back-circle-outline"></ion-icon>back to Home
                </Link>
            ) : (
                <Link to="/instructor-dashboard">
                    <ion-icon name="arrow-back-circle-outline"></ion-icon>back to Home
                </Link>
            )
        }
      </div>  
      <div className="page-content">
          { loaded === true ? 
          
          <>
               <div className="s-container">
            <div className="content">
                <span className="subtitle">
                    Hello, I'm
                </span>
                <h1 className="title">
                     <span>{InstructByCourse.name}<br/></span>
                </h1>
                <h5 className="title2">
                     Frontend Developer
                </h5>
                
                <div className="buttons">
                    <button className="one">{allCoursesSpec.length} courses</button>
                    <button className="two">{filteredReviews.length} comments</button>
                </div>
                <div className="icons">
                    <i class="fa-brands fa-linkedin"></i>
                    <i class="fa-brands fa-github"></i>
                </div>
            </div>
            <div className="image">
            <img src="/assets/images/blank-profile.png" alt="" />
            </div>
        </div>
          </>
          : null }
      </div>
    </div>
  );
}


export default InstructorByCourse;


