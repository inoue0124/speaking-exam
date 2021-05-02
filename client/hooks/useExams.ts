import { useEffect } from "react"
import { ExamServiceClient } from "../grpc/ExamServiceClientPb"
import { GetExamRequest } from "../grpc/exam_pb";

export const useExams = (client: ExamServiceClient) => {
  useEffect(() => {
    const req = new GetExamRequest()
    client.getExam(req, null, (err, res) => console.log(res))
  }, [client])
}
