import { UserServiceClient } from "../grpc/UserServiceClientPb";
import { TaskServiceClient } from "../grpc/TaskServiceClientPb";
import { ExamServiceClient } from "../grpc/ExamServiceClientPb";
import { RecordingServiceClient } from "../grpc/RecordingServiceClientPb";

export type GRPCClients = {
  userServiceClient: UserServiceClient;
  taskServiceClient: TaskServiceClient;
  examServiceClient: ExamServiceClient;
  recordingServiceClient: RecordingServiceClient;
};

export const gRPCClients = {
  userServiceClient: new UserServiceClient(process.env.NEXT_PUBLIC_API_URL),
  taskServiceClient: new TaskServiceClient(process.env.NEXT_PUBLIC_API_URL),
  examServiceClient: new ExamServiceClient(process.env.NEXT_PUBLIC_API_URL),
  recordingServiceClient: new RecordingServiceClient(
    process.env.NEXT_PUBLIC_API_URL
  ),
};
