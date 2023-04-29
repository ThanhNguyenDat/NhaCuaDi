import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";

import AppLayout from "./layouts/AppLayout";

const LoginPage = lazy(() => import("./pages/login"));
const Notfound = lazy(() => import("./pages/notfound"));

function WaitingComponent({ children, ...props }) {
    return (
        <React.Suspense fallback={<div className="loading" />}>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, { ...props });
            })}
        </React.Suspense>
    );
}

WaitingComponent.propTypes = {
    children: PropTypes.node.isRequired,
};

const routes = [
    {
        path: "/",
        element: <Navigate to="/app" replace />,
    },
    {
        path: "/app",
        name: "app",
        element: <AppLayout />,
        children: [
            {
                path: "/app",
                name: "App",
                element: <h1>app</h1>,
            },
            {
                path: "dashboard",
                name: "Dashboard",
                element: <h2>dashboard</h2>,
            },
        ],
    },
    {
        path: "/auth/login",
        element: (
            <WaitingComponent>
                <LoginPage />
            </WaitingComponent>
        ),
    },
    {
        path: "*",
        element: (
            <WaitingComponent>
                <Notfound />
            </WaitingComponent>
        ),
    },
];

export default routes;
