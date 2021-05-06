import React from "react"
import { Button, Row } from 'antd'
import { Instruction } from "../../components/Instruction"
import { RecordingCheck } from "../../components/recordingCheck"
import { useTopState } from "./hooks/useTopState"
import { useRecordingCheck } from "./hooks/useRecordingCheck"

export const TopContainer: React.FC = () => {
  const {step, isLoading, onClickNextBtn} = useTopState()
  const recordingCheckHook = useRecordingCheck()

  return (
    <div style={{width: 800}}>
      {step===0 && (
        <Instruction />
      )}
      {step>=1 && (
        <RecordingCheck {...recordingCheckHook} />
      )}
      <Row justify="center" style={{ marginTop: 50 }}>
        <Button 
          type="primary"
          onClick={onClickNextBtn}
          loading={isLoading||step>=2}
        >
          Next
        </Button>
      </Row>
    </div>
  )
}