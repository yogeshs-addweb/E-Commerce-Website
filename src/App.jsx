import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import Navbar from "./component/Navbar";
import Error from "./pages/Error";
import "./App.css";
import Card from "./pages/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import SingleProduct from "./pages/SingleProduct";

function App() {
  const [location, setLocation] = useState([]);
  const [dropdown, setDropdown] = useState(false);

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

      try {
        const location = await axios.get(url);
        const exactLocation = location.data.address;
        setLocation(exactLocation);
        setDropdown(false);
      } catch (error) {
        console.log("Error", error);
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <Navbar
        location={location}
        dropdown={dropdown}
        setDropdown={setDropdown}
        getLocation={getLocation}
      />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/products" element={<Product />}></Route>
        <Route path="/products/:id" element={<SingleProduct />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/card" element={<Card />}></Route>
        <Route path="/*" element={<Error />}></Route>
      </Routes>
    </>
  );
}
export default App;
