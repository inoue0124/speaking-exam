import { useEffect, useState } from "react"
import { useValueRef } from "../.../../../../hooks/useValueRef"
import { Task } from "../../../grpc/task_pb"
import { useReactMediaRecorder } from "react-media-recorder"
import { RecordingServiceClient } from "../../../grpc/RecordingServiceClientPb"
import { upload } from "../.../../../../utility/upload"

export const useShadowing = (client: RecordingServiceClient, tasks: Task.AsObject[], index: number, incrementStep: ()=>void) => {
  const [countBefore, setCountBefore] = useState<number>()
  const refCountBefore = useValueRef(countBefore)
  const [task, setTask] = useState<Task.AsObject>()
  const [timerBefore, setTimerBefore] = useState<any>()
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [isRecorded, setIsRecorded] = useState<boolean>(false)
  const isSkipRender = tasks.length === 0 || index < 0 || index === tasks.length
  const [recordedAudio, setRecordedAudio] = useState<Blob>(undefined)
  const {startRecording, stopRecording} = useReactMediaRecorder({ 
    audio: true,
    onStop: (_: string, blob: Blob) => setRecordedAudio(blob)
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
        const modelAudio = new Audio(task.audioUrl)
        startRecording()
        setIsRecording(true)
        modelAudio.play()
        modelAudio.addEventListener('ended', () => {
          stopRecording()
          setIsRecording(false)
          setIsRecorded(true)
        })
      })
      beep.play()
    }
  }, [countBefore])

  // 録音終了後の処理
  useEffect(() => {
    if (isSkipRender) return
    upload(client, task, recordedAudio)
    incrementStep()
  }, [recordedAudio])

  return {
    countBefore,
    isRecording,
    isRecorded
  }
}