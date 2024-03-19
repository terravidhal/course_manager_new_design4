import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
import './profilPage.css';

const ProfilPage = (props) => {
  const {setDisplay, url} = props
  const userObjs = JSON.parse(localStorage.getItem("USER_OBJ")) || {};
  const userObjsId = userObjs._id || "default";

  console.log("userObjsId+++++++++", userObjsId);


 // const { id } = useParams();
  const id = userObjs._id ;
  const [confirmReg, setConfirmReg] = useState("");
 // const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false); 
  const [errs, setErrs] = useState({});
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [infos, setInfos] = useState({
    name: "",
    role: "",
    email: "",
  });
 

  const handleChange = (e)=>{
    setUser({
      ...user,
      [e.target.name]: e.target.value 
    })
  }


     //get  data one specific instructor
     useEffect(() => {
      axios
        .get("http://localhost:8000/api/"+url+"/" + id,{withCredentials: true})
        .then((res) => {
          console.log("u++++++++++res.data.oneSingle+data",res.data.oneSingleAdmin || res.data.oneSingleInstructor || res.data.oneSingleStudent);
          let oneSingle = {};
          if (res.data.oneSingleAdmin ) {
            oneSingle = res.data.oneSingleAdmin
          }else if ( res.data.oneSingleInstructor){
            oneSingle =  res.data.oneSingleInstructor
          }else if(res.data.oneSingleStudent){
            oneSingle =  res.data.oneSingleStudent
          }else{
            console.log('data not exists!');
          }
          setInfos({
            name: oneSingle.name ,
            role: oneSingle.role ,
            email: oneSingle.email ,
          });
          setUser({
            name: oneSingle.name ,
            email: oneSingle.email ,
          });
          setLoaded(true); 
        })
        .catch((err) => console.log(err));
        
      }, [id]);
  


  const updateUser = (e) =>{
    e.preventDefault();
    axios.patch('http://localhost:8000/api/me/'+url+'/'+ id,
    user,
    {
      withCredentials: true,
    })
    .then(res =>{
      console.log(res.data);
      setUser({
        name:"",
        email:"",
      })
      setConfirmReg("sucefully , updating", url);
      setErrs({});
      setDisplay("courses");
    })
    .catch((err)=>{
      console.log(err);
      setErrs(err.response.data.errors.errors);
     // console.log("+++++++++",err.response.data.errors.errors);
    })
  };



  return(
    <div className="ProfilPage">
      <div className="bloc-view">
        <div className="profil-infos">
        <div className="profil-picture">
           <img src="/assets/images/pic-1.jpg" alt="" />
        </div>
        <div className="profil-name">infos</div>
        <div className="profil-role">profile</div>
        </div>
        { loaded === true ?
          <>
            <div className="view-profile profi">
            <button>{infos.name}</button>
            </div> 
            <div className="view-profile profi">
            <button>{infos.role}</button>
            </div> 
            <div className="view-profile profi">
            <button>{infos.email}</button>
            </div> 
          </>
        :null}
      </div>
      <div className="bloc-update">
         {
           confirmReg?
           <h1 style={{color: "grey"}}>{confirmReg}</h1>
           :null
         }
         { loaded === true ?
           <form onSubmit={updateUser}>
                 <div className="field">
                <label>Name</label>
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
              <button type="submit">Update</button>
            </form>  
         :null}
      </div>
    </div>
  );
};

export default ProfilPage;

