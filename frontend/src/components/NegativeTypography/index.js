import React from "react";
import PropTypes from "prop-types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const NegativeTypography = ({ className, value }) => {
    return (
        <div
            className={`${className} negative`}
            style={{
                color: "red",

                justifyContent: "center",
                alignItems: "center",
                display: "flex",
            }}
        >
            <KeyboardArrowDownIcon /> {value}
        </div>
    );
};

NegativeTypography.propTypes = {
    value: PropTypes.node.isRequired,
};

export default NegativeTypography;
