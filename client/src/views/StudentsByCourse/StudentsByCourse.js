import React, { useEffect, useState } from 'react';
import './StudentsByCourse.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentsByCourse = () => {

  const userObjs = JSON.parse(localStorage.getItem('USER_OBJ')) || {};
  const userObjsRole = userObjs.role || 'default';
  const userObjsId = userObjs._id || 'default';
  
  console.log("userObjRole+++++++++", userObjsRole);
  console.log("userObjsId+++++++++", userObjsId);


  const [StudByCourse, setStudByCourse] = useState([]);
  const {id} = useParams(); 
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false); 

  
  useEffect(() => {
    axios.get("http://localhost:8000/api/students/course/" + id,{withCredentials: true})
        .then( res => {
          console.log("u++++++++++",res);
          console.log("p++++++++++",res.data.students);
          setStudByCourse(res.data.students)
          setLoaded(true); 
          console.log("y++++++++++StudByCourse",StudByCourse);
        })
        .catch( err => console.log(err) );
  }, [id]); 


 
  return(
    <div className="StudentsByCourse">
      <div className="page-top">
        <h1>Students by course</h1>
        {
          userObjsRole === 'admin' ?
            <Link to="/admin-dashboard">
             <ion-icon name="arrow-back-circle-outline"></ion-icon>back to Home
             </Link> :
             <Link to="/instructor-dashboard">
             <ion-icon name="arrow-back-circle-outline"></ion-icon>back to Home
            </Link>
        }
      </div>  
      <div className="page-content">
          { loaded === true ? 
            <>
               { StudByCourse.map((elt,index) => {
                  return(
                    <>
                      <div className="details-img">
                        <img src="/assets/images/student2.jfif" alt="" />
                      </div>
                      <div className="fields" key={index}>
                         <p><span className='infos'>name:</span>&nbsp;{elt.name}</p>
                         <p><span className='infos'>email:</span>&nbsp;{elt.email}</p>
                         <p><span className='infos'>fieldOfStudy:</span>&nbsp;{elt.fieldOfStudy}</p>
                         <p><span className='infos'>levelStudent:</span>&nbsp;{elt.levelStudent}</p>
                      </div>
                    </>
                  );
                }) }
               { StudByCourse.length === 0 ? 
                       <>
                         <div className="details-img">
                           <img src="/assets/images/student2.jfif" alt="" />
                         </div>
                         <div className="fields">
                           <p><span className='infos'>Students:</span>&nbsp;{"0"}</p> 
                         </div>
                       </>
               : null }
            </>
          : null} 
      </div>
    </div>
  );
};


export default StudentsByCourse;

