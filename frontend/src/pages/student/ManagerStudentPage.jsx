import React from "react";
import PropTypes from "prop-types";
import { useTheme, Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { DataGridPro, GridToolbar } from "@mui/x-data-grid-pro";
import { tokens } from "theme";
import Header from "components/Header";
import { mockDataStudent } from "data/mockData";
import config from "config";
import { Link } from "react-router-dom";
import routes from "config/routes";

const ManagerStudentPage = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "registrarId", headerName: "Registrar ID" },
        {
            field: "fullname",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
            renderCell: (cellValues) => {
                return (
                    <Link
                        to={`${routes.aboutOverviewStudent.replace(":uid", cellValues.row.id)}`}
                        style={{
                            color: colors.blueAccent[300],
                        }}
                    >
                        {cellValues.row.fullname}
                    </Link>
                );
            },
        },
        {
            field: "age",
            headerName: "Age",
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "phone",
            headerName: "Phone Number",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "classes",
            headerName: "Classes",
            flex: 1,
        },
        {
            field: "city",
            headerName: "City",
            flex: 1,
        },
        {
            field: "zipCode",
            headerName: "Zip Code",
            flex: 1,
        },
    ];

    return (
        <Box>
            <Header
                title={config.breadcrumbs.manageStudent.title}
                subtitle={config.breadcrumbs.manageStudent.subtitle}
            />
            <Box
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.blueAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.pinkAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.pinkAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.blueAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid
                    rows={mockDataStudent}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    );
};

ManagerStudentPage.propTypes = {};

export default ManagerStudentPage;
