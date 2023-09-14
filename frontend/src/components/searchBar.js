import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm); // Call the search function with the new search term
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        className="py-2 px-3 border-2 border[#1F2937] h-[35px]"
        value={searchTerm}
        onChange={handleSearchChange} // Handle live search changes here
      />
      <button
        className="rounded bg-[#5850EC] pr-10 pl-10 pt-2 pb-2 text-white h-[35px] font-bold ml-[15px]"
        onClick={() => onSearch(searchTerm)} // Handle the search button click
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
