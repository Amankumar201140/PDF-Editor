import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Loginform = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();

    setIsLoggedIn(true);
    toast.success("Logged In");

    // ✅ REDIRECT TO PDF VIEWER AFTER LOGIN
    navigate("/pdf-viewer");
  }

  const inputClass =
    "bg-richblack-800 border border-richblack-600 rounded-lg w-full p-3 text-richblack-5 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400";

  return (
    <form onSubmit={submitHandler} className="flex flex-col w-full mt-6 gap-y-4">

      {/* EMAIL */}
      <label className="w-full">
        <p className="text-sm text-richblack-5 mb-1">
          Email Address <sup className="text-pink-200">*</sup>
        </p>

        <input
          required
          type="email"
          name="email"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Enter Email Address"
          className={inputClass}
        />
      </label>

      {/* PASSWORD */}
      <label className="w-full">
        <p className="text-sm text-richblack-5 mb-1">
          Password <sup className="text-pink-200">*</sup>
        </p>

        <input
          required
          type="password"
          name="password"
          value={formData.password}
          onChange={changeHandler}
          placeholder="Enter Your Password"
          className={inputClass}
        />

        <Link to="#">
          <p className="text-blue-100 text-sm mt-1 text-right">
            Forgot Password?
          </p>
        </Link>
      </label>

      {/* SUBMIT */}
      <button
        type="submit"
        className="rounded-lg font-medium text-richblack-900 px-3 py-2 mt-6 bg-yellow-50"
      >
        Sign In
      </button>
    </form>
  );
};

export default Loginform;
