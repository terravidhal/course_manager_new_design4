import React from "react";
import "./CourseTableStudent.css";
import { Link } from "react-router-dom";



const CourseTableStudent = (props) => {

  const userObjs = JSON.parse(localStorage.getItem('USER_OBJ')) || {};
  const userObjRole = userObjs.role || 'default';
  const userObjIsInstructor = userObjs.isInstructor || '';
  const userObjsId = userObjs._id || 'default';
  
  console.log("userObjRole+++++++++", userObjRole);
  console.log("userObjIsInstructor+++++++++", userObjIsInstructor);
  console.log("userObjsId+++++++++", userObjsId);

  const { allCourses} = props;
 

  return (
    <div className="CourseTableStudent">
      <div className="CourseTableStudent">
      <table>
         <thead>
          <tr>
            <th className="text-left">Name of Course</th>
            <th>Level</th>
            <th>field</th>
            <th className="text-left">Instructor</th>
            <th className="text-center">Status</th>
            <th>Options</th>
          </tr>
        </thead> 
        <tbody>
        {  allCourses.map((elt, index) => {
            return (
              <tr className="" key={index}>
                <td  className="actions">{elt.name}</td>
                <td  className="actions text-center">{elt.level}</td>
                <td  className="actions">{elt.field}</td>
                <td  className="actions instruct">
                  { userObjsId === elt.instructor ? "Me" :
                     <Link className="btt blue"  to={"/instructorByCourse/" + elt.instructor}>
                       <ion-icon name="eye-outline"></ion-icon>
                     </Link>
                  }
                  </td>
                <td  className="actions text-center">
                  <button
                      className={`${
                        elt.status === "pending"
                          ? "status inProgress"
                          : "status pending"
                      }`}
                    > {elt.status}</button>
                </td>
                <td className="actions text-center options">
                  <Link className="btt violet"  to={"/courses/" + elt._id}>
                    <ion-icon name="document-text-outline"></ion-icon>
                  </Link> &nbsp;
                </td>
              </tr>
            );
          })} 
        </tbody>
      </table>
    </div>
    </div>
  );
};


export default CourseTableStudent;














