import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import PageTitle from "../components/PageTitle";
import { fetchDataFromCsv } from "../store/feature/dataSlice";

export default function Graph() {
  const { data, loading, error } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataFromCsv());
  }, [dispatch, fetchDataFromCsv]);

  if (loading || error) return <p>oops, error while loading</p>;

  //const data = [2, 3, 1, 2, 5, 3];
  console.log("data :>> ", data);

  return (
    <div>
      <PageTitle text={"Graph"} />
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className="mt-4">
          <ResponsiveContainer width="90%" height={500}>
            <LineChart data={data[0]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis dataKey={(v) => v} />
              <Line type="monotone" dataKey={(v) => v} stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
