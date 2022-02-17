import { createAsyncThunk } from "@reduxjs/toolkit"
import { getDataFromCsv } from "../../../utils/getDataFromCsv"

export const fetchDataFromCsv = createAsyncThunk(
  'data/fetchDataFromCsv',
  async () => {
    const response = await getDataFromCsv()
    return response.data
  }
)