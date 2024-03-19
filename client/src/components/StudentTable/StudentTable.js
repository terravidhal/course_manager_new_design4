import React from "react";
import './StudentTable.css'
import { Link } from "react-router-dom";





const StudentTable = (props) => {
  const { allStudents, deleteStudent } = props;


  return (
    <div className="StudentTable">
      <table  >
         <thead>
          <tr>
            <th className="text-left">Name of Student</th>
            <th>Level</th>
            <th>Field of Study</th>
            <th>Options</th>
          </tr>
        </thead> 
        <tbody>
        {allStudents.map((elt, index) => {
            return (
              <tr className="" key={index}>
                <td  className="actions">{elt.name}</td>
                <td  className="actions text-center">{elt.levelStudent}</td>
                <td  className="actions text-center">{elt.fieldOfStudy}</td>
                <td className="actions options text-center">
                  <Link className="btt violet"  to={"/students/" + elt._id}>
                     <ion-icon name="document-text-outline"></ion-icon>
                  </Link> &nbsp;
                  <Link className="btt"  to={"/students/edit/" + elt._id}>
                     <ion-icon name="create-outline"></ion-icon>
                  </Link> &nbsp;
                  <Link className="btt orange"  to="">
                    <ion-icon name="trash-outline" onClick={() => deleteStudent(elt._id)}></ion-icon>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};



export default StudentTable;



























