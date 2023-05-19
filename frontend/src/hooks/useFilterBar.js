import React, { useState } from "react";
import PropTypes from "prop-types";

const useFilterBar = (initialFilters) => {
    const [filters, setFilters] = useState(initialFilters);

    const updateFilter = (filterName, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: value,
        }));
    };

    const clearFilters = () => {
        setFilters(initialFilters);
    };
    return { filters, updateFilter, clearFilters };
};

useFilterBar.propTypes = {};

export default useFilterBar;
