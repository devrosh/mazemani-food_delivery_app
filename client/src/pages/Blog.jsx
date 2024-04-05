import React from "react";
import Post from "../components/Post";
const Blog = () => {
  return (
    <div className="w-full bg-gray-100 pt-10 pb-10 border-b border-gray-300">
      <div className="max-w-screen-lg mx-auto bg-white grid grid-cols-3 gap-10 px-5 py-10">
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default Blog;
