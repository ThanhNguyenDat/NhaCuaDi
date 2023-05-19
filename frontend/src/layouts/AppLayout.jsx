// @flow
import * as React from "react";

import Topbar from "./global/Topbar";
import Sidebar from "./global/Sidebar";
import "./styles.scss";

function AppLayout({ children }) {
    return (
        <div className="app-layout">
            <Sidebar />
            <main className="content">
                <Topbar />
                <div style={{ margin: "20px" }}>{children}</div>
            </main>
        </div>
    );
}

AppLayout.prototype = {};

export default AppLayout;
