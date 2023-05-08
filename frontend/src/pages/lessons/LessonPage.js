import React from "react";
import PropTypes from "prop-types";
import LessonBox from "components/LessonBox";

import no_image_female from "assets/images/no_image_female.jpg";

const LessonPage = (props) => {
    return (
        <div className="p-4" style={{ marginTop: 70 }}>
            <div className="mt-4">
                <div className="row row-cols-auto">
                    {/* Start Loop */}
                    <div className="col">
                        <LessonBox
                            image={no_image_female}
                            title="title"
                            description="description"
                            url="#"
                        />
                    </div>
                    {/* End Loop */}
                    <div className="col">
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
