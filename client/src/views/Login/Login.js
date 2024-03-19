import React,{ useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";




const Login = (props)=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const userObjs = JSON.parse(localStorage.getItem('USER_OBJ')) || {};
    const userObjsRole = userObjs.role || 'default';
    const userObjsId = userObjs._id || 'default';
    
    console.log("userObjRole+++++++++", userObjsRole);
    console.log("userObjsId+++++++++", userObjsId);

  
    const login = (event) =>{
      event.preventDefault();
      axios.post('http://localhost:8000/api/login',{
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      })
      .then((res)=>{
        console.log("res.data***************",res.data);
       if ( res.data.student) {
           localStorage.setItem('USER_OBJ', JSON.stringify(res.data.student));
           navigate("/student-dashboard");

        }else if (res.data.instructor) {
         if (res.data.instructor.isInstructor === "true") {
            localStorage.setItem('USER_OBJ', JSON.stringify(res.data.instructor));
            navigate("/instructor-dashboard");
         } else {
            localStorage.setItem('USER_OBJ', JSON.stringify(res.data.instructor));
            navigate("/wait-verification");
         }   

        } else if(res.data.admin){
          localStorage.setItem('USER_OBJ', JSON.stringify(res.data.admin));
          navigate("/admin-dashboard");
        }
        else{
          navigate("/page404NotFound");
          console.error("Unexpected response:", res.data);
        }   
      })
      .catch((err)=>{
        console.error("Error logging in:", err);
        setErrorMessage(err.response.data.message);
      })
  };


  // show/hiden value input password
  const toggleInputType = (ev) =>{
    ev.target.classList.toggle('fa-eye');
    const input = ev.target.parentNode.children[1];
  //  console.log(input);
    input.type === "password" ? input.type = "text" : input.type = "password";
  }


  
  return(
    <div className="Login" style={{
      backgroundImage: 'url("/assets/images/bg_1.jpg.webp")',
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
         <h2>Login</h2>
         <Link to="/home">
         <ion-icon name="arrow-back-circle-outline"></ion-icon>back to Home
         </Link>
      </div>
      <form onSubmit={login}>
      <p className="error-text">{errorMessage? errorMessage : ""}</p>
        <div className="field">
          <label>Email</label>
          <input type="text" name="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
        </div>
        <div className="field relative">
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
          <i onClick={(ev)=> toggleInputType(ev)} className="fas fa-eye-slash  absolute"></i>
        </div>
        <button type="submit">Sign in</button>
        <p className="suggest">you have not account ?&nbsp; 
        <Link to="/register_instructor">
                Register instructor
         </Link>&nbsp;  Or &nbsp;
         <Link to="/register_student">
                Register student
         </Link>
        </p>
      </form>
      </div>
    );
  };
  
  export default Login;



