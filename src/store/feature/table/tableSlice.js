import { createSlice } from '@reduxjs/toolkit'

const PAGE_SIZE = 5

const initialState = {
  counter: 0,
  intervalId: 0,

  //pagination
  currentPage: 1,
  dataPerPage: PAGE_SIZE
}

export const tableSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementCounter: (state) => {
      state.counter += 1
    },
    setIntervalId: (state, { payload }) => {
      state.intervalId = payload
    },
    reset: (state) => {
      state.counter = 0
      state.intervalId = 0
      state.currentPage = 1
    },
    paginate: (state, { payload }) => {
      state.currentPage = payload
    }
  },
})

export const { incrementCounter, setIntervalId, reset, paginate } = tableSlice.actions

export default tableSlice.reducer