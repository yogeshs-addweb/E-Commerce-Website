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
import LoginForm from "./auth/LoginForm";
import Footer from "./component/Footer";
import { useLocation } from "react-router-dom";

function App() {
  const [location, setLocation] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const locationPath = useLocation();
  const hideLayoutPaths = ["/login"];
  const shouldHideLayout = hideLayoutPaths.includes(locationPath.pathname);

  const getLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

      try {
        const location = await axios.get(url);
        const address = location.data.address;
        console.log(address);
        setLocation(address);
        setDropdown(false);
      } catch (error) {
        console.log("Error fetching location", error);
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      {!shouldHideLayout && (
        <Navbar
          location={location}
          dropdown={dropdown}
          setDropdown={setDropdown}
          getLocation={getLocation}
        />
      )}

      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/card"
          element={<Card location={location} getLocation={getLocation} />}
        />
        <Route path="/*" element={<Error />} />
      </Routes>

      {!shouldHideLayout && <Footer />}
    </>
  );
}
export default App;
