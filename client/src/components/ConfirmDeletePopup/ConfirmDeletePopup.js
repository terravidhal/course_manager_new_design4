import React from 'react';
import './ConfirmDeletePopup.css';
import axios from "axios";




const ConfirmDeletePopup = (props) => {

   const {setAllItems, allItems, id, isitems} = props;
   const popup = document.querySelector('.ConfirmDeletePopup');


   // delete One specific course
   const deleteCourse = (courseId) => {
    axios
      .delete("http://localhost:8000/api/courses/" + courseId, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.result);
        setAllItems(allItems.filter((course) => course._id !== courseId));
        popup.classList.toggle('switch');
      })
      .catch((err) => console.log(err));
  };


   // delete One specific student
   const deleteStudent = (studentId) => {
    axios
      .delete("http://localhost:8000/api/students/" + studentId, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.result);
        setAllItems(
          allItems.filter((student) => student._id !== studentId)
        );
        popup.classList.toggle('switch');
      })
      .catch((err) => console.log(err));
  };


  // delete One specific instructor
  const deleteInstructor = (instructorId) => {
    axios
      .delete("http://localhost:8000/api/instructors/" + instructorId, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.result);
        setAllItems(
          allItems.filter((instructor) => instructor._id !== instructorId)
        );
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
          Are you sure you want to delete this {isitems} ?
        </div>
        <div className="buttons-cfr">
           <button className="bt green" onClick={()=>{
            popup.classList.toggle('switch');
           }}><i class="fa-solid fa-xmark"></i>&nbsp;&nbsp;cancel</button>
           {
            isitems === 'course' ?
            <button className="bt red"  onClick={() => deleteCourse(id)}><i class="fa-solid fa-book-open"></i>&nbsp;&nbsp;delete</button> 
            : null
           }
           {
            isitems === 'student' ?
            <button className="bt red"  onClick={() => deleteStudent(id)}><i class="fa-solid fa-graduation-cap"></i>&nbsp;&nbsp;delete</button>
            : null
           }
           {
            isitems === 'instructor' ?
            <button className="bt red"  onClick={() => deleteInstructor(id)}><i class="fa-solid fa-person-chalkboard"></i>&nbsp;&nbsp;delete</button>
            : null
           }
        </div>
      </div>
  );
};


export default ConfirmDeletePopup;
