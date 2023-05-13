import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import AuthComponent from "hocs/withAuthRequired";

import AppLayout from "./layouts/AppLayout";
import UserPage from "./pages/users/UserPage";
import LessonPage from "pages/lessons/LessonPage";
import CreateLessonPage from "pages/lessons/CreateLessonPage";
import LessonDetail from "pages/lessons/LessonDetail";

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
        element: (
            <AuthComponent>
                <AppLayout />
            </AuthComponent>
        ),
    },
    {
        path: "/category",
        name: "Bai Viet",

        element: <AppLayout />,
        children: [
            {
                path: "/category",
            },
            {
                path: "/category/hoc-tap",
                name: "Hoc tap",
                element: <h2>Hoc Tap</h2>,
            },
        ],
    },
    {
        path: "/users",
        name: "Users",
        element: (
            <AuthComponent>
                <AppLayout />
            </AuthComponent>
        ),
        children: [
            {
                path: "/users",
                name: "User",
                element: (
                    <AuthComponent roles={["admin"]}>
                        <UserPage />
                    </AuthComponent>
                ),
            },
        ],
    },

    {
        path: "/lessons",
        name: "Lessons",
        // element: <AppLayout />,
        children: [
            {
                path: "/lessons",
                name: "Lessons",
                element: <LessonPage />,
            },
            {
                path: "/lessons/add",
                name: "Create new lesson",
                element: <CreateLessonPage />,
            },
            {
                path: "/lessons/detail",
                name: "Create new lesson",
                element: <LessonDetail />,
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
