import { UserServiceClient } from "../grpc/UserServiceClientPb"
import { TaskServiceClient } from "../grpc/TaskServiceClientPb"
import { ExamServiceClient } from "../grpc/ExamServiceClientPb"
import { RecordingServiceClient } from "../grpc/RecordingServiceClientPb"

export type GRPCClients = {
  userServiceClient: UserServiceClient
  taskServiceClient: TaskServiceClient
  examServiceClient: ExamServiceClient
  recordingServiceClient: RecordingServiceClient
}

// 開発
// export const gRPCClients = {
//   userServiceClient: new UserServiceClient(`http://localhost:8080`),
//   taskServiceClient: new TaskServiceClient(`http://localhost:8080`),
//   examServiceClient: new ExamServiceClient(`http://localhost:8080`),
//   recordingServiceClient: new RecordingServiceClient(`http://localhost:8080`)
// }

// 本番
export const gRPCClients = {
  userServiceClient: new UserServiceClient(`https://api-speaking.komabastar.com`),
  taskServiceClient: new TaskServiceClient(`https://api-speaking.komabastar.com`),
  examServiceClient: new ExamServiceClient(`https://api-speaking.komabastar.com`),
  recordingServiceClient: new RecordingServiceClient(`http:s//api-speaking.komabastar.com`)
}