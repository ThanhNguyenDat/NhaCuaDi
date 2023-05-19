import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import no_image from "assets/images/no-image.png";

import "./styles.scss";

const Image = forwardRef(
    ({ src, alt, className, fallback: customFallback = no_image, ...props }, ref) => {
        const [fallback, setFallback] = useState("");

        const handleError = () => {
            setFallback(customFallback);
        };

        return (
            <div className="image-card">
                <img
                    className={`wrapper ${className}
                `}
                    ref={ref}
                    src={fallback || src}
                    alt={alt}
                    {...props}
                    onError={handleError}
                />
            </div>
        );
    }
);

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
};

export default Image;
