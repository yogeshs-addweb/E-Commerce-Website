import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../store/StoreSlice";
import { productApi } from "../api/AxiosInstance";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    company: "",
    color: "",
    price: 1000,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, product]);

  const getProduct = async () => {
    try {
      const res = await productApi;
      setProduct(res.data.products);
      console.log(res.data.products);
    } catch (err) {
      console.log("Error", err);
    }
  };

  const addToCard = (item) => {
    dispatch(add(item));
  };

  const applyFilters = () => {
    let allItems = [...product];
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
  };

  const uniqueValues = (key) => [...new Set(product.map((p) => p[key]))];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 p-6 gap-6">
      {/* Sidebar Filters */}
      <aside className="md:w-64 w-full bg-white p-6 rounded-lg shadow-md sticky top-24 h-fit">
        <h2 className="text-xl font-semibold mb-6 border-b pb-2">Filters</h2>

        {/* Category Filter */}
        <div className="mb-4">
          <label className="block font-medium text-sm mb-1">Category</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="">All</option>
            {uniqueValues("category").map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Company Filter */}
        <div className="mb-4">
          <label className="block font-medium text-sm mb-1">Company</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={filters.company}
            onChange={(e) =>
              setFilters({ ...filters, company: e.target.value })
            }
          >
            <option value="">All</option>
            {uniqueValues("brand").map((comp) => (
              <option key={comp} value={comp}>
                {comp}
              </option>
            ))}
          </select>
        </div>

        {/* Color Filter */}
        <div className="mb-4">
          <label className="block font-medium text-sm mb-1">Color</label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            placeholder="e.g. red"
            value={filters.color}
            onChange={(e) => setFilters({ ...filters, color: e.target.value })}
          />
        </div>

        {/* Price Filter */}
        <div className="mb-4">
          <label className="block font-medium text-sm mb-1">
            Max Price: ₹{filters.price}
          </label>
          <input
            type="range"
            min={0}
            max={1000}
            step={10}
            value={filters.price}
            onChange={(e) =>
              setFilters({ ...filters, price: Number(e.target.value) })
            }
            className="w-full"
          />
        </div>

        <button
          onClick={() =>
            setFilters({ category: "", company: "", color: "", price: 1000 })
          }
          className="w-full mt-6 text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Clear Filters
        </button>
      </aside>

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
                className="object-cover w-full h-full transform group-hover:scale-105 transition duration-300 p-3"
              />
            </div>
            <div className="p-4">
              <p className="text-gray-600 text-sm truncate">{item.title}</p>
              <h5 className="text-lg font-bold text-gray-800 mt-1">
                ₹ {item.price}
              </h5>
              <p className="text-sm text-gray-400 mt-1">Brand: {item.brand}</p>
            </div>
            <div className="px-4 pb-4">
              <button
                className="w-full bg-black text-white py-2 rounded-md text-sm hover:bg-gray-800 transition"
                onClick={() => addToCard(item)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 col-span-full mt-12">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Product;
