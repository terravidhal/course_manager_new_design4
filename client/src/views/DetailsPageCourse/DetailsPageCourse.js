import React, { useEffect, useState } from 'react';
import './DetailsPageCourse.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreateBlocReviews from '../../components/CreateBlocReviews/CreateBlocReviews';
import ShowBlocReviews from '../../components/ShowBlocReviews/ShowBlocReviews';


const DetailsPageCourse = () => {

  const userObjs = JSON.parse(localStorage.getItem('USER_OBJ')) || {};
  const userObjsRole = userObjs.role || 'default';
  const userObjsId = userObjs._id || 'default';
  
  console.log("userObjRole+++++++++", userObjsRole);
  console.log("userObjsId+++++++++", userObjsId);

  const [OneCourse, setOneCourse] = useState({});
  const [arrReviews, setArrReviews] = useState([]);
  const {id} = useParams(); 
  const [loaded, setLoaded] = useState(false); 
  const [loadedArrReview, setLoadedArrReview] = useState(false); 

  
  useEffect(() => {
    axios.get("http://localhost:8000/api/courses/" + id,{withCredentials: true})
        .then( res => {
          console.log("u++++++++++",res.data);
          setOneCourse(res.data);
          setLoaded(true); 
        })
        .catch( err => console.log(err) );
  }, [id]); 


  useEffect(() => {
    axios.get("http://localhost:8000/api/reviews/course/" + id,{withCredentials: true})
        .then( res => {
          console.log("reviewsby course++++++++++",res.data.reviews);
          setArrReviews(res.data.reviews);
          console.log("OneCourse++++++++++",OneCourse);
        })
        .catch( err => console.log(err) );
  }, [loadedArrReview]); 

   // delete One specific review
   const deleteReview = (reviewId,ev) => {
    ev.preventDefault();
    axios
      .delete("http://localhost:8000/api/reviews/" + reviewId, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.result);
        setArrReviews(arrReviews.filter((review) => review._id !== reviewId));
      })
      .catch((err) => console.log(err));
  };


  const handleReviewCreated = (val) => {
    setLoadedArrReview(val); // Update arrReviews with the new value
  };

  const containsWord = (string, word) => {
    string = string.toLowerCase();
    word = word.toLowerCase();
    // Find the word in the string using the indexOf() method
    const index = string.indexOf(word);
    //Return true if the word is found (index >= 0), false otherwise
    return index >= 0;
  }

  const t = "je donne css a toi";
const contientCSS = containsWord(t, "css");
console.log(contientCSS); 
   

   



 
  return(
    <div className="DetailsPageCourse">
      {loaded === true ?
         <>
      <div className="page-top">
        <h1>Details Courses</h1>
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
            <div class="img-container">
                 <div class="img">
                     <div className="img-img">
                      { 
                        containsWord(OneCourse.course.name, "html") ?
                          <img src="/assets/images/thumb-1.png" alt="" />
                        :
                        containsWord(OneCourse.course.name, "css") ?
                        <img src="/assets/images/thumb-2.png" alt="" />
                        : containsWord(OneCourse.course.name, "javascript") ?
                          <img src="/assets/images/thumb-3.png" alt="" />
                        :  containsWord(OneCourse.course.name, "boostrap") ?
                           <img src="/assets/images/thumb-4.png" alt="" />
                        : containsWord(OneCourse.course.name, "jquery") ?
                          <img src="/assets/images/thumb-5.png" alt="" />
                        : containsWord(OneCourse.course.name, "sass") ?  
                          <img src="/assets/images/thumb-6.png" alt="" />
                        : containsWord(OneCourse.course.name, "php") ?
                          <img src="/assets/images/thumb-7.png" alt="" /> 
                        :  containsWord(OneCourse.course.name, "mysql") ? 
                           <img src="/assets/images/thumb-8.png" alt="" /> 
                        :  containsWord(OneCourse.course.name, "react") ?  
                           <img src="/assets/images/thumb-9.png" alt="" />    
                        :  <img className='special' src="/assets/images/OIG1.jfif" alt="" /> 
                      }
                     </div>
                     <div className="img-infos">
                        <p><span className='infos'><i class="fa-solid fa-user-graduate"></i></span>{OneCourse.course.level}</p>
                        <p><span className='infos'><i class="fa-solid fa-book-open"></i></span> {OneCourse.course.typeOfCourse}</p>
                        <p className='infos link'>
                          <span className='infos'><i class="fa-solid fa-users"></i></span>
                          { OneCourse.course.linkMeeting === '' ?
                            <a href={OneCourse.course.linkMeeting} target='_blank'></a>
                            : <a href={OneCourse.course.linkMeeting} target='_blank'>link streaming</a>
                          }
                        </p>
                        <p className='link'>
                          <span className='infos'><i class="fa-solid fa-file-pdf"></i></span>
                          { OneCourse.course.documentsLink === '' ?
                              <a href={OneCourse.course.documentsLink} target='_blank'></a>
                              : <a href={OneCourse.course.documentsLink} target='_blank'>link files</a>
                          }
                        </p>
                        <p><span className='infos'><i class="fa-regular fa-clock"></i></span> {OneCourse.course.startTime}</p>
                     </div>
                     <div className="img-infos-2">
                        <p><span className='infos'><i class="fa-solid fa-clock-rotate-left"></i></span> {OneCourse.course.endTime}</p>
                        <p><span className='infos'><i class="fa-solid fa-hourglass-start"></i></span> {OneCourse.course.duration} minutes</p>
                     </div>
                 </div>
                 <h3 class="title">{OneCourse.course.name}</h3>
                 <div class="info">
                    <p class="date"><i class="fas fa-calendar"></i><span>{OneCourse.course.dayOfWeek}</span></p>
                 </div>
                 <div class="tutor">
                     <div className="bloc-tutor">
                      <img src="/assets/images/pic-1.jpg" alt="" />
                     </div>
                    <div>
                       <h3>{OneCourse.oneSingleUser.name}</h3>
                       <span>instructor</span>
                    </div>
                 </div>
                 <p class="description">
                   {OneCourse.course.description}
                 </p>
             </div>
      </div>
        { userObjsRole === 'student' ?
         <div className="page-content">
           <CreateBlocReviews loadedArrReview={loadedArrReview} handleReviewCreated={handleReviewCreated} idCourse={id} userObjsId={userObjsId} />
         </div>
         : null
        }
      <div className="page-content">
        <h1 className='headind'>{arrReviews.length} Comments</h1>
        <ShowBlocReviews userObjsId={userObjsId} userObjsRole={userObjsRole} arrReviews={arrReviews}  deleteReview={deleteReview} />
      </div>
         </>
      :null}
    </div>
  );
};


export default DetailsPageCourse;
