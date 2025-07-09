import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { add } from "../store/StoreSlice";
import Loading from "../assets/loader.webm";
const singleApi = import.meta.env.VITE_SINGLE_API;
// import { singleApi } from "../api/AxiosInstance";

const SingleProduct = () => {
  const [SingleProduct, setSingleProduct] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  const addToCart = (item) => {
    dispatch(add(item));
  };

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`${singleApi}${params.id}`);
      const product = res.data.product;
      setSingleProduct(product);
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    if (params.id) {
      getSingleProduct();
    }
  }, [params.id]);

  return (
    <>
      {SingleProduct ? (
        <div className="px-4 pb-4 md:px-0">
          <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Image */}
            <div className="w-full flex justify-center">
              <img
                src={SingleProduct.image}
                alt={SingleProduct.title}
                className="rounded-2xl w-full max-w-[500px] object-cover shadow-lg"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-6">
              <h1 className="md:text-3xl text-2xl font-bold text-gray-800">
                {SingleProduct.title}
              </h1>
              <div className="text-gray-700 text-sm">
                <span>{SingleProduct.brand?.toUpperCase()} / </span>
                <span>{SingleProduct.category?.toUpperCase()} / </span>
                <span>{SingleProduct.model}</span>
              </div>

              {/* Price and Discount */}
              <p className="text-xl text-red-500 font-bold flex items-center gap-4">
                <span>${SingleProduct.price}</span>
                {SingleProduct.discount > 0 && (
                  <span className="text-sm text-gray-600 line-through">
                    $
                    {SingleProduct.price +
                      SingleProduct.price * (SingleProduct.discount / 100)}
                  </span>
                )}
                {SingleProduct.discount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {SingleProduct.discount}% OFF
                  </span>
                )}
              </p>

              {/* Product Description */}
              <p className="text-gray-600 text-sm">
                {SingleProduct.description}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <label htmlFor="" className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <input
                  type="number"
                  min={1}
                  defaultValue={1}
                  className="w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 foucs:ring-red-500"
                />
              </div>
              {/* Add to Cart Button */}
              <div className="flex gap-4 mt-6">
                <button
                  className="w-full bg-black text-white py-3 rounded-md text-sm font-semibold hover:bg-gray-800 transition duration-300"
                  onClick={() => addToCart(SingleProduct)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <video muted autoPlay loop className="w-40">
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
