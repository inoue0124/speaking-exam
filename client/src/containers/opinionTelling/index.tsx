import React from "react"
import { useStep } from "../../hooks/useStep"
import { useFetchTask } from "../../hooks/useFetchTask"
import { useOpinionTelling } from "./hooks/useOpinionTelling"
import { OpinionTelling } from "../../components/opinionTelling"
import { GRPCClients } from "../../gateways/gRPCClients"
import { TaskType } from "../../grpc/task_pb"
import { Button, Row, Typography } from 'antd'

type Props = {
  clients: GRPCClients
}

export const OpinionTellingContainer: React.FC<Props> = ({ clients }) => {
  const { Title, Paragraph, Text } = Typography
  const { tasks } = useFetchTask(clients.taskServiceClient, TaskType.OPINION_TELLING)
  const {step, incrementStep} = useStep(tasks.length+1, "/finish")
  const readingState = useOpinionTelling(clients.recordingServiceClient, tasks, (step-1), incrementStep)

  return (
    <div style={{width: 800}}>
      <Title>F. Opinion Telling (意見述べ)</Title>
      {step===0 ? (
        <>
        <Paragraph>
          There are two situations. You will have two minutes to formulate an opinion according to the situation.
          You may take any memos. When you hear the beep, you will have one minute to express your opinion.
        </Paragraph>
          <Row justify="center">
            <Button type="primary" onClick={incrementStep}>
              Next
            </Button>
          </Row>
        </>
      ) : (
        <OpinionTelling {...readingState} />
      )}
    </div>
  )
}