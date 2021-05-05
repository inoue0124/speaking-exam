import React from "react"
import { useRequireLogin } from "../hooks/useRequireLogin"

const Reading: React.FC = () => {
  
  useRequireLogin()

  return (
    <div>aiueo</div>
  )
}

export default Reading