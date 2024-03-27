import React, { useState, useEffect, useRef } from "react";
import { Avatar, Rate, Space, Table, Typography, Button, Input, Tag  } from "antd";
import "./CourseTableStudent.css";
import { Link } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { updateCourseStatuses } from "../../utiles/utiles";
import axios from "axios";



const CourseTableStudent = (props) => {
  // variables datatables
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const [loading, setLoading] = useState(false);
  const [allCourses, setAllCourses] = useState([]);

  const userObjs = JSON.parse(localStorage.getItem('USER_OBJ')) || {};
  const userObjRole = userObjs.role || 'default';
  const userObjIsInstructor = userObjs.isInstructor || '';
  const userObjsId = userObjs._id || 'default';
  
  

    // check and update courses status
    useEffect(() => {
      setLoading(true);
      const GetAllCoursesByStudent = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/courses/student/" + userObjsId,
            { withCredentials: true }
          );
          const courses = response.data.coursesByStudent;
  
          // Call the new function to update statuses
          const updatedCourses = updateCourseStatuses(courses);
  
          setAllCourses(updatedCourses);
          setLoading(false);
        } catch (err) {
          console.error(err);
        }
      };
  
      GetAllCoursesByStudent();
    }, []);
  

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
    <div className="CourseTableStudent">
        <div class="cardBox">
            <div class="card">
              <div>
                <div class="numbers">{allCourses.length}</div>
                <div class="cardName">Courses</div>
              </div>
              <div class="iconBx">
                 <ion-icon name="book-outline"></ion-icon>
              </div>
            </div>
        </div>
        <div class="recentOrders">
            <div class="cardHeader">
              <h2>Recent Courses</h2>
            </div>
            <div className="CourseTableStudent">
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
                     <Link  className="btt blue"  to={"/student-dashboard/instructorByCourse/" + instructor}>
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
            title: "Options",
            dataIndex: "_id",
            render: (_id) => {
              return (
                <>
                 <Link className="btt violet"  to={"/student-dashboard/courses/" + _id}>
                    <ion-icon name="document-text-outline"></ion-icon>
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
    </div>
  );
};


export default CourseTableStudent;














