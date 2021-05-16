import React from "react"
import { Row } from 'antd'
import { LoginFormContainer } from "../containers/Login"
import { gRPCClients } from "../gateways/gRPCClients"

const Login: React.FC = ({}) => {
  return (
    <Row justify="center">
      <div style={{ marginTop: 200 }}>
        <LoginFormContainer clients={gRPCClients} />
      </div>
    </Row>
  )
}

export default Login