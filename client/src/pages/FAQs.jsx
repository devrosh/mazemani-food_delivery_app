import React, { useState } from "react";
import { accordionData } from "../data/data";

const FAQs = () => {
  const [showContent, setShowContent] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleShow = (index) => {
    setShowContent(!showContent);
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 border-y border-gray-300">
      <div className="max-w-screen-lg mx-auto ">
        <h1 className="text-4xl text-gray-500 font-light py-6">FAQs</h1>
      </div>
      <div className="bg-white">
        {accordionData.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => handleShow(index)}
              className="max-w-screen-lg mx-auto cursor-pointer border-t border-gray-200  bg-white py-8"
            >
              <h3 className="text-xl text-orange-500 font-light">
                {item.question}
              </h3>
              {showContent && index === activeIndex ? (
                <p className="text-gray-500 font-light my-2">{item.answer}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQs;
