import React from 'react';
import './page404NotFound.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Page404NotFound = () => {
  const navigate = useNavigate();
  const previousUrl = localStorage.getItem('previousUrl');
 

  const previous = () => {
    navigate(previousUrl);
    localStorage.removeItem('previousUrl'); // Supprimer l'URL après utilisation
   // navigate(-1);
    logout();
    navigate('/login_page');
  } 

  const logout = (event) => {
  //  event.preventDefault();
    axios
      .post("http://localhost:8000/api/logout", {}, { withCredentials: true })
      .then((res) => {
        console.log("deconnexion", res.data.message);
        localStorage.removeItem("USER_OBJ");
        navigate("/login_page");
      })
      .catch((err) => {
        console.log("Erreur de déconnexion +++++++++++", err);
      });
  };


  return (
    <div className="page404NotFound">
    <img src="/assets/images/main.png" alt=""/>
    <div className="wrapper">
        <h1>Page Not Found</h1>
       <p className="btn" onClick={previous}>Back to login page</p>
    </div>
    </div>
  );
};


export default Page404NotFound;
