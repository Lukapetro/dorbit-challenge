import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './feature/data/data.slice'
import tableSlice from './feature/table/tableSlice'

export const store = configureStore({
  reducer: {
    data: dataSlice,
    table: tableSlice
  },
})