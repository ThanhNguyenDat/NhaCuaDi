import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import { FaUserEdit } from "react-icons/fa";
import { MdPlayLesson } from "react-icons/md";

import "./styles.scss";

const LessonItem = ({ lesson_type, lesson_name, price, rate, turns, number_sentences, url }) => {
    return (
        <div className="lesson-item">
            <Link to={url}>
                <div className="lesson-top">
                    <div className="lesson-type">{lesson_type}</div>

                    <div className="lesson-name">{lesson_name}</div>

                    <div className="lesson-price">${price ?? 0}</div>
                </div>
                <div className="lesson-bottom">
                    <Rating className="lesson-rating" value={0} readOnly />
                    <div className="lesson-turns-sentences">
                        {turns} <FaUserEdit /> <span className="separator">|</span>{" "}
                        {number_sentences} <MdPlayLesson /> <span className="separator">|</span>
                    </div>
                    {url && (
                        <div className="lesson-url" to={url}>
                            SEE MORE
                        </div>
                    )}
                </div>
            </Link>
        </div>
    );
};

export default LessonItem;
