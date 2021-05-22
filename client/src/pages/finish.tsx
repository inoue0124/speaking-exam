import React from "react"
import { Result, Row } from 'antd'
import { useRequireLogin } from "../hooks/useRequireLogin"

const Finish: React.FC = ({}) => {
  useRequireLogin()
  return (
    <>
      <Result
        status="success"
        title="The test has been finished!"
        subTitle="Please close your browser."
      />
      <Row justify="center">
    </Row>
    </>
  )
}

export default Finish