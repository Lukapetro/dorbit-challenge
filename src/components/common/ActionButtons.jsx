import { useDispatch, useSelector } from "react-redux";
import {
  setIntervalId,
  incrementCounter,
  reset,
} from "../../store/feature/table/tableSlice";
import { PlayIcon, PauseIcon, RefreshIcon } from "@heroicons/react/outline";

export default function ActionButtons() {
  const dispatch = useDispatch();
  const { intervalId } = useSelector((state) => state.table);

  const handleClick = () => {
    if (intervalId) {
      clearInterval(intervalId);
      dispatch(setIntervalId(0));
      return;
    }

    const newIntervalId = setInterval(() => {
      dispatch(incrementCounter());
    }, 1000);
    dispatch(setIntervalId(newIntervalId));
  };

  const handleReset = () => {
    clearInterval(intervalId);
    dispatch(setIntervalId(0));
    dispatch(reset());
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
