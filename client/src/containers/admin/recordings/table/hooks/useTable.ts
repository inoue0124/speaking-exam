import { Empty } from "google-protobuf/google/protobuf/empty_pb"
import { useState, useEffect, useCallback, useMemo } from "react"
import { ListRecordingsResponse, DownloadRecordingsRequest, DownloadRecordingsResponse } from "../../../../../grpc/recording_pb"
import { RecordingServiceClient } from "../../../../../grpc/RecordingServiceClientPb"
import { UserServiceClient } from "../../../../../grpc/UserServiceClientPb"
import { ListUsersResponse } from "../../../../../grpc/user_pb"
import { message } from 'antd'

export const useTable = (userClient: UserServiceClient, recordingClient: RecordingServiceClient) => {
  const [recordings, setRecordings] = useState<ListRecordingsResponse.AsObject>()
  const [users, setUsers] = useState<ListUsersResponse.AsObject>()
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
  useEffect(()=>{
    const req = new Empty()
    const metadata = {'Authorization': 'bearer ' + localStorage.getItem("token")}
    userClient.listUsers(req, metadata, (err, res) => {
      if (err) {
        message.error(err.message)
        return
      }
      setUsers(res.toObject())
    })
  }, [setUsers])
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
  const filters = users?.userList.flatMap(user => {
    return { text: user.id, value: user.id }
  })
  return {
    recordings,
    selectedRecordingKeys,
    hasSelected,
    filters,
    isDownloading,
    isLoadingData,
    onClickDownloadBtn,
    onSelectChange,
  }
}