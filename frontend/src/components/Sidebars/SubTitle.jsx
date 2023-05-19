import React from "react";
import PropTypes from "prop-types";
import { Typography, useTheme } from "@mui/material";
import { tokens } from "theme";

const SubTitle = ({ title }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
            {title}
        </Typography>
    );
};

SubTitle.propTypes = {};

export default SubTitle;
