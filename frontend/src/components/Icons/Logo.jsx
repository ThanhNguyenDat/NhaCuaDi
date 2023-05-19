import React from "react";
import PropTypes from "prop-types";

import logo from "assets/images/logo.png";
import { Link } from "react-router-dom";
import Image from "components/Image";

const Logo = ({ link, width, height }) => {
    return (
        <div className="logo">
            <Link to="/">
                <Image src={link || logo} width={width || "30px"} height={height || "30px"} />
            </Link>
        </div>
    );
};

Logo.propTypes = {};

export default Logo;
