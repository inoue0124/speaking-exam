import React from "react"
import { ReadingContainer } from "../containers/reading"
import { useRequireLogin } from "../hooks/useRequireLogin"

const Reading: React.FC = () => {
  
  useRequireLogin()

  return (
    <ReadingContainer />
  )
}

export default Reading