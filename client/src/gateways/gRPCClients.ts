import { UserServiceClient } from "../grpc/UserServiceClientPb"
import { TaskServiceClient } from "../grpc/TaskServiceClientPb"
import { RecordingServiceClient } from "../grpc/RecordingServiceClientPb"

export type GRPCClients = {
  userServiceClient: UserServiceClient
  taskServiceClient: TaskServiceClient
  recordingServiceClient: RecordingServiceClient
}

export const gRPCClients = {
  userServiceClient: new UserServiceClient(`http://localhost:8080`),
  taskServiceClient: new TaskServiceClient(`http://localhost:8080`),
  recordingServiceClient: new RecordingServiceClient(`http://localhost:8080`)
}