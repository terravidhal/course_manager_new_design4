import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './DetailsPageInsructor.css';
import axios from 'axios';


const DetailsPageInsructor = () => {

  const [OneInstructor, setOneInstructor] = useState({})
  const {id} = useParams(); 
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false); 

  
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


  return(
    <div className="DetailsPageInsructor">
      <div className="page-top">
        <h1>Details Instructors</h1>
         <Link to="/admin-dashboard">
         <ion-icon name="arrow-back-circle-outline"></ion-icon>back to Home
          </Link>
      </div>  
      <div className="page-content">
      <div className="details-img">
          {/* <img src="/assets/images/instruct.jfif" alt="" /> */}
          <img src="/assets/images/image_2.jpg.webp" alt="" />
        </div>
        <div className="fields">
            <p><span className='infos'>name:</span>{OneInstructor.name}</p>
            <p><span className='infos'>email:</span>{OneInstructor.email}</p>
            <p><span className='infos'>isInstructor:</span>{OneInstructor.isInstructor}</p>
        </div>
      </div>
    </div>
  );
};


export default DetailsPageInsructor;
