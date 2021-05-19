import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useValueRef } from "../.../../../../hooks/useValueRef"
import { Task } from "../../../grpc/task_pb"
import { useReactMediaRecorder } from "react-media-recorder"
import { RecordingServiceClient } from "../../../grpc/RecordingServiceClientPb"
import { upload } from "../.../../../../utility/upload"

export const usePictureDescription = (client: RecordingServiceClient, tasks: Task.AsObject[], index: number, incrementStep: ()=>void, setDoneTaskId: Dispatch<SetStateAction<number>>) => {
  const [countPreparing, setCountPreparing] = useState<number>()
  const refCountPreparing = useValueRef(countPreparing)
  const [countRecording, setCountRecording] = useState<number>()
  const refCountRecording = useValueRef(countRecording)
  const [task, setTask] = useState<Task.AsObject>()
  const [timerPreparing, setTimerPreparing] = useState<any>()
  const [timerRecording, setTimerRecording] = useState<any>()
  const [percent, setPercent] = useState<number>(0)
  const [isPreparing, setIsPreparing] = useState<boolean>(false)
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const isSkipRender = tasks.length === 0 || index < 0 || index === tasks.length
  const [audio, setAudio] = useState<Blob>(undefined)
  const {startRecording, stopRecording} = useReactMediaRecorder({ 
    audio: true,
    onStop: (_: string, blob: Blob) => setAudio(blob)
  })

  // タスク切り替え処理
  useEffect(() => {
    if (isSkipRender) return
    setDoneTaskId(tasks[index-1]?.id)
    setTask(tasks[index])
  }, [index])

  // カウントダウン前の処理
  useEffect(() => {
    if (isSkipRender) return
    setCountPreparing(task.msPreparing / 1000)
    setCountRecording(task.msRecording / 1000)
    // image提示前のカウントダウンタイマー
    setIsPreparing(true)
    setTimerPreparing(setInterval(() => {
      setCountPreparing(refCountPreparing.current - 0.05)
    }, 50))
  }, [task])

  // カウントダウン後の処理
  useEffect(() => {
    if (isSkipRender) return
    setPercent((task.msPreparing/1000-refCountPreparing.current) / (task.msPreparing/1000) * 100)
    if (countPreparing <= 0) {
      clearInterval(timerPreparing)
      const beep = new Audio('/beep.mp3')
      beep.addEventListener('ended', () => {
        setIsPreparing(false)
        startRecording()
        setIsRecording(true)
        // 録音タイマー
        setTimerRecording(setInterval(() => {
          setCountRecording(refCountRecording.current - 0.05)
        }, 50))
      })
      beep.play()
    }
  }, [countPreparing])

  // 録音開始前の処理
  useEffect(() => {
    if (isSkipRender) return
    setPercent((task.msRecording/1000-countRecording) / (task.msRecording/1000) * 100)
    if (countRecording <= 0) {
      clearInterval(timerRecording)
      stopRecording()
      setIsRecording(false)
    }
  }, [countRecording])

  // 録音終了後の処理
  useEffect(() => {
    if (isSkipRender) return
    upload(client, task, audio)
    incrementStep()
  }, [audio])

  return {
    countPreparing,
    countRecording,
    isPreparing,
    isRecording,
    percent,
    task
  }
}