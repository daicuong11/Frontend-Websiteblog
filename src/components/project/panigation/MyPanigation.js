import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MyPagination = ({ totalPages, currentPage, pageSize, onPageChange, className }) => {
    const generatePageNumbers = () => {
        const pageNumbers = [];
        const limit = Math.min(totalPages, 12);

        // Calculate the starting page for the current set
        let startPage = Math.max(1, currentPage - Math.floor(limit / 2));

        // Adjust the starting page if it's too close to the end
        if (startPage + limit - 1 > totalPages) {
            startPage = totalPages - limit + 1;
        }

        for (let i = startPage; i < startPage + limit; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    const handlePageChange = (newPage) => {
        if(newPage === -1) {
            return;
        }
        if (onPageChange) {
            onPageChange(newPage);
        }
        window.scrollTo({ top: 0, behavior: 'auto' });
    };

    return (
        <>
            <div className={`flex justify-center items-center ${className}`}>
                <div className="flex">
                    <div
                        onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : -1)}
                        className={`${
                            currentPage === 1 ? "cursor-default text-gray-300" : "cursor-pointer hover:border-[1px] hover:border-gray-300"
                        } py-[6px] px-3 mr-1 border-[1px] border-white text-sm font-semibold text-black rounded-md`}
                    >
                        <FontAwesomeIcon icon={faAngleDoubleLeft} />
                    </div>

                    {generatePageNumbers().map((pageNumber) => (
                        <div
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`${
                                currentPage === pageNumber
                                    ? "bg-orange-600 text-white"
                                    : "hover:border-[1px] hover:border-gray-300"
                            } py-[6px] px-3 mr-1 cursor-pointer border-[1px] border-white text-sm font-semibold text-black rounded-md`}
                        >
                            {pageNumber}
                        </div>
                    ))}

                    <div
                        onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : -1)}
                        className={`${
                            currentPage === totalPages ? "cursor-default text-gray-300" : "cursor-pointer hover:border-[1px] hover:border-gray-300"
                        } py-[6px] px-3 mr-1 border-[1px] border-white text-sm font-semibold text-black rounded-md`}
                    >
                        <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyPagination;
