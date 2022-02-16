import Papa from "papaparse";
import CsvFile from "../data/data.csv";

export async function getDataFromCsv() {
  const data = Papa.parse(await fetchCsv());
  return data;
}

async function fetchCsv() {
  const response = await fetch(CsvFile);
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder("utf-8");
  const csv = await decoder.decode(result.value);
  return csv;
}
