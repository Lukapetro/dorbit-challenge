import { createSlice } from '@reduxjs/toolkit'

const PAGE_SIZE = 5

const initialState = {
  currentPage: 1,
  dataPerPage: PAGE_SIZE
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    resetCurrentPage: (state) => {
      state.currentPage = 1
    },
    paginate: (state, { payload }) => {
      state.currentPage = payload
    }
  },
})

export const { resetCurrentPage, paginate } = tableSlice.actions

export default tableSlice.reducer