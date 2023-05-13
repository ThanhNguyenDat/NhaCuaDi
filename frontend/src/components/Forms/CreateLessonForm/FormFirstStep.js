import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Select } from "antd";
import { Col, Label, Row } from "reactstrap";

const FormFirstStep = ({ updateField, ...props }) => {
    const [lessonOption, setLessonOption] = React.useState("");

    const lesson_options = [
        {
            value: "lesson_opt_1",
            label: "Lesson_opt_1",
        },
        {
            value: "lesson_opt_2",
            label: "Lesson_opt_2",
        },
    ];
    const question_type = [
        {
            value: "question_type_1",
            label: "Question_type_1",
        },
    ];
    return (
        <>
            <Row>
                <Col>
                    <Label>Name</Label>
                </Col>
                <Col>
                    <Form.Item name="name">
                        <Input
                            onChange={(e) => {
                                updateField("name", e.target.value);
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Label>Lesson Type</Label>
                </Col>
                <Col>
                    <Form.Item name="lesson_type">
                        <Select
                            options={lesson_options}
                            onChange={(e) => {
                                console.log(e);
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Label>Question Type</Label>
                </Col>
                <Col>
                    <Form.Item name="question_type">
                        <Select options={[{}]} />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Label>Audio Url</Label>
                </Col>
                <Col>
                    <Form.Item name="audio_url">
                        <Input
                            onChange={(e) => {
                                updateField("audio_url", e.target.value);
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Label>Image Url</Label>
                </Col>
                <Col>
                    <Form.Item name="image_url">
                        <Input
                            onChange={(e) => {
                                updateField("image_url", e.target.value);
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

FormFirstStep.propTypes = {
    form: PropTypes.node.isRequired,
};

export default FormFirstStep;
