import React from "react";
import { LuChefHat } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import RestaurantTab from "../components/RestaurantTab";

const RestaurantDetail = () => {
  return (
    <div className="h-screen">
      <div
        className=" w-full h-[450px] max-h-[450px] relative z-10 bg-cover bg-center bg-no-repeat bg-[url('https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] 
        before:content-['']
        before:absolute
        before:inset-0
        before:block
        before:bg-black
        before:opacity-40
        before:z-[-5]
      "
      >
        <div className="max-w-screen-lg mx-auto flex flex-row items-center gap-5 absolute top-[50%] left-[14%]">
          <img
            className="w-[120px]"
            src="https://media.trisaranepal.com/franchise_logos/trisara_main.png"
            alt=""
          />
          <div>
            <p className="text-2xl text-white font-light mb-4">Trisara </p>
            <div className="flex flex-row items-center gap-3">
              <LuChefHat color="white" />
              <p className="text-sm text-white font-light">Continental</p>
            </div>
            <div className="flex flex-row items-center gap-3">
              <CiLocationOn color="white" />
              <p className="text-sm text-white font-light my-2 ">Lazimpath</p>
            </div>
          </div>
        </div>
        <div className="my-5 max-w-screen-lg mx-auto w-full  flex flex-row justify-between items-center absolute top-[80%] left-[14%]">
          <div>
            <p className="text-xs text-white font-light uppercase">
              Minimum Order
            </p>
            <p className="text-xs text-white font-light">Rs.00</p>
          </div>
          <div className="flex flex-row items-center gap-5">
            <div>
              <p className="text-xs text-white font-light uppercase">
                Additional Service Charge
              </p>
              <p className="text-xs text-white font-light text-center">N/A</p>
            </div>
            <div>
              <p className="text-xs text-white font-light uppercase">
                Additional Vat
              </p>
              <p className="text-xs text-white font-light text-center">N/A</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <RestaurantTab />
      </div>
    </div>
  );
};

export default RestaurantDetail;
