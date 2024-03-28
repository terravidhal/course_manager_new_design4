import React from 'react';
import './DropdownComp.css';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';




const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};


const DropdownComp = (props) => {
  const {items} = props;

  return (
    <div className="DropdownComp">
      <Dropdown
       menu={{
         items,
         onClick,
       }}
     >
       <a onClick={(e) => e.preventDefault()}>
         <Space>
           {/* Hover me, Click menu item */}
           <DownOutlined />
         </Space>
       </a>
     </Dropdown>
    </div>
  );
};

DropdownComp.propTypes = {};

DropdownComp.defaultProps = {};

export default DropdownComp;
