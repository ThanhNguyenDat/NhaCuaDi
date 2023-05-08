import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Button, Divider, Form, Steps, message } from "antd";
const { Step } = Steps;
const CreateLessonForm = (props) => {
    const [form] = Form.useForm();

    const [currentStep, setCurrentStep] = React.useState(0);
    const next = () => {
        setCurrentStep(currentStep + 1);
    };
    const prev = () => {
        setCurrentStep(currentStep - 1);
    };

    const items = [
        {
            key: "First Step",
            title: "First Step",
            // content: "First Content",
            component: "",
        },
        {
            key: "Second Step",
            title: "Second Step",
            content: "Second Content",
            subTitle: "Content",
            component: "",
        },
        {
            key: "Last Step",
            title: "Last Step",
            content: "Last Content",
            subTitle: "Transcript",
            component: "",
        },
    ];

    return (
        <>
            {/* <div className="btn-control">
                <Button
                    style={{
                        margin: "0 8px",
                    }}
                    onClick={() => prev()}
                    disabled={currentStep < 1}
                >
                    Previous
                </Button>

                <Button
                    type="primary"
                    onClick={() => {
                        if (currentStep === items.length - 1) {
                            message.success("Done");
                        } else {
                            next();
                        }
                    }}
                >
                    {currentStep === items.length - 1 ? "Done" : "Next"}
                </Button>
            </div> */}
            <div
                className="steps"
                style={{
                    marginTop: "24px",
                }}
            >
                <Steps current={currentStep} onChange={(c) => setCurrentStep(c)} items={items} />
            </div>

            {items[currentStep].content && <div>{items[currentStep].content}</div>}
            {items[currentStep].component && <div>{items[currentStep].component}</div>}
        </>
    );
};

CreateLessonForm.propTypes = {};

export default CreateLessonForm;
