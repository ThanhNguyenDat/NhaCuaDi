import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Image from "components/Image";
import ImageWithOutLight from "components/Image/ImageWithOutLight";
import { useTheme } from "@mui/material";
import { tokens } from "theme";

const UserBox = ({ className, name, email, avatar }) => {
    return (
        <div className={`user-box ${className}`}>
            <div className="image">
                <ImageWithOutLight src={avatar} />
            </div>

            <div className="info">
                <span className="name">{name}</span>
                <span className="email">{email}</span>
            </div>
        </div>
    );
};

const RowUserLesson = ({ className, fullname, email, phone, progress, ...props }) => {
    const theme = useTheme();
    const colors = useMemo(() => tokens(theme.palette.mode), [theme]);

    return (
        <div
            className={`${className} row-user-lesson`}
            style={
                {
                    // backgroundColor: colors.grey[400]
                }
            }
        >
            <UserBox className="user-left" name={fullname} email={email} />
            <div className="user-content">content</div>
            <div className="user-right"></div>
        </div>
    );
};

RowUserLesson.propTypes = {};

export default RowUserLesson;
