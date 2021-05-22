import React from "react"
import { Row, Progress, Typography, Spin } from 'antd'
import { usePictureDescription } from "../containers/pictureDescription/hooks/usePictureDescription"

type Props = ReturnType<typeof usePictureDescription>

export const PictureDescription: React.FC<Props> = ({
  countPreparing,
  countRecording,
  isPreparing,
  isRecording,
  percent,
  task
}) => {
  const sCountPreparing = Math.ceil(countPreparing)
  const sCountRecording = Math.ceil(countRecording)
  const { Text } = Typography
  return (
    <>
    <Row justify="center">
      <img src={task?.imageUrl} style={{height: "80vh"}} />
    </Row>
    {isPreparing && (
      <Row justify="center">
        <Text type="danger">Recording will start in {sCountPreparing} seconds ...</Text>
      </Row>
    )}
    
    {isRecording && (
      <Row justify="center">
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
      <Spin tip="Recording..."></Spin>
      </Row>
    )}
    </>
  )
}