import React from "react"
import { Button, Row, Tooltip, Progress } from 'antd'
import { AudioFilled, CaretRightOutlined } from '@ant-design/icons'
import { useRecordingCheck } from "../containers/Top/hooks/useRecordingCheck"

type Props = ReturnType<typeof useRecordingCheck>

export const RecordingCheck: React.FC<Props> = ({
  percent,
  mediaBlobUrl,
  onClickRecordBtn
}) => {
  return (
    <>
      <Row justify="center" style={{ marginTop: 50 }}>
        <Progress
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          percent={percent}
          showInfo={false}
          status="active"
        />
        <Tooltip title="record">
          <Button
            type="primary"
            onClick={onClickRecordBtn}
            loading={status==='recording'}
            shape="circle"
            size="large"
            danger
            icon={<AudioFilled />}
          />
        </Tooltip>
        {/* <Tooltip title="play">
          <Button
            type="primary"
            onClick={onClickRecordBtn}
            loading={isPlaying}
            shape="circle"
            size="large"
            icon={<CaretRightOutlined />}
          />
        </Tooltip> */}
        {mediaBlobUrl}
      </Row>
    </>
  )
}