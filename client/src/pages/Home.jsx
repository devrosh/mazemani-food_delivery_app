import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
const Home = () => {
  return (
    <div>
      <div className="relative">
        <img
          className="w-full h-[60%]  object-cover center-center"
          src="../src/assets/hero2.jpg"
          alt="hero-image"
        />

        <div className="absolute top-[30%] left-[25%] shadow-md">
          <p className="text-center text-4xl text-gray-600 mb-5">
            Order food from the widest range of restaurants.
          </p>
          <input
            className="w-[650px] text-sm px-4 py-3 rounded-sm focus:outline-none"
            placeholder="Restaurants and Foods"
          />
          <button className="text-sm bg-orange-500 px-4 py-3 rounded-sm">
            Find Restaurants
          </button>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto w-full  h-[200px] mt-10 mb-10">
        <img className="w-full h-full block object-cover object-center " src="../src/assets/Banner.png" alt="banner" />
      </div>
      <div className="max-w-screen-lg mx-auto mt-5 flex flex-row justify-between items-center">
        <p className="text-md text-gray-800 font-semibold">Featured</p>
        <Link className="text-sm text-gray-800 cursor-pointer">View All</Link>
      </div>
      <div className="max-w-screen-lg mx-auto mt-5">
        <Card
          restaurantImage="https://fmdadmin.foodmandu.com//Images/Vendor/1027/Logo/6_151222081324._4-cornors-web.listing.jpg"
          restaurantName="Trisara Garden of Heavens"
        />
      </div>
      <div
        className="w-full h-[380px] max-h-[380px] relative z-10
            overflow-hidden
             flex flex-col justify-center items-center gap-5 my-10 bg-cover bg-no-repeat bg-center bg-[url('https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]
             before:content-['']
            before:absolute
            before:inset-0
            before:block
            before:bg-black
       
            before:opacity-75
            before:z-[-5]
             "
      >
        <h1 className="text-center text-2xl text-gray-100">About Us</h1>
        <p className="w-[700px] text-gray-200">
          Foodmandu is the fastest, easiest and most convenient way to enjoy the
          best food of your favourite restaurants at home, at the office or
          wherever you want to.
        </p>
        <p className="w-[700px] text-gray-200">
          {" "}
          We know that your time is valuable and sometimes every minute in the
          day counts. That’s why we deliver! So you can spend more time doing
          the things you love.
        </p>
        <Link
          to="/about"
          className="text-center bg-orange-400 px-5 py-2 text-white rounded-sm hover:bg-orange-600"
        >
          Learn More
        </Link>
      </div>
      <div className="max-w-screen-lg mx-auto flex flex-row justify-between items-center h-[400px] shadow-sm">
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-semi-bold text-gray-800">
            Download the app
          </h1>
          <p className="font-light">Always on the go.</p>
          <p className="font-light">
            Food - whenever and wherever you want it!
          </p>
          <div className="flex flex-row items-center gap-5">
            <img
              className="w-[100px]"
              src="https://foodmandu.com/img/itunes-app-store-logo.png"
              alt=""
            />
            <img
              className="w-[120px]"
              src="https://foodmandu.com/img/google-play-store-logo.png"
              alt=""
            />
          </div>
        </div>
        <div className="">
          <img
            className="w-[350px] h-auto object-cover object-center"
            src="https://i0.wp.com/www.ratnatechnology.com/wp-content/uploads/2021/08/Food-Delivery-banner.png?fit=540%2C625&ssl=1"
            alt="mobile-image"
          />
        </div>
      </div>
      <div className="w-full h-[250px] bg-gray-100 shadow-sm flex flex-col justify-center items-center gap-5">
        <p className="text-3xl text-gray-700">
          List your Restaurant at Mazemani!
          <br />
          Reach 2,00,000 + new customers.
        </p>
        <Link className="bg-orange-500 text-white text-sm px-5 py-2 rounded-sm hover:bg-orange-600">
          Send Request
        </Link>
      </div>
    </div>
  );
};

export default Home;
