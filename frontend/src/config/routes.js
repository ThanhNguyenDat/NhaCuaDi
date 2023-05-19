const routes = {
    home: "/",
    dashboard: "/dashboard",
    profile: "/profile",

    // Staff routes
    manageStaff: "/staffs",

    // Student routes
    manageStudent: "/students",
    aboutOverviewStudent: "/students/:uid/about_overview",
    aboutWorkAndEducationStudent: "/students/:uid/about_work_and_education",
    aboutPlaces: "/students/:uid/about_places",

    aboutLessonsStudent: "/students/:uid/about_lessons",

    // Lesson routes
    manageLesson: "/lessons",
    createNewLesson: "/lessons/create-new-lesson",
};

export default routes;
