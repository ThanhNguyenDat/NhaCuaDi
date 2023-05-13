import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Col, Row } from "reactstrap";
import { Input, Table, Button } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { MdAdd, MdDelete } from "react-icons/md";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { convertToRaw } from "draft-js";
import MuiRichTextEditor from "components/MuiRichTextEditor";
import "./styles.scss";

const FormSecondStep = (props) => {
    const [text, setText] = React.useState("");

    const [solutions, setSolutions] = React.useState([]);

    const onEditorChange = (event) => {
        // const plainText = event.getCurrentContent().getPlainText(); // for plain text
        const rteContent = convertToRaw(event.getCurrentContent()); // for rte content with text formating
        rteContent && setText(JSON.stringify(rteContent)); // store your rteContent to state
    };
    const onAddNewSolution = () => {
        setSolutions([...solutions, ""]);
    };
    const onDeleteSolution = (indexToRemove) => {
        setSolutions(solutions.filter((item, index) => index !== indexToRemove));
    };
    const onChangeValueSolution = () => {};

    return (
        <div className="form-second-step">
            <div className="flex question">
                <div className="left">
                    <span className="title">Question</span>
                </div>
                <div className="right">
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

            <div className="flex solution">
                <div className="left">
                    <span className="title">Solution</span>
                    <Button onClick={onAddNewSolution}>
                        <MdAdd />
                    </Button>
                </div>
                <div className="right">
                    {solutions &&
                        solutions.map((solution, index) => (
                            <div className="solution-item">
                                <span className="solution-index">{index}.</span>
                                <Input.TextArea
                                    className="solution-input"
                                    onChange={(e) => {
                                        solutions[index] = e.target.value;
                                    }}
                                />
                                <MdDelete
                                    className="delete-icon"
                                    onClick={() => onDeleteSolution(index)}
                                />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

FormSecondStep.propTypes = {};

export default FormSecondStep;
