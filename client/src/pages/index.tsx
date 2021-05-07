import React from "react"
import { Row } from 'antd'
import { TopContainer } from "../containers/Top"
import { useRequireLogin } from "../hooks/useRequireLogin"

const Index: React.FC = ({}) => {
  useRequireLogin()
  return (
    <>
      <Row justify="center" style={{ marginTop: 50 }}>
        <TopContainer />
      </Row>
    </>
  )
}

export default Index