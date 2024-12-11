import React from 'react'
import './Pagination.css'
import PropTypes from "prop-types"; // Import PropTypes

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div>
      <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        {" "}
        Page {currentPage} of {totalPages}{" "}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
    </div>
  )
}

// PropTypes validation for props
Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired, // currentPage must be a number and is required
    totalPages: PropTypes.number.isRequired, // totalPages must be a number and is required
    onPageChange: PropTypes.func.isRequired, // onPageChange must be a function and is required
  };

export default Pagination
