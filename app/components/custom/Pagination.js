import React from 'react';

const Pagination = ({ totalPages, paginate }) => {
    const paginationNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        paginationNumbers.push(i);
    }

    return (
        <div className='pagination'>
        <span>Page: </span>
            {paginationNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                >
                    {pageNumber}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
