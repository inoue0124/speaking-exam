import React from "react";
import { Row, Progress, Spin, Typography } from "antd";
import { useRolePlaying } from "../containers/rolePlaying/hooks/useRolePlaying";

type Props = ReturnType<typeof useRolePlaying>;

export const RolePlaying: React.FC<Props> = ({
  countPreparing,
  countRecording,
  isPreparing,
  isRecording,
  percent,
  task,
  progressText,
}) => {
  const sCountPreparing = Math.ceil(countPreparing);
  const sCountRecording = Math.ceil(countRecording);
  const { Text } = Typography;
  return (
    <>
      {progressText}
      <Row justify="center">
        <img src={task?.textUrl} width={"100%"} />
        {isPreparing && (
          <Text type="danger">
            Recording will start in {sCountPreparing} seconds ...
          </Text>
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
              status="active"
              width={50}
            />
            <Spin tip="Recording..."></Spin>
          </>
        )}
      </Row>
    </>
  );
};
