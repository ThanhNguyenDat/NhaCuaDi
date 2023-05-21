import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";
import useFilterBar from "hooks/useFilterBar";

const FilterBar = () => {
    const { filters, updateFilter, clearFilters } = useFilterBar();

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        updateFilter(name, value);
    };

    const handleClearFilters = () => {
        clearFilters();
    };

    return (
        <div className="filter-bar">
            <table>
                <tr>
                    <th>Name</th>
                    <th>Operator</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>
                        <input onChange={handleFilterChange} />
                    </td>
                    <td>
                        <select>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </td>
                    <td>
                        <input onChange={handleFilterChange} />
                    </td>
                </tr>
            </table>
            <button>Add More Filter</button>
            <button onClick={handleClearFilters}>Clear Filters</button>
        </div>
    );
};

FilterBar.propTypes = {};

export default FilterBar;
