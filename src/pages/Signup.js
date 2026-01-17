import Template from "../Components/Template";
import signupImg from "../assets/signup.png";
import React from 'react'

const Signup = ({setIsLoggedIn}) => {
  return (
    <Template
      title="Join the millions learning to code with StudyNotion for free"
      desc="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={signupImg}
      formtype="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Signup;
