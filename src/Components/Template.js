import React from "react";
import Signupform from "./Signupform";
import Loginform from "./Loginform";

const Template = ({ title, desc, desc2, formtype, setIsLoggedIn }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-richblack-900">
      
      <div className="w-full max-w-[420px] bg-richblack-800 p-8 rounded-xl shadow-lg">
        
        {/* TITLE */}
        <h1 className="text-richblack-5 font-semibold text-3xl text-center">
          {title}
        </h1>

        {/* DESCRIPTION */}
        <p className="text-center mt-4">
          <span className="text-richblack-100">{desc}</span>
          <br />
          <span className="italic text-blue-100">{desc2}</span>
        </p>

        {/* FORM */}
        <div className="mt-6">
          {formtype === "signup" ? (
            <Signupform setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Loginform setIsLoggedIn={setIsLoggedIn} />
          )}
        </div>

      </div>
    </div>
  );
};

export default Template;
