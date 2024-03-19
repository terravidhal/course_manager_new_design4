import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './WaitVerification.css';



const WaitVerification = () => {
  const navigate = useNavigate();

  const userObjs = JSON.parse(localStorage.getItem('USER_OBJ')) || {};
  const userObjsRole = userObjs.role || 'default';
  const userObjsId = userObjs._id || 'default';
  
  console.log("userObjRole+++++++++", userObjsRole);
  console.log("userObjsId+++++++++", userObjsId);

  
  const logout = (event) =>{
    event.preventDefault();
    axios.post('http://localhost:8000/api/logout',{},{withCredentials: true})
    .then((res)=>{
      //console.log("res", res);
      console.log("deconnexion",res.data.message);
      localStorage.removeItem("USER_OBJ");
      navigate("/login_page");
    })
    .catch((err)=>{
      console.log("Erreur de déconnexion +++++++++++",err);
    })
};


  
  return (
    <div className="WaitVerification" style={{
      backgroundImage: 'url("./assets/images/bg_2.jpg.webp")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      left: 0,
      top: 0,
      width: '100%',
      height: '100vh',
      position: 'relative',
      overflowY: 'auto',
    }}>
       <div className="page-top">
        <h1>Waiting Verification</h1>
        <button className="secondary" onClick={logout}>logout</button>
      </div>
      <div className="box">
        <img src="./assets/images/34338d26023e5515f6cc8969aa027bca.gif" alt="" />
      </div>
    </div>
  );

};


export default WaitVerification;
