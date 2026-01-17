import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const Signupform = ({setIsLoggedIn}) => {

    const navigate = useNavigate();

    const [formData, setformData] = useState({
        firstname : "",
        lastname : "",
        email : "",
        password : "",
        confirmpassword : ""
    })

    const [showPassword, setshowPassword] = useState(false)
    const [showPaassword, setshowPaassword] = useState(false)
    const [accountType, setaccountType] = useState("Student")

    function changeHandler (event) {
        setformData ((prevData) => (
            {
                ...prevData,
                [event.target.name] : event.target.value
            }
        ))
    }

    function submitHandler(event) {
        event.preventDefault();
        if(formData.password !== formData.confirmpassword) {
            toast.error("Password do not match");
            return;
        }

        setIsLoggedIn(true);
        toast.success("Account Created");
        const accountData = {
            ...formData

        };

        const finalData = {
            ...accountData,
            accountType
        }

        console.log("Printing account data");
        console.log(finalData)

        navigate("/dashboard")
  }

  return (
    <div>
        {/* studetn - instructor tab */}
        <div className='flex p-1 my-6 rounded-full max-w-max bg-richblack-800 gap-x-1'>
            <button 
            className={`${accountType === "Student" ?
                "bg-richblack-900 text-richblack-5 py-2 px-5 rounded-full transition-all duration-200" 
            : 
                "bg-transparent text-richblack-200 py-2 px-5 rounded-full transition-all duration-200"
            }`}
            onClick={() => setaccountType("Student")}>
                Student
            </button>
            
            <button 
            className={`${accountType === "instructor" ?
                "bg-richblack-900 text-richblack-5 py-2 px-5 rounded-full transition-all duration-200" 
            : 
                "bg-transparent text-richblack-200 py-2 px-5 rounded-full transition-all duration-200"
            }`}
            onClick={() => setaccountType("instructor")}>
                instructor
            </button>
        </div>

      <form onSubmit={submitHandler}>
        {/* the below div content is your first name nad last name */}
        <div className='flex mt-3 space-x-3'>
            <label className='w-full'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    First Name<sup className='text-pink-200'>*</sup>
                </p>
    
                <input 
                required
                type='text'
                name='firstname'
                value={formData.firstname}
                placeholder='Enter Your First Name'
                onChange={changeHandler} 
                className='bg-richblack-800 rounded-[0.56rem] text-richblack-5 
                w-full p-[12px] '/>
            </label>

            <label className='w-full'>
                <p  className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Last Name<sup className='text-pink-200'>*</sup>
                </p>
    
                <input 
                required
                type='text'
                name='lastname'
                value={formData.lastname}
                placeholder='Enter Your Last Name'
                onChange={changeHandler} 
                className='bg-richblack-800 rounded-[0.56rem] text-richblack-5 
                w-full p-[12px] '/>
            </label>
        </div>

        <div className='mt-3'>
            <label className='w-full mt-3'>
                <p  className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Email id<sup className='text-pink-200'>*</sup>
                </p>
    
                <input 
                required
                type='email'
                name='email'
                value={formData.email}
                placeholder='Enter Your Email id'
                onChange={changeHandler} 
                className='bg-richblack-800 rounded-[0.56rem] text-richblack-5 
                w-full p-[12px] '/>
            </label>
        </div>

         {/* create password & confirm password  */}
        <div className='flex mt-3 space-x-3'>
            <label className='relative w-full'>
                <p  className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                   create Password<sup className='text-pink-200'>*</sup>
                </p>
    
                <input 
                required
                type={showPassword ? ("text") : ("password")}
                name='password'
                value={formData.password}
                placeholder='Create Your Password'
                onChange={changeHandler} 
                className='bg-richblack-800 rounded-[0.56rem] text-richblack-5 
                w-full p-[12px] '/>

                <span 
                className='absolute right-3 top-[38px] ursor-poicnter'
                onClick={() => setshowPassword((prev) => !prev)}>
                    {showPassword ? 

                    (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 

                    (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) 
                    }
                </span>
            </label>

            <label className='relative w-full'>
                <p  className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Cofirm Password<sup className='text-pink-200'>*</sup>
                </p>

                <input 
                required
                type={showPaassword ? ("text") : ("password")}
                name='confirmpassword'
                value={formData.confirmpassword}
                placeholder='Confirm Password'
                onChange={changeHandler} 
                className='bg-richblack-800 rounded-[0.56rem] text-richblack-5 
                w-full p-[12px] ' />

                <span 
                 className='absolute right-3 top-[38px] ursor-poicnter'
                onClick={() => setshowPaassword((prev) => !prev)}>
                    {showPaassword ? 

                    (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 

                    (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) 
                    }
                </span>
            </label>
        </div>
        <button className='rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] bg-yellow-50 w-full mt-5'>
                Create Account
        </button>
      </form>
    </div>
  )
}

export default Signupform;
