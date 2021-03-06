import React from "react";
import { Row, Spin, Typography, Button, Space } from "antd";
import { AudioFilled, CaretRightOutlined } from "@ant-design/icons";
import { useShadowing } from "../containers/shadowing/hooks/useShadowing";

type Props = ReturnType<typeof useShadowing>;

export const Shadowing: React.FC<Props> = ({
  countBefore,
  isRecording,
  isRecorded,
  isRecordedShadow,
  isScriptShadow,
  isPlaying,
  task,
  progressText,
  onClickRecordBtn,
  onClickStopBtn,
  onClickPlayBtn,
  onClickStopPlayBtn,
  onClickNextBtn,
}) => {
  const { Text } = Typography;
  const isShowRecorder = isRecording || isRecorded;
  const sCountBefore = Math.ceil(countBefore);
  return (
    <>
      {progressText}
      {isScriptShadow ? (
        <>
          <img src={task?.textUrl} width={"100%"} />
          <Row justify="center" align="middle" style={{ marginTop: 50 }}>
            <Space>
              <Button
                type="primary"
                onClick={isRecording ? onClickStopBtn : onClickRecordBtn}
                disabled={isPlaying}
                danger
                icon={isRecording ? "■ " : <AudioFilled />}
              >
                {isRecording
                  ? "Stop recording"
                  : isRecordedShadow
                  ? "Record again"
                  : "Start"}
              </Button>
              <Button
                type="primary"
                onClick={isPlaying ? onClickStopPlayBtn : onClickPlayBtn}
                disabled={isRecording || !isRecordedShadow}
                icon={isPlaying ? "■ " : <CaretRightOutlined />}
              >
                {isPlaying ? "Stop" : "Play"}
              </Button>
            </Space>
          </Row>
          <Row justify="center" align="middle" style={{ marginTop: 50 }}>
            <Button
              type="primary"
              onClick={onClickNextBtn}
              disabled={isRecording || !isRecordedShadow || isPlaying}
            >
              {isScriptShadow ? "Submit" : "Next"}
            </Button>
          </Row>
        </>
      ) : (
        <Row justify="center" align="middle">
          {!isRecorded && !isShowRecorder && (
            <Text type="danger">
              Recording will start in {sCountBefore} seconds ...
            </Text>
          )}
          {!isRecorded && isShowRecorder && <Spin tip="Recording..."></Spin>}
          {/* スクリプトシャドーを削除 */}
          {isRecorded && (
            <Row justify="center" align="middle">
              <Button
                type="primary"
                onClick={onClickNextBtn}
                disabled={isRecording || isPlaying}
              >
                {"Next"}
              </Button>
            </Row>
          )}
        </Row>
      )}
    </>
  );
};
