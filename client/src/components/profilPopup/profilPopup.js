import React from 'react';
import './profilPopup.css';

const ProfilPopup = (props) => {
  const userObjs = JSON.parse(localStorage.getItem("USER_OBJ")) || {};
  const userObjsRole = userObjs.role || "none";
  const userObjsName = userObjs.name || "none";
  const userObjsId = userObjs._id || "default";

  console.log("userObjRole+++++++++", userObjsRole);
  console.log("userObjsId+++++++++", userObjsId);
  console.log("userObjsId+++++++++", userObjsName);

  return(
    <div className="profilPopup">
      <div className="profil-infos">
        <div className="profil-picture">
           <img src="/assets/images/pic-1.jpg" alt="" />
        </div>
        <div className="profil-name">{userObjsName}</div>
        <div className="profil-role">{userObjsRole}</div>
      </div>
      <li className="view-profile profi">
        <button>view profile</button>
      </li>
    </div>
  );
};



export default ProfilPopup;
