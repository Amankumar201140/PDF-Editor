import React, { useState } from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const Loginform = ({setIsLoggedIn}) => {

    const navigate = useNavigate();
     
    const [formData, setformData] = useState({
        email : "",
        password : ""
    })

    const [showPassword, setshowPassword] = useState(false)

    function changeHandler(event) {
        
        setformData( (prevData) => (
            {
                ...prevData,
                [event.target.name] : event.target.value
            }
        ))
    }


    function submitHandler(event) {
        event.preventDefault();
        setIsLoggedIn(true);
        toast.success("Logged In");
        navigate("/Dashboard")
    }

  return (
    <form onSubmit = {submitHandler} 
    className="flex flex-col w-full mt-6 gap-y-4">
        <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Email Address<sup className='text-pink-200'>*</sup>
            </p>
{/* you can add input tag inside label tag like this ut if you want
ot use tis so just use htmlfor tag and add id those who define inside input tag */}
            <input 
            required
            type='email'
            value={formData.email}
            onChange={changeHandler}
            placeholder = "Enter Emial Address" 
            name='email' 
            className='bg-richblack-800 rounded-[0.56rem] text-richblack-5 
            w-full p-[12px] '/>
        </label>

        <label className='relative w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Password<sup className='text-pink-200'>*</sup>
            </p>

            <input 
            required
            type={showPassword ? ("text") : ("password") } 
            value={formData.password}
            onChange={changeHandler}
            placeholder = "Enter Your Password" 
            name='password' 
            className='bg-richblack-800 rounded-[0.56rem] text-richblack-5 
            w-full p-[12px] '/>

            <span 
            className='absolute right-3 top-[38px]'
            onClick={() => setshowPassword((prev) => !prev)}>
                {showPassword ? 
                
                (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 

                (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) 
                
                }
            </span>

            <Link to="#">
                {/* insted of using absolute postion to place forgot button at the right side 
                we can use max-w-max and ml-auto */}
                <p className='absolute text-blue-100 right-3'>
                    Forgot Password
                </p>
            </Link>
        </label>

        <button className='rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6 bg-yellow-50'>
            Sign In 
        </button>

    </form>
  )
}

export default Loginform
