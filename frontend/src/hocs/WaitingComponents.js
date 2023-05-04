import React from "react";
import { PropTypes } from "prop-types";

function WaitingComponent({ children, ...props }) {
    return (
        <React.Suspense fallback={<div className="loading" />}>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, { ...props });
            })}
        </React.Suspense>
    );
}

WaitingComponent.propTypes = {
    children: PropTypes.node.isRequired,
};

export default WaitingComponent;
