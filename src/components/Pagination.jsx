import PropTypes from 'prop-types';

function Pagination({ totalEmployees, employeesPerPage, currentPage, setCurrentPage }) {
    const totalPages = Math.ceil(totalEmployees / employeesPerPage);

    if (totalPages <= 1) return null;

    const handleClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex justify-center mt-4 space-x-2">
            <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-white text-gray-700'}`}
            >
                Précédent
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => handleClick(page)}
                    className={`px-3 py-1 border rounded ${currentPage === page ? 'bg-[#5a6f07] text-white' : 'bg-white text-gray-700'}`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-white text-gray-700'}`}
            >
                Suivant
            </button>
        </div>
    );
}

Pagination.propTypes = {
    totalEmployees: PropTypes.number.isRequired,
    employeesPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
};

export default Pagination;
