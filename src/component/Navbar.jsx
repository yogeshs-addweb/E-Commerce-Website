import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { FiShoppingCart } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { FaSortDown } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const Navbar = ({ location, dropdown, setDropdown, getLocation }) => {
  const product = useSelector((state) => state.card);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };
  return (
    <>
      <div className="bg-white py-4 px-6 text-black flex justify-between items-center shadow-2xl">
        {/* Logo Section */}
        <div className="flex gap-6 items-center">
          <Link to={"/"}>
            <h1 className="font-bold text-3xl">
              <span className="text-red-500 font-serif">S</span>tore
            </h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-8">
          <NavLink
            to="/"
            exact
            className={({ isActive }) =>
              `${isActive ? "border-b-4 border-red-500" : "text-black"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `${isActive ? "border-b-4 border-red-500" : "text-black"}`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${isActive ? "border-b-4 border-red-500" : "text-black"}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${isActive ? "border-b-4 border-red-500" : "text-black"}`
            }
          >
            Contact
          </NavLink>
        </div>

        {/* location detect  */}
        <div className="flex gap-10 items-center">
          <div className="flex items-center gap-2">
            <FaLocationDot className="text-red-500" />
            <span className="text-black ">
              {location ? (
                <div className="-space-y-2">
                  <p>{location.village}</p>
                  <p>{location.state}</p>
                </div>
              ) : (
                "Detect Location"
              )}
            </span>
            <FaSortDown
              onClick={toggleDropdown}
              className="cursor-pointer"
              aria-label="Toggle location dropdown"
              aria-expanded={dropdown ? "true" : "false"}
            />

            {dropdown ? (
              <div className="w-[250px] h-max shadow-2xl bg-white absolute top-20 end-44 border-2 p-5 border-gray-100 rounded-md">
                <h1 className="font-semibold mb-4 text-xl flex justify-between">
                  Change Location{" "}
                  <span onClick={toggleDropdown}>
                    <IoMdClose className="cursor-pointer" />
                  </span>
                </h1>
                <button
                  onClick={getLocation}
                  className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer"
                >
                  Detect my location
                </button>
              </div>
            ) : null}
          </div>

          <Link to="/card">
            <span className="relative">
              <FiShoppingCart size={28} />

              <span className="absolute  bottom-3 left-4 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {product.length}
              </span>
            </span>
          </Link>

          {/* Login Button */}
          <button className="bg-black text-white font-semibold py-1 px-4 rounded">
            Login
          </button>
        </div>
      </div>
    </>
  );
};
export default Navbar;
