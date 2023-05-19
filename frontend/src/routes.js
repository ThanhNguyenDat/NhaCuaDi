import React, { lazy } from "react";
import PropTypes from "prop-types";
import WaitingComponent from "hocs/WaitingComponents";
import AuthComponent from "hocs/withAuthRequired";

// layout
import AppLayout from "./layouts/AppLayout";
import UserLayout from "layouts/UserLayout";
import Introduction from "components/Introduction";

import config from "config";

// user pages
import ProfilePage from "pages/user/ProfilePage";

// staff pages
import ManagerStaffPage from "pages/staff/ManagerStaffPage";

// student pages
import ManagerStudentPage from "pages/student/ManagerStudentPage";
import Overview from "pages/student/Introduction/Overview";
import WorkAndEducation from "pages/student/Introduction/WorkAndEducation";
import LessonStudentPage from "pages/student/LessonStudentPage";

// lesson pages
import ManagerLessonsPage from "pages/lessons/ManagerLessonsPage";
import CreateNewLessonPage from "pages/lessons/CreateNewLessonPage";
import DashboardPage from "pages/user/DashboardPage";

const LoginPage = lazy(() => import("./pages/login"));
const Notfound = lazy(() => import("./pages/notfound"));

const routes = [
    {
        path: config.routes.home,
        element: (
            <AuthComponent>
                <AppLayout>Hi</AppLayout>
            </AuthComponent>
        ),
    },
    {
        path: config.routes.profile,
        element: (
            <AuthComponent>
                <AppLayout>
                    <ProfilePage />
                </AppLayout>
            </AuthComponent>
        ),
    },
    {
        path: config.routes.dashboard,
        element: (
            <AuthComponent>
                <AppLayout>
                    <DashboardPage />
                </AppLayout>
            </AuthComponent>
        ),
    },
    {
        path: config.routes.manageStaff,
        children: [
            {
                path: config.routes.manageStaff,
                element: (
                    <AuthComponent roles={["admin"]}>
                        <AppLayout>
                            <ManagerStaffPage />
                        </AppLayout>
                    </AuthComponent>
                ),
            },
        ],
    },
    {
        path: config.routes.manageStudent,
        children: [
            {
                path: config.routes.manageStudent,
                element: (
                    <AuthComponent roles={["admin"]}>
                        <AppLayout>
                            <ManagerStudentPage />
                        </AppLayout>
                    </AuthComponent>
                ),
            },
            {
                path: config.routes.aboutOverviewStudent,
                element: (
                    <AuthComponent roles={["admin"]}>
                        <AppLayout>
                            <UserLayout>
                                <Introduction>
                                    <Overview />
                                </Introduction>
                            </UserLayout>
                        </AppLayout>
                    </AuthComponent>
                ),
            },
            {
                path: config.routes.aboutWorkAndEducationStudent,
                element: (
                    <AuthComponent roles={["admin"]}>
                        <AppLayout>
                            <UserLayout>
                                <Introduction>
                                    <WorkAndEducation />
                                </Introduction>
                            </UserLayout>
                        </AppLayout>
                    </AuthComponent>
                ),
            },
            {
                path: config.routes.aboutLessonsStudent,
                element: (
                    <AuthComponent roles={["admin"]}>
                        <AppLayout>
                            <UserLayout>
                                <LessonStudentPage />
                            </UserLayout>
                        </AppLayout>
                    </AuthComponent>
                ),
            },
        ],
    },
    {
        path: config.routes.manageLesson,

        // element: <AppLayout />,
        children: [
            {
                path: config.routes.manageLesson,
                element: (
                    <AuthComponent roles={["admin"]}>
                        <AppLayout>
                            <ManagerLessonsPage />
                        </AppLayout>
                    </AuthComponent>
                ),
            },
            {
                path: config.routes.createNewLesson,
                element: (
                    <AuthComponent roles={["admin"]}>
                        <AppLayout>
                            <CreateNewLessonPage />
                        </AppLayout>
                    </AuthComponent>
                ),
            },
            {
                path: "/lessons/:lesson_id",
                element: (
                    <AuthComponent roles={["admin"]}>
                        <AppLayout>Lesson detail</AppLayout>
                    </AuthComponent>
                ),
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
