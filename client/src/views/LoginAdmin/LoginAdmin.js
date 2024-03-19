import React,{ useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import "./LoginAdmin.css";




const LoginAdmin = (props)=>{
    const [email, setEmail] = useState("");
    const [tocken, setTocken] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errs2, setErrs2] = useState("");
    const navigate = useNavigate();

  
   
  
    const login = (event) =>{
      event.preventDefault();
      axios.post('http://localhost:8000/api/loginAdmin',{
        email: email,
        password: password,
        tocken: tocken,
      },
      {
        withCredentials: true,
      })
      .then((res)=>{
       // console.log("res***************",res);
        console.log("res.data***************",res.data);

        localStorage.setItem('USER_OBJ', JSON.stringify(res.data.admin));
        navigate("/admin-dashboard");
      })
      .catch((err)=>{
        console.error("Error logging in:", err);
        setErrs2(err.response.data.message)
      })
  };


  
  return(
    <div>
      <h2>Login admin</h2>
      <Link to="/route/regist/loaded25">
             Register admin
      </Link>


      <p className="error-text">{errorMessage? errorMessage : ""}</p>
      {
        errs2?
        <span className="error-text">{errs2}</span>
        :null
      }
      <form onSubmit={login}>
        <div>
          <label>Email</label>
          <input type="text" name="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
        </div>
        <div>
          <label>tocken</label>
          <input type="password" name="tocken" value={tocken} onChange={(e)=> setTocken(e.target.value)}/>
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
        </div>
        <button type="submit">Sign in</button>
      </form>
      </div>
    );
  };
  
  export default LoginAdmin;




