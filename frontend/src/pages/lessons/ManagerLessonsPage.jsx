import React from "react";
import PropTypes from "prop-types";
import Header from "components/Header";
import config from "config";
import useFilterBar from "hooks/useFilterBar";
import FilterBar from "components/FilterBar/FilterBar";

const ManagerLessonsPage = (props) => {
    const { params, setParams } = useFilterBar();

    return (
        <div className="manager-lesson-page">
            <Header
                title={config.breadcrumbs.manageLesson.title}
                subtitle={config.breadcrumbs.manageLesson.subtitle}
            />
            <FilterBar />

            <h1>Lesson here</h1>
        </div>
    );
};

ManagerLessonsPage.propTypes = {};

export default ManagerLessonsPage;
