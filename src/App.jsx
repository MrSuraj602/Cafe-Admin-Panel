import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import FoodItems from "./pages/FoodItems";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/food-items" element={<FoodItems />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
