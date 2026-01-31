import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Viewer from "./pages/Viewer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view/:id" element={<Viewer />} />
      </Routes>
    </BrowserRouter>
  );
}
