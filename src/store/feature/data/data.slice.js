import { createSlice } from '@reduxjs/toolkit'
import { format } from 'date-fns';
import { fetchDataFromCsv } from './data.actions';

const initialState = {
  data: [],
  currentData: [],
  error: "",
  loading: false,
  counter: 0,
  intervalId: 0,
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setCurrentData: (state, { payload }) => {
      state.currentData = payload
    },
    incrementCounterAndUpdateCurrentData: (state) => {
      state.counter += 1
      const currentData = state.data.slice(0, state.counter)
      const index = state.counter - 1
      const timestamp = format(new Date(), "HH:mm:ss");
      Object.assign(currentData[index], { timestamp: timestamp });
      state.currentData = currentData
    },
    setIntervalId: (state, { payload }) => {
      state.intervalId = payload
    },
    reset: (state) => {
      state.counter = 0
      state.intervalId = 0
      state.currentData = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataFromCsv.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchDataFromCsv.fulfilled, (state, { payload }) => {
      //Convert into an array of objects
      var objs = payload.slice(1).map((x) => {
        return {
          a: x[0],
          b: x[1],
          c: x[2]
        };
      });

      state.loading = false;
      state.data = objs;
    });

    builder.addCase(fetchDataFromCsv.rejected, (state, { payload }) => {
      state.error = payload
      state.loading = false;
    });
  },
})

export const { setCurrentData, incrementCounterAndUpdateCurrentData, setIntervalId, reset } = dataSlice.actions

export default dataSlice.reducer