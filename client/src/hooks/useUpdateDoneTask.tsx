import { useEffect, useState } from "react"
import { UpdateDoneTaskIdRequest, User } from "../grpc/user_pb"
import { message } from 'antd'
import { UserServiceClient } from "../grpc/UserServiceClientPb"

export const useUpdateDoneTask = (client: UserServiceClient) => {
  const [doneTaskId, setDoneTaskId] = useState<number>()
  useEffect(()=>{
    const req = new UpdateDoneTaskIdRequest()
    req.setDoneTaskId(doneTaskId)
    const metadata = {'Authorization': 'bearer ' + localStorage.getItem("token")}
    client.updateDoneTaskId(req, metadata, (err, res) => {
      if (err) {
        message.error(err.message)
        return
      }
      localStorage.setItem("user", JSON.stringify(res.toObject()))
    })
  }, [doneTaskId])

  return {
    setDoneTaskId
  }
}