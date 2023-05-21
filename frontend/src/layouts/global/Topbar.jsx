import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ColorModeContext, tokens } from "theme";
import {
    IconButton,
    InputBase,
    Box,
    useTheme,
    Breadcrumbs,
    Typography,
    Badge,
} from "@mui/material";
import {
    LightModeOutlined,
    DarkModeOutlined,
    NotificationsOutlined,
    SettingsOutlined,
    PersonOutline,
    SearchOutlined,
} from "@mui/icons-material";
import { Link, useLocation, useParams } from "react-router-dom";
import logo from "assets/images/logo.png";
import Logo from "components/Icons/Logo";
import config from "config";
import { getRoutePath } from "helpers/common";

const Topbar = ({ className }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const colorMode = useContext(ColorModeContext);

    const location = useLocation();
    const params = useParams();

    const pathname = location.pathname;
    const uid = params.uid || 0;

    const [breadcrumbs, setBreadcrumbs] = useState();

    useEffect(() => {
        const pathnames = pathname.split("/").filter((path) => path !== "");

        const _linkBreadCrumbs = [
            <Logo width="26px" height="26px" />,
            pathnames.map((pathname, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                // get icon by route
                const breadcrumb = Object.values(config.breadcrumbs).find(
                    (breadcrumb) => breadcrumb?.route.replace(":uid", uid) === routeTo
                );

                const icon = breadcrumb?.icon;
                const title = breadcrumb?.title;

                const isLast = index === pathnames.length - 1;

                if (!title) {
                    return;
                }

                return isLast ? (
                    <Box key={index} display="flex" alignItems="center">
                        {icon && (
                            <Typography
                                sx={{
                                    color: colors.pinkAccent[400],
                                }}
                            >
                                {icon}
                            </Typography>
                        )}
                        <Typography
                            key="title"
                            sx={{
                                color: colors.pinkAccent[400],
                            }}
                            paddingLeft="4px"
                        >
                            {title}
                        </Typography>
                    </Box>
                ) : (
                    <Link key={index} to={routeTo} style={{ color: colors.pinkAccent[400] }}>
                        <Box display="flex">
                            {icon && (
                                <Typography key="icon" color={colors.pinkAccent[400]}>
                                    {icon}
                                </Typography>
                            )}
                            <Typography
                                key="title"
                                color={colors.pinkAccent[400]}
                                paddingLeft="4px"
                            >
                                {title}
                            </Typography>
                        </Box>
                    </Link>
                );
            }),
        ];

        setBreadcrumbs(_linkBreadCrumbs);
    }, [pathname, theme]);

    return (
        <Box
            className={`top-bar ${className}`}
            display="flex"
            justifyContent="space-between"
            p={2}
            sx={{ background: colors.grey[900] }}
        >
            {/* Search */}
            <Box display="flex" key="search">
                <Box
                    key="input-search"
                    display="flex"
                    backgroundColor={colors.primary[400]}
                    borderRadius="3px"
                >
                    <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                    <IconButton type="button" sx={{ p: 1 }}>
                        <SearchOutlined />
                    </IconButton>
                </Box>

                {/* Breadcrumbs */}
                <Box
                    key="breadcrumbs"
                    sx={{
                        ml: 2,
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                    }}
                >
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        {breadcrumbs}
                    </Breadcrumbs>
                </Box>
            </Box>

            {/* ICONS */}
            <Box display="flex">
                <IconButton key="1" onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? <DarkModeOutlined /> : <LightModeOutlined />}
                </IconButton>
                <IconButton key="2">
                    <Badge badgeContent={4} color="error">
                        <NotificationsOutlined />
                    </Badge>
                </IconButton>
                <IconButton key="3">
                    <SettingsOutlined />
                </IconButton>
                <IconButton key="4">
                    <PersonOutline />
                </IconButton>
            </Box>
        </Box>
    );
};

Topbar.propTypes = {};

export default Topbar;
