import React from "react";
import PropTypes from "prop-types";
import MuiRichTextEditor from "components/MuiRichTextEditor";
import { convertToRaw } from "draft-js";
import { Button } from "antd";
const FormLastStep = (props) => {
    const [text, setText] = React.useState();
    const onEditorChange = (event) => {
        // const plainText = event.getCurrentContent().getPlainText(); // for plain text
        const rteContent = convertToRaw(event.getCurrentContent()); // for rte content with text formating
        rteContent && setText(JSON.stringify(rteContent)); // store your rteContent to state
    };

    const onCreateLesson = () => {};

    return (
        <div>
            <Button
                onClick={() => {
                    onCreateLesson();
                }}
            >
                Create Lesson
            </Button>
            <div>
                <MuiRichTextEditor
                    label="Type something here..."
                    inlineToolbar={true}
                    onChange={onEditorChange}
                    onSave={(data) => {
                        console.log(data);
                    }}
                />
            </div>
        </div>
    );
};

FormLastStep.propTypes = {};

export default FormLastStep;
