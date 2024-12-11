import React from 'react'
import './SearchBar.css'
import PropTypes from "prop-types"; // Import PropTypes

function SearchBar({onSearch, setSearchQuery}) {
  return (
    <div>
      <div className="search-container">
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        placeholder="Search..."
        className="search-bar"
      />
      <button onClick={onSearch} className="search-btn">
        Search
      </button>
    </div>
    </div>
  )
}

// PropTypes validation for the props
SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired, // onSearch should be a function and is required
    setSearchQuery: PropTypes.func.isRequired, // setSearchQuery should be a function and is required
  };

export default SearchBar
