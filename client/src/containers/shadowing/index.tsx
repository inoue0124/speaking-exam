import React from "react";
import { useStep } from "../../hooks/useStep";
import { useFetchTask } from "../../hooks/useFetchTask";
import { useShadowing } from "./hooks/useShadowing";
import { Shadowing } from "../../components/shadowing";
import { GRPCClients } from "../../gateways/gRPCClients";
import { TaskType } from "../../grpc/task_pb";
import { Button, Row, Typography } from "antd";
import { useUpdateDoneTask } from "../../hooks/useUpdateDoneTask";

type Props = {
  clients: GRPCClients;
};

export const ShadowingContainer: React.FC<Props> = ({ clients }) => {
  const { Title, Paragraph, Text } = Typography;
  const { tasks } = useFetchTask(clients.taskServiceClient, TaskType.SHADOWING);
  const { setDoneTaskId } = useUpdateDoneTask(clients.userServiceClient);
  const { step, incrementStep } = useStep(
    tasks.length + 1,
    "/picturedescription"
  );
  const shadowingState = useShadowing(
    clients.recordingServiceClient,
    tasks,
    step - 1,
    incrementStep,
    setDoneTaskId
  );

  return (
    <div style={{ width: 800 }}>
      <Title>B. Shadowing (シャドーイング)</Title>
      {step === 0 ? (
        <>
          <Paragraph>
            <Text type="danger">
              Please use earphones when you take the test.
            </Text>
            <br />
            <Text>There are five texts.</Text>
            <br />
            <Text>
              In each text, when you listen to the text, please speak it aloud
              at the same time as the speaker.
            </Text>
          </Paragraph>
          <Row justify="center">
            <Button type="primary" onClick={incrementStep}>
              Next
            </Button>
          </Row>
        </>
      ) : (
        <Shadowing {...shadowingState} />
      )}
    </div>
  );
};
