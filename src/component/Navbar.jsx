import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { FaSortDown } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userApi } from "../api/AxiosInstance";

const Navbar = ({ location, dropdown, setDropdown, getLocation }) => {
  const product = useSelector((state) => state.card);
  const [user, setUser] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      userApi
        .get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log("Error fetching user", err);
        });
    }
  }, []);

  const removeData = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logout Success!");
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <h1 className="font-bold text-3xl">
              <span className="text-red-500 font-serif">S</span>tore
            </h1>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex gap-8 font-semibold">
          {["/", "/products", "/about", "/contact"].map((path, idx) => {
            const labels = ["Home", "Products", "About", "Contact"];
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `${
                    isActive ? "border-b-4 border-red-500" : "text-black"
                  } hover:text-red-500 transition duration-200`
                }
              >
                {labels[idx]}
              </NavLink>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-6">
          {/* Location */}
          <div className="relative hidden md:flex items-center gap-2 text-sm">
            <FaLocationDot className="text-red-500" />
            <div>
              {location ? (
                <div className="-space-y-2">
                  <p>{location.state_district}</p>
                  <p>{location.state}</p>
                </div>
              ) : (
                <span className="text-gray-400 italic">Detect Location</span>
              )}
            </div>
            <FaSortDown
              onClick={toggleDropdown}
              className="cursor-pointer"
              aria-label="Toggle location dropdown"
              aria-expanded={dropdown ? "true" : "false"}
            />
            {dropdown && (
              <div className="absolute top-14 right-0 w-64 bg-white border p-5 rounded-md shadow-2xl z-50">
                <div className="flex justify-between items-center mb-3">
                  <h1 className="font-semibold text-lg">Change Location</h1>
                  <IoMdClose
                    onClick={toggleDropdown}
                    className="cursor-pointer text-gray-600"
                  />
                </div>
                <button
                  onClick={getLocation}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Detect my location
                </button>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/card" className="relative">
            <FiShoppingCart size={26} />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {product.length}
            </span>
          </Link>

          {/* Auth Button */}
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <p className="text-sm font-semibold">{user.email}</p>
              <button
                onClick={removeData}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden md:inline-block bg-black hover:bg-red-500 text-white px-4 py-1 rounded"
            >
              Login
            </button>
          )}

          {/* Hamburger Menu */}
          <button
            className="lg:hidden text-2xl"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <IoMdClose /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="lg:hidden bg-white border-t px-6 pb-4">
          <nav className="flex flex-col gap-4 py-4">
            <NavLink to="/" onClick={() => setMobileMenu(false)}>
              Home
            </NavLink>
            <NavLink to="/products" onClick={() => setMobileMenu(false)}>
              Products
            </NavLink>
            <NavLink to="/about" onClick={() => setMobileMenu(false)}>
              About
            </NavLink>
            <NavLink to="/contact" onClick={() => setMobileMenu(false)}>
              Contact
            </NavLink>
          </nav>
          {user ? (
            <div className="flex flex-col gap-2 text-sm">
              <p className="font-semibold">{user.email}</p>
              <button
                onClick={() => {
                  removeData();
                  setMobileMenu(false);
                }}
                className="bg-red-500 text-white py-1 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setMobileMenu(false);
              }}
              className="w-full bg-black text-white py-2 rounded"
            >
              Login
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
