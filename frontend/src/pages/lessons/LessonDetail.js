import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import {AiOutlinePlayCircle} from 'react-icons/ai';

import "./styles.scss";

import LessonBox from "components/LessonBox";
import no_image_female from "assets/images/no_image_female.jpg";
import Datatable from "components/Tables/Datatable";
import { userRows, userColumns } from "./datasource";

const LessonDetail = (props) => {
    const [briefInformation, setBriefInformation] = React.useState("brief-information");

    const location = useLocation();
    const location_search = location.search;

    const lessonIdRegex = /lesson_id=(\d+)/;
    const lessonIdMatch = location_search.match(lessonIdRegex);
    const lessonId = lessonIdMatch ? lessonIdMatch[1] : "";



    // call api get info
    const actionColumns = [
        {
            dataIndex: "action",
            title: "Action",
            width: "10%",
            render: (_, record) => {
                return (
                    <div className="cellWithAction">
                        <div className="viewButton">View</div>
                        <div className="deleteButton">Delete</div>
                    </div>
                );
            },
        },
    ];

    window.onscroll = () => {
        let temp;
        let top = window.scrollY;
        if (top > 100) {
            temp = "brief-information sticked"
        } else {
            temp = "brief-information"
        }
        return setBriefInformation(temp);
    }

    return (
        <div className="lesson-detail">
            <div className={`${briefInformation}`}>
                <img className="image" src={no_image_female} alt="image for lesson" />
                <div className="title">Ielts 1</div>
                <div className="content">
                    <div className="turns">8 Turns</div>
                    <span className="dot">.</span>
                    <div className="number-of-lessons">10 lessons</div>
                </div>
                <div className={`action pause`}> <AiOutlinePlayCircle/>Start</div>
            </div>

            <div className="detail-information">
                <div className="steps-edit-lesson">
                    hi
                </div>
                <div className="table-assign-user">
                    <Datatable
                        title="Lesson User Table"
                        columns={userColumns.concat(actionColumns)}
                        dataSource={userRows}
                    />
                </div>
                <div className="table-assign-user">
                    <Datatable
                        title="Lesson User Table"
                        columns={userColumns.concat(actionColumns)}
                        dataSource={userRows}
                    />
                </div>
            </div>
        </div>
    );
};

LessonDetail.propTypes = {};

export default LessonDetail;
