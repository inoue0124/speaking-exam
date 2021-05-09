import React from "react"
import { Row, Spin, Typography } from 'antd'
import { useShadowing } from "../containers/shadowing/hooks/useShadowing"

type Props = ReturnType<typeof useShadowing>

export const Shadowing: React.FC<Props> = ({
  countBefore,
  isRecording,
  isRecorded
}) => {
  const { Title } = Typography
  const isShowRecorder = isRecording || isRecorded
  const sCountBefore = Math.ceil(countBefore)
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
          <Spin tip="Recording..."></Spin>
        )}
      </Row>
    </>
  )
}