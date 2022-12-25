import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaleTime from "./pages/1.StaleTime";
import QueryMount from "./pages/2.QueryMount";
import QueryData from "./pages/3.QueryData";
import QueryContext from "./pages/4.QueryContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/stale-time" element={<StaleTime />} />
        <Route path="/query-mount" element={<QueryMount />} />
        <Route path="/query-data" element={<QueryData />} />
        <Route path="/query-context" element={<QueryContext />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
