import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { add } from "../store/StoreSlice";
const apiKey = import.meta.env.VITE_PRODUCT_API;

const Product = () => {
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const res = await axios.get(apiKey);
      console.log(res.data.products);
      setProduct(res.data.products);
    } catch (err) {
      console.log("Error", err);
    }
  };

  const addToCard = (item) => {
    dispatch(add(item));
  };

  return (
    <>
      <div className="flex flex-wrap gap-8 justify-center shadow-sm">
        {product.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96"
          >
            <div className="relative h-60 m-2.5 overflow-hidden text-white rounded-md">
              <img src={item.image} />
            </div>
            <div className="p-4">
              <p className="text-slate-600 leading-normal font-light">
                {item.title}
              </p>
              <h5 className="mb-2 text-slate-800 text-xl font-semibold">
                Price : {item.price}
              </h5>
            </div>
            <div className="px-4 pb-4 pt-0 mt-2">
              <button
                className="rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white"
                type="button"
                onClick={() => addToCard(item)}
              >
                Add To Card
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Product;
