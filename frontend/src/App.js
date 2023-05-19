import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { ProSidebarProvider } from "react-pro-sidebar";

import { ColorModeContext, useMode } from "theme";
import routes from "./routes";
import "./App.css";

const router = createBrowserRouter(routes, {
    basename: "/",
});

function App() {
    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <ProSidebarProvider>
                    <CssBaseline />
                    <RouterProvider router={router} />
                </ProSidebarProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
