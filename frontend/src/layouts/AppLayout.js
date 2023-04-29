// @flow
import * as React from "react";
import { Outlet } from "react-router-dom";

import { Col, Row } from "reactstrap";
import style from "./styles.module.scss";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

function AppLayout(props) {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

AppLayout.prototype = {};

export default AppLayout;
