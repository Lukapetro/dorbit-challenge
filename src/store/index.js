import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './feature/dataSlice'
import tableSlice from './feature/table/tableSlice'

export const store = configureStore({
  reducer: {
    data: dataSlice,
    table: tableSlice
  },
})