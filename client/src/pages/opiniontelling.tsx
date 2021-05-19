import React from "react"
import { Row } from 'antd'
import { OpinionTellingContainer } from "../containers/opinionTelling"
import { useRequireLogin } from "../hooks/useRequireLogin"
import { gRPCClients } from "../gateways/gRPCClients"
import { ProgressStepper } from "../components/progressStepper"

const OpinionTelling: React.FC = () => {
  useRequireLogin()
  return (
    <Row justify="center" style={{ marginTop: 50 }}>
      <ProgressStepper />
      <OpinionTellingContainer clients={gRPCClients}/>
    </Row>
  )
}

export default OpinionTelling