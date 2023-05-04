import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Card from "@mui/material/Card";
import TableContainer from "@mui/material/TableContainer";
// import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";

import {
    Button,
    Form,
    Space,
    Table,
    Tag,
    Modal,
    Input,
    Select,
    DatePicker,
    Upload,
    message,
    Popconfirm,
} from "antd";

import { TiUserDeleteOutline } from "react-icons/ti";
import { RiEdit2Line } from "react-icons/ri";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import { withPromiseAndDispatch } from "helpers";
import { getListUsersAsync } from "redux/users/users.action";
import { getListUserRoleAsync } from "redux/user-role/user-role.action";
import { getRoleNameById } from "helpers/common";

import { Author } from "./data/authorsTableData";
import no_image_male from "assets/images/no_image_male.jpg";
import { Col, Label, Row } from "reactstrap";
import { role_colors } from "constants/color/roles";
import { addNewUserAsync } from "redux/users/users.action";

import { deleteUserAsync } from "redux/users/users.action";
import { editUserAsync } from "redux/users/users.action";

// dayjs.extend(customParseFormat);
const dateFormat = "DD-MM-YYYY";

const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
    const color = role_colors[value];
    return (
        <Tag
            color={color}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{
                marginRight: 3,
            }}
        >
            {label}
        </Tag>
    );
};

