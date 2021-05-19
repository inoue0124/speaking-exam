import React from "react"
import { Button, Row, Space, Progress, Typography } from 'antd'
import { AudioFilled, CaretRightOutlined } from '@ant-design/icons'
import { useRecordingCheck } from "../containers/Top/hooks/useRecordingCheck"

type Props = ReturnType<typeof useRecordingCheck>

export const RecordingCheck: React.FC<Props> = ({
  RECORDING_TIME,
  count,
  percent,
  isRecording,
  isRecorded,
  isPlaying,
  onClickRecordBtn,
  onClickPlayBtn
}) => {
  const { Title, Paragraph } = Typography

  return (
    <>
    <Title>MICROPHONE TEST</Title>
    <Title level={2}>Click <AudioFilled /> to start recording, and then click <CaretRightOutlined /> to check if your voice is recorded clearly.</Title>
    <Row justify="center" style={{ marginTop: 150 }}>
      <Progress
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
        percent={percent}
        format={() => (RECORDING_TIME - Math.floor(count))}
        status={isRecording ? "active" : "normal"}
        width={50}
        />
      {(isRecorded || isRecording) && (
        <Paragraph>Recording progress is shown in this bar.</Paragraph>
      )}
    </Row>
    <Row justify="center" style={{marginTop: 50}}>
      <Space>
        <Button
          type="primary"
          onClick={onClickRecordBtn}
          disabled={isRecording || isPlaying}
          loading={isRecording}
          danger
          icon={<AudioFilled />}
        >
          {isRecorded ? "Record again" : "Record"}
        </Button>
        <Button
          type="primary"
          onClick={onClickPlayBtn}
          disabled={isRecording || !isRecorded || isPlaying}
          loading={isPlaying}
          icon={<CaretRightOutlined />}
        >
          Play
        </Button>
      </Space>
    </Row>
    
    </>
  )
}