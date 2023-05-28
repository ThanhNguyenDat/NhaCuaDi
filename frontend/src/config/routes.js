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
    aboutOverViewLesson: "/lessons/:lesson_id/about_overview",
    aboutStudentsLesson: "/lessons/:lesson_id/about_students",
    aboutDetailStudentLesson: "/lessons/:lesson_id/about_students/:uid",
    createNewLesson: "/lessons/create-new-lesson",
    aboutFAQsLesson: "/lessons/:lesson_id/about_faqs",

    // sales

    // FAQs
    faq: "faqs",
};

export default routes;
