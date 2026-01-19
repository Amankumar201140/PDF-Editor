import Template from "../Components/Template";
import React from 'react'

const Login = ({setIsLoggedIn}) => {
  return (
    
      <Template
        title="Welcome Back"
        desc="Pdf Editor."
        formtype="login"
        setIsLoggedIn={setIsLoggedIn}
      />
    
  )
}

export default Login
