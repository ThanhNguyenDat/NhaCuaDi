import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import theme from "assets/theme";

import routes from "./routes";

const router = createBrowserRouter(routes, {
    basename: "/",
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
