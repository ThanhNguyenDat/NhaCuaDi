import { Link } from "react-router-dom";
import { Button, Space, Tag } from "antd";

import { Author } from "./authorsTableData";
import no_image_male from "assets/images/no_image_male.jpg";

export const columns = [
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
        title: "Role",
        dataIndex: "role",
        key: "role",
        render: (_, { roles }) => roles?.map((role) => <Tag color="blue">{role}</Tag>),
    },

    {
        title: "Action",
        key: "action",
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <Button
                    type="primary"
                    onClick={() => {
                        console.log("record: ", record);
                    }}
                >
                    Delete
                </Button>
            </Space>
        ),
    },
];
