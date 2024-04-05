import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-screen-lg mx-auto ">
        <h1 className="text-4xl text-gray-500 font-light py-8">About Us</h1>
      </div>
      <div className=" bg-white flex flex-col justify-center items-center mx-auto border border-gray-200 py-10">
        <p className="w-[75%] mb-3 text-xl text-gray-600 font-light">
          Mazemani is one of the first company in Nepal that delivers food from
          hundreds of popular restaurants. As a pioneer food delivery service
          provider, we are making life easier through online ordering.
        </p>
        <p className="w-[75%] mb-5 text-md text-gray-600 font-light">
          We know that your time is valuable and sometimes every minute in the
          day counts. That’s why we deliver! So you can spend more time doing
          the things you love. You can get anything from Indian food to high
          French cuisine by placing a simple order online through our website,
          mobile app or over the phone. Then just sit back, relax, and wait for
          your order to arrive.
        </p>
      </div>
    </div>
  );
};

export default About;
