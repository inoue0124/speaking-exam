import React from "react"
import { useStep } from "../../hooks/useStep"
import { useFetchTask } from "../../hooks/useFetchTask"
import { useReading } from "./hooks/useReading"
import { GRPCClients } from "../../gateways/gRPCClients"
import { TaskType } from "../../grpc/task_pb"
import { Button, Row, Typography } from 'antd'

type Props = {
  clients: GRPCClients
}

export const ReadingContainer: React.FC<Props> = ({ clients }) => {
  const { Title, Paragraph, Text } = Typography
  const taskServiceClient = clients.taskServiceClient
  const { tasks } = useFetchTask(taskServiceClient, TaskType.READING)
  useReading(tasks)
  const {step, onClickNextBtn} = useStep(tasks.length, "/shadowing")

  return (
    <div style={{width: 800}}>
      <Title>A. Reading　(音読)</Title>
      {step===0 && (
        <Paragraph>
          There are five texts. Each text will be shown, followed by a beep. When you hear the beep, please read the text only once.
        </Paragraph>
      )}
      <Row justify="center" style={{ marginTop: 50 }}>
        <Button type="primary" onClick={ onClickNextBtn }>Next</Button>
      </Row>
    </div>
  )
}