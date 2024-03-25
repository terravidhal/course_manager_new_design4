/** */
import { Avatar, Rate, Space, Table, Typography, Button, Input, Tag  } from "antd";
import React, { useState, useEffect, useRef } from "react";
/** */

import './StudentTable.css'
import { Link } from "react-router-dom";

/** */
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';




const StudentTable = (props) => {
  const { allStudents, deleteStudent, loading2 } = props;

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
           <h2>Recent Students</h2>
           <Link class="blue-color" to="/students/new">
                 +Add
           </Link>
        </div>
        <div className="StudentTable">
      {/* <table  >
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
      </table> */}


<Table
        loading={loading2}
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
            title: "Name of Student",
            dataIndex: "name",
            key: 'name',
            ...getColumnSearchProps('name'),
          },
          {
            title: "Level",
            dataIndex: "levelStudent",
            key: 'levelStudent',
            ...getColumnSearchProps('levelStudent'),
          },
          {
            title: "Field of Study",
            dataIndex: "fieldOfStudy",
            key: 'fieldOfStudy',
            ...getColumnSearchProps('fieldOfStudy'),
          },
          {
            title: "Options",
            dataIndex: "_id",
            render: (_id) => {
              return (
                <>
                 <Link className="btt violet"  to={"/admin-dashboard/students/" + _id}>
                     <ion-icon name="document-text-outline"></ion-icon>
                  </Link> &nbsp;
                  <Link className="btt"  to={"/admin-dashboard/students/edit/" + _id}>
                     <ion-icon name="create-outline"></ion-icon>
                  </Link> &nbsp;
                  <Link className="btt orange"  to="">
                    <ion-icon name="trash-outline" onClick={() => deleteStudent(_id)}></ion-icon>
                  </Link>
                </>
              );
            },
          },
        ]}
        dataSource={allStudents}
        pagination={{
          pageSize: 2,
        }}
      ></Table>
        </div>
    </div>
  );
};



export default StudentTable;



























