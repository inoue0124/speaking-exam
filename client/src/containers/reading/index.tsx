import React from "react"
import { useStep } from "../../hooks/useStep"
import { useFetchTask } from "../../hooks/useFetchTask"
import { useReading } from "./hooks/useReading"
import { Reading } from "../../components/reading"
import { GRPCClients } from "../../gateways/gRPCClients"
import { TaskType } from "../../grpc/task_pb"
import { Button, Row, Typography } from 'antd'

type Props = {
  clients: GRPCClients
}

export const ReadingContainer: React.FC<Props> = ({ clients }) => {
  const { Title, Paragraph, Text } = Typography
  const { tasks } = useFetchTask(clients.taskServiceClient, TaskType.READING)
  const {step, incrementStep} = useStep(tasks.length+1, "/shadowing")
  const readingState = useReading(clients.recordingServiceClient, tasks, (step-1), incrementStep)

  return (
    <div style={{width: 800}}>
      <Title>A. Reading (音読)</Title>
      {step===0 ? (
        <>
        <Paragraph>
          There are five texts. Each text will be shown, followed by a beep. When you hear the beep, please read the text only once.
        </Paragraph>
          <Row justify="center">
            <Button type="primary" onClick={incrementStep}>
              Next
            </Button>
          </Row>
        </>
      ) : (
        <Reading {...readingState} />
      )}
    </div>
  )
}