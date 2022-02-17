import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { paginate } from "../../store/feature/table/tableSlice";

export default function Pagination({
  totalData,
  indexOfFirstData,
  indexOfLastData,
}) {
  const pageNumbers = [];
  const dispatch = useDispatch();
  const { currentPage, dataPerPage } = useSelector((state) => state.table);

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  const indexOfLastText = (indexOfLastData, indexOfFirstData, totalData) => {
    if (!totalData) return 0;
    if (totalData > indexOfFirstData && totalData < indexOfLastData) {
      return totalData;
    }
    return indexOfLastData;
  };

  return (
    <div className="mt-4">
      {/** Mobile Pagination */}
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          disabled={currentPage === 1}
          onClick={() => dispatch(paginate(currentPage - 1))}
          className={classNames(
            currentPage === 1
              ? "border-gray-200  text-gray-300"
              : "border-gray-300  text-gray-700  hover:bg-gray-50",
            "relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md bg-white"
          )}
        >
          Previous
        </button>
        <button
          disabled={currentPage === pageNumbers.length}
          onClick={() => dispatch(paginate(currentPage + 1))}
          className={classNames(
            currentPage === pageNumbers.length
              ? "border-gray-200  text-gray-300"
              : "border-gray-300  text-gray-700  hover:bg-gray-50",
            "relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md bg-white"
          )}
        >
          Next
        </button>
      </div>

      {/** Pagination */}
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between ">
        <p className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-medium">
            {!totalData ? 0 : indexOfFirstData + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium">
            {indexOfLastText(indexOfLastData, indexOfFirstData, totalData)}
          </span>{" "}
          of <span className="font-medium">{totalData}</span> results
        </p>
        {totalData !== 0 && (
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button
              disabled={currentPage === 1}
              onClick={() => dispatch(paginate(currentPage - 1))}
              className={classNames(
                currentPage === 1
                  ? "border-gray-200  text-gray-300"
                  : "border-gray-300  text-gray-500 hover:bg-gray-50",
                "relative inline-flex items-center px-2 py-2 rounded-l-md border bg-white text-sm font-medium"
              )}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => dispatch(paginate(number))}
                className={classNames(
                  currentPage === number
                    ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium",
                  ""
                )}
              >
                {number}
              </button>
            ))}

            <button
              disabled={currentPage === pageNumbers.length}
              onClick={() => dispatch(paginate(currentPage + 1))}
              className={classNames(
                currentPage === pageNumbers.length
                  ? "border-gray-200  text-gray-300"
                  : "border-gray-300  text-gray-500 hover:bg-gray-50",
                "relative inline-flex items-center px-2 py-2 rounded-r-md border bg-white text-sm font-medium"
              )}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
