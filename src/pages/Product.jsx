import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../store/StoreSlice";
import { useNavigate } from "react-router";
import SideFilter from "../component/SideFilter";
import { productApi } from "../api/AxiosInstance";
import empty from "../assets/empty.png";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    company: "",
    color: "",
    price: 1000,
  });

  useEffect(() => {
    // Fetch products from API
    const getProduct = async () => {
      try {
        const res = await productApi.get();
        setProducts(res.data.products);
      } catch (err) {
        console.log("Error", err);
      }
    };
    getProduct();
  }, []);

  useEffect(() => {
    // Apply filters whenever filters or products change
    let allItems = [...products];
    if (filters.category) {
      allItems = allItems.filter((p) => p.category === filters.category);
    }
    if (filters.company) {
      allItems = allItems.filter((p) => p.brand === filters.company);
    }
    if (filters.color) {
      allItems = allItems.filter(
        (p) => p.color?.toLowerCase() === filters.color.toLowerCase()
      );
    }
    allItems = allItems.filter((p) => p.price <= filters.price);
    setFilteredProducts(allItems);
  }, [filters, products]);

  const addToCart = (item) => {
    dispatch(add(item));
  };

  return (
    <>
      <div className="flex flex-col md:flex-row bg-gray-100 p-6 gap-6">
        {/* Sidebar Filters */}
        <SideFilter
          filters={filters}
          setFilters={setFilters}
          products={products}
        /> 

        {/* Product List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-1">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-60 overflow-hidden group">
                <img
                  src={item.image}
                  alt={item.brand}
                  onClick={() => navigate(`/products/${item.id}`)}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition duration-300 p-3 cursor-pointer"
                />
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm truncate">{item.title}</p>
                <h5 className="text-lg font-bold text-gray-800 mt-1">
                  ₹ {item.price}
                </h5>
                <p className="text-sm text-gray-400 mt-1">
                  Brand: {item.brand}
                </p>
              </div>
              <div className="px-4 pb-4">
                <button
                  className="w-full bg-black text-white py-2 rounded-md text-sm hover:bg-gray-800 transition"
                  onClick={() => addToCart(item)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Product Not Found Container */}
        {filteredProducts.length === 0 && (
          <div className="flex items-center justify-center flex-col gap-3 h-[450px] mt-10 w-full">
            <h3 className="text-red-500/80 font-bold text-3xl text-center">
              Product not found
            </h3>
            <img src={empty} alt="empty card" className="w-[350px]" />
          </div>
        )}
      </div>
    </>
  );
};
export default Product;
