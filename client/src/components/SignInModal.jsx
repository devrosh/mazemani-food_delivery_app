import React from "react";
import { IoMdCloseCircle } from "react-icons/io";

const SignInModal = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 transition ease-in-out delay-500 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center ">
      <div className=" w-[50%] h-[600px] shadow-md rounded-md flex flex-row bg-white gap-4 items-center ">
        <div className="w-[50%] h-[100%]">
          <img
            className="w-full h-[100%] object-cover center"
            src="../src/assets/hero.jpg"
            alt="modal-pic"
          />
        </div>
        <div className="w-[50%] pr-2">
          <IoMdCloseCircle
            onClick={closeModal}
            className="absolute top-[9%] right-[26%] cursor-pointer"
            color="orange"
            size={28}
          />
          <h1 className="text-center text-xl text-gray-600 font-medium pb-3 mb-4 border-b border-b-gray-300">
            Login to Mazemani
          </h1>
          <label>Email Address</label>
          <input
            className="w-full outline-none border border-gray-400 text-sm my-2 px-2 py-2 rounded-sm focus:border-orange-500"
            type="email"
            placeholder="Enter your email address"
          />
          <label>Password</label>
          <input
            className="w-full outline-none border border-gray-400 text-sm mb-5 mt-2 px-2 py-2 rounded-sm focus:border-orange-500"
            type="email"
            placeholder="Enter your password"
          />
          <input
            className="mr-2 mt-3 border border-orange-500 w-3 mb-3"
            type="checkbox"
          />
          <label className="text-sm">Remember Me</label>
          <button className="w-full bg-orange-500 text-white text-sm p-2 rounded-sm border-b mb-3 border-b-gray-300 hover:bg-orange-600">
            Login
          </button>
          <p className="text-center text-gray-600">Or Login using</p>
          <div className="flex flex-row justify-center items-center gap-5 my-3">
            <a>
              <button className="text-sm bg-blue-500 px-5 py-2 text-white rounded-sm">
                Facebook
              </button>
            </a>

            <button className="text-sm bg-orange-600 px-7 py-2 text-white rounded-sm">
              Google
            </button>
          </div>
          <p className="text-center text-sm text-gray-700 my-3">
            Dont have an account?
            <a className="text-orange-600 cursor-pointer hover:underline">
              SignUp
            </a>
          </p>
          <p className="text-center text-sm text-gray-700 mb-3">
            Forgot Password?
            <a className="text-orange-600 cursor-pointer hover:underline">
              Click here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
