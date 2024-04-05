import React from "react";
import { Link } from "react-router-dom";
import { FaSquareFacebook } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { SlSocialInstagram } from "react-icons/sl";
import { IoLogoYoutube } from "react-icons/io";
import { FaBlogger } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <div className="max-w-screen-lg mx-auto py-10">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h3 className="uppercase font-semibold text-sm text-gray-800">
              We are Mazemani
            </h3>
            <div className="flex flex-col ">
              {" "}
              <a
                href="/about"
                className="font-light text-gray-600 cursor-pointer"
              >
                About Us
              </a>
              <a
                href="/delivery_areas"
                className="font-light text-gray-600 cursor-pointer"
              >
                {" "}
                Available Areas
              </a>
              <a
                href="/delivery_charges"
                className="font-light text-gray-600 cursor-pointer"
              >
                Delivery Charges
              </a>
              <a
                href="/blog"
                className="font-light text-gray-600 cursor-pointer"
              >
                Blog
              </a>
            </div>
          </div>
          <div>
            <h3 className="uppercase font-semibold text-sm text-gray-800">
              Get Help
            </h3>
            <div className="flex flex-col">
              <a
                href="/how_to_order"
                className="font-light text-gray-600 cursor-pointer"
              >
                How to Order?
              </a>
              <a
                href="/faqs"
                className="font-light text-gray-600 cursor-pointer"
              >
                {" "}
                FAQ's
              </a>
              <a
                href="/contact"
                className="font-light text-gray-600 cursor-pointer"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div>
            <h3 className="uppercase font-semibold text-sm text-gray-800">
              Call us
            </h3>
            <p className="font-light text-gray-600">
              Kathmandu: 5970477, 4544177,
            </p>
            <p className="font-light text-gray-600"> 4540979, 9802034008</p>
            <h3 className="uppercase font-semibold text-sm text-gray-800 my-1">
              Call us
            </h3>
            <p className="font-light text-gray-600">
              Pokhara: 9802859990, 9802853330
            </p>
          </div>
          <div>
            <h3 className="uppercase font-semibold text-sm text-gray-800 my-1">
              Download app
            </h3>
            <div className="flex flex-row items-center gap-4">
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
            <h3 className="uppercase font-semibold text-sm text-gray-800 mt-5 mb-2">
              Connect with Us
            </h3>
            <div className="flex flex-row  items-center gap-2  ">
              <FaSquareFacebook
                size="30"
                color="gray"
                className="hover:blue-500 cursor-pointer"
              />
              <BsTwitterX size="30" color="gray" />
              <SlSocialInstagram size="30" color="gray" />
              <FaBlogger size="30" color="gray" />
              <IoLogoYoutube size="30" color="gray" />
            </div>
          </div>
        </div>
        <p className="text-xs font-semibold text-gray-800 mt-8 pb-8 border-b border-gray-200">
          SERVICE HOUR
          <span className="text-sm font-light text-gray-700">
            {" "}
            08:00 AM to 9:00 PM (NST)
          </span>
        </p>
        <div className="flex flex-row justify-between items-center my-5">
          <a className="text-xs font-light text-gray-600">
            Terms Of Usage ! Privacy Policy
          </a>
          <p className="text-xs font-light text-gray-600">
            © 2024 Mazemani Pvt. Ltd. All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