const UserPage = () => {
    const [formUser] = Form.useForm();

    const dispatch = useDispatch();
    const [dataTable, setDataTable] = React.useState([]);
    const [loadingTable, setLoadingTable] = React.useState(false);

    const [imageUploadUrl, setImageUploadUrl] = React.useState("");
    const [loadingUpload, setLoadingUpload] = React.useState(false);

    const [isModalEditUserOpen, setIsModalEditUserOpen] = useState(false);
    const [isModalCreateUserOpen, setIsModalCreateUserOpen] = useState(false);

    const [dob, setDob] = React.useState("");

    const [optionUserRoles, setOptionUserRoles] = React.useState([]);

    let listUsers = useSelector((state) => state.usersReducer.list);
    const userRoles = useSelector((state) => state.userRoleReducer?.list ?? []);

    const _getRoles = useCallback(
        (ctx) => withPromiseAndDispatch(getListUserRoleAsync, ctx, dispatch),
        [dispatch]
    );
    const _getListUsersAsync = useCallback(
        (ctx) => withPromiseAndDispatch(getListUsersAsync, ctx, dispatch),
        [dispatch]
    );
    const _addNewUser = useCallback(
        (ctx) => withPromiseAndDispatch(addNewUserAsync, ctx, dispatch),
        [dispatch]
    );
    const _deleteUser = useCallback(
        (ctx) => withPromiseAndDispatch(deleteUserAsync, ctx, dispatch),
        [dispatch]
    );
    const _editUser = useCallback(
        (ctx) => withPromiseAndDispatch(editUserAsync, ctx, dispatch),
        [dispatch]
    );

    React.useEffect(() => {
        _getListUsersAsync();
        _getRoles();
        return () => {};
    }, []);

    React.useEffect(() => {
        setLoadingTable(true);
        const _users = listUsers?.map((user) => ({
            key: user.id,
            uid: user.id,
            username: user.username,
            email: user.email,
            fullname: user.fullname,
            avatar: user.avatar,
            dob: user.dob, //.slice(0, 10),
            created_time: user.created_time,
            roles: user.role_ids.map((role_id) => getRoleNameById(role_id, userRoles)),
        }));

        setDataTable(_users);

        const _options = userRoles.map((role) => ({
            label: role.role_name,
            value: role.role_name,
            color: role_colors[role.role_name],
        }));
        setOptionUserRoles(_options);

        setLoadingTable(false);
    }, [listUsers, userRoles]);

    const columns = [
        {
            title: "Full Name",
            dataIndex: "fullname",
            key: "fullname",
            render: (_, record) => (
                <Link to={`/user/detail?uid=${record.uid}`}>
                    <Author
                        image={record.avatar || no_image_male}
                        name={record.fullname}
                        email={record.email}
                    />
                </Link>
            ),
        },
        {
            title: "Dob",
            dataIndex: "dob",
            key: "dob",
        },
        {
            title: "Roles",
            dataIndex: "roles",
            key: "roles",
            render: (_, { roles }) =>
                roles?.map((role) => <Tag color={role_colors[role]}>{role}</Tag>),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <RiEdit2Line
                        color="pink"
                        style={{
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            formUser.setFieldsValue(record);
                            showModalEditUser();
                        }}
                    />
                    <Popconfirm
                        placement="top"
                        title="Are you sure to delete this user?"
                        description={`Delete ${record.fullname}`}
                        onConfirm={()=>{
                            handleDeleteAccount(record);
                            message.info("Delete success");
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <TiUserDeleteOutline
                            color="red"
                            style={{
                                cursor: "pointer",
                            }}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // Handle delete user
    const handleDeleteAccount = async (record) => {
        // call api
        try {
            const uid = record.uid;
            const status = await _deleteUser({ uid });
            _getListUsersAsync();
        } catch (err) {
            console.log("delete fail");
        }
    };

    // Handle Modal for Edit User
    const showModalEditUser = async () => {
        setIsModalEditUserOpen(true);
    };
    const handleOkModalEditUser = async () => {
        try {
            setIsModalEditUserOpen(false);
            // api edit user
            const formValues = formUser.getFieldsValue();
            const result = await _editUser(formValues);
            formUser.resetFields();
            _getListUsersAsync();
        } catch (err) {
            console.log("erro", err)
        }
    };
    const handleCancelModalEditUser = () => {
        setIsModalEditUserOpen(false);
        formUser.resetFields();
    };

    // Handle Modal for Create User
    const showModalCreateUser = async () => {
        setIsModalCreateUserOpen(true);
    };
    const handleOkModalCreateUser = async () => {
        setIsModalCreateUserOpen(false);
        const formValues = formUser.getFieldsValue();
        Object.keys(formValues).forEach((key) => {
            if (formValues[key] === undefined || formValues[key] === null) {
                formValues[key] = "";
            }
        });
        formValues["dob"] = dob;
        try {
            // api for create user
            const result = await _addNewUser(formValues);
        } catch (err) {
            console.log('error: ', err);
        }
        formUser.resetFields();
        _getListUsersAsync();
    };
    const handleCancelModalCreateUser = () => {
        setIsModalCreateUserOpen(false);
        formUser.resetFields();
    };

    // Dob
    const onSelectDob = (date, dateString) => {
        console.log(date, dateString);
        setDob(dateString);
    };

    // Upload Image
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("You can only upload JPG/PNG file!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Image must smaller than 2MB!");
        }
        return isJpgOrPng && isLt2M;
    };
    const handleChangeUpload = (info) => {
        if (info.file.status === "uploading") {
            setLoadingUpload(true);
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoadingUpload(false);
                setImageUploadUrl(url);
            });
        }
    };

    const uploadButton = (
        <div>
            {loadingUpload ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    return (
        <>
            <Card style={{ top: 120 }}>
                <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                    <SoftTypography variant="h6">User table</SoftTypography>
                    <Button type="primary" onClick={showModalCreateUser}>
                        Add User
                    </Button>
                    <Modal
                        title="Create New User"
                        open={isModalCreateUserOpen}
                        onOk={handleOkModalCreateUser}
                        onCancel={handleCancelModalCreateUser}
                        width="50vw"
                    >
                        <Form form={formUser}>
                            <Row>
                                <Col sm={2}>
                                    <Form.Item
                                        name="avatar"
                                        getValueFromEvent={(e) => {
                                            if (Array.isArray(e)) {
                                                return e;
                                            }
                                            return e?.fileList;
                                        }}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    >
                                        <Upload
                                            key="avatar"
                                            name="avatar"
                                            listType="picture-circle"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            action="/abc_upload"
                                            beforeUpload={beforeUpload}
                                            onChange={handleChangeUpload}
                                            style={{
                                                width: "100%",
                                            }}
                                        >
                                            {imageUploadUrl ? (
                                                <img
                                                    src={imageUploadUrl}
                                                    alt="avatar"
                                                    style={{
                                                        width: "100%",
                                                    }}
                                                />
                                            ) : (
                                                uploadButton
                                            )}
                                        </Upload>
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col sm={2}>
                                            <Label>Username</Label>
                                        </Col>
                                        <Col>
                                            <Form.Item name="username">
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={2}>
                                            <Label>Password</Label>
                                        </Col>
                                        <Col>
                                            <Form.Item name="password">
                                                <Input type="password" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={2}>
                                            <Label>Full Name</Label>
                                        </Col>
                                        <Col>
                                            <Form.Item name="fullname">
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={2}>
                                            <Label>Email</Label>
                                        </Col>
                                        <Col>
                                            <Form.Item name="email">
                                                <Input type="email" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={2}>
                                            <Label>Date of Birth</Label>
                                        </Col>
                                        <Col>
                                            <Form.Item name="dob">
                                                {/* <DatePicker
                                                    id="dob_date"
                                                    format={dateFormat}
                                                    onChange={onSelectDob}
                                                /> */}
                                                <Input placeholder="01-01-1945"/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={2}>
                                            <Label>Roles</Label>
                                        </Col>
                                        <Col>
                                            <Form.Item name="roles">
                                                <Select
                                                    mode="multiple"
                                                    showArrow
                                                    tagRender={tagRender}
                                                    options={optionUserRoles}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
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
                    <TableContainer>
                        <Table columns={columns} dataSource={dataTable} loading={loadingTable} />
                    </TableContainer>
                </SoftBox>
            </Card>

            <Modal
                title="Edit User"
                open={isModalEditUserOpen}
                onOk={handleOkModalEditUser}
                onCancel={handleCancelModalEditUser}
            >
                <Form form={formUser}>
                    <Row>
                        <Col>
                            <Label>User ID</Label>
                        </Col>
                        <Col>
                            <Form.Item name="uid">
                                <Input disabled/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label>Username</Label>
                        </Col>
                        <Col>
                            <Form.Item name="username">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label>Email</Label>
                        </Col>
                        <Col>
                            <Form.Item name="email">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col>
                            <Label>Full Name</Label>
                        </Col>
                        <Col>
                            <Form.Item name="fullname">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label>Date of Birth</Label>
                        </Col>
                        <Col>
                            <Form.Item name="dob">
                                {/* <DatePicker
                                    id="dob_date"
                                    format={dateFormat}
                                    defaultValue={dayjs('', dateFormat)}
                                    onChange={onSelectDob} 
                                /> */}
                                <Input placeholder="01-01-1945"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label>Roles</Label>
                        </Col>
                        <Col>
                            <Form.Item name="roles">
                                <Select
                                    mode="multiple"
                                    showArrow
                                    tagRender={tagRender}
                                    options={optionUserRoles}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
export default UserPage;
