import { Avatar, Rate, Space, Table, Typography } from "antd";
import React, { useState, useEffect } from "react";
import "./CourseTable.css";
import { Link } from "react-router-dom";



 
const CourseTable = (props) => {
  const userObjs = JSON.parse(localStorage.getItem('USER_OBJ')) || {};
  const userObjRole = userObjs.role || 'default';
  const userObjIsInstructor = userObjs.isInstructor || '';
  const userObjsId = userObjs._id || 'default';
  
  console.log("userObjRole+++++++++", userObjRole);
  console.log("userObjIsInstructor+++++++++", userObjIsInstructor);
  console.log("userObjsId+++++++++", userObjsId);

  const { allCourses, deleteCourse, loading } = props;

/* const getCustomers = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};


  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      console.log('res', res);
      setDataSource(res.users);
      setLoading(false);
    });
  }, []);  */

 

  return (
    <div className="CourseTable">
        {/* <table>
         <thead>
          <tr>
            <th className="text-left">Name of Course</th>
            <th>Level</th>
            <th>field</th>
            <th className="text-left">Instructor</th>
            <th className="text-center">Status</th>
            <th className="text-center">Students</th>
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
                <td  className="actions instruct">
                 <ul>
                    <Link className=""  to={"/studentsByCourse/" + elt._id}>
                    <ion-icon name="eye-outline"></ion-icon>
                     </Link>&nbsp;
                  </ul> 
                </td>
                <td className="actions text-center options">
                  <Link className="btt violet"  to={"/courses/" + elt._id}>
                    <ion-icon name="document-text-outline"></ion-icon>
                  </Link> &nbsp;
                  <Link className="btt"  to={"/courses/edit/" + elt._id}>
                    <ion-icon name="create-outline"></ion-icon>
                  </Link> &nbsp;
                  <Link className="btt"  to={"/courses/addStudents/" + elt._id}>
                     <ion-icon name="person-add-outline"></ion-icon>
                  </Link> &nbsp;
                  <Link className="btt orange"  to="">
                    <ion-icon name="trash-outline" onClick={() => deleteCourse(elt._id)}></ion-icon>
                  </Link> 
                </td>
              </tr>
            );
          })} 
        </tbody>
      </table>   */}
      <Table
        loading={loading}
        columns={[
          {
            title: "Name of Course",
            dataIndex: "name",
          },
          {
            title: "Level",
            dataIndex: "level",
          },
          {
            title: "Field",
            dataIndex: "field",
          },
          {
            title: "Instructor",
            dataIndex: "instructor",
            render: (instructor) => {
              return (
                 userObjsId === instructor ? "Me" :
                     <Link className="btt blue"  to={"/instructorByCourse/" + instructor}>
                       <ion-icon name="eye-outline"></ion-icon>
                     </Link>
              );
            },
          },
          {
            title: "Status",
            dataIndex: "status",
            render: (status) => {
              return (
                <button
                      className={`${
                        status === "pending"
                          ? "status inProgress"
                          : "status pending"
                      }`}
                    > {status}</button>
              );
            },
          },
          {
            title: "Students",
            dataIndex: "_id",
            render: (_id) => {
              return (
                <Link className=""  to={"/studentsByCourse/" + _id}>
                <ion-icon name="eye-outline"></ion-icon>
                 </Link>
              );
            },
          },
          {
            title: "Options",
            dataIndex: "_id",
            render: (_id) => {
              return (
                <>
                 <Link className="btt violet"  to={"/courses/" + _id}>
                    <ion-icon name="document-text-outline"></ion-icon>
                  </Link> 
                  <Link className="btt"  to={"/courses/edit/" + _id}>
                    <ion-icon name="create-outline"></ion-icon>
                  </Link>
                  <Link className="btt"  to={"/courses/addStudents/" + _id}>
                     <ion-icon name="person-add-outline"></ion-icon>
                  </Link> 
                  <Link className="btt orange"  to="">
                    <ion-icon name="trash-outline" onClick={() => deleteCourse(_id)}></ion-icon>
                  </Link> 
                </>
              );
            },
          },
        ]}
        dataSource={allCourses}
        pagination={{
          pageSize: 3,
        }}
      ></Table>
    </div>
  );
};


export default CourseTable;













