import { useEffect, useState } from "react"
import { TaskServiceClient } from "../../../grpc/TaskServiceClientPb"
import { Task } from "../../../grpc/task_pb"
import { User } from "../../../grpc/user_pb"
import { TaskType } from "../../../grpc/task_pb"

export const useReading = (tasks: Task.AsObject[]) => {
  return {
  }
}