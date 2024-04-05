import React from "react";

const DeliveryCharges = () => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-screen-lg mx-auto ">
        <h1 className="text-4xl text-gray-500 font-light py-8">
          Delivery Charge
        </h1>
      </div>
      <div className=" bg-white border border-gray-200 ">
        <div className="max-w-screen-lg mx-auto py-10">
          <p className="w-[75%] mb-2 text-md text-gray-600 font-bold">
            Foodmandu Fresh Orders:
          </p>
          <p className="text-gray-800 font-light"> Rs. 100 per order</p>
          <p className="mt-2 mb-1 text-md text-gray-600 font-bold">
            Restaurants and other stores
          </p>
          <p className="w-[85%] mb-5 text-md text-gray-600 font-light">
            The delivery charge is calculated based on the restaurant bill total
            and the approximate road distance between the selected restaurant
            and the delivery location.
          </p>
          <ul className="text-md text-gray-800 font-light">
            <li>- Up to 1.5 Km: Rs. 25</li>
            <li>- After 1.5 Km: Additional Rs. 25/km</li>
            <li>
              - If your order value exceeds Rs. 1000, the maximum charge will be
              Rs. 75 only, even for longer distances.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCharges;
