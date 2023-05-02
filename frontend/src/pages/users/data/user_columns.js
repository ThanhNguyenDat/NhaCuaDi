import { Link } from "react-router-dom";
import { Button, Space, Tag } from "antd";

import { Author } from "./authorsTableData";
const thanhNe =
    "https://scontent.fsgn9-1.fna.fbcdn.net/v/t39.30808-6/272858595_1763530754038181_7657492639481153746_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=TCPyawhzy6gAX9Pn8yw&_nc_ht=scontent.fsgn9-1.fna&oh=00_AfC3DgDr-NxL57yxlS3QRy1kwNDjjQlb6JA_euRxQvXZPA&oe=64548B82";
export const columns = [
    {
        title: "Full Name",
        dataIndex: "full_name",
        key: "full_name",
        // render: (text) => <a>{text}</a>,
        render: (_, record) => (
            <Link to={`/user/detail?uid=${record.uid}`}>
                <Author image={thanhNe} name={record.full_name} email={record.email} />
            </Link>
        ),
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age",
    },
    {
        title: "Role",
        dataIndex: "role",
        key: "role",
        render: (_, { roles }) => roles.map((role) => <Tag color="blue">{role}</Tag>),
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
