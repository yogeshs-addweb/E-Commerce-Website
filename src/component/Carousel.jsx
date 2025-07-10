import React, { useEffect, useState } from "react";
import { productApi } from "../api/AxiosInstance";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router";

const Carousels = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      const res = await productApi.get();
      // console.log(res.data.products);
      setImages(res.data.products);
    } catch (err) {
      console.log("Error", err);
    }
  };
  return (
    <>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        stopOnHover
        useKeyboardArrows
        swipeable
      >
        {images?.slice(0, 7)?.map((item) => {
          return (
            <div
              key={item.id}
              className=" bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] -z-10"
            >
              <div className="flex flex-col md:flex-row gap-10 justify-center h-[550px] my-20 md:my-0 items-center px-4">
                <div className="md:space-y-6 space-y-3">
                  <h1 className="md:text-4xl text-xl font-bold uppercase line-clamp-2 md:line-clamp-3 md:w-[500px] text-white">
                    {item.model}
                  </h1>
                  <p className="md:w-[500px] line-clamp-3 text-gray-400 pr-7">
                    {item.description}
                  </p>
                  <button
                    onClick={() => {
                      navigate(`/products/${item.id}`);
                    }}
                    className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer mt-2"
                  >
                    Shop Now
                  </button>
                </div>
                <div className="cursor-pointer">
                  <img
                    src={item.image}
                    alt={item.model}
                    className="rounded-full h-[400px] hover:scale-105 transition-all cursor-pointer"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </>
  );
};
export default Carousels;
