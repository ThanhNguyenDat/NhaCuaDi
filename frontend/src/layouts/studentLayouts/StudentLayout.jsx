import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { mockDataStudent } from "data/mockData";
import { useLocation, useParams } from "react-router-dom";

import { Box, Divider, Modal, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { tokens } from "theme";

import "./styles.scss";
import { CameraAlt } from "@mui/icons-material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import StudentTabs from "components/students/StudentTabs";
import ImageWithOutLight from "components/Image/ImageWithOutLight";
import { DataGrid } from "@mui/x-data-grid";
import ModalAddLessonStudent from "components/students/ModalAddLessonStudent";

const StudentLayout = ({ children }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const params = useParams();

    const uid = params.uid || 0;

    const [currentStudent, setCurrentStudent] = useState({});

    const [isOpenModalAddLesson, setIsOpenModalAddLesson] = useState(false);
    const handleOpenModalAddLesson = () => setIsOpenModalAddLesson(true);
    const handleCloseModalAddLesson = () => setIsOpenModalAddLesson(false);

    useEffect(() => {
        // const url = new URL(window.location.href);
        // const params = new URLSearchParams(url.search);

        if (uid) {
            const currentStudent = mockDataStudent.find(
                (student) => student.id.toString() === uid.toString()
            );
            setCurrentStudent(currentStudent);
        }
    }, []);

    const handleAddLesson = () => {
        handleOpenModalAddLesson();
    };

    return currentStudent ? (
        <div className="user-layout">
            <div className="header">
                <div className="cover-photo"></div>
                <div className="edit-student">
                    <div className="avatar">
                        <ImageWithOutLight
                            src={currentStudent.avatar}
                            className="image"
                            onClick={() => {
                                alert("show anh");
                            }}
                        />
                        <CameraAlt
                            className="upload-icon"
                            style={{
                                boxShadow: `rgba(221, 216, 216, 0.16) 0px 1px 4px, ${colors.grey[200]} 0px 0px 0px 2px`,
                            }}
                            onClick={() => {
                                alert("upload image");
                            }}
                        />
                    </div>

                    <div className="contact-student">
                        <Typography className="name">{currentStudent.fullname}</Typography>
                    </div>

                    <div className="action-icons">
                        <div
                            className="add-lesson-action"
                            style={{
                                background: `${colors.blueAccent[600]}`,
                            }}
                            onClick={() => {
                                handleAddLesson();
                            }}
                        >
                            <AddOutlinedIcon /> Add To Lesson
                        </div>
                        <div
                            className="edit-student-action"
                            style={{
                                background: `${colors.grey[900]}`,
                            }}
                            onClick={() => {
                                alert("edituser");
                            }}
                        >
                            <ModeEditOutlinedIcon /> Edit Student
                        </div>
                    </div>
                </div>
            </div>
            <Divider
                style={{
                    background: colors.grey[100],
                    marginTop: "10px",
                    marginBottom: "10px",
                }}
            />
            <StudentTabs uid={uid} />
            <div className="content">{children}</div>
            <ModalAddLessonStudent
                isOpenModalAddLesson={isOpenModalAddLesson}
                handleCloseModalAddLesson={handleCloseModalAddLesson}
            />
        </div>
    ) : (
        <div className="detail-student-page">No data in student</div>
    );
};

StudentLayout.propTypes = {};

export default StudentLayout;
