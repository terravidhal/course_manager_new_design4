import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './DetailsPageStudent.css';
import axios from 'axios';


const DetailsPageStudent = () => {
  const userObjs = JSON.parse(localStorage.getItem('USER_OBJ')) || {};
  const userObjsRole = userObjs.role || 'default';
  const userObjsId = userObjs._id || 'default';
  
  console.log("userObjRole+++++++++", userObjsRole);
  console.log("userObjsId+++++++++", userObjsId);



  const [OneStudent, setOneStudent] = useState({});
  const {id} = useParams(); 
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false); 
  


  
  useEffect(() => {
    axios.get("http://localhost:8000/api/students/" + id,{withCredentials: true})
        .then( res => {
          console.log("u++++++++++",res.data.oneSingleStudent);
          setOneStudent(res.data.oneSingleStudent);
          setLoaded(true); 
          console.log("y++++++++++",OneStudent.students);
        })
        .catch( err => console.log(err) );
  }, [id]); 




 
  return(
    <div className="DetailsPageStudent">
      <div className="page-top">
        <h1>Speedy Students</h1>
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
                     <span>{OneStudent.name}<br/></span>
                </h1>
                <h5 className="title2">
                     {OneStudent.skills ? OneStudent.skills : 'student'}
                </h5>
                
                <div className="buttons">
                    <button className="one">level {OneStudent.levelStudent}</button>
                    <button className="two">{OneStudent.fieldOfStudy}</button>
                </div>
                <div className="icons">
                    {/* <i class="fa-brands fa-linkedin"></i> */}
                    {/* <i class="fa-brands fa-github"></i> */}
                    <i class="fa-brands fa-html5"></i>
                    <i class="fa-brands fa-css3-alt"></i>
                    <i class="fa-brands fa-js"></i>
                </div>
                  </div>
                  <div className="image">
                     { OneStudent.image === "" ?
                       <img src="/assets/images/blank-profile.png" alt="" />
                       : 
                       <img src={`http://localhost:8000/${OneStudent.image}`} alt="" /> 
                     } 
                  </div>
                </div>
                </>
            : null }
      </div>
    </div>
  );
};


export default DetailsPageStudent;
