import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../components/PageTitle";
import { format } from "date-fns";
import ActionButtons from "../components/common/ActionButtons";
import Pagination from "../components/table/Pagination";
import { fetchDataFromCsv } from "../store/feature/data/data.actions";

export default function Table() {
  const { data, loading, error } = useSelector((state) => state.data);
  const { counter, isPollingActive, currentPage, dataPerPage } = useSelector(
    (state) => state.table
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataFromCsv());
  }, [dispatch, fetchDataFromCsv]);

  const now = format(new Date(), "HH:mm:ss");

  // Get current datas
  let currentData = [];
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const indexInBetween = indexOfLastData - (indexOfLastData - counter);
  currentData = data.slice(indexOfFirstData, indexOfLastData);

  //if counter is beetween indexLast & indexFirst, slice till counter
  if (counter > indexOfFirstData && counter < indexOfLastData) {
    currentData = data.slice(indexOfFirstData, indexInBetween);
  }

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
                    {counter === 0 && !isPollingActive && (
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm text-gray-500">
                            Press the play button to start fetching some data
                          </p>
                        </td>
                      </tr>
                    )}
                    {currentData.slice(0, counter).map((row, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{now}</div>
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
                totalData={data.slice(0, counter).length}
                indexOfFirstData={indexOfFirstData}
                indexOfLastData={indexOfLastData}
                indexInBetween={indexInBetween}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
