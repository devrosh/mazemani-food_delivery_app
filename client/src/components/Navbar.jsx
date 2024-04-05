import React, { useState } from "react";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import "./Navbar.css";

const Navbar = () => {
  const [showModel, setShowModal] = useState(false);

  const showModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className="bg-white w-full h-[65px] mx-1 shadow-md sticky top-0 z-50">
      <div className="max-w-screen-lg mx-auto flex flex-row justify-between items-center">
        <a href="/">
          <img
            className="w-[75px] h-[65px] cursor-pointer"
            src="../src/assets/logo.png"
            alt="logo"
          />
        </a>

        <div className="flex flex-row gap-3 items-center">
          <button
            onClick={showModal}
            className="text-sm text-white bg-orange-500 rounded-sm px-5 py-2 hover:bg-orange-600"
          >
            Login
          </button>
        </div>
      </div>
      {showModel ? <SignInModal closeModal={closeModal} /> : ""}
    </div>
  );
};

export default Navbar;
