import React from "react";
import { useStep } from "../../hooks/useStep";
import { useFetchTask } from "../../hooks/useFetchTask";
import { usePictureDescription } from "./hooks/usePictureDescription";
import { PictureDescription } from "../../components/pictureDescription";
import { GRPCClients } from "../../gateways/gRPCClients";
import { TaskType } from "../../grpc/task_pb";
import { Button, Row, Typography } from "antd";
import { useUpdateDoneTask } from "../../hooks/useUpdateDoneTask";

type Props = {
  clients: GRPCClients;
};

export const PictureDescriptionContainer: React.FC<Props> = ({ clients }) => {
  const { Title, Paragraph } = Typography;
  const { tasks } = useFetchTask(
    clients.taskServiceClient,
    TaskType.PICTURE_DESCRIPTION
  );
  const { setDoneTaskId } = useUpdateDoneTask(clients.userServiceClient);
  const { step, incrementStep } = useStep(tasks.length + 1, "/storyretelling");
  const pictureDescriptionState = usePictureDescription(
    clients.recordingServiceClient,
    tasks,
    step - 1,
    incrementStep,
    setDoneTaskId
  );

  return (
    <div style={{ width: 800 }}>
      <Title>C. Picture Descriptions (絵の描写)</Title>
      {step === 0 ? (
        <>
          <Paragraph>
            There are two four-panel pictures. You have thirty seconds to look
            at each picture, followed by a beep. When you hear the beep, you
            will have one minute to describe the story in Japanese. Try to
            describe as much of the story as you can, including the situation,
            characters, actions, and ending.
          </Paragraph>
          <Row justify="center">
            <Button type="primary" onClick={incrementStep}>
              Next
            </Button>
          </Row>
        </>
      ) : (
        <PictureDescription {...pictureDescriptionState} />
      )}
    </div>
  );
};
