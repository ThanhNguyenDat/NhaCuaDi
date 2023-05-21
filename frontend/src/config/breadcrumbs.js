import Icons from "components/Icons";
import routes from "./routes";

const breadcrumbs = {
    home: {
        route: routes.home,
        icon: Icons.homeIcon,
        title: "Home",
    },

    logo: {
        route: routes.home,
        icon: Icons.logo,
        title: "Logo",
    },

    dashboard: {
        route: routes.dashboard,
        icon: Icons.dashboardIcon,
        title: "Dashboard",
    },

    // Staff
    manageStaff: {
        route: routes.manageStaff,
        icon: Icons.manageStaffIcon,
        title: "Manage Staff",
        subtitle: "Managing the staff member",
    },

    // Student
    manageStudent: {
        route: routes.manageStudent,
        icon: Icons.manageStudentIcon,
        title: "Manage Student",
        subtitle: "Managing the student",
    },
    aboutOverviewStudent: {
        route: routes.aboutOverviewStudent,
        icon: Icons.manageStaffIcon,
        title: "User",
        subtitle: "",
    },
    aboutWorkAndEducationStudent: {
        route: routes.aboutWorkAndEducationStudent,
        icon: Icons.manageStaffIcon,
        title: "User",
        subtitle: "",
    },
    aboutLessonsStudent: {
        route: routes.aboutLessonsStudent,
        icon: Icons.manageStaffIcon,
        title: "User",
        subtitle: "",
    },
    aboutDetailStudentLesson: {
        route: routes.aboutDetailStudentLesson,
        icon: Icons.manageLessonIcon,
        title: "Manage Lessons",
        subtitle: "Managing the lesson",
    },

    // Lesson
    manageLesson: {
        route: routes.manageLesson,
        icon: Icons.manageLessonIcon,
        title: "Manage Lessons",
        subtitle: "Managing the lesson",
    },
};

export default breadcrumbs;
