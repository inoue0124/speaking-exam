import { UserServiceClient } from "../grpc/UserServiceClientPb"
import { TaskServiceClient } from "../grpc/TaskServiceClientPb"
import { RecordingServiceClient } from "../grpc/RecordingServiceClientPb"

export type GRPCClients = {
  userServiceClient: UserServiceClient
  taskServiceClient: TaskServiceClient
  recordingServiceClient: RecordingServiceClient
}

// 開発
// export const gRPCClients = {
//   userServiceClient: new UserServiceClient(`http://localhost:8080`),
//   taskServiceClient: new TaskServiceClient(`http://localhost:8080`),
//   recordingServiceClient: new RecordingServiceClient(`http://localhost:8080`)
// }

// 本番
export const gRPCClients = {
  userServiceClient: new UserServiceClient(`https://api.speaking.komabastar.com`),
  taskServiceClient: new TaskServiceClient(`https://api.speaking.komabastar.com`),
  recordingServiceClient: new RecordingServiceClient(`http:s//api.speaking.komabastar.com`)
}