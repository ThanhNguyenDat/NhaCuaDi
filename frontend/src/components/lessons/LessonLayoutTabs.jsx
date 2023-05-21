import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Tabs, Tab, Box, useTheme } from "@mui/material";
import { tokens } from "theme";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import config from "config";
import { getRoutePath } from "helpers/common";

const LessonLayoutTabs = ({ lesson_id }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [value, setValue] = useState("");

    const navigate = useNavigate();

    const location = useLocation();
    const params = useParams();
    const route = getRoutePath(location, params);

    const tabConfigs = [
        {
            value: "overview",
            title: "overview",
            routes: [config.routes.aboutOverViewLesson.toString()],
            to: config.routes.aboutOverViewLesson.replace(":lesson_id", lesson_id),
        },
        {
            value: "students",
            title: "students",
            routes: [
                config.routes.aboutStudentsLesson.toString(),
                config.routes.aboutDetailStudentLesson.toString(),
            ],
            to: config.routes.aboutStudentsLesson.replace(":lesson_id", lesson_id),
        },
        {
            value: "faqs",
            title: "faqs",
            routes: [config.routes.aboutFAQsLesson.toString()],
            to: config.routes.aboutFAQsLesson.replace(":lesson_id", lesson_id),
        },
    ];

    useEffect(() => {
        const currentTab = tabConfigs.find((tab) => tab.routes.includes(route));
        setValue(currentTab?.value);
    }, [route]);

    const handleChange = (event, newValue) => {
        const newTag = tabConfigs.find((tab) => tab.value === newValue);
        navigate(newTag.to);

        setValue(newValue);
    };

    return (
        <Box>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="lesson tabs"
                textColor={colors.grey[100]}
                indicatorColor="secondary"
            >
                {tabConfigs.map((tab, index) => (
                    <Tab
                        key={index}
                        value={tab.value}
                        label={tab.title}
                        onClick={() => {
                            navigate(tab.to);
                        }}
                    />
                ))}
            </Tabs>
        </Box>
    );
};

LessonLayoutTabs.propTypes = {};

export default LessonLayoutTabs;
