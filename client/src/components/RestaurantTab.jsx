import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { IoArrowUpCircle } from "react-icons/io5";
const RestaurantTab = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [showButton, setShowButton] = useState(false);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const handleScrollButtonVisibility = () => {
      window.scrollY > 300 ? setShowButton(true) : setShowButton(false);
    };
    window.addEventListener("scroll", handleScrollButtonVisibility);
    return () => {
      window.removeEventListener("scroll", handleScrollButtonVisibility);
    };
  });
  return (
    <div className="w-full h-full max-w-screen-lg mx-auto bg-white ">
      <div className="flex flex-row justify-between items-center border-b border-gray-200">
        <div className="flex flex-row justify-between items-center gap-5 ">
          <div
            className={`cursor-pointer px-4 py-3 text-sm  text-gray-600 font-light ${
              activeTab === 1
                ? " text-orange-500 border-b-2 border-b-orange-500"
                : ""
            }`}
            onClick={() => handleTabClick(1)}
          >
            Menu
          </div>
          <div
            className={`cursor-pointer px-4 py-3 text-sm text-gray-600 font-light ${
              activeTab === 2
                ? " text-orange-500 border-b-2 border-b-orange-500"
                : ""
            }`}
            onClick={() => handleTabClick(2)}
          >
            About
          </div>
          <div
            className={`cursor-pointer px-4 py-3 text-sm text-gray-600 font-light ${
              activeTab === 3
                ? "border-b-2 text-orange-500 border-b-orange-500"
                : ""
            }`}
            onClick={() => handleTabClick(3)}
          >
            Other Branches
          </div>
        </div>
        <div className=" text-orange-500 border border-1 px-3 py-2 cursor-pointer">
          {" "}
          <FaRegHeart color="gray" size={20} />
        </div>
      </div>

      <div className="mt-4 h-full">
        {activeTab === 1 && (
          <div className="flex flex-row justify-start gap-20 pb-10 ">
            <div>
              <h1 className="text-sm text-orange-500 font-light mb-8">
                Categories
              </h1>
              <p className="text-gray-900 text-sm font-extralight my-2 hover:text-orange-500">
                Signature Pizza
              </p>
              <p className="text-gray-900 text-sm font-extralight  my-2 hover:text-orange-500">
                Pizza 10 inch
              </p>
              <p className="text-gray-900 text-sm font-extralight  my-2 hover:text-orange-500">
                Pizza 8 inch
              </p>
              <p className="text-gray-900 text-sm font-extralight  my-2 hover:text-orange-500">
                Toppings
              </p>
              <p className="text-gray-900 text-sm font-extralight  my-2 hover:text-orange-500">
                Wings and Tenders
              </p>
              <p className="text-gray-800 text-sm font-extralight hover:text-orange-500">
                Burgers
              </p>
            </div>
            <div>
              <div className=" flex flex-row justify-start items-center  ">
                <input
                  className="w-[500px] text-xs text-gray-500 px-4 py-3 outline-none border border-gray-300 rounded-sm focus:border-orange-500"
                  type="text "
                  placeholder="Search Food Items"
                />
                <div className=" border border-gray-300 p-2 rounded-sm">
                  {" "}
                  <CiSearch className="p-1" size={24} color="red" />
                </div>
              </div>
              <div className="mt-8">
                <h1 className="text-slate-700 text-xs uppercase tracking-tight px-3 py-4 shadow-md bg-gray-50 ">
                  Signature Pizza
                </h1>
                <div className="bg-white rounded-sm border-y border-gray-300 shadow-sm px-2 py-4 hover:shadow-md 0.3s ease-in">
                  <div className="flex flex-row justify-between items-center ">
                    <p className="text-sm text-gray-600 font-light hover:text-orange-600">
                      The Hulk Pizza
                    </p>
                    <div className="flex flex-row items-center gap-1">
                      <p className="text-sm text-gray-600 font-light hover:text-orange-600">
                        1425.00
                      </p>
                      <CiCirclePlus
                        className="cursor-pointer"
                        size="16"
                        color="blue"
                      />
                    </div>
                  </div>
                  <p className="text-sm font-light text-gray-400">
                    mozzarella, pizza sauce, chicken, caramelized onions,
                    jalapenos, ricotta and a homemade pineapple chilli sauce
                  </p>
                </div>
              </div>
            </div>
            {showButton && (
              <div className="">
                <div
                  onClick={handleScrollToTop}
                  className="fixed bottom-5 right-7 cursor-pointer"
                >
                  <IoArrowUpCircle size={50} color="orange" />
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <p className="text-gray-500 font-light my-1">
              Detroit-style Pizza!!! Might look small but these deep-dish pizzas
              are for sharing! 1/2kg pizza’s, Pepperoni, homemade Sausage,
              Ricotta and more.
            </p>
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <h1 className="text-3xl text-gray-700 border-y border-gray-200 py-3">
              Other branches for this member
            </h1>
            <p className="text-xl text-gray-700 my-2">
              No branches avialable for this member
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantTab;
