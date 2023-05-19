import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box, useTheme } from "@mui/material";
import { tokens } from "theme";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import config from "config";
import { getRoutePath } from "helpers/common";

const StudentTabs = ({ uid }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    const location = useLocation();
    const params = useParams();
    const route = getRoutePath(location, params);

    const tabConfigs = [
        {
            value: "introduction",
            title: "introduction",
            routes: [
                config.routes.aboutOverviewStudent.toString(),
                config.routes.aboutWorkAndEducationStudent.toString(),
            ],
            to: config.routes.aboutOverviewStudent.replace(":uid", uid),
        },
        {
            value: "lessons",
            title: "lessons",
            routes: [config.routes.aboutLessonsStudent.toString()],
            to: config.routes.aboutLessonsStudent.replace(":uid", uid),
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
                aria-label="student tabs"
                textColor={colors.grey[100]}
                indicatorColor="secondary"
            >
                {tabConfigs.map((student_tab, index) => (
                    <Tab key={index} value={student_tab.value} label={student_tab.title} />
                ))}
            </Tabs>
        </Box>
    );
};

StudentTabs.propTypes = {
    uid: PropTypes.node.isRequired,
};

export default StudentTabs;
