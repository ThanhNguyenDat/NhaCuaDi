import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { Box, LinearProgress, Modal, Typography, useTheme } from "@mui/material";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";

import ReactECharts from "components/Charts/ReactECharts";
import { mockDataLesson } from "data/mockData";

import routes from "config/routes";
import { tokens } from "theme";
import RowUserLesson from "components/lessons/RowUserLesson";
const AboutStudentsLessonPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const params = useParams();
    const [selectedRow, setSelectedRow] = useState(null);

    const lesson_id = useMemo(() => params.lesson_id || 0, []);

    const userColumns = [
        { field: "uid", headerName: "UID", flex: 0.5 },
        {
            field: "fullname",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
            renderCell: (cellValues) => {
                return (
                    <Link
                        to={`${routes.aboutDetailStudentLesson
                            .replace(":lesson_id", lesson_id)
                            .replace(":uid", cellValues.row.uid)}`}
                        style={{
                            color: colors.blueAccent[300],
                        }}
                    >
                        {cellValues.row.fullname}
                    </Link>
                );
            },
        },
        {
            field: "phone",
            headerName: "Phone Number",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "city",
            headerName: "City",
            flex: 1,
        },
        {
            field: "progress",
            headerName: "Progress",
            flex: 1,
            cellClassName: "progress-column--cell",
            renderCell: (cellValues) => {
                const progress = cellValues.row.progress;
                return (
                    <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
                        <Box sx={{ width: "100%", mr: 1 }}>
                            <LinearProgress
                                variant="determinate"
                                value={progress}
                                color="secondary"
                            />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                            <Typography variant="body2" color="text.secondary">{`${Math.round(
                                progress
                            )}%`}</Typography>
                        </Box>
                    </Box>
                );
            },
        },
        {
            field: "actions",
            type: "actions",
            flex: 1,
            cellClassName: "actions-column--cell",
            getActions: (params) => {
                if (selectedRow === params.id) {
                    return [
                        <GridActionsCellItem
                            icon={<PersonRemoveOutlinedIcon className="delete-icon" />}
                            label="Delete"
                            onClick={() => {
                                console.log(params);
                            }}
                            className="icon"
                        />,
                    ];
                } else {
                    return [];
                }
            },
        },
    ];
    const [userRows, setUserRows] = useState([]);

    const handleHoverRow = (event) => {
        setSelectedRow(Number(event.currentTarget.getAttribute("data-id")));
    };

    useEffect(() => {
        const currentLesson = mockDataLesson.find(
            (lesson) => lesson.id.toString() === lesson_id.toString()
        );
        let listUser = currentLesson.users;
        listUser = listUser.map((user) => ({
            ...user,
            id: user.uid,
        }));
        setUserRows(listUser);
    }, []);

    return (
        <div className="about-students-lesson-page">
            <div className="control-bar">
                <div className="filter-bar">Filter bar</div>
                <div className="action-icons"></div>
            </div>
            <Box
                className="table-user"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.blueAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.pinkAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.pinkAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.blueAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid
                    columns={userColumns}
                    rows={userRows}
                    slotProps={{
                        row: {
                            style: { cursor: "context-menu" },
                            onMouseEnter: handleHoverRow,
                        },
                    }}
                />
            </Box>

            {/* <div className="users-lesson">
                {userRows.map(user => (
                    <RowUserLesson {...user}/>
                ))}    
            </div>
            
            <div className="full-user"></div> */}
        </div>
    );
};

AboutStudentsLessonPage.propTypes = {};

export default AboutStudentsLessonPage;
