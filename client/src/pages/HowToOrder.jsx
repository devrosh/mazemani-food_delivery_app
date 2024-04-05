import React from "react";

const HowToOrder = () => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-screen-lg mx-auto ">
        <h1 className="text-5xl text-gray-700 font-light py-8">How to order</h1>
      </div>
      <div className=" bg-white flex flex-col justify-center items-center  mx-auto border border-gray-200 py-10">
        <p className="w-[75%] mb-5 text-xl text-gray-600 font-light">
          Ordering food using our service is very easy! Follow the steps
          mentioned below to place your order with us.
        </p>
        <div className="bg-white flex flex-col justify-center items-center mx-auto px-5">
          <p className="w-[75%] mb-3 text-md text-gray-600 font-light">
            Step 1: Find a restaurant of your choice from here. There are
            hundreds of popular restaurants to choose from.
          </p>
          <p className="w-[75%] mb-3 text-md text-gray-600 font-light">
            Step 2: Select the foods of your choice from the selected
            restaurant's menu. The menu and price listed on our website is
            exactly the same as the restaurant's table menu.
          </p>
          <p className="w-[75%] mb-3 text-md text-gray-600 font-light">
            Step 3: Fill up the delivery details i.e. your detailed address,
            date and time for delivery and confirm your order. We’ll deliver
            your order at your place, and you’ll pay us in cash upon delivery.
          </p>
          <p className="w-[75%] mb-3 text-md text-gray-600 font-light">
            OR, Alternatively, you may place your orders with us over phone at
            4444177 or 9802034008 in our delivery hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowToOrder;
