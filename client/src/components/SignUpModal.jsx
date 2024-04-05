import React from "react";

const SignUpModal = () => {
  return (
    <div className="w-[50%] h-[600px] mt-3 shadow-md rounded-md bg-white gap-4 items-center z-50 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div className="w-[80%] mx-auto">
        <h1 className="text-center text-xl text-gray-600 font-medium pb-3 mb-4 border-b border-b-gray-300">
          Join Mazemani
        </h1>{" "}
        <label>
          First Name
          <input
            className="w-full outline-none border border-gray-400 text-sm my-2 px-2 py-2 rounded-sm focus:border-orange-500"
            type="email"
            placeholder="Enter your first name"
          />
        </label>
        <label>
          Last Name
          <input
            className="w-full outline-none border border-gray-400 text-sm mb-5 mt-2 px-2 py-2 rounded-sm focus:border-orange-500"
            type="email"
            placeholder="Enter your last name"
          />
        </label>
        <label>
          Email Address
          <input
            className="w-full outline-none border border-gray-400 text-sm my-2 px-2 py-2 rounded-sm focus:border-orange-500"
            type="email"
            placeholder="Enter your email address"
          />
        </label>
        <label>
          Mobile Number
          <input
            className="w-full outline-none border border-gray-400 text-sm my-2 px-2 py-2 rounded-sm focus:border-orange-500"
            type="number"
            placeholder="Enter your mobile number"
          />
        </label>
        <label>Password:</label>
        <input
          className="w-full outline-none border border-gray-400 text-sm mb-5 mt-2 px-2 py-2 rounded-sm focus:border-orange-500"
          type="password"
          placeholder="Enter your password"
        />
        <label> Address:</label>
        <input
          className="w-full outline-none border border-gray-400 text-sm mb-5 mt-2 px-2 py-2 rounded-sm focus:border-orange-500"
          type="text"
          placeholder="Enter your current address"
        />
        <div className="relative p-5 my-1 text-center cursor-pointer border border-dashed border-orange-300">
          <IoCloudUploadOutline
            className="flex items-center"
            color="dark-gray"
            size={70}
          />
          <h3> Click box to upload</h3>
          <p className="mt-1 text-gray-700">Maximun file size 10mb</p>
          <input
            className="block w-[100%] h-[100%]  absolute top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer"
            type="file"
          />
        </div>
        <p className="text-gray-600 mb-3">
          By Signing Up, I agree to Foodmandu’s Terms of Use and Privacy Policy.
        </p>
        <button className="w-full bg-orange-500 text-white text-sm p-2 rounded-sm border-b mb-3 border-b-gray-300 hover:bg-orange-600">
          SignUp
        </button>
        <p className="text-center text-gray-600">Or Register using</p>
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
          Already have an account?
          <a className="text-orange-600 cursor-pointer hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpModal;
