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
  <div className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
   <div className="flex flex-wrap gap-4">
    <div className="flex-1 min-w-[200px]">
     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search by Title</label>
     <input
      type="text"
      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      placeholder="Search cards..."
      onChange={(e) => handleFilterChange("title", e.target.value)}
     />
    </div>

    <div className="flex-1 min-w-[200px]">
     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Filter by Column</label>
     <Select
      options={columns.map((col) => ({value: col._id, label: col.name}))}
      onChange={(option) => handleFilterChange("columnId", option?.value)}
      styles={getSelectStyles(theme)}
      isClearable
      placeholder="Select column..."
     />
    </div>

    <div className="flex-1 min-w-[200px]">
     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort By</label>
     <Select
      options={sortOptions}
      onChange={(option) => handleFilterChange("sortBy", option?.value as FilterOptions["sortBy"])}
      styles={getSelectStyles(theme)}
      isClearable
      placeholder="Sort by..."
     />
    </div>

    <div className="flex-1 min-w-[200px]">
     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort Order</label>
     <Select
      options={orderOptions}
      onChange={(option) => handleFilterChange("sortOrder", option?.value as FilterOptions["sortOrder"])}
      styles={getSelectStyles(theme)}
      isClearable
      placeholder="Sort order..."
     />
    </div>
   </div>
  </div>
 );
};

export default CardFilters;
