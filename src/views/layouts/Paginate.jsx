import { useState } from 'react';
import { Dropdown } from 'flowbite-react';
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from 'react-icons/hi';

function Paginate() {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPageOptions = [15, 20, 30, 40];
  const [entriesPerPage, setEntriesPerPage] = useState(entriesPerPageOptions[0]);
  const totalEntries = 500;

  const handlePageChange = (newPage) => {
    const maxPage = Math.ceil(totalEntries / entriesPerPage);
    setCurrentPage(Math.min(Math.max(newPage, 1), maxPage));
  };

  const startIndex = (currentPage - 1) * entriesPerPage + 1;
  const endIndex = Math.min(startIndex + entriesPerPage - 1, totalEntries);

  const dropdown = () => {
    return (
        <>
            <div className="border rounded-md p-2 text-gray-800 dark:text-gray-300 text-sm">
                <Dropdown label={entriesPerPage.toString()} placement="bottom" inline>
                    {entriesPerPageOptions.map((option) => (
                    <Dropdown.Item key={option} onClick={()=> setEntriesPerPage(option)}>
                        {option}
                    </Dropdown.Item>
                    ))}
                </Dropdown>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
                <span className='font-medium text-black dark:text-white'>{startIndex} - {endIndex}</span> of <span className='font-medium text-black dark:text-white'>{totalEntries}</span>
            </span>
        </>
    );
  };

  return (
    <div className="flex overflow-x-auto items-center gap-2 sm:justify-between w-full">
      <div className="flex items-center gap-2">
        <span className="text-gray-500 dark:text-gray-400 text-sm">Rows per page</span>
        {dropdown()}
      </div>
      <div className="flex">
        <button
          className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="flex items-center justify-center px-4 ms-3 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={endIndex >= totalEntries}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Paginate;