import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Signupform = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function changeHandler(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function submitHandler(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoggedIn(true);
    toast.success("Account Created");
    navigate("/dashboard");
  }

  const inputClass =
    "bg-richblack-800 border border-richblack-600 rounded-lg w-full p-3 text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400";

  return (
    <form onSubmit={submitHandler}>

      {/* FIRST & LAST NAME */}
      <div className="flex gap-3">
        <input
          required
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={changeHandler}
          className={inputClass}
        />

        <input
          required
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={changeHandler}
          className={inputClass}
        />
      </div>

      {/* EMAIL */}
      <input
        required
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={changeHandler}
        className={`${inputClass} mt-3`}
      />

      {/* PASSWORDS */}
      <div className="flex gap-3 mt-3">

        {/* PASSWORD */}
        <div className="relative w-full">
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={changeHandler}
            className={inputClass}
          />
          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowPassword((p) => !p)}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="relative w-full">
          <input
            required
            type={showConfirmPassword ? "text" : "password"}
            name="confirmpassword"
            placeholder="Confirm Password"
            value={formData.confirmpassword}
            onChange={changeHandler}
            className={inputClass}
          />
          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowConfirmPassword((p) => !p)}
          >
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible />
            ) : (
              <AiOutlineEye />
            )}
          </span>
        </div>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        className="w-full mt-5 bg-yellow-50 text-black py-2 rounded font-medium"
      >
        Create Account
      </button>
    </form>
  );
};

export default Signupform;
