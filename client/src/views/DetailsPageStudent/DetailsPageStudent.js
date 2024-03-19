import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './DetailsPageStudent.css';
import axios from 'axios';


const DetailsPageStudent = () => {

  const [OneStudent, setOneStudent] = useState({})
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
         <Link to="/admin-dashboard">
           back to Home
          </Link>
      </div>  
      <div className="page-content">
      <div className="details-img">
          <img src="/assets/images/student2.jfif" alt="" />
        </div>
        <div className="fields">
            <p><span className='infos'>name:</span>{OneStudent.name}</p>
            <p><span className='infos'>email:</span>{OneStudent.email}</p>
            <p><span className='infos'>fieldOfStudy:</span> {OneStudent.fieldOfStudy}</p>
            <p><span className='infos'>levelStudent:</span> {OneStudent.levelStudent}</p>
        </div>
      </div>
    </div>
  );
};


export default DetailsPageStudent;
