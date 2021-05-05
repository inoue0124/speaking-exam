import React from "react"
import { Row } from 'antd'
import { TopContainer } from "../containers/Top"

const Index: React.FC = ({}) => {
  return (
    <>
      <Row justify="center" style={{ marginTop: 50 }}>
        <TopContainer />
      </Row>
    </>
  )
}

export default Index