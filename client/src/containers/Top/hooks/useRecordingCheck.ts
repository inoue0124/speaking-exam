import { useState, SyntheticEvent, useEffect } from "react"
import { useReactMediaRecorder } from "react-media-recorder"
import { useValueRef } from "../.../../../../hooks/useValueRef"

export const useRecordingCheck = () => {
  const RECORDING_TIME = 5
  const [count, setCount] = useState<number>(0)
  const [timer, setTimer] = useState<any>()
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [isReady, setIsReady] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [audio, setAudio] = useState<HTMLAudioElement>(undefined)
  const refCount = useValueRef(count)
  const [percent, setPercent] = useState<number>(0)
  const {
    startRecording,
    stopRecording,
    mediaBlobUrl
  } = useReactMediaRecorder({ 
    audio: true,
    onStop: (blobUrl: string, _: Blob) => {
      setAudio(new Audio(blobUrl))
      setIsReady(true)
  }})

  const onClickRecordBtn = ((event: SyntheticEvent) => {
    event.preventDefault()
    setCount(0)
    startRecording()
    setIsRecording(true)
    setTimer(setInterval(() => {
      setCount(refCount.current + 0.05)
    }, 50))
  })

  const onClickPlayBtn = (async (event: SyntheticEvent) => {
    event.preventDefault()
    audio.addEventListener('ended', () => {
      setIsPlaying(false)
    })
    audio.play()
    setIsPlaying(true)
  })

  useEffect(()=>{
    setPercent(count/RECORDING_TIME*100)
    //　録音終了処理
    if (count >= RECORDING_TIME) {
      stopRecording()
      setIsRecording(false)
      clearInterval(timer)
    }
  },[count])

  return {
    RECORDING_TIME,
    count,
    percent,
    mediaBlobUrl,
    isRecording,
    isReady,
    isPlaying,
    onClickRecordBtn,
    onClickPlayBtn
  }
}