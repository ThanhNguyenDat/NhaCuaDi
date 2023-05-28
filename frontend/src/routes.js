import React, { lazy } from "react";
import WaitingComponent from "hocs/WaitingComponents";
import AuthComponent from "hocs/withAuthRequired";

// layout
import AppLayout from "./layouts/AppLayout";
// import UserLayout from "layouts/userLayouts/UserLayout";
// import IntroductionUserLayout from "layouts/userLayouts/IntroductionUserLayout";
import StudentLayout from "layouts/studentLayouts/StudentLayout";
import IntroductionStudentLayout from "layouts/studentLayouts/IntroductionStudentLayout";
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
import HomePage from "pages/homepage";
import LessonLayout from "layouts/lessonLayouts/LessonLayout";
import FAQsLessonPage from "pages/lessons/FAQsLessonPage";
import AboutStudentsLessonPage from "pages/lessons/AboutStudentsLessonPage";
import DetailStudentLessonPage from "pages/lessons/DetailStudentLessonPage";

const LoginPage = lazy(() => import("./pages/login"));
const Notfound = lazy(() => import("./pages/notfound"));

const routes = [
    {
        path: config.routes.home,
        element: (
            <AppLayout>
                <HomePage />
            </AppLayout>
        ),
    },
    {
        path: config.routes.profile,
        element: (
            <AppLayout>
                <ProfilePage />
            </AppLayout>
        ),
    },
    {
        path: config.routes.dashboard,
        element: (
            <AppLayout>
                <DashboardPage />
            </AppLayout>
        ),
    },
    {
        path: config.routes.manageStaff,
        children: [
            {
                path: config.routes.manageStaff,
                element: (
                    <AppLayout>
                        <ManagerStaffPage />
                    </AppLayout>
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
                    <AppLayout>
                        <ManagerStudentPage />
                    </AppLayout>
                ),
            },
            {
                path: config.routes.aboutOverviewStudent,
                element: (
                    <AppLayout>
                        <StudentLayout>
                            <IntroductionStudentLayout>
                                <Overview />
                            </IntroductionStudentLayout>
                        </StudentLayout>
                    </AppLayout>
                ),
            },
            {
                path: config.routes.aboutWorkAndEducationStudent,
                element: (
                    // <AuthComponent roles={["admin"]}>
                    <AppLayout>
                        <StudentLayout>
                            <IntroductionStudentLayout>
                                <WorkAndEducation />
                            </IntroductionStudentLayout>
                        </StudentLayout>
                    </AppLayout>
                    // </AuthComponent>
                ),
            },
            {
                path: config.routes.aboutLessonsStudent,
                element: (
                    // <AuthComponent roles={["admin"]}>
                    <AppLayout>
                        <StudentLayout>
                            <LessonStudentPage />
                        </StudentLayout>
                    </AppLayout>
                    // </AuthComponent>
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
                    <AppLayout>
                        <ManagerLessonsPage />
                    </AppLayout>
                ),
            },
            {
                path: config.routes.createNewLesson,
                element: (
                    <AppLayout>
                        <CreateNewLessonPage />
                    </AppLayout>
                ),
            },
            {
                path: config.routes.aboutOverViewLesson,
                element: (
                    <AppLayout>
                        <LessonLayout>Charts?</LessonLayout>
                    </AppLayout>
                ),
            },
            {
                path: config.routes.aboutStudentsLesson,
                element: (
                    <AppLayout>
                        <LessonLayout>
                            <AboutStudentsLessonPage />
                        </LessonLayout>
                    </AppLayout>
                ),
            },
            {
                path: config.routes.aboutFAQsLesson,
                element: (
                    <AppLayout>
                        <LessonLayout>
                            <FAQsLessonPage />
                        </LessonLayout>
                    </AppLayout>
                ),
            },
            {
                path: config.routes.aboutDetailStudentLesson,
                element: (
                    <AppLayout>
                        <LessonLayout>
                            <DetailStudentLessonPage />
                        </LessonLayout>
                    </AppLayout>
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
