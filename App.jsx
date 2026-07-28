import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SortingVisualizer from "./pages/SortingVisualizer";
import SearchingVisualizer from "./pages/SearchingVisualizer";
import StackVisualizer from "./pages/StackVisualizer";
import QueueVisualizer from "./pages/QueueVisualizer";
import LinkedListVisualizer from "./pages/LinkedListVisualizer";
import BinarySearchTreeVisualizer from "./pages/BinarySearchTreeVisualizer";
import GraphVisualizer from "./pages/GraphVisualizer";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sorting" element={<SortingVisualizer />} />
        <Route path="/searching" element={<SearchingVisualizer />} />
        <Route path="/stack" element={<StackVisualizer />} />
        <Route path="/queue" element={<QueueVisualizer />} />
        <Route path="/linked-list"element={<LinkedListVisualizer />} />
        <Route path="/binary-search-tree"element={<BinarySearchTreeVisualizer />} />
        <Route path="/graph" element={<GraphVisualizer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
       <Footer />
    </BrowserRouter>
  );
}

export default App;
