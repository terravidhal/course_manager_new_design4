/** */
import { Avatar, Rate, Space, Table, Typography, Button, Input, Tag  } from "antd";
import React, { useState, useEffect, useRef } from "react";
/** */

import './InstructorTable.css';
import { Link } from "react-router-dom";


/** */
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import axios from "axios";


const InstructorTable = (props) => {
  //const { allInstructors, deleteInstructor, loading3 } = props;
  const [allInstructors, setAllInstructors] = useState([]);
  const [loading3, setLoading3] = useState(false);

   // get all instructors
   useEffect(() => {
    setLoading3(true);
    axios
      .get("http://localhost:8000/api/instructors", { withCredentials: true })
      .then((res) => {
        setAllInstructors(res.data || []);
        setLoading3(false);
        console.log("r+++++++", res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // delete One specific instructor
  const deleteInstructor = (instructorId) => {
    axios
      .delete("http://localhost:8000/api/instructors/" + instructorId, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.result);
        setAllInstructors(
          allInstructors.filter((instructor) => instructor._id !== instructorId)
        );
      })
      .catch((err) => console.log(err));
  };



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
    <div class="recentOrders">
        <div class="cardHeader">
            <h2>Recent Instructors</h2>
            <Link class="blue-color" to="/admin-dashboard/instructors/new">
                 +Add
            </Link>
        </div>
        <div className="InstructorTable">
    

<Table
        loading={loading3}
        columns={[
          {
            title: "Photo",
            dataIndex: "image",
            render: (image) => {
                return ( image === "" ?
                   <Avatar src="/assets/images/blank-profile.png"  />
                : 
                 <Avatar src={`http://localhost:8000/${image}`} /> );
               
            },
          },
          {
            title: "Name of Instructor",
            dataIndex: "name",
            key: 'name',
            ...getColumnSearchProps('name'),
          },
          {
            title: "Skills",
            dataIndex: "skills",
            key: 'skills',
            ...getColumnSearchProps('skills'),
          },
          {
            title: "Options",
            dataIndex: "_id",
            render: (_id) => {
              return (
                <>
                 <Link className="btt violet"  to={"/admin-dashboard/instructors/" + _id}>
                      <ion-icon name="document-text-outline"></ion-icon>
                  </Link> &nbsp;
                  <Link className="btt orange"  to={"/admin-dashboard/instructors/edit/" + _id}>
                       <ion-icon name="create-outline"></ion-icon>
                  </Link> &nbsp;
                  <Link className="btt orange"  to="">
                    <ion-icon name="trash-outline" onClick={() => deleteInstructor(_id)}></ion-icon>
                  </Link>
                </>
              );
            },
          },
        ]}
        dataSource={allInstructors}
        pagination={{
          pageSize: 3,
        }}
      ></Table>
        </div>
    </div>
  );
};


export default InstructorTable;







































