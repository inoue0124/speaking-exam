import React from "react"
import { Row } from 'antd'
import { StoryRetellingContainer } from "../containers/storyRetelling"
import { useRequireLogin } from "../hooks/useRequireLogin"
import { gRPCClients } from "../gateways/gRPCClients"

const StoryRetelling: React.FC = () => {
  useRequireLogin()
  return (
    <Row justify="center" style={{ marginTop: 50 }}>
      <StoryRetellingContainer clients={gRPCClients}/>
    </Row>
  )
}

export default StoryRetelling