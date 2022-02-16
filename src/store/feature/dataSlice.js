import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getDataFromCsv } from '../../utils/getDataFromCsv'

const initialState = {
  data: [],
  error: "",
  loading: false
}

export const fetchDataFromCsv = createAsyncThunk(
  'data/fetchDataFromCsv',
  async () => {
    const response = await getDataFromCsv()
    return response.data
  }
)

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
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

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer