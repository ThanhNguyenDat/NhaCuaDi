import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import "./styles.scss";
import { tokens } from "theme";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import Item from "components/Sidebars/Item";
import config from "config";
import { useParams } from "react-router-dom";

const Introduction = ({ children }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const params = useParams();
    const uid = params.uid || 0;
    return (
        <Box
            className="introduction"
            sx={{
                // background: colors.grey[900],
                boxShadow: `0 1px 2px ${colors.grey[200]}`,
            }}
        >
            <Box className="left">
                <Sidebar
                    className="ps-sidebar-root sidebar"
                    backgroundColor={`${colors.primary[400]} !important`}
                    width="100%"
                    style={{}}
                >
                    <Menu className="ps-sidebar-container">
                        <Item
                            title="Overview"
                            to={config.routes.aboutOverviewStudent.replace(":uid", uid)}
                        />

                        <Item
                            title="Work and Education"
                            to={config.routes.aboutWorkAndEducationStudent.replace(":uid", uid)}
                        />

                        <Item title="Places" to="#" />
                        <Item title="Contacts" to="#" />
                        <Item title="Detail Information" to="#" />
                    </Menu>
                </Sidebar>
            </Box>
            <Divider
                className="divider-vertical"
                orientation="vertical"
                sx={{ background: colors.grey[500] }}
            />

            <Box className="right">{children}</Box>
        </Box>
    );
};

Introduction.propTypes = {};

export default Introduction;
