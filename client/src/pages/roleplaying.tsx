import React from "react"
import { Row } from 'antd'
import { RolePlayingContainer } from "../containers/rolePlaying"
import { useRequireLogin } from "../hooks/useRequireLogin"
import { gRPCClients } from "../gateways/gRPCClients"

const RolePlaying: React.FC = () => {
  useRequireLogin()
  return (
    <Row justify="center" style={{ marginTop: 50 }}>
      <RolePlayingContainer clients={gRPCClients}/>
    </Row>
  )
}

export default RolePlaying