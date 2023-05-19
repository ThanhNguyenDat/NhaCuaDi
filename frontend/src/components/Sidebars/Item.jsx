import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material";
import { MenuItem } from "react-pro-sidebar";
import { Typography } from "@mui/material";

import { Link } from "react-router-dom";
import { tokens } from "theme";
import "./styles.scss";

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [hover, setHover] = useState(false);

    return (
        <Link to={to} className="item">
            <MenuItem
                className="menu-item"
                active={selected === to}
                icon={icon}
                style={{ color: hover || selected === to ? "#868dfb" : colors.grey[200] }}
            >
                <Typography
                    style={{
                        color: hover || selected === to ? "#868dfb" : colors.grey[200],
                    }}
                    onMouseEnter={() => {
                        setHover(true);
                    }}
                    onMouseLeave={() => {
                        setHover(false);
                    }}
                >
                    {title}
                </Typography>
            </MenuItem>
        </Link>
    );
};

Item.propTypes = {
    title: PropTypes.node.isRequired,
    to: PropTypes.node.isRequired,
};

export default Item;
