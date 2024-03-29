import React, { useState, useEffect, useRef } from "react";
import { Avatar, Rate, Space, Table, Typography, Button, Input, Tag  } from "antd";
import "./CourseTableInstructor.css";
import { Link } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import axios from "axios";
import { updateCourseStatuses } from "../../utiles/utiles";
import ConfirmDeletePopup from "../ConfirmDeletePopup/ConfirmDeletePopup";


const CourseTableInstructor = (props) => {
  const [loading, setLoading] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [idCoursess, setIdCoursess] = useState('');
  // variables dataTables
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
 
  const userObjs = JSON.parse(localStorage.getItem('USER_OBJ')) || {};
  const userObjsRole = userObjs.role || 'default';
  const userObjIsInstructor = userObjs.isInstructor || '';
  const userObjsId = userObjs._id || 'default';

  


  // check and update courses status
  useEffect(() => {
    setLoading(true);
    const GetAllCoursesByInstructor = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/courses/instructor/" + userObjsId,
          { withCredentials: true }
        );
        const courses = response.data.coursesByInstructor;
        // Call the new function to update statuses
        const updatedCourses = updateCourseStatuses(courses);
        setAllCourses(updatedCourses);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    GetAllCoursesByInstructor();
  }, []);

 
  const displayPopupConfirm = (id) => {
    setIdCoursess(id);
    const popup = document.querySelector('.ConfirmDeletePopup');
    popup.classList.toggle('switch');
 };

  


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
  

  return (
    <div class="recentOrders">
      <div class="cardHeader">
       <h2>Recent Courses</h2>
       <Link className="blue-color" to="/instructor-dashboard/courses/new">
         +Add
       </Link>
       <ConfirmDeletePopup isitems="course" allItems={allCourses} 
        setAllItems={setAllCourses} 
        id={idCoursess}/>
      </div>
       <div className="CourseTableInstructor">
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
                     <Link  className="btt blue"  to={"/instructor-dashboard/instructorByCourse/" + instructor}>
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
                <Link className=""  to={"/instructor-dashboard/studentsByCourse/" + _id}>
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
                 <Link className="btt violet"  to={"/instructor-dashboard/courses/" + _id}>
                    <ion-icon name="document-text-outline"></ion-icon>
                  </Link> 
                  <Link className="btt"  to={"/instructor-dashboard/courses/edit/" + _id}>
                    <ion-icon name="create-outline"></ion-icon>
                  </Link>
                  <Link className="btt"  to={"/instructor-dashboard/courses/addStudents/" + _id}>
                     <ion-icon name="person-add-outline"></ion-icon>
                  </Link> 
                  <Link className="btt orange"  to="">
                    <ion-icon name="trash-outline" onClick={() => displayPopupConfirm(_id)}></ion-icon>
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
    </div>
  );
};


export default CourseTableInstructor;














