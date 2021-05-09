import React from "react"
import { Row, Progress, Spin } from 'antd'
import { useOpinionTelling } from "../containers/opinionTelling/hooks/useOpinionTelling"

type Props = ReturnType<typeof useOpinionTelling>

export const OpinionTelling: React.FC<Props> = ({
  countPreparing,
  countRecording,
  isPreparing,
  isRecording,
  percent,
  task
}) => {
  const sCountPreparing = Math.ceil(countPreparing)
  const sCountRecording = Math.ceil(countRecording)
  return (
    <>
      <Row justify="center">
        <img src={task?.textUrl} width={'100%'} />
        <Progress
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          percent={percent}
          format={() => (isPreparing ? sCountPreparing : sCountRecording)}
          status={isRecording ? "active" : "normal"}
          width={50}
        />
        {isRecording && (
          <Spin tip="Recording..."></Spin>
        )}
      </Row>
    </>
  )
}