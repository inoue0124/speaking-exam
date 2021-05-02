import { ExamServiceClient } from "../grpc/ExamServiceClientPb"

export type GRPCClients = {
  examServiceClient: ExamServiceClient;
};

export const gRPCClients = {
  examServiceClient: new ExamServiceClient(`http://localhost:8080`)
};