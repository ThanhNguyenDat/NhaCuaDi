import React from "react";
import PropTypes from "prop-types";
import { Form, Input } from "antd";

const FormStepOne = (props) => {
    return (
        <>
            <Form.Item name="name">
                <Input />
            </Form.Item>
        </>
    );
};

FormStepOne.propTypes = {};

export default FormStepOne;
