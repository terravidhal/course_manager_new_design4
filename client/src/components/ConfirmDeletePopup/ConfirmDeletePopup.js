import React from 'react';
import './ConfirmDeletePopup.css';
import axios from "axios";




const ConfirmDeletePopup = (props) => {

   const {setAllCourses, allCourses, id} = props;
   const popup = document.querySelector('.ConfirmDeletePopup');


   // delete One specific course
   const deleteCourse = (courseId) => {
    axios
      .delete("http://localhost:8000/api/courses/" + courseId, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.result);
        setAllCourses(allCourses.filter((course) => course._id !== courseId));
        popup.classList.toggle('switch');
      })
      .catch((err) => console.log(err));
  };

  return (
      <div className="ConfirmDeletePopup">
        <div className="titles">
          <div className="titles-1">
            Delete
          </div>
          <div className="icons-1">
            <i class="fa-solid fa-xmark" onClick={()=>{
            popup.classList.toggle('switch');
           }}></i>
          </div>
        </div>
        <div className="message">
          Are you sure you want to delete this item ?
        </div>
        <div className="buttons-cfr">
           <button className="bt green" onClick={()=>{
            popup.classList.toggle('switch');
           }}>cancel</button>
           <button className="bt red"  onClick={() => deleteCourse(id)}>delete</button>
        </div>
      </div>
  );
};


export default ConfirmDeletePopup;
