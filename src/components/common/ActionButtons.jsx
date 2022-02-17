import { useDispatch, useSelector } from "react-redux";
import { PlayIcon, PauseIcon, RefreshIcon } from "@heroicons/react/outline";
import {
  incrementCounterAndUpdateCurrentData,
  reset,
  setIntervalId,
} from "../../store/feature/data/data.slice";
import { resetCurrentPage } from "../../store/feature/table/tableSlice";

export default function ActionButtons() {
  const dispatch = useDispatch();
  const { intervalId } = useSelector((state) => state.data);

  const handleClick = () => {
    if (intervalId) {
      clearInterval(intervalId);
      dispatch(setIntervalId(0));
      return;
    }

    const newIntervalId = setInterval(() => {
      dispatch(incrementCounterAndUpdateCurrentData());
    }, 1000);
    dispatch(setIntervalId(newIntervalId));
  };

  const handleReset = () => {
    clearInterval(intervalId);
    dispatch(reset());
    dispatch(resetCurrentPage());
  };

  return (
    <div className="ml-10 flex items-baseline space-x-4">
      <button
        type="button"
        className=" p-1 rounded-full text-black hover:text-gray-400"
        onClick={handleClick}
      >
        {intervalId ? (
          <PauseIcon className="h-8 w-8" aria-hidden="true" />
        ) : (
          <PlayIcon className="h-8 w-8" aria-hidden="true" />
        )}
      </button>
      <button
        type="button"
        className=" p-1 rounded-full text-black hover:text-gray-400"
        onClick={handleReset}
      >
        <RefreshIcon className="h-8 w-8" aria-hidden="true" />
      </button>
    </div>
  );
}
