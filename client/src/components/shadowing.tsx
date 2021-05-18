import React from "react"
import { Row, Spin, Typography, Tooltip, Button, Space } from 'antd'
import { AudioFilled, CaretRightOutlined } from '@ant-design/icons'
import { useShadowing } from "../containers/shadowing/hooks/useShadowing"

type Props = ReturnType<typeof useShadowing>

export const Shadowing: React.FC<Props> = ({
  countBefore,
  isRecording,
  isRecorded,
  isRecordedShadow,
  isScriptShadow,
  isPlaying,
  task,
  onClickRecordBtn,
  onClickStopBtn,
  onClickPlayBtn,
  onClickStopPlayBtn,
  onClickNextBtn
}) => {
  const { Title } = Typography
  const isShowRecorder = isRecording || isRecorded
  const sCountBefore = Math.ceil(countBefore)
  return (
    <>
      <Row justify="center">
        {isScriptShadow ? (
          <>
          <img src={task?.textUrl} width={'100%'} />
          <Row justify="center" align="middle" style={{ marginTop: 50 }}>
            <Space>
              <Tooltip title={isRecording ? "stop" : "record"}>
                <Button
                  type="primary"
                  onClick={isRecording ? onClickStopBtn : onClickRecordBtn}
                  disabled={isPlaying}
                  shape="circle"
                  size="large"
                  danger
                  icon={isRecording ? "■" : <AudioFilled />}
                />
              </Tooltip>
              <Tooltip title={isPlaying ? "stop" : "record"}>
                <Button
                  type="primary"
                  onClick={isPlaying ? onClickStopPlayBtn : onClickPlayBtn}
                  disabled={isRecording || !isRecordedShadow}
                  shape="circle"
                  size="large"
                  icon={isPlaying ? "■" : <CaretRightOutlined />}
                />
              </Tooltip>
              <Button
                type="primary"
                onClick={onClickNextBtn}
                disabled={isRecording || !isRecordedShadow || isPlaying}
              >
                Next
              </Button>
            </Space>
          </Row>
          </>
        ) : (
          <>
          {!isShowRecorder && (
            <div>
              {sCountBefore===0
                ? <Title>Start!</Title>
                : <Title>{sCountBefore}</Title>
              }
            </div>
          )}
          {isShowRecorder && (
            <Spin tip="Recording..."></Spin>
          )}
          </>
        )}
      </Row>
    </>
  )
}