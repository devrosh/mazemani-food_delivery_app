import React from "react";
import { Link } from "react-router-dom";

const Card = ({ restaurantImage, restaurantName }) => {
  return (
    <div className="w-[300px] h-auto rounded-sm cursor-pointer mb-5">
      <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
        <Link to="/restaurant_detail">
          <img
            className=" mb-2 max-w-xs transition duration-300 ease-in-out hover:scale-105"
            src={restaurantImage}
            alt="rest-image"
          />
        </Link>
      </div>
      <Link to="/restaurant_detail">
        {" "}
        <p className="text-md text-gray-500 font-light hover:text-red-500">
          {restaurantName}
        </p>
      </Link>
    </div>
  );
};

export default Card;
