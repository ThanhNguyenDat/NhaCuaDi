import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { mockDataStudent } from "data/mockData";
import { useLocation, useParams } from "react-router-dom";

import { getRoutePath } from "helpers/common";
import { Box, Divider, Modal, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { tokens } from "theme";
import Image from "components/Image";
import "./styles.scss";
import { CameraAlt } from "@mui/icons-material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import StudentTabs from "components/Student/StudentTabs";
import Introduction from "components/Introduction";
import ImageWithOutLight from "components/Image/ImageWithOutLight";
import { DataGrid } from "@mui/x-data-grid";

const UserLayout = ({ children }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const params = useParams();

    const uid = params.uid || 0;

    const [currentStudent, setCurrentStudent] = useState({});

    const [isOpenModalAddLesson, setIsOpenModalAddLesson] = React.useState(false);
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
        <div className="detail-student-page">
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

            <Modal
                open={isOpenModalAddLesson}
                onClose={handleCloseModalAddLesson}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "10%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "80vw",
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add More Lesson
                    </Typography>

                    <DataGrid columns={[]} rows={[]} />
                </Box>
            </Modal>
        </div>
    ) : (
        <div className="detail-student-page">No data in student</div>
    );
};

UserLayout.propTypes = {};

export default UserLayout;
