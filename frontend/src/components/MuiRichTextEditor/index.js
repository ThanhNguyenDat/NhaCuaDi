import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "@mui/material";
import MUIRichTextEditor from "mui-rte";
import theme from "assets/theme";

const MuiRichTextEditor = (props) => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <MUIRichTextEditor {...props} />
            </ThemeProvider>
        </>
    );
};

MuiRichTextEditor.propTypes = {};

export default MuiRichTextEditor;
