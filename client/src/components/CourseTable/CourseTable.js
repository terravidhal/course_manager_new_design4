/** */
import { Avatar, Rate, Space, Table, Typography, Button, Input, Tag  } from "antd";
import React, { useState, useEffect, useRef } from "react";
/** */
import "./CourseTable.css";
import { Link } from "react-router-dom";

/** */
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';


 
const CourseTable = (props) => {
  const userObjs = JSON.parse(localStorage.getItem('USER_OBJ')) || {};
  const userObjRole = userObjs.role || 'default';
  const userObjIsInstructor = userObjs.isInstructor || '';
  const userObjsId = userObjs._id || 'default';
  
  console.log("userObjRole+++++++++", userObjRole);
  console.log("userObjIsInstructor+++++++++", userObjIsInstructor);
  console.log("userObjsId+++++++++", userObjsId);

  const { allCourses, deleteCourse, loading } = props;



  //=======================================
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type=""
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
              backgroundColor: '#1d9187',
              color: 'white'
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            style={{
              color: '#1d9187',
            }}
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            style={{
              color: '#1d9187',
            }}
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  //=======================================

 

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
            key: 'name',
            ...getColumnSearchProps('name'),
          },
          {
            title: "Level",
            dataIndex: "level",
            key: 'level',
            ...getColumnSearchProps('level'),
          },
          {
            title: "Field",
            dataIndex: "field",
            key: 'field',
            ...getColumnSearchProps('field'),
          },
          {
            title: "Instructor",
            dataIndex: "instructor",
            render: (instructor) => {
              return (
                 userObjsId === instructor ? "Me" :
                     <Link  className="btt blue"  to={"/instructorByCourse/" + instructor}>
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
                <>
                    <Tag color={`${
                        status === "pending"
                          ? "geekblue"
                          : "volcano"
                      }`}>
                       {status}
                   </Tag>
                </>
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













