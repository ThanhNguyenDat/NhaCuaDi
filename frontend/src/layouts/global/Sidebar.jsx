import React, { useState } from "react";
import PropTypes from "prop-types";

import { Sidebar as ProSidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";

import { useLocation } from "react-router-dom";
import { IconButton, Typography, useTheme } from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";

import Item from "components/Sidebars/Item";
import SubTitle from "components/Sidebars/SubTitle";
import Logo from "components/Icons/Logo";
import Image from "components/Image";

import config from "config";
import { tokens } from "theme";

import "./styles.scss";
import { If } from "components/If";

const Sidebar = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = new useProSidebar();

    const [selected, setSelected] = useState("Dashboard");

    const location = useLocation();
    const pathname = location.pathname;

    React.useEffect(() => {
        setSelected(pathname);
    }, [pathname]);

    return (
        <div className={`side-bar ${collapsed ? "collapsed" : ""}`}>
            <ProSidebar
                className="ps-sidebar-root"
                backgroundColor={`${colors.primary[400]} !important`}
                width="100%"
            >
                <Menu className="ps-sidebar-container">
                    <MenuItem
                        className="ps-item"
                        icon={
                            collapsed ? (
                                <IconButton onClick={() => collapseSidebar()}>
                                    <MenuOutlined />
                                </IconButton>
                            ) : undefined
                        }
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            width: "300px",
                        }}
                    >
                        <If condition={!collapsed}>
                            <div className="top">
                                <Typography variant="h3" color={colors.grey[100]}>
                                    <Logo />
                                </Typography>
                                <IconButton onClick={() => collapseSidebar()}>
                                    <MenuOutlined />
                                </IconButton>
                            </div>
                        </If>
                    </MenuItem>

                    <If condition={!collapsed}>
                        <div className="profile-user">
                            <div className="avatar">
                                <Image
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src="https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/272858595_1763530754038181_7657492639481153746_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=RYjAeelytd8AX_IuFJc&_nc_ht=scontent.fsgn13-2.fna&oh=00_AfCxSXvQu6gCJyQuV8tpLOO99rC3t5BOc6o6sXQkOzcfHQ&oe=646A4C42"
                                    style={{ cursor: "pointer", borderRadius: "50%" }}
                                />
                            </div>
                            <div className="content">
                                <Typography className="name" variant="h2" color={colors.grey[100]}>
                                    Thanh Nguyen
                                </Typography>

                                <Typography variant="h5" color={colors.greenAccent[500]}>
                                    Admin
                                </Typography>
                            </div>
                        </div>
                    </If>

                    <div
                        className="routes"
                        style={{
                            paddingLeft: `${collapsed ? undefined : "10%"}`,
                        }}
                    >
                        <Item
                            title={config.breadcrumbs.dashboard.title}
                            to={config.breadcrumbs.dashboard.route}
                            icon={config.breadcrumbs.dashboard.icon}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <SubTitle title="User" />
                        <Item
                            title={config.breadcrumbs.manageStaff.title}
                            to={config.breadcrumbs.manageStaff.route}
                            icon={config.breadcrumbs.manageStaff.icon}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title={config.breadcrumbs.manageStudent.title}
                            to={config.breadcrumbs.manageStudent.route}
                            icon={config.breadcrumbs.manageStudent.icon}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <SubTitle title="Lesson" />
                        <Item
                            title={config.breadcrumbs.manageLesson.title}
                            to={config.breadcrumbs.manageLesson.route}
                            icon={config.breadcrumbs.manageLesson.icon}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </div>
                </Menu>
            </ProSidebar>
        </div>
    );
};

Sidebar.propTypes = {};

export default Sidebar;
