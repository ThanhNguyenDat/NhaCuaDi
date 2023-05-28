import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Box, Modal, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataStudent } from "data/mockData";
import { mockDataLesson } from "data/mockData";
import "./styles.scss";

import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PersonAddDisabledOutlinedIcon from "@mui/icons-material/PersonAddDisabledOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

import { Link, useParams } from "react-router-dom";
import config from "config";

const LessonRow = ({
    id,
    certificate,
    title,
    subTitle,

    registered,
    isHover,
    ...props
}) => {
    const [register, setRegister] = useState(registered);
    return (
        <div className="lesson-row" {...props}>
            <div className="check">
                <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    // defaultChecked={register}
                    checked={register}
                />
            </div>
            <div className="id">{id}</div>
            <div className="certificate">{certificate}</div>
            <div className="title">{title}</div>
            <div className="subTitle">{subTitle}</div>
            {isHover && (
                <div className="actions">
                    {register ? (
                        <PersonAddDisabledOutlinedIcon
                            className="icon"
                            fontSize="large"
                            onClick={() => setRegister(false)}
                        />
                    ) : (
                        <PersonAddOutlinedIcon
                            className="icon"
                            fontSize="large"
                            onClick={() => setRegister(true)}
                        />
                    )}
                    <DriveFileRenameOutlineOutlinedIcon className="icon" fontSize="large" />
                    <Link to={config.routes.aboutOverViewLesson.replace(":lesson_id", id)}>
                        <ArrowForwardOutlinedIcon className="icon" fontSize="large" />
                    </Link>
                </div>
            )}
        </div>
    );
};

const ModalAddLessonStudent = ({ isOpenModalAddLesson, handleCloseModalAddLesson }) => {
    const route_params = useParams();
    const uid = route_params.uid;

    const [listLessons, setListLessons] = useState([]);
    const [listLessonOfStudentIds, setListLessonOfStudentIds] = useState([]);

    const [hoverRow, setHoverRow] = useState("");

    useEffect(() => {
        const lessons = mockDataLesson;
        setListLessons(lessons);

        const lessonOfStudent = mockDataStudent.find(
            (student) => student.id.toString() === uid.toString()
        )?.lessons;
        const ids = lessonOfStudent.map((lesson) => lesson.lesson_id);
        setListLessonOfStudentIds(ids);
    }, [uid]);

    return (
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
                    bottom: "10%",
                    left: "10%",
                    right: "10%",

                    // transform: "translate(-50%, -50%)",
                    width: "80vw",
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,


                    overflow:'scroll',
                    display:'block'
                }}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add More Lesson
                </Typography>
                <Box>
                    {listLessons.map((lesson) => {
                        const registered = listLessonOfStudentIds.includes(lesson.id);

                        return (
                            <LessonRow
                                {...lesson}
                                isHover={hoverRow === lesson.id}
                                registered={registered}
                                onMouseEnter={() => setHoverRow(lesson.id)}
                                onMouseLeave={() => setHoverRow("")}
                            />
                        );
                    })}
                </Box>
            </Box>
        </Modal>
    );
};

ModalAddLessonStudent.propTypes = {};

export default ModalAddLessonStudent;
