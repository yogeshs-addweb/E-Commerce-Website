import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../store/StoreSlice";
import { useNavigate } from "react-router";
import SideFilter from "../component/SideFilter";
import { productApi } from "../api/AxiosInstance";
import Loading from "../assets/loader.webm";
import { toast } from "react-toastify";
import { FiFilter } from "react-icons/fi";
import empty from "../assets/empty.png";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    company: "",
    color: "",
    price: 1000,
  });

  useEffect(() => {
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
    toast.success("Product added !");
  };

  return (
    <section className="bg-gray-100 px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4 flex justify-end">
          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-2 text-sm bg-black text-white px-4 py-2 rounded hover:bg-red-500 transition"
          >
            <FiFilter /> Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filter */}
          <SideFilter
            filters={filters}
            setFilters={setFilters}
            products={products}
            isOpen={showFilter}
            onClose={() => setShowFilter(false)}
          />

          {/* Products Grid */}
          <div className="flex-1">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.length > 0 ? (
                  <>
                    {filteredProducts.map((item) => (
                      <div
                        data-aos="zoom-in"
                        key={item.id}
                        className="bg-white shadow rounded-lg hover:shadow-lg transition duration-300 flex flex-col"
                      >
                        <div className="h-60 overflow-hidden group">
                          <img
                            src={item.image}
                            alt={item.brand}
                            onClick={() => navigate(`/products/${item.id}`)}
                            className="object-contain w-full h-full transform group-hover:scale-110 transition duration-300 cursor-pointer p-3"
                          />
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <p className="text-gray-600 text-sm truncate">
                            {item.title}
                          </p>
                          <h5 className="text-lg font-bold text-gray-800 mt-1">
                            ₹ {item.price}
                          </h5>
                          <p className="text-sm text-gray-400 mt-1">
                            Brand: {item.brand}
                          </p>
                        </div>
                        <div className="px-4 pb-4">
                          <button
                            className="w-full bg-black text-white py-2 rounded-md text-sm hover:bg-red-500 transition"
                            onClick={() => addToCart(item)}
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="flex justify-center items-center md:h-[350px] md:w-[900px] mt-10">
                    <img src={empty} />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-screen">
                <video muted autoPlay loop className="w-20 sm:w-32 md:w-40">
                  <source src={Loading} type="video/webm" />
                </video>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
