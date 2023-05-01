// import React from 'react';
// import PropTypes from 'prop-types';
// // import Table from 'components/Tables/Table';
// // import data from './data'
// import Table from 'antd';

// import authorsTableData from './data/authorsTableData';
// const UserPage = (props) => {
//     const { columns, rows } = authorsTableData;

//     return (
//         <div>
//             <Table columns={columns} rows={rows}/>

//         </div>
//     );
// };

// UserPage.propTypes = {

// };

// export default UserPage;

import React, { useState } from "react";
import { Button, Form, Space, Table, Tag, Modal, Input, Checkbox } from "antd";
import team2 from "../../assets/images/team-2.jpg";
import { Author } from "./data/authorsTableData";
import { useForm } from "antd/es/form/Form";
const columns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        // render: (text) => <a>{text}</a>,
        render: () => <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age",
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
    },
    {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? "geekblue" : "green";
                    if (tag === "loser") {
                        color = "volcano";
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: "Action",
        key: "action",
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <button
                    onClick={() => {
                        console.log("record: ", record);
                    }}
                >
                    Delete
                </button>
            </Space>
        ),
    },
];
const data = [
    {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"],
    },
    {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"],
    },
    {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sydney No. 1 Lake Park",
        tags: ["cool", "teacher"],
    },
];
const UserPage = () => {
    return (
        <>
            <Table columns={columns} dataSource={data} />
        </>
    );
};
export default UserPage;
