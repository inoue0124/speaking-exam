import React from "react"
import { Row, Progress, Spin, Typography } from 'antd'
import { useStoryRetelling } from "../containers/storyRetelling/hooks/useStoryRetelling"

type Props = ReturnType<typeof useStoryRetelling>

export const StoryRetelling: React.FC<Props> = ({
  countBeforeStarting,
  countRecording,
  isRecording,
  percent
}) => {
  const { Title } = Typography
  const sCountBeforeStarting = Math.ceil(countBeforeStarting)
  const sCountRecording = Math.ceil(countRecording)
  return (
    <>
      <Row justify="center">
        {!isRecording && (
          <>
            {sCountBeforeStarting===0
              ? <Title>Start!</Title>
              : <Title>{sCountBeforeStarting}</Title>
            }
          </>
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