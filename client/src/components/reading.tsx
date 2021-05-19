import React from "react"
import { Row, Progress, Spin, Typography } from 'antd'
import { useReading } from "../containers/reading/hooks/useReading"

type Props = ReturnType<typeof useReading>

export const Reading: React.FC<Props> = ({
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
        <img src={task?.textUrl} width={'100%'} />
        {isPreparing && (
          <Text type="danger">Recording will start in {sCountPreparing} seconds ...</Text>
        )}
        {isRecording && (
          <>
          <Progress
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            percent={percent}
            format={() => (sCountRecording)}
            status="active"
            width={50}
          />
          <Spin tip="Recording..."></Spin>
          </>
        )}
      </Row>
    </>
  )
}