import React from "react"
import { useStep } from "../../hooks/useStep"
import { useFetchTask } from "../../hooks/useFetchTask"
import { useRolePlaying } from "./hooks/useRolePlaying"
import { RolePlaying } from "../../components/rolePlaying"
import { GRPCClients } from "../../gateways/gRPCClients"
import { TaskType } from "../../grpc/task_pb"
import { Button, Row, Typography } from 'antd'

type Props = {
  clients: GRPCClients
}

export const RolePlayingContainer: React.FC<Props> = ({ clients }) => {
  const { Title, Paragraph } = Typography
  const { tasks } = useFetchTask(clients.taskServiceClient, TaskType.ROLE_PLAYING)
  const {step, incrementStep} = useStep(tasks.length+1, "/picturedescription")
  const readingState = useRolePlaying(clients.recordingServiceClient, tasks, (step-1), incrementStep)

  return (
    <div style={{width: 800}}>
      <Title>C. Role Playing (状況対応)</Title>
      {step===0 ? (
        <>
        <Paragraph>
          There are two situations. You have one minute to read the situation. While reading, you may not take any memos.
          You will then hear a line from your conversational partner, followed by a beep. When you hear the beep,
          you will have forty seconds to reply to the line based on the situation.
        </Paragraph>
          <Row justify="center">
            <Button type="primary" onClick={incrementStep}>
              Next
            </Button>
          </Row>
        </>
      ) : (
        <RolePlaying {...readingState} />
      )}
    </div>
  )
}