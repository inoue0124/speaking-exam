import React from "react"
import { Row } from 'antd'
import { LoginFormContainer } from "../containers/Login"
import { gRPCClients } from "../gateways/gRPCClients"

const Index: React.FC = ({}) => {
  return (
    <Row justify="center" style={{ marginTop: 300 }}>
      <LoginFormContainer clients={gRPCClients} />
    </Row>
  )
}

export default Index