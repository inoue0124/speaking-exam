import { ListUsersResponse, User } from "../../../../../grpc/user_pb"
import { Empty } from "google-protobuf/google/protobuf/empty_pb"
import { useState, useEffect } from "react"
import { UserServiceClient } from "../../../../../grpc/UserServiceClientPb"

export const useTable = (client: UserServiceClient) => {
  const [users, setUsers] = useState<ListUsersResponse.AsObject>()
  useEffect(()=>{
    const req = new Empty()
    const metadata = {'Authorization': 'bearer ' + localStorage.getItem("token")}
    client.listUsers(req, metadata, (err, res) => {
      if (err) {
        alert(err.message)
        return
      }
      setUsers(res.toObject())
    })
  }, [setUsers])
  return {
    users
  }
}