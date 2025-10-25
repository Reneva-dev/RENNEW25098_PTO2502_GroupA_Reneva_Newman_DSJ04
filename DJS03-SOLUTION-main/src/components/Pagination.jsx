// src/components/Pagination.jsx
import React from "react";

/**
 * Pagination component renders numbered pagination controls, including
 * "Previous" and "Next" buttons. Users can navigate through pages of
 * content, and the component calls back when the page changes.
 *
 * @component
 * @param {Object} props
 * @param {number} props.totalPages - Total number of pages available.
 * @param {number} props.currentPage - The current active page number.
 * @param {function(number): void} props.onPageChange - Callback invoked with the new page number when a different page is selected.
 * @returns {JSX.Element} The rendered pagination controls.
 */

export default function Pagination({ 
  totalPages, 
  currentPage, 
  onPageChange 
}) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center space-x-2 p-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Previous
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 rounded ${
            num === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
