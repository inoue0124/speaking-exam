import React from "react"
import { gRPCClients } from "../gateways/gRPCClients"
import { useExams } from "../hooks/useExams"

const Index: React.FC = ({}) => {
  const examServiceClient = gRPCClients.examServiceClient
  const examState = useExams(examServiceClient)
  return (
    <>
    </>
  )
}

export default Index