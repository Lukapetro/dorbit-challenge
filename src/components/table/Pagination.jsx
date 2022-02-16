import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { paginate } from "../../store/feature/table/tableSlice";

export default function Pagination({
  totalData,
  indexOfFirstData,
  indexOfLastData,
  indexInBetween,
}) {
  const pageNumbers = [];
  const dispatch = useDispatch();
  const { counter, currentPage, dataPerPage } = useSelector(
    (state) => state.table
  );

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  const indexOfLastText = (
    indexOfLastData,
    indexOfFirstData,
    indexInBetween
  ) => {
    if (!counter) return "0";
    if (counter > indexOfFirstData && counter < indexOfLastData) {
      return indexInBetween;
    }
    return indexOfLastData;
  };

  return (
    <div className="mt-4">
      {/** Mobile Pagination */}

      <div className="flex-1 flex justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>

      {/** Pagination */}
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between ">
        <p className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-medium">
            {!counter ? "0" : indexOfFirstData + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium">
            {indexOfLastText(indexOfLastData, indexOfFirstData, indexInBetween)}
          </span>{" "}
          of <span className="font-medium">{counter}</span> results
        </p>
        {counter !== 0 && (
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
              <a
                key={number}
                onClick={() => dispatch(paginate(number))}
                className={classNames(
                  currentPage === number
                    ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium",
                  ""
                )}
                href="#"
              >
                {number}
              </a>
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
