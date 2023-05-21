import React, { useState } from "react";
import PropTypes from "prop-types";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import "./styles.scss";
import { Collapse, Divider, Rating, useTheme } from "@mui/material";
import { tokens } from "theme";
import ReactECharts from "components/Charts/ReactECharts";
import PositiveTypography from "components/PositiveTypography";
import NegativeTypography from "components/NegativeTypography";
import { If } from "components/If";
import { Else } from "components/If";
import { Link } from "react-router-dom";
import _ from "lodash";

const LessonItem = ({
    certificate,
    title,
    subTitle,
    progress_stat,
    price,
    rating,
    sale_stat,
    to,
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const chartOptions = {
        title: {
            text: "Progress",
            left: "center",
            top: 2,
            textStyle: {
                fontSize: 18,
                color: colors.grey[100],
            },
        },
        tooltip: {
            trigger: "item",
            formatter: "{b} : {c} ({d}%)",
        },
        series: [
            {
                type: "pie",
                radius: "65%",
                center: ["50%", "50%"],
                selectedMode: "single",
                top: "10%",
                data: [
                    { value: progress_stat?.dont_make || 0, name: "Don't Make" },
                    { value: progress_stat?.processing || 0, name: "Processing" },
                    { value: progress_stat?.done || 0, name: "Done" },
                ],
                color: ["#ff0000", "#ffbf00", "#00b04f"],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                },
            },
        ],
    };

    const onMoreIcon = (event) => {
        event.preventDefault();
    };

    return (
        <Link
            className="lesson-item"
            to={to}
            style={{
                border: `1px solid ${colors.grey[400]}`,
            }}
        >
            <div className="header">
                <div className="certificate" style={{ color: colors.grey[300] }}>
                    {certificate}
                </div>
                <MoreVertIcon
                    className="more-icon"
                    style={{
                        color: colors.grey[300],
                        background: colors.grey[800],
                    }}
                    onClick={onMoreIcon}
                />
            </div>
            <div className="title" style={{ color: colors.pinkAccent[400] }}>
                {title}
            </div>
            <div className="sub-title" style={{ color: colors.pinkAccent[100] }}>
                {subTitle}
            </div>
            <div className="progress-chart">
                <If condition={!_.isEmpty(progress_stat)}>
                    <ReactECharts option={chartOptions} />
                </If>
                <If condition={_.isEmpty(progress_stat)}>
                    <div
                        style={{
                            fontSize: "50px",
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",
                            height: "100%",
                            color: colors.pinkAccent[100],
                        }}
                    >
                        0
                    </div>
                </If>
            </div>
            <Divider />
            <div className="price-and-rating">
                ${price || 0} <Rating className="rating" value={rating} precision={0.1} readOnly />
            </div>
            <div className="summary-sales">
                <div className="item">
                    <div
                        className="item-title"
                        style={{
                            color: colors.pinkAccent[400],
                        }}
                    >
                        Target
                    </div>
                    <If condition={sale_stat?.target > 0}>
                        <PositiveTypography className="item-result" value={sale_stat?.target} />
                    </If>
                    <If condition={sale_stat?.target < 0}>
                        <NegativeTypography className="item-result" value={sale_stat?.target} />
                    </If>
                    <Else>
                        <div className="item-result" style={{ color: colors.pinkAccent[100] }}>
                            0
                        </div>
                    </Else>
                </div>

                <div className="item">
                    <div className="item-title" style={{ color: colors.pinkAccent[400] }}>
                        Last Week
                    </div>
                    <If condition={sale_stat?.last_week > 0}>
                        <PositiveTypography className="item-result" value={sale_stat?.last_week} />
                    </If>
                    <If condition={sale_stat?.last_week < 0}>
                        <NegativeTypography className="item-result" value={sale_stat?.target} />
                    </If>
                    <Else>
                        <div
                            className="item-result"
                            style={{
                                color: colors.pinkAccent[100],
                            }}
                        >
                            0
                        </div>
                    </Else>
                </div>

                <div className="item">
                    <div className="item-title" style={{ color: colors.pinkAccent[400] }}>
                        Last Month
                    </div>

                    <If condition={sale_stat?.last_month > 0}>
                        <PositiveTypography className="item-result" value={sale_stat?.last_month} />
                    </If>
                    <If condition={sale_stat?.last_month < 0}>
                        <NegativeTypography className="item-result" value={sale_stat?.target} />
                    </If>
                    <Else>
                        <div className="item-result" style={{ color: colors.pinkAccent[100] }}>
                            0
                        </div>
                    </Else>
                </div>
            </div>
        </Link>
    );
};

LessonItem.propTypes = {};

export default LessonItem;
