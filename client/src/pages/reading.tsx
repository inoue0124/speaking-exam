import React from "react"
import { Row } from 'antd'
import { ReadingContainer } from "../containers/reading"
import { useRequireLogin } from "../hooks/useRequireLogin"

const Reading: React.FC = () => {
  useRequireLogin()
  return (
    <Row justify="center" style={{ marginTop: 50 }}>
      <ReadingContainer />
    </Row>
  )
}

export default Reading