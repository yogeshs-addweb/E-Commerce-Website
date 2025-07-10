import React, { useState } from "react";

const Delivery = ({ location, getLocation }) => {
  const [user, setUser] = useState([]);

  return (
    <>
      <div className="bg-gray-100 rounded-md p-7 mt-4 space-y-2">
        <h1 className="text-gray-800 font-bold text-xl">Delivery Info</h1>
        <div className="flex flex-col space-y-1">
          <label htmlFor="">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="p-2 rounded-md"
            defaultValue={user?.fullName}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="">Address</label>
          <input
            type="text"
            placeholder="Enter your address"
            className="p-2 rounded-md"
            defaultValue={location?.village}
          />
        </div>
        <div className="flex w-full gap-5">
          <div className="flex flex-col space-y-1 w-full">
            <label htmlFor="">State</label>
            <input
              type="text"
              placeholder="Enter your state"
              className="p-2 rounded-md w-full"
              defaultValue={location?.state}
            />
          </div>
          <div className="flex flex-col space-y-1 w-full">
            <label htmlFor="">PinCode</label>
            <input
              type="text"
              placeholder="Enter your pincode"
              className="p-2 rounded-md w-full"
              defaultValue={location?.postcode}
            />
          </div>
        </div>
        <div className="flex w-full gap-5">
          <div className="flex flex-col space-y-1 w-full">
            <label htmlFor="">Country</label>
            <input
              type="text"
              placeholder="Enter your country"
              className="p-2 rounded-md w-full"
              defaultValue={location?.country}
            />
          </div>
          <div className="flex flex-col space-y-1 w-full">
            <label htmlFor="">Phone No</label>
            <input
              type="text"
              placeholder="Enter your number"
              className="p-2 rounded-md w-full"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer"
        >
          Submit
        </button>
        <div className="flex items-center justify-center w-full text-gray-700">
          ---------OR-----------
        </div>
        <div className="flex justify-center cursor-pointer">
          <button
            onClick={() => getLocation}
            className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer"
          >
            Detect Location
          </button>
        </div>
      </div>
    </>
  );
};
export default Delivery;
