import React from "react";

const Contact = () => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-screen-lg mx-auto ">
        <h1 className="text-4xl text-gray-600 font-light py-8">Contact Us</h1>
      </div>
      <div className="bg-white  border border-gray-200 py-10">
        <div className="max-w-screen-lg mx-auto">
          <p className="text-gray-600 font-light mb-5">
            Please fill out the form below and submit if you have any feedback
            or queries about our service.
          </p>
          <form className="w-full">
            <div className="w-full flex flex-row  gap-5 items-center ">
              <label className="flex flex-col gap-2 text-sm font-light text-gray-700 ">
                Your Name*
                <input
                  className="w-[350px] text-sm px-2 py-2 outline-none border border-gray-400 rounded-sm focus:border-orange-500"
                  type="text"
                  placeholder="Your Name"
                  autoComplete="off"
                />
              </label>
              <label className="flex flex-col gap-2 text-gray-700 text-sm font-light">
                Email Address*
                <input
                  className="w-[350px] text-sm px-2 py-2 outline-none border border-gray-400 rounded-sm focus:border-orange-500"
                  type="text"
                  placeholder="Your Email"
                  autoComplete="off"
                />
              </label>
            </div>
            <label className="flex flex-col gap-2 text-gray-700 text-sm font-light my-3 ">
              Enquiry*
              <textarea
                className="w-[720px] h-[160px] p-2  outline-none border border-gray-400 rounded-sm focus:border-orange-500"
                placeholder="Your details here"
              />
            </label>
            <button className="bg-orange-500 w-[720px] text-sm text-white font-light my-5 py-2 rounded-sm">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
