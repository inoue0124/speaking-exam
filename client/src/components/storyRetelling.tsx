import React from "react";
import { Row, Progress, Spin, Typography } from "antd";
import { useStoryRetelling } from "../containers/storyRetelling/hooks/useStoryRetelling";

type Props = ReturnType<typeof useStoryRetelling>;

export const StoryRetelling: React.FC<Props> = ({
  countBeforeStarting,
  countRecording,
  isRecording,
  percent,
  progressText,
}) => {
  const { Text } = Typography;
  const sCountBeforeStarting = Math.ceil(countBeforeStarting);
  const sCountRecording = Math.ceil(countRecording);
  return (
    <>
      {progressText}
      <Row justify="center">
        {!isRecording && (
          <>
            <Text type="danger">
              You will hear the sound after {sCountBeforeStarting} seconds ...
            </Text>
          </>
        )}
        {isRecording && (
          <>
            <Progress
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              percent={percent}
              format={() => sCountRecording}
              status={isRecording ? "active" : "normal"}
              width={50}
            />
            <Spin tip="Recording..."></Spin>
          </>
        )}
      </Row>
    </>
  );
};
