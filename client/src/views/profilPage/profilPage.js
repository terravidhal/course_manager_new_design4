import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
import './profilPage.css';

const ProfilPage = (props) => {
  const {setDisplay, url, id, updRender, renderPictureHeader,} = props
  const userObjs = JSON.parse(localStorage.getItem("USER_OBJ")) || {};
  const userObjsId = userObjs._id || "default";

  console.log("userObjsId+++++++++", userObjsId);


 // const { id } = useParams();
 // const id = userObjs._id ;
  const [confirmReg, setConfirmReg] = useState("");
 // const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false); 
  const [render, setRender]= useState(false); 
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

  // upload img
  const [image, setImage] = useState();

  const formdata = new FormData();
  formdata.append("image", image);
//
  
 

  const handleChange = (e)=>{
    setUser({
      ...user,
      [e.target.name]: e.target.value 
    })
  }


     //get  data one specific user
     useEffect(() => {
      axios
        .get("http://localhost:8000/api/"+url+"/" + id,{withCredentials: true})
        .then((res) => {
         // console.log("u++++++++++res.data.oneSingle+data",res.data.oneSingleAdmin || res.data.oneSingleInstructor || res.data.oneSingleStudent);
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
            image: oneSingle.image ,
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
        
      }, [id, render]);
  

  // update name and email
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
      render === false ?  setRender(true) : setRender(false)
     // setDisplay("courses");
    })
    .catch((err)=>{
      console.log(err);
      setErrs(err.response.data.errors.errors);
     // console.log("+++++++++",err.response.data.errors.errors);
    })
  };

  //upload image
  const updateImageProfile = async (e) => {
    e.preventDefault();

    axios.patch('http://localhost:8000/api/upload-image/'+url+'/'+ id,
    formdata,
    {
      withCredentials: true,
    })
    .then(res =>{
      console.log(res.data);
      render === false ?  setRender(true) : setRender(false)
      renderPictureHeader === false ?  updRender(true) : updRender(false)
    })
    .catch((err)=>{
      console.log(err);
    })
  };

  // handle input files
  const handleInputFiles = () =>{
   // const input = document.querySelector('#profile_input');
   // input.click();
    if (image) {
      console.log('input.value', image.name);
      document.querySelector('i.fa-regular.fa-circle-check').classList.remove('valid_picture');
      document.querySelector('#text').classList.remove('text_picture');
    }
  }

  handleInputFiles()




  return(
    <div class="recentOrders">
        <div class="cardHeader">
          <h2 className="pl-x">Profile</h2>
          <h2 class="blue-color" to="/instructors/new">Update Profile</h2>
        </div>
        <div className="ProfilPage">
      <div className="bloc-view">
      { loaded === true ?
        <>
          <div className="profil-infos">
           <div className="profil-picture relative">
              { infos.image === "" ?
                <img src="/assets/images/blank-profile.png" alt="" />
                : 
                <img src={`http://localhost:8000/${infos.image}`} alt="" /> 
              } 
              <div className="bloc-update two absolute">
                 <form onSubmit={updateImageProfile} encType="multipart/form-data">
                    <div class="">
                      <i onClick={()=>{document.querySelector('#profile_input').click()}}
                        className="fa-solid fa-pen-to-square" id="edit_picture"></i>
                      <input
                        type="file" accept="image/*" 
                        onChange={(e) => setImage(e.target.files[0])}
                        className="none"
                        name="image"
                        id="profile_input"
                      />
                    </div>
                    <i onClick={()=>{document.querySelector('#profile_btn').click();
                                     document.querySelector('i.fa-regular.fa-circle-check').classList.add('valid_picture');
                                     }}
                     className="fa-regular fa-circle-check valid_picture" id="valid_picture"></i>
                     <span id="text" className="text_picture">{image ? "click" : ""}</span>
                    <button className="none" type="submit" id="profile_btn">
                      Submit image
                    </button>
                  </form>
               </div>    
           </div>
           <div className="profil-name hidden">infos</div>
           <div className="profil-name">infos</div>
           <div className="profil-role">profile</div>
          </div>
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
        : null}
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
    </div>
  );
};

export default ProfilPage;

