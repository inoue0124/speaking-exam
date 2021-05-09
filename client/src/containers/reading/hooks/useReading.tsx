import { useEffect, useState } from "react"
import { useValueRef } from "../.../../../../hooks/useValueRef"
import { Task } from "../../../grpc/task_pb"
import { useReactMediaRecorder } from "react-media-recorder"
import { RecordingServiceClient } from "../../../grpc/RecordingServiceClientPb"
import { upload } from "../.../../../../utility/upload"

export const useReading = (client: RecordingServiceClient, tasks: Task.AsObject[], index: number, incrementStep: ()=>void) => {
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
  const [audio, setAudio] = useState<Blob>(undefined)
  const {startRecording, stopRecording} = useReactMediaRecorder({ 
    audio: true,
    onStop: (_: string, blob: Blob) => setAudio(blob)
  })

  // タスク切り替え処理
  useEffect(() => {
    if (isSkipRender) return
    setTask(tasks[index])
    setIsRecorded(false)
  }, [index])

  // カウントダウン前の処理
  useEffect(() => {
    if (isSkipRender) return
    setCountBefore(task.msBeforeStarting / 1000)
    setCountRecording(task.msRecording / 1000)
    // テキスト提示前のカウントダウンタイマー
    setTimerBefore(setInterval(() => {
      setCountBefore(refCountBefore.current - 1)
    }, 1000))
  }, [task])

  // カウントダウン後の処理
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

  // 録音開始前の処理
  useEffect(() => {
    if (isSkipRender) return
    setPercent((task.msRecording/1000-countRecording) / (task.msRecording/1000) * 100)
    if (countRecording <= 0) {
      clearInterval(timerRecording)
      stopRecording()
      setIsRecording(false)
      setIsRecorded(true)
    }
  }, [countRecording])

  // 録音終了後の処理
  useEffect(() => {
    if (isSkipRender) return
    upload(client, task, audio)
    incrementStep()
  }, [audio])

  return {
    countBefore,
    countRecording,
    isRecording,
    isRecorded,
    percent,
    task
  }
}