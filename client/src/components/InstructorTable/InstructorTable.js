import React from "react";
import './InstructorTable.css';
import { Link } from "react-router-dom";



const InstructorTable = (props) => {
  const { allInstructors, deleteInstructor } = props;


  return (
    <div className="InstructorTable">
      <table  >
         <thead>
          <tr>
            <th className="text-left">Name of Instructor</th>
            <th>Options</th>
          </tr>
        </thead> 
        <tbody>
        {allInstructors.map((elt, index) => {
            return (
              <tr className="" key={index}>
                <td  className="actions">{elt.name}</td>
                <td className="actions options text-center">
                  <Link className="btt violet"  to={"/instructors/" + elt._id}>
                      <ion-icon name="document-text-outline"></ion-icon>
                  </Link> &nbsp;
                  <Link className="btt orange"  to={"/instructors/edit/" + elt._id}>
                       <ion-icon name="create-outline"></ion-icon>
                  </Link> &nbsp;
                  <Link className="btt orange"  to="">
                    <ion-icon name="trash-outline" onClick={() => deleteInstructor(elt._id)}></ion-icon>
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


export default InstructorTable;







































