import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { Row } from "reactstrap";
import styles from "./styles.module.scss";
import DefaultNavbar from "../Navbars/DefaultNavbar";

import routes from "routes";
const Header = (props) => {
    return (
        <header style={{ paddingTop: 10 }} className={styles["inner"]}>
            <DefaultNavbar brand="Nhà Của Di" routes={routes} sticky />
        </header>
    );
};

Header.propTypes = {};

export default Header;
