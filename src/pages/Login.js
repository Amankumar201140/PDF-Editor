import Template from "../Components/Template";
import loginImg from "../assets/login.png";
import React from 'react'

const Login = ({setIsLoggedIn}) => {
  return (
    
      <Template
        title="Welcome Back"
        desc="Build skills for today, tomorrow, and beyond."
        desc2="Education to future-proof your career."
        image={loginImg}
        formtype="login"
        setIsLoggedIn={setIsLoggedIn}
      />
    
  )
}

export default Login
