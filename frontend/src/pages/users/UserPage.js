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

import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import { Button, Form, Space, Table, Tag, Modal, Input, Checkbox } from "antd";
import { useForm } from "antd/es/form/Form";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useDispatch, useSelector } from "react-redux";

import { columns } from "./data/user_columns";
import { withPromiseAndDispatch } from "helpers";
import { getListUsersAsync } from "redux/users/users.action";

const data = [
    {
        key: "1",
        uid: 1,
        full_name: "John Brown",
        email: "johnBrown@gmail.com",
        age: 32,
        address: "New York No. 1 Lake Park",
        roles: ["nice", "developer"],
    },
    {
        key: "2",
        uid: 2,
        full_name: "Jim Green",
        email: "jimgreen@gmail.com",
        age: 42,
        address: "London No. 1 Lake Park",
        roles: ["loser"],
    },
    {
        key: "3",
        full_name: "Joe Black",
        email: "joeblack@gmail.com",
        age: 32,
        address: "Sydney No. 1 Lake Park",
        roles: ["cool", "teacher"],
    },
];

const reformatDataTable = (user) => ({
    key: "1",
    uid: 1,
    full_name: "John Brown",
    email: "johnBrown@gmail.com",
    age: 32,
    address: "New York No. 1 Lake Park",
    roles: ["nice", "developer"],
});

const UserPage = () => {
    const dispatch = useDispatch();
    
    const listUsers = useSelector((state) => {
        return state.usersReducer.list;
    });
    
    const _getListUsersAsync = useCallback(
        (ctx) => withPromiseAndDispatch(getListUsersAsync, ctx, dispatch),
        [dispatch]
    );
    
    React.useEffect(() => {
        _getListUsersAsync();
        return () => {}
        
    }, [])
    
    // Handle add new account
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const showModalCreateAccount = async () => {
        setIsModalOpen(true);
    };
    const handleOkModalCreateAccount = () => {
        setIsModalOpen(false);
    };
    const handleCancelModalCreateAccount = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Card style={{ top: 120 }}>
                <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                    <SoftTypography variant="h6">User table</SoftTypography>
                    <Button type="primary" onClick={showModalCreateAccount}>
                        Add User
                    </Button>
                    <Modal
                        title="Create New User"
                        open={isModalOpen}
                        onOk={handleOkModalCreateAccount}
                        onCancel={handleCancelModalCreateAccount}
                    >
                        alo
                    </Modal>
                </SoftBox>
                <SoftBox
                    sx={{
                        "& .MuiTableRow-root:not(:last-child)": {
                            "& td": {
                                borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                    `${borderWidth[1]} solid ${borderColor}`,
                            },
                        },
                    }}
                >
                    <Table columns={columns} dataSource={data} />
                </SoftBox>
            </Card>
        </>
    );
};
export default UserPage;
