// @flow
import * as React from "react";

import Topbar from "./global/Topbar";
import Sidebar from "./global/Sidebar";
import "./styles.scss";

function AppLayout({ children }) {
    const [sticked, setSticked] = React.useState("");
    window.onscroll = () => {
        let temp;
        let top = window.scrollY;
        if (top > 100) {
            temp = "sticked";
        } else {
            temp = "";
        }
        return setSticked(temp);
    };

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="right">
                <Topbar className={sticked} />
                <div className="content">{children}</div>
            </main>
        </div>
    );
}

AppLayout.prototype = {};

export default AppLayout;
