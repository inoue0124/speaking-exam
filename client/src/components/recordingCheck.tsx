import React from "react"
import { Button, Row, Col, Tooltip, Progress, Typography } from 'antd'
import { AudioFilled, CaretRightOutlined, AudioTwoTone} from '@ant-design/icons'
import { useRecordingCheck } from "../containers/Top/hooks/useRecordingCheck"

type Props = ReturnType<typeof useRecordingCheck>

export const RecordingCheck: React.FC<Props> = ({
  RECORDING_TIME,
  count,
  percent,
  mediaBlobUrl,
  isRecording,
  isReady,
  isPlaying,
  onClickRecordBtn,
  onClickPlayBtn
}) => {
  const { Title, Paragraph, Text } = Typography

  return (
    <>
    <Title>MICROPHONE TEST</Title>
    <Title level={2}>Tap <AudioFilled /> to start recording, and then tap <CaretRightOutlined /> to check if your voice is recorded clearly.</Title>
      <Row justify="center" style={{ marginTop: 150 }}>
        <Col span={6}>
          <Row justify="center">
            <Tooltip title="record">
              <Button
                type="primary"
                onClick={onClickRecordBtn}
                disabled={isRecording || isPlaying}
                loading={isRecording}
                shape="circle"
                size="large"
                danger
                icon={<AudioFilled />}
              />
            </Tooltip>
          </Row>
        </Col>
        <Col span={6}>
          <Row justify="center">
            <Tooltip title="play">
              <Button
                type="primary"
                onClick={onClickPlayBtn}
                disabled={isRecording || !isReady || isPlaying}
                loading={isPlaying}
                shape="circle"
                size="large"
                icon={<CaretRightOutlined />}
                />
            </Tooltip>
          </Row>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 50 }}>
        <Progress
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          percent={percent}
          format={() => RECORDING_TIME - count}
          status={isRecording ? "active" : "normal"}
          width={50}
          />
        {(isReady || isRecording) && (
          <Paragraph>Recording progress is shown in this bar.</Paragraph>
        )}
      </Row>
    </>
  )
}