import { useEffect, useState } from "react"
import { useValueRef } from "../.../../../../hooks/useValueRef"
import { Task } from "../../../grpc/task_pb"
import { useReactMediaRecorder } from "react-media-recorder"

export const useReading = (tasks: Task.AsObject[], index: number, incrementStep: ()=>void) => {
  const [countBefore, setCountBefore] = useState<number>()
  const refCountBefore = useValueRef(countBefore)
  const [countRecording, setCountRecording] = useState<number>()
  const refCountRecording = useValueRef(countRecording)
  const [task, setTask] = useState<Task.AsObject>()
  const [timerBefore, setTimerBefore] = useState<any>()
  const [timerRecording, setTimerRecording] = useState<any>()
  const [percent, setPercent] = useState<number>(0)
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [isRecorded, setIsRecorded] = useState<boolean>(false)
  const isSkipRender = tasks.length === 0 || index < 0 || index === tasks.length
  const {startRecording, stopRecording} = useReactMediaRecorder({ audio: true })

  useEffect(() => {
    if (isSkipRender) return
    setTask(tasks[index])
    setIsRecorded(false)
  }, [index])

  useEffect(() => {
    if (isSkipRender) return
    setCountBefore(task.msBeforeStarting / 1000)
    setCountRecording(task.msRecording / 1000)
    // テキスト提示前のカウントダウンタイマー
    setTimerBefore(setInterval(() => {
      setCountBefore(refCountBefore.current - 1)
    }, 1000))
  },[task])

  useEffect(() => {
    if (countBefore <= 0) {
      clearInterval(timerBefore)
      const beep = new Audio('/beep.mp3')
      beep.addEventListener('ended', () => {
        startRecording()
        setIsRecording(true)
        // 録音タイマー
        setTimerRecording(setInterval(() => {
          setCountRecording(refCountRecording.current - 0.05)
        }, 50))
      })
      beep.play()
    }
  }, [countBefore])

  useEffect(() => {
    if (isSkipRender) return
    setPercent((task.msRecording/1000-countRecording) / (task.msRecording/1000) * 100)
    if (countRecording <= 0) {
      clearInterval(timerRecording)
      stopRecording()
      setIsRecorded(true)
      setIsRecording(false)
      incrementStep()
    }
  }, [countRecording])

  return {
    countBefore,
    countRecording,
    isRecording,
    isRecorded,
    percent,
    task
  }
}