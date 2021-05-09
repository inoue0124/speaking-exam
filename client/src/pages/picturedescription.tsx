import React from "react"
import { Row } from 'antd'
import { PictureDescriptionContainer } from "../containers/pictureDescription"
import { useRequireLogin } from "../hooks/useRequireLogin"
import { gRPCClients } from "../gateways/gRPCClients"

const RolePlaying: React.FC = () => {
  useRequireLogin()
  return (
    <Row justify="center" style={{ marginTop: 50 }}>
      <PictureDescriptionContainer clients={gRPCClients}/>
    </Row>
  )
}

export default RolePlaying