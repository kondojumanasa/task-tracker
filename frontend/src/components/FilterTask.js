import React from 'react';

const FilterTasks = ({ onFilterChange }) => {
  const handleFilterChange = (e) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="filter-tasks">
      <label htmlFor="statusFilter">Filter by Status:</label>
      <select id="statusFilter" onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default FilterTasks;
