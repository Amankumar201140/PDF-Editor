import Template from "../Components/Template";
import React from 'react'

const Signup = ({setIsLoggedIn}) => {
  return (
    <Template
      title="Welcome! to Pdf Editor"
      formtype="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Signup;
