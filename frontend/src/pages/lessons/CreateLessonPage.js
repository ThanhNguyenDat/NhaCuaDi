import React, { useCallback } from "react";
import PropTypes from "prop-types";
import CreateLessonForm from "components/Forms/CreateLessonForm";

const CreateLessonPage = (props) => {
    return (
        <div
            className="container"
            style={{
                marginTop: "50px",
            }}
        >
            <CreateLessonForm />
        </div>
    );
};

CreateLessonPage.propTypes = {};

export default CreateLessonPage;
