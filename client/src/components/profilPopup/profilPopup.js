import React from 'react';
import './profilPopup.css';

const ProfilPopup = (props) => {

 const {userObjsImage, userObjsRole, userObjsName,} = props;

  return(
    <div className="profilPopup">
      <div className="profil-infos">
        <div className="profil-picture">
           { userObjsImage === "" ?
              <img src="/assets/images/blank-profile.png" alt="" />
              : 
              <img src={`http://localhost:8000/${userObjsImage}`} alt="" /> 
            } 
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
