import React from "react";
import PropTypes from "prop-types";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const PositiveTypography = ({ className, value }) => {
    return (
        <div
            className={`${className} positive`}
            style={{
                color: "green",

                justifyContent: "center",
                alignItems: "center",
                display: "flex",
            }}
        >
            <KeyboardArrowUpOutlinedIcon /> {value}
        </div>
    );
};

PositiveTypography.propTypes = {
    value: PropTypes.node.isRequired,
};

export default PositiveTypography;
