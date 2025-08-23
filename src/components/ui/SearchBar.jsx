import React, { useState } from 'react';

const SearchBar = ({
  placeholder = 'Search events, clubs...',
  onSearch,
  className = '',
  showFilters = false,
  filters = []
}) => {
  const [query, setQuery] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
          placeholder={placeholder}
        />
        {showFilters && (
          <button
            type="button"
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
            </svg>
          </button>
        )}
      </form>

      {showFilterDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Filters</h4>
            {filters.map((filter, index) => (
              <div key={index} className="mb-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-[var(--primary-accent-1)]" />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{filter}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
