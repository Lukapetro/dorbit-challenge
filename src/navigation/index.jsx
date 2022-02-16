import { Route, Routes } from "react-router-dom";
import Graph from "../pages/Graph";
import Home from "../pages/Home";
import Table from "../pages/Table";

export default function Navigation() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="table" element={<Table />} />
      <Route path="graph" element={<Graph />} />
    </Routes>
  );
}
