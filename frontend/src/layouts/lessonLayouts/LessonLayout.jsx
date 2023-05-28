import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./styles.scss";
import { Divider, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { tokens } from "theme";
import { mockDataLesson } from "data/mockData";

import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import LessonLayoutTabs from "components/lessons/LessonLayoutTabs";
import { convertSecondsToHoursAndMinutes } from "helpers/common";
import ModalAddStudentLesson from "components/lessons/ModalAddStudentLesson";

const LessonLayout = ({ children }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const params = useParams();
    const lesson_id = params.lesson_id || 0;
    const [currentLesson, setCurrentLesson] = useState({});
    const [isOpenModalAddStudent, setIsOpenModalAddStudent] = useState(false);

    useEffect(() => {
        let currentLesson;
        if (lesson_id) {
            currentLesson = mockDataLesson.find(
                (lesson) => lesson.id.toString() === lesson_id.toString()
            );
        }
        setCurrentLesson(currentLesson);
    }, []);

    /*
        HANDLE ADD STUDENT TO THIS LESSON
    */
    const handleOpenModalAddStudent = () => setIsOpenModalAddStudent(true);
    const handleCloseModalAddStudent = () => setIsOpenModalAddStudent(false);
    const handleAddStudent = () => {
        handleOpenModalAddStudent();
    };

    return currentLesson ? (
        <div className="lesson-layout">
            <div className="header">
                <div className="information">
                    <div className="title">
                        <div
                            className="name"
                            style={{
                                color: colors.pinkAccent[500],
                            }}
                        >
                            Title:
                        </div>
                        <div
                            className="value"
                            style={{
                                color: colors.grey[300],
                            }}
                        >
                            {currentLesson.title}
                        </div>
                    </div>
                    <div className="certificate">
                        <div
                            className="name"
                            style={{
                                color: colors.pinkAccent[500],
                            }}
                        >
                            Certificate:
                        </div>
                        <div
                            className="value"
                            style={{
                                color: colors.grey[300],
                            }}
                        >
                            {currentLesson.certificate}
                        </div>
                    </div>
                    <div className="total-time">
                        <div
                            className="name"
                            style={{
                                color: colors.pinkAccent[500],
                            }}
                        >
                            Total time:
                        </div>
                        <div
                            className="value"
                            style={{
                                color: colors.grey[300],
                            }}
                        >
                            {convertSecondsToHoursAndMinutes(currentLesson.total_time).hours}h{" "}
                            {convertSecondsToHoursAndMinutes(currentLesson.total_time).minutes}min
                        </div>
                    </div>
                    <div className="parts">
                        <div
                            className="name"
                            style={{
                                color: colors.pinkAccent[500],
                            }}
                        >
                            Parts:
                        </div>
                        <div
                            className="value"
                            style={{
                                color: colors.grey[300],
                            }}
                        >
                            {currentLesson.parts}
                        </div>
                    </div>
                </div>
                <div className="control">
                    <div
                        className="add-student"
                        style={{
                            backgroundColor: colors.pinkAccent[100],
                            color: colors.grey[900],
                        }}
                        onClick={() => {
                            handleAddStudent();
                        }}
                    >
                        <PersonAddAltOutlinedIcon className="icon" /> Add Student
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
            <LessonLayoutTabs lesson_id={lesson_id} />
            <div className="content">{children}</div>
            
            <ModalAddStudentLesson 
                isOpenModalAddStudent={isOpenModalAddStudent}
                handleCloseModalAddStudent={handleCloseModalAddStudent}
            />
        </div>
    ) : (
        <div className="lesson-layout">No data loading</div>
    );
};

LessonLayout.propTypes = {};

export default LessonLayout;
