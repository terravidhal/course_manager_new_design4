import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './DetailsPageInsructor.css';
import axios from 'axios';


const DetailsPageInsructor = () => {
  const userObjs = JSON.parse(localStorage.getItem('USER_OBJ')) || {};
  const userObjsRole = userObjs.role || 'default';
  const userObjsId = userObjs._id || 'default';
  
  const [OneInstructor, setOneInstructor] = useState({})
  const {id} = useParams(); 
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false); 
  const [allCoursesSpec, setAllCoursesSpec] = useState([]);
  const [allReviews, setAllReviews] = useState([]);


  
  useEffect(() => {
    axios.get("http://localhost:8000/api/instructors/" + id,{withCredentials: true})
        .then( res => {
          console.log("u++++++++++",res.data.oneSingleInstructor);
          setOneInstructor(res.data.oneSingleInstructor);
          setLoaded(true); 
          console.log("y++++++++++",OneInstructor.instructors);
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
  



  return(
    <div className="DetailsPageInsructor">
      <div className="page-top">
        <h1>Details Instructors</h1>
        <Link to="" onClick={()=>navigate(-1)}>
            <ion-icon name="arrow-back-circle-outline"></ion-icon>back 
        </Link>
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
                     <span>{OneInstructor.name}<br/></span>
                </h1>
                <h5 className="title2">
                     {OneInstructor.skills ? OneInstructor.skills : 'developer'}
                </h5>
                
                <div className="buttons">
                    <button className="one">{allCoursesSpec.length} courses</button>
                    <button className="two">{filteredReviews.length} comments</button>
                </div>
                <div className="icons">
                    <i class="fa-brands fa-html5"></i>
                    <i class="fa-brands fa-css3-alt"></i>
                    <i class="fa-brands fa-js"></i>
                </div>
            </div>
            <div className="image">
              { OneInstructor.image === "" ?
                <img src="/assets/images/blank-profile.png" alt="" />
                : 
                <img src={`http://localhost:8000/${OneInstructor.image}`} alt="" /> 
              } 
            </div>
        </div>
          </>
          : null }
      </div>
    </div>
  );
};


export default DetailsPageInsructor;
