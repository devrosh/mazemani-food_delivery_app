import React from "react";
import { Link } from "react-router-dom";
const Post = () => {
  return (
    <Link to="/post_detail">
      <div className="bg-[url('/src/assets/blog3.jpg')] w-[300px] h-[500px] cursor-pointer rounded-sm bg-cover bg-center flex flex-col justify-end">
        <div className="w-full h-[90px] bg-black bg-opacity-50 p-4 transition 0.5s ease-out hover:bg-opacity-60">
          <p className="text-gray-100 text-center text-xs uppercase font-light">
            Food Trend / Restro-Tales
          </p>
          <p className="text-gray-100 text-center text-xl  font-light py-2">
            The Tales Of Newari Taste
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Post;
