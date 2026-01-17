import React from 'react'
import { Navigate } from 'react-router-dom'

const PersonalRoute = ({isLoggedIn, children}) => {
    
  if(isLoggedIn) {
    return children
  } 
  return <Navigate to="/login" />
}

export default PersonalRoute
