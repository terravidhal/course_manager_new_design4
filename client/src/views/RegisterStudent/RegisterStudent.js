import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import "./RegisterStudent.css";


const RegisterStudent = (props)=>{
    const [confirmReg, setConfirmReg] = useState("");
    const [errs, setErrs] = useState({});
    const navigate = useNavigate();
  
    const [user, setUser] = useState({
      name: "",
      email: "",
      fieldOfStudy:"Web developement",
      levelStudent: 1,
      password: "",
      confirmPassword:""
    })
  
    const handleChange = (e)=>{
      setUser({
        ...user,
        [e.target.name]: e.target.value 
      })
    }
  
    const register = e =>{
      e.preventDefault();
      axios.post('http://localhost:8000/api/registerStudent',
      user,
      {
        withCredentials: true,
      })
      .then(res =>{
        console.log(res.data);
        setUser({
          name:"",
          email:"",
          fieldOfStudy:"",
          levelStudent:"",
          password:"",
          confirmPassword:""
        })
        setConfirmReg("Thank you for registering, you can now log in");
        setErrs({});
        localStorage.setItem('USER_OBJ', JSON.stringify(res.data.student));
        navigate("/student-dashboard");
      })
      .catch((err)=>{
       // console.log(err);
        setErrs(err.response.data.errors.errors);
        console.log("+++++++++",err.response.data.errors.errors);
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
    <div className="RegisterStudent" style={{
      backgroundImage: 'url("/assets/images/bg_2.jpg.webp")',
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
         <h2>Register Student</h2>
         <Link to="/home">
         <ion-icon name="arrow-back-circle-outline"></ion-icon>back to Home
         </Link>
      </div>
      
      {
        confirmReg?
        <h1 style={{color: "grey"}}>{confirmReg}</h1>
        :null
      }
      <form onSubmit={register}>
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
        <div className="super-fields">
          <div className="field">
          <label>field Of Study</label>
          {
            errs.fieldOfStudy?
            <span className="error-text">{errs.fieldOfStudy.message}</span>
            :null
          }
          <select name="fieldOfStudy" id="" value={user.fieldOfStudy} onChange = {(e)=>handleChange(e)}>
               <option value="Web developement">Web developement</option>
               <option value="data analyst">data analyst</option>
               <option value="ux design">ux design</option>
          </select>
          </div>
          <div className="field">
          <label>level Student</label>
          {
            errs.levelStudent?
            <span className="error-text">{errs.levelStudent.message}</span>
            :null
          }
          <input type="number" name="levelStudent" value={user.levelStudent} onChange={(e)=> handleChange(e)}/>
          </div>
        </div>
        <div className="super-fields">
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
        </div>
        <button type="submit">Register Me</button>
        <p className="suggest">Already have an account ?&nbsp; 
        <Link to="/login_page">
             login 
        </Link> Or You are a Instructor ?&nbsp; 
        <Link to="/register_instructor">
                Register instructor
         </Link>
        </p>
      </form>
    </div>
  );
  };
  
  export default RegisterStudent;


