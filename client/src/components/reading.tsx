import React from "react"
import { Row, Progress, Typography, Spin } from 'antd'
import { useReading } from "../containers/reading/hooks/useReading"

type Props = ReturnType<typeof useReading>

export const Reading: React.FC<Props> = ({
  countBefore,
  countRecording,
  isRecording,
  isRecorded,
  percent,
  task
}) => {
  const { Title } = Typography
  const isShowRecorder = isRecording || isRecorded
  const sCountBefore = Math.ceil(countBefore)
  const sCountRecording = Math.ceil(countRecording)
  return (
    <>
      <Row justify="center">
        {!isShowRecorder && (
          <div>
            {sCountBefore===0
              ? <Title>Start!</Title>
              : <Title>{sCountBefore}</Title>
            }
          </div>
        )}
        {isShowRecorder && (
          <>
            <img src={task.textUrl} width={'100%'} />
            <Progress
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              percent={percent}
              format={() => (sCountRecording)}
              status={isRecording ? "active" : "normal"}
              width={50}
            />
            <Spin tip="Recording..."></Spin>
          </>
        )}
      </Row>
    </>
  )
}