import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Books from "./pages/Books";
import Add from "./pages/Add";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
