import { ExamServiceClient } from "../generated/ExamServiceClientPb"

export type GRPCClients = {
  examServiceClient: ExamServiceClient;
};

export const gRPCClients = {
  examServiceClient: new ExamServiceClient(`http://localhost:8080`)
};