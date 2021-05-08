import React from "react"
import { useRequireLogin } from "../hooks/useRequireLogin"

const Shadowing: React.FC = () => {
  useRequireLogin()
  return (
    <div>shadowing</div>
  )
}

export default Shadowing