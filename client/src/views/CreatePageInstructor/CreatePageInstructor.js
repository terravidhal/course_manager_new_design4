import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import './CreatePageInstructor.css';


const CreatePageInstructor = (props)=>{
    const [confirmReg, setConfirmReg] = useState("");
    const [errs, setErrs] = useState({});
    const navigate = useNavigate();
  
    const [user, setUser] = useState({
      name: "",
      email: "",
      isInstructor: "false",
      password: "",
      confirmPassword:""
    });

    const userObjs = JSON.parse(localStorage.getItem("USER_OBJ")) || {};
    const userObjsRole = userObjs.role || "default";
    const userObjsId = userObjs._id || "default";
  
    console.log("userObjRole+++++++++", userObjsRole);
    console.log("userObjsId+++++++++", userObjsId);

    useEffect(() => {
      if (userObjsRole !== 'admin') {
        navigate('/page404NotFound'); 
      }
    }, []);
  
    const handleChange = (e)=>{
      setUser({
        ...user,
        [e.target.name]: e.target.value 
      })
    }
  
    const create = e =>{
      e.preventDefault();
      axios.post('http://localhost:8000/api/instructors',
      user,
      {
        withCredentials: true,
      })
      .then(res =>{
        console.log(res.data);
        setUser({
          name:"",
          email:"",
          isInstructor: "false",
          password:"",
          confirmPassword:""
        })
        setConfirmReg("Thank you for registering, you can now log in");
        setErrs({});
        navigate("/admin-dashboard");
      })
      .catch((err)=>{
       // console.log(err);
        setErrs(err.response.data.errors.errors);
      })
  };

  // show/hiden value input password
  const toggleInputType = (ev) =>{
    ev.target.classList.toggle('fa-eye');
    const input = ev.target.parentNode.children[0];
  //  console.log(input);
    input.type === "password" ? input.type = "text" : input.type = "password";
  }
  
  return(
    <div className="CreatePageInstructor">
      <div className="page-top">
        <h2>create instuctor</h2>
        <Link to="/admin-dashboard">
          <ion-icon name="arrow-back-circle-outline"></ion-icon>back to Home
        </Link>
      </div>
      {
        confirmReg?
        <h1 style={{color: "grey"}}>{confirmReg}</h1>
        :null
      }
      <form onSubmit={create}>
        <div className="field">
          <label>name</label>
          {
            errs.name?
            <span className="error-text">{errs.name.message}</span>
            :null
          }
          <input type="text" name="name" value={user.name} onChange={(e)=> handleChange(e)}/>
        </div>
        <div className="field">
          <label>Email</label>
          {
            errs.email?
            <span className="error-text">{errs.email.message}</span>
            :null
          }
          <input type="email" name="email" value={user.email} onChange={(e)=> handleChange(e)}/>
        </div>
        <div className="field">
          <label>isInstructor</label>
          {
            errs.isInstructor?
            <span className="error-text">{errs.isInstructor.message}</span>
            :null
          }
          <select name="isInstructor" id="" value={user.isInstructor} onChange = {(e)=>handleChange(e)}>
               <option value="false">false</option>
               <option value="true">true</option>
          </select>
        </div>
        <div className="field">
          <label>Password</label>
          {
            errs.password?
            <span className="error-text">{errs.password.message}</span>
            :null
          }
          <div className="input-icon relative">
            <input type="password" name="password" value={user.password} onChange={(e)=> handleChange(e)}/>
            <i onClick={(ev)=> toggleInputType(ev)} className="fas fa-eye-slash  absolute"></i>
          </div>
          <span className="infos-pwd">password must contain at least one lowercase letter, one uppercase letter, one number and one special character, and be at least 8 characters long</span>
        </div>
        <div className="field">
          <label>Confirm Password</label>
          {
            errs.confirmPassword?
            <span className="error-text">{errs.confirmPassword.message}</span>
            :null
          }
          <div className="input-icon relative">
            <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={(e)=> handleChange(e)}/>
            <i onClick={(ev)=> toggleInputType(ev)} className="fas fa-eye-slash  absolute"></i>
          </div>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
  };
  
  export default CreatePageInstructor;
