import React from "react";
import Select from "react-select";
import {FilterOptions} from "../../types/interfaces";
import getSelectStyles from "../../styles/selectStyles";

interface CardFiltersProps {
 onFilterChange: (filters: FilterOptions) => void;
 theme: "light" | "dark";
 columns: {_id: string; name: string}[];
}

const sortOptions = [
 {value: "createdAt", label: "Creation Date"},
 {value: "updatedAt", label: "Last Updated"},
 {value: "title", label: "Title"},
];

const orderOptions = [
 {value: "asc", label: "Ascending"},
 {value: "desc", label: "Descending"},
];

const CardFilters: React.FC<CardFiltersProps> = ({onFilterChange, theme, columns}) => {
 const [filters, setFilters] = React.useState<FilterOptions>({});

 const handleFilterChange = (field: keyof FilterOptions, value: string | undefined) => {
  const newFilters = {...filters, [field]: value};
  setFilters(newFilters);
  onFilterChange(newFilters);
 };

 return (
  <div
   className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
   role="search"
   aria-label="Card filters"
  >
   <div className="flex flex-wrap gap-4">
    <div className="flex-1 min-w-[200px]">
     <label
      htmlFor="title-search"
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
     >
      Search by Title
     </label>
     <input
      id="title-search"
      type="text"
      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      placeholder="Search cards..."
      onChange={(e) => handleFilterChange("title", e.target.value)}
      aria-label="Search cards by title"
     />
    </div>

    <div className="flex-1 min-w-[200px]">
     <label
      id="column-filter-label"
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
     >
      Filter by Column
     </label>
     <Select
      inputId="column-filter"
      aria-labelledby="column-filter-label"
      options={columns.map((col) => ({value: col._id, label: col.name}))}
      onChange={(option) => handleFilterChange("columnId", option?.value)}
      styles={getSelectStyles(theme)}
      isClearable
      isSearchable
      placeholder="Select column..."
      noOptionsMessage={() => "No columns found"}
      classNamePrefix="column-filter"
     />
    </div>

    <div className="flex-1 min-w-[200px]">
     <label
      id="sort-by-label"
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
     >
      Sort By
     </label>
     <Select
      inputId="sort-by"
      aria-labelledby="sort-by-label"
      options={sortOptions}
      onChange={(option) => handleFilterChange("sortBy", option?.value as FilterOptions["sortBy"])}
      styles={getSelectStyles(theme)}
      isClearable
      isSearchable
      placeholder="Sort by..."
      noOptionsMessage={() => "No sorting options available"}
      classNamePrefix="sort-by"
     />
    </div>

    <div className="flex-1 min-w-[200px]">
     <label
      id="sort-order-label"
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
     >
      Sort Order
     </label>
     <Select
      inputId="sort-order"
      aria-labelledby="sort-order-label"
      options={orderOptions}
      onChange={(option) => handleFilterChange("sortOrder", option?.value as FilterOptions["sortOrder"])}
      styles={getSelectStyles(theme)}
      isClearable
      isSearchable
      placeholder="Sort order..."
      noOptionsMessage={() => "No order options available"}
      classNamePrefix="sort-order"
     />
    </div>
   </div>
  </div>
 );
};

export default CardFilters;
