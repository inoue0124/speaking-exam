import { useEffect, SyntheticEvent, useState } from "react"
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
  const [isRecordedShadow, setIsRecordedShadow] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isScriptShadow, setIsScriptShadow] = useState<boolean>(false)
  const isSkipRender = tasks.length === 0 || index < 0 || index === tasks.length
  const [modelAudio, setModelAudio] = useState<HTMLAudioElement>(undefined)
  const [recordedAudio, setRecordedAudio] = useState<HTMLAudioElement>(undefined)
  const [recordedAudioBlob, setRecordedAudioBlob] = useState<Blob>(undefined)
  const {startRecording, stopRecording} = useReactMediaRecorder({ 
    audio: true,
    onStop: (blobUrl: string, blob: Blob) => {
      setRecordedAudioBlob(blob)
      setRecordedAudio(new Audio(blobUrl))
    }
  })

  // タスク切り替え処理
  useEffect(() => {
    if (isSkipRender) return
    setTask(tasks[index])
    setIsRecorded(false)
    setIsScriptShadow(false)
    setIsRecordedShadow(false)
  }, [index])

  // カウントダウン前の処理
  useEffect(() => {
    if (isSkipRender) return
    setModelAudio(new Audio(task.audioUrl))
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
    // スクリプトシャドーの場合はアップロードをスキップ
    if (!isScriptShadow) upload(client, task, recordedAudioBlob)
    setIsScriptShadow(true)
    setIsRecorded(false)
  }, [recordedAudioBlob])

  const onClickRecordBtn = ((event: SyntheticEvent) => {
    event.preventDefault()
    startRecording()
    setIsRecordedShadow(false)
    setIsRecording(true)
    modelAudio.play()
    modelAudio.addEventListener('ended', () => {
      stopRecording()
      setIsRecording(false)
      setIsRecordedShadow(true)
    })
  })

  const onClickStopBtn = ((event: SyntheticEvent) => {
    event.preventDefault()
    stopRecording()
    setIsRecording(false)
    modelAudio.pause()
    modelAudio.currentTime = 0
  })

  const onClickPlayBtn = ((event: SyntheticEvent) => {
    event.preventDefault()
    recordedAudio.addEventListener('ended', () => {
      setIsPlaying(false)
    })
    recordedAudio.play()
    setIsPlaying(true)
  })

  const onClickStopPlayBtn = ((event: SyntheticEvent) => {
    event.preventDefault()
    recordedAudio.pause()
    recordedAudio.currentTime = 0
    setIsPlaying(false)
  })

  const onClickNextBtn = ((event: SyntheticEvent) => {
    event.preventDefault()
    upload(client, task, recordedAudioBlob)
    incrementStep()
  })

  return {
    countBefore,
    isRecording,
    isRecorded,
    isRecordedShadow,
    isScriptShadow,
    isPlaying,
    task,
    onClickRecordBtn,
    onClickStopBtn,
    onClickPlayBtn,
    onClickStopPlayBtn,
    onClickNextBtn
  }
}