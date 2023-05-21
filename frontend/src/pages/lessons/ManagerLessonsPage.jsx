import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "components/Header";
import useFilterBar from "hooks/useFilterBar";
import FilterBar from "components/FilterBar/FilterBar";

import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";

import { IconButton, ListItemIcon, useTheme } from "@mui/material";
import { tokens } from "theme";
import LessonItem from "components/lessons/LessonItem";

import config from "config";
import "./styles.scss";
import { mockDataLesson } from "data/mockData";

const ManagerLessonsPage = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { params, setParams } = useFilterBar();

    const [listLessons, setListLessons] = useState([]);

    const onClickCreateNewLesosn = () => {
        alert("create new lesson");
    };

    useEffect(() => {
        const data = mockDataLesson.map((lesson) => ({
            ...lesson,
            to: config.routes.aboutOverViewLesson.replace(":lesson_id", lesson.id),
        }));
        setListLessons(data);
    }, []);
    return (
        <div className="manager-lesson-page">
            <Header
                title={config.breadcrumbs.manageLesson.title}
                subtitle={config.breadcrumbs.manageLesson.subtitle}
            />
            <div className="control-bar">
                {/* <FilterBar /> */}
                <div>Filter bar</div>
                <div
                    className="create-new-lesson"
                    style={{
                        background: colors.blueAccent[600],
                    }}
                    onClick={() => {
                        onClickCreateNewLesosn();
                    }}
                >
                    <IconButton>
                        <PostAddOutlinedIcon />
                    </IconButton>
                    create new lesson
                </div>
            </div>

            <div className="multi-lessons">
                {listLessons.map((lesson) => (
                    <LessonItem
                        certificate={lesson.certificate}
                        title={lesson.title}
                        subTitle={lesson.subTitle}
                        progress_stat={lesson.progress_stat}
                        price={lesson.price}
                        rating={lesson.rating}
                        sale_stat={lesson.sale_stat}
                        to={lesson.to}
                    />
                ))}
            </div>
        </div>
    );
};

ManagerLessonsPage.propTypes = {};

export default ManagerLessonsPage;
