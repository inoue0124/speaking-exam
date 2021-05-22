import { Empty } from "google-protobuf/google/protobuf/empty_pb"
import { useState, useEffect, useCallback, useMemo } from "react"
import { ListRecordingsResponse, DownloadRecordingsRequest, DownloadRecordingsResponse } from "../../../../../grpc/recording_pb"
import { RecordingServiceClient } from "../../../../../grpc/RecordingServiceClientPb"
import { message } from 'antd'

export const useTable = (recordingClient: RecordingServiceClient) => {
  const [recordings, setRecordings] = useState<ListRecordingsResponse.AsObject>()
  const [selectedRecordingKeys, setSelectedRecordingKeys] = useState<string[]>([])
  const [isDownloading, setIsDownloading] = useState<boolean>(false)
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true)
  useEffect(()=>{
    const req = new Empty()
    const metadata = {'Authorization': 'bearer ' + localStorage.getItem("token")}
    recordingClient.listRecordings(req, metadata, (err, res) => {
      if (err) {
        message.error(err.message)
        return
      }
      setRecordings(res.toObject())
      setIsLoadingData(false)
    })
  }, [setRecordings])
  const onClickDownloadBtn = useCallback(() => {
    setIsDownloading(true)
    const req = new DownloadRecordingsRequest()
    req.setAudioObjKeysList(selectedRecordingKeys)
    const metadata = {'Authorization': 'bearer ' + localStorage.getItem("token")}
    const stream = recordingClient.downloadRecordings(req, metadata)
    const audioData = []
    stream.on("data", (data: DownloadRecordingsResponse) => {
      audioData.push(data.getAudioData())
    })
    stream.on("end", ()=>{
      const blob = new Blob(audioData, {type: 'application/zip'})
      const url = (window.URL || window.webkitURL).createObjectURL(blob)
      const a = document.createElement('a')
      a.download = 'record.zip'
      a.href = url
      a.click()
      setIsDownloading(false)
    })
    stream.on("error", (err) => {
      message.error(err.message)
      setIsDownloading(false)
    })
  }, [selectedRecordingKeys])
  const onSelectChange = (selectedRowKeys) => {
    setSelectedRecordingKeys(selectedRowKeys)
  }
  const hasSelected = useMemo<boolean>(()=>{
    return selectedRecordingKeys.length > 0
  } ,[selectedRecordingKeys])
  const userFilter = Array.from(new Set(recordings?.recordingList.map(recording => recording.userId)))
    .sort((a,b) => a - b)
    .flatMap(userId => {
      return { text: userId, value: userId }
  })
  const taskFilter = Array.from(new Set(recordings?.recordingList.map(recording => recording.taskId)))
    .flatMap(taskId => {
      return { text: taskId, value: taskId }
  })
  return {
    recordings,
    selectedRecordingKeys,
    hasSelected,
    userFilter,
    taskFilter,
    isDownloading,
    isLoadingData,
    onClickDownloadBtn,
    onSelectChange,
  }
}