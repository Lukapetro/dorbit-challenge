import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../components/PageTitle";
import ActionButtons from "../components/common/ActionButtons";
import Pagination from "../components/table/Pagination";
import { fetchDataFromCsv } from "../store/feature/data/data.actions";

export default function Table() {
  const { counter, loading, error, currentData, data } = useSelector(
    (state) => state.data
  );
  const { currentPage, dataPerPage } = useSelector((state) => state.table);

  const dispatch = useDispatch();

  useEffect(() => {
    //data has already been fetched
    if (!data.length) {
      dispatch(fetchDataFromCsv());
    }
  }, [dispatch, fetchDataFromCsv, data.length]);

  // Get current datas
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;

  const paginatedData = currentData.slice(indexOfFirstData, indexOfLastData);

  if (error) return <p>oops.. error while loading data</p>;

  return (
    <>
      <div className="flex items-center mb-8">
        <PageTitle text={"Table"} />
        <ActionButtons />
      </div>

      {loading ? (
        <p>loading...</p>
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Timestamp
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        A
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        B
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        C
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {counter === 0 && (
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm text-gray-500">
                            Press the play button to start fetching some data
                          </p>
                        </td>
                      </tr>
                    )}
                    {paginatedData.slice(0, counter).map((row, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {row.timestamp}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{row.a}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{row.b}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{row.c}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination
                totalData={currentData.length}
                indexOfFirstData={indexOfFirstData}
                indexOfLastData={indexOfLastData}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
