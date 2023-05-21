import React from "react";
import PropTypes from "prop-types";

const If = ({ condition, children }) => {
    if (condition) {
        return <React.Fragment>{children}</React.Fragment>;
    } else {
        return null;
    }
};

If.propTypes = {};

const Else = ({ children }) => {
    return <React.Fragment>{children}</React.Fragment>;
};

Else.propTypes = {};

export { If, Else };
