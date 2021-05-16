import { Empty } from "google-protobuf/google/protobuf/empty_pb"
import { useState, useEffect } from "react"
import { ListRecordingsResponse } from "../../../../../grpc/recording_pb"
import { RecordingServiceClient } from "../../../../../grpc/RecordingServiceClientPb"
import { ExamServiceClient } from "../../../../../grpc/ExamServiceClientPb"

export const useTable = (recordingClient: RecordingServiceClient) => {
  const [recordings, setRecordings] = useState<ListRecordingsResponse.AsObject>()
  useEffect(()=>{
    const req = new Empty()
    const metadata = {'Authorization': 'bearer ' + localStorage.getItem("token")}
    recordingClient.listRecordings(req, metadata, (err, res) => {
      if (err) {
        alert(err.message)
        return
      }
      setRecordings(res.toObject())
    })
  }, [setRecordings])
  
  return {
    recordings
  }
}