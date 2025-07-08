import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../store/StoreSlice";

const Card = () => {
  const product = useSelector((state) => state.card);
  const dispatch = useDispatch();

  const removeToCard = (id) => {
    dispatch(remove(id));
  };

  const cards = product.map((item) => (
    <div
      key={item.id}
      className="flex flex-row flex-wrap gap-8 justify-center shadow-sm"
    >
      <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
        <div className="relative h-60 m-2.5 overflow-hidden text-white rounded-md">
          <img src={item.image} />
        </div>
        <div className="p-4">
          <h6 className="mb-2 text-slate-800 text-xl font-semibold">
            {item.category}
          </h6>
          <p className="text-slate-600 leading-normal font-light">
            {item.title}
          </p>
          <h5 className="mb-2 text-slate-800 text-xl font-semibold">
            Price : {item.price}
          </h5>
        </div>
        <div className="px-4 pb-4 pt-0 mt-2">
          <button
            className="rounded-md bg-red-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md"
            type="button"
            onClick={() => removeToCard(item.id)}
          >
            Remove From Card
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <div className="flex flex-wrap gap-8 justify-center shadow-sm">
        {cards}
      </div>
    </>
  );
};
export default Card;
