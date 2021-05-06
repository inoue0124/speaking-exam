import { useState, useCallback, SyntheticEvent, useEffect } from "react"
import { useReactMediaRecorder } from "react-media-recorder"
import { useValueRef } from "../.../../../../hooks/useValueRef"
import { useRouter } from 'next/router'

export const useRecordingCheck = () => {
  const RECORDING_TIME = 15
  const [count, setCount] = useState<number>(0)
  const [timer, setTimer] = useState<any>()
  const refCount = useValueRef(count)
  const [percent, setPercent] = useState<number>(0)
  const {
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ audio: true })

  const onClickRecordBtn = useCallback((event: SyntheticEvent) => {
      event.preventDefault()
      startRecording()
      setTimer(setInterval(() => {
        setPercent(refCount.current/RECORDING_TIME*100)
        setCount(refCount.current + 0.1)
      }, 100))
    },[])

  useEffect(()=>{
    console.log(count)
    if (count >= RECORDING_TIME) {
      stopRecording()
      clearInterval(timer)
    }
  },[count])

  return {
    percent,
    mediaBlobUrl,
    onClickRecordBtn
  }
}