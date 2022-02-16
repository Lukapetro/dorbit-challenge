import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  counter: 0,
  intervalId: 0,
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
    }
  },
})

export const { incrementCounter, setIntervalId, reset } = tableSlice.actions

export default tableSlice.reducer