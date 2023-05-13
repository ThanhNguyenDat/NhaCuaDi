import { Progress } from "antd";

const BriefInforUser = ({ username, avatar, email }) => {
    return (
        <div className="cellWithImg">
            <img className="cellImg" src={avatar} alt="avatar" />
            <div className="cellInfo">
                <div className="cellName">{username}</div>
                <div className="cellEmail">{email}</div>
            </div>
        </div>
    );
};

export const userColumns = [
    {
        dataIndex: "id",
        title: "ID",
        width: "5%",
        render: (_, record) => <div className="cellWithId">{record.id}</div>,
    },
    {
        dataIndex: "user",
        title: "User",
        render: (_, record) => <div className="cellWithUser">{record.user}</div>,
    },
    {
        dataIndex: "progress",
        title: "Progress",
        render: (_, record) => <div className="cellWithProgress">
            <Progress percent={record.progress} strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068',
      }}/>
            </div>,
    },
    {
        dataIndex: "status",
        title: "Status",
        width: "20px",
        render: (_, record) => {
            return <div className={`cellWithStatus ${record.status}`}>{record.status}</div>;
        },
    },
];

export const userRows = [
    {
        id: 1,
        key: 1,
        user: <BriefInforUser username="Thanh" avatar="abc.jpg" email="snow@gmail.com" />,
        progress: 30,
        status: "active",
        email: "snow@gmail.com",
        age: 35,
    },
    {
        key: 2,
        id: 2,
        user: <BriefInforUser username="Thanh" avatar="abc.jpg" email="snow@gmail.com" />,
        progress: 50,
        status: "inactive",
        email: "snow@gmail.com",
        age: 35,
    },
    {
        key: 3,
        id: 3,
        user: <BriefInforUser username="Thanh" avatar="abc.jpg" email="snow@gmail.com" />,
        progress: 60,
        status: "inactive",
        email: "snow@gmail.com",
        age: 35,
    },
    {
        key: 4,
        id: 4,
        user: <BriefInforUser username="Thanh" avatar="abc.jpg" email="snow@gmail.com" />,
        progress: 80,
        status: "inactive",
        email: "snow@gmail.com",
        age: 35,
    },
    {
        key: 5,
        id: 5,
        user: <BriefInforUser username="Thanh" avatar="abc.jpg" email="snow@gmail.com" />,
        progress: 10,
        status: "inactive",
        email: "snow@gmail.com",
        age: 35,
    },
    {
        key: 6,
        id: 6,
        user: <BriefInforUser username="Thanh" avatar="abc.jpg" email="snow@gmail.com" />,
        progress: 20,
        status: "inactive",
        email: "snow@gmail.com",
        age: 35,
    },
    {
        key: 7,
        id: 7,
        user: <BriefInforUser username="Thanh" avatar="abc.jpg" email="snow@gmail.com" />,
        progress: 5,
        status: "inactive",
        email: "snow@gmail.com",
        age: 35,
    },
    {
        key: 8,
        id: 8,
        user: <BriefInforUser username="Thanh" avatar="abc.jpg" email="snow@gmail.com" />,
        progress: 100,
        status: "inactive",
        email: "snow@gmail.com",
        age: 35,
    },
];
