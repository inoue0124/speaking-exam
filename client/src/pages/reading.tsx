import React from "react"
import { Row } from 'antd'
import { ReadingContainer } from "../containers/reading"
import { useRequireLogin } from "../hooks/useRequireLogin"
import { gRPCClients } from "../gateways/gRPCClients"

const Reading: React.FC = () => {
  useRequireLogin()
  return (
    <Row justify="center" style={{ marginTop: 50 }}>
      <ReadingContainer clients={gRPCClients}/>
    </Row>
  )
}

export default Reading