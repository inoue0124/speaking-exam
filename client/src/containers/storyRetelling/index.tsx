import React from "react";
import { useStep } from "../../hooks/useStep";
import { useFetchTask } from "../../hooks/useFetchTask";
import { useStoryRetelling } from "./hooks/useStoryRetelling";
import { StoryRetelling } from "../../components/storyRetelling";
import { GRPCClients } from "../../gateways/gRPCClients";
import { TaskType } from "../../grpc/task_pb";
import { Button, Row, Typography } from "antd";
import { useUpdateDoneTask } from "../../hooks/useUpdateDoneTask";

type Props = {
  clients: GRPCClients;
};

export const StoryRetellingContainer: React.FC<Props> = ({ clients }) => {
  const { Title, Paragraph } = Typography;
  const { tasks } = useFetchTask(
    clients.taskServiceClient,
    TaskType.STORY_RETELLING
  );
  const { setDoneTaskId } = useUpdateDoneTask(clients.userServiceClient);
  const { step, incrementStep } = useStep(tasks.length + 1, "/roleplaying");
  const storyRetellingState = useStoryRetelling(
    clients.recordingServiceClient,
    tasks,
    step - 1,
    incrementStep,
    setDoneTaskId
  );

  return (
    <div style={{ width: 800 }}>
      <Title>D. Story Retellings (再話)</Title>
      {step === 0 ? (
        <>
          <Paragraph>
            You will hear two brief stories. Each story will be spoken once,
            followed by a beep. You may take memos when you listen to the story.
            When you hear the beep, you will have one minute to retell the story
            in Japanese. Try to retell as much of the story as you can,
            including the situation, characters, actions, and ending.
          </Paragraph>
          <Row justify="center">
            <Button type="primary" onClick={incrementStep}>
              Next
            </Button>
          </Row>
        </>
      ) : (
        <StoryRetelling {...storyRetellingState} />
      )}
    </div>
  );
};
