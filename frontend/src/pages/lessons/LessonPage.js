import React from "react";
import PropTypes from "prop-types";
import LessonBox from "components/LessonBox";

import no_image_female from "assets/images/no_image_female.jpg"

const LessonPage = (props) => {
    return (
        <div className="p-4" style={{ marginTop: 70 }}>
            <div className="mt-4">
                <div className="row row-cols-auto">
                    <div className="col-sm-3 col-lg-3">
                        <LessonBox
                            image={no_image_female}
                            title="title"
                            description="description"
                            url="#"
                        />
                    </div>
                    <div className="col-sm-6 col-lg-4">
                        <LessonBox 
                            image={no_image_female}
                            title="title"
                            description="description"
                            url="#"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

LessonPage.propTypes = {};

export default LessonPage;
