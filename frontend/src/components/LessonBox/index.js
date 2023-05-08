import React from "react";
import PropTypes from "prop-types";

const LessonBox = ({ image, title, description, url }) => {
    return (
        <div className="card" style={{ width: "14rem" }}>
            <img className="card-img-top" src={image} alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href={url}>Go to course</a>
            </div>
        </div>
    );
};

LessonBox.propTypes = {
    image: PropTypes.node.isRequired,
    title: PropTypes.node.isRequired,
    description: PropTypes.node.isRequired,
    url: PropTypes.node.isRequired,
};

export default LessonBox;
