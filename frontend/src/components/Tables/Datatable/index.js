import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import { AiOutlineUsergroupAdd, AiOutlineUserAdd } from "react-icons/ai";
import "./styles.scss";

const Datatable = ({ title, columns, dataSource, pagination, rowSelection }) => {
    return (
        <div className="datatable">
            {title && (
                <div className="table-title">
                    <div className="title">{title}</div>
                    <div className="action">
                        <div className="assign-user">
                            <AiOutlineUserAdd />
                        </div>
                        <div className="assign-group-users">
                            <AiOutlineUsergroupAdd />
                        </div>
                    </div>
                </div>
            )}

            <div className="table-information">
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={pagination}
                    rowSelection={rowSelection}
                />
            </div>
        </div>
    );
};

Datatable.propTypes = {
    columns: PropTypes.node.isRequired,
    dataSource: PropTypes.node.isRequired,
};

export default Datatable;
