import React from "react"
import { useRequireLogin } from "../hooks/useRequireLogin"

const Index: React.FC = ({}) => {

  useRequireLogin()
  
  return (
    <div>Logged in!</div>
  )
}

export default Index