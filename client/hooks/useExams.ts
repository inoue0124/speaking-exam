import { useEffect } from "react"
import { ExamServiceClient } from "../generated/ExamServiceClientPb"
import { GetExamRequest } from "../generated/exam_pb";

export const useExams = (client: ExamServiceClient) => {
  useEffect(() => {
    const req = new GetExamRequest()
    client.getExam(req, null, (err, res) => console.log(res.getExam().toObject()))
  }, [client])
}
