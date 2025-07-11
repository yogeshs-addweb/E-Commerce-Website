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
      setImages(res.data.products);
      // console.log(res);  
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <Carousel
      showThumbs={false}
      autoPlay
      infiniteLoop
      interval={3000}
      stopOnHover
      useKeyboardArrows
      swipeable
      showStatus={false}
    >
      {images?.slice(0, 7)?.map((item) => (
        <div
          key={item.id}
          className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 py-10 md:py-0"
        >
          <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-center min-h-[500px] gap-10">
            {/* Text Section */}
            <div className="text-center md:text-left space-y-4 md:space-y-6 max-w-xl px-4">
              <h1 className="text-white font-bold text-2xl md:text-4xl uppercase leading-tight">
                {item.brand}
              </h1>
              <p className="text-gray-300 text-sm md:text-base">{item.title}</p>
              <button
                onClick={() => navigate(`/products/${item.id}`)}
                className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-4 py-2 rounded-md text-sm md:text-base hover:scale-105 transition-transform"
              >
                Shop Now
              </button>
            </div>

            {/* Image Section */}
            <div className="flex justify-center">
              <img
                src={item.image}
                alt={item.model}
                className="rounded-full h-72 md:h-[400px] object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Carousels;
