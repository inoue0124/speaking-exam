import React from "react"
import { Button, Row } from 'antd'
import { Instruction } from "../../components/Instruction"
import { RecordingCheck } from "../../components/recordingCheck"
import { useStep } from "../../hooks/useStep"
import { useRecordingCheck } from "./hooks/useRecordingCheck"

export const TopContainer: React.FC = () => {
  const {step, incrementStep} = useStep(2, "/reading")
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
          onClick={incrementStep}
          loading={step>=2}
          disabled={(step==1 && !recordingCheckHook.isRecorded) || step>=2}
        >
          Next
        </Button>
      </Row>
    </div>
  )
}