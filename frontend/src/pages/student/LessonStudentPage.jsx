import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    Box,
    Divider,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";

import PositiveTypography from "components/PositiveTypography";
import NegativeTypography from "components/NegativeTypography";
import { tokens } from "theme";
import "./styles.scss";
import { Link } from "react-router-dom";

const LessonItem = ({
    lesson_id,
    topic,
    title,
    amount,
    current_score,
    average_score,
    max_score,
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        alert("delete user");
        handlePopoverClose();
    };

    return (
        <Link
            className="lesson-item"
            style={{
                // background: colors.grey[1000],
                boxShadow: `0 1px 2px ${colors.grey[200]}`,
            }}
        >
            <Box className="top">
                <Typography className="topic" variant="h1" color={colors.grey[100]}>
                    {topic}
                </Typography>
                <Tooltip title="More">
                    <MoreVertIcon
                        fontSize="small"
                        style={{
                            cursor: "pointer",
                        }}
                        onClick={handlePopoverOpen}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-label="more"
                        aria-haspopup="true"
                        // aria-expanded={open ? "true" : undefined}
                    />
                </Tooltip>
            </Box>

            <Box className="bottom">
                <Box 
                className="featureChart"
                color={colors.grey[100]}
                >69%</Box>
                <Typography 
                    className="title" 
                    variant="p" 
                    sx={{ color: colors.grey[200] }}
                >
                    {title}
                </Typography>
                <Typography 
                    className="amount" 
                    variant="p"
                    color={colors.pinkAccent[100]}
                >
                    <AccessTimeIcon /> {amount}
                </Typography>
                <Box className="summary">
                    <Box className="item">
                        <Typography className="item-title">Current</Typography>
                        <NegativeTypography className="item-result" value={current_score} />
                    </Box>
                    <Box className="item">
                        <Typography className="item-title">Average</Typography>
                        <PositiveTypography className="item-result" value={average_score} />
                    </Box>
                    <Box className="item">
                        <Typography className="item-title">Max</Typography>
                        <PositiveTypography className="item-result" value={max_score} />
                    </Box>
                </Box>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handlePopoverClose}
                onClick={handlePopoverClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={handlePopoverClose}>
                    <ListItemIcon>
                        <InfoOutlinedIcon />
                    </ListItemIcon>
                    Detail
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    <ListItemIcon>
                        <PersonRemoveOutlinedIcon />
                    </ListItemIcon>
                    Delete
                </MenuItem>
                <Divider />
            </Menu>
        </Link>
    );
};

const LessonStudentPage = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [listLessons, setListLessons] = useState([]);

    useEffect(() => {
        const fakeData = [
            {
                lesson_id: 1,
                topic: "Ielts - Reading",
                title: "Ielts 2022",
                amount: "30",
                current_score: "6",
                average_score: "5",
                max_score: "9",
            },
            {
                lesson_id: 2,
                topic: "Toeic - Pronunciation",
                title: "Toeic 2019",
                amount: "30",
                current_score: "1",
                average_score: "1.5",
                max_score: "2",
            },
        ];
        setListLessons(fakeData);
    }, []);

    return (
        <Box className="lesson-student-page">
            {listLessons.map((data) => (
                <LessonItem
                    lesson_id={data.lesson_id}
                    topic={data.topic}
                    title={data.title}
                    amount={data.amount}
                    current_score={data.current_score}
                    average_score={data.average_score}
                    max_score={data.max_score}
                />
            ))}
        </Box>
    );
};

LessonStudentPage.propTypes = {};

export default LessonStudentPage;
