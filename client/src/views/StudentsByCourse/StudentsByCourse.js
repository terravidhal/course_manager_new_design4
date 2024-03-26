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
        <Link to="" onClick={()=>navigate(-1)}>
            <ion-icon name="arrow-back-circle-outline"></ion-icon>back 
        </Link>
      </div>  
      <div className="page-content">
          { loaded === true ? 
            <>
               { StudByCourse.map((elt,index) => {
                  return(
                    <>
                     <div className="s-container" key={index}>
                        <div className="content">
                           <span className="subtitle">
                               Hello, I'm
                           </span>
                           <h1 className="title">
                                <span>{elt.name}<br/></span>
                           </h1>
                           <h5 className="title2">
                                 {elt.skills ? elt.skills : 'student'}
                           </h5>
                           <div className="buttons">
                              <button className="one">level {elt.levelStudent}</button>
                              <button className="two">{elt.fieldOfStudy}</button>
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
                           { elt.image === "" ?
                             <img src="/assets/images/blank-profile.png" alt="" />
                             : 
                             <img src={`http://localhost:8000/${elt.image}`} alt="" /> 
                           } 
                        </div>
                     </div>
                    </>
                  );
                }) }
            </>
          : null} 
      </div>
    </div>
  );
};


export default StudentsByCourse;

