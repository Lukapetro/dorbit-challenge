import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import ActionButtons from "../components/common/ActionButtons";
import PageTitle from "../components/PageTitle";
import { fetchDataFromCsv } from "../store/feature/data/data.actions";

export default function Graph() {
  const { data, loading, error, currentData } = useSelector(
    (state) => state.data
  );
  const dispatch = useDispatch();

  useEffect(() => {
    //data has already been fetched
    if (!data.length) {
      dispatch(fetchDataFromCsv());
    }
  }, [dispatch, fetchDataFromCsv, data.length]);

  if (loading || error) return <p>oops, error while loading</p>;

  const graphData = currentData.map((data) => {
    return {
      name: data.timestamp,
      data: [
        { category: "a", value: parseInt(data.a) },
        { category: "b", value: parseInt(data.b) },
        { category: "c", value: parseInt(data.c) },
      ],
    };
  });

  return (
    <>
      <div className="flex items-center mb-8">
        <PageTitle text={"Graph"} />
        <ActionButtons />
      </div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className="mt-4">
          {!currentData.length ? (
            <p className="text-sm text-gray-500">
              Press the play button to start fetching some data
            </p>
          ) : (
            <ResponsiveContainer width="90%" height={500}>
              <LineChart width={500} height={300}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="category"
                  type="category"
                  allowDuplicatedCategory={false}
                />
                <YAxis dataKey="value" />
                {graphData.map((s) => (
                  <Line
                    dataKey="value"
                    data={s.data}
                    name={s.name}
                    key={s.name}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      )}
    </>
  );
}
