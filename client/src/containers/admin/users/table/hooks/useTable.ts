import { CreateUsersRequest, ListUsersResponse } from "../../../../../grpc/user_pb"
import { Empty } from "google-protobuf/google/protobuf/empty_pb"
import { useState, useEffect } from "react"
import { Exam, ListExamsResponse } from "../../../../../grpc/exam_pb"
import { UserServiceClient } from "../../../../../grpc/UserServiceClientPb"
import { ExamServiceClient } from "../../../../../grpc/ExamServiceClientPb"
import { message } from 'antd'

export type GenerateUser = {
  loginId: string
  password: string
  examId: number
  examName: string
}

export const useTable = (userClient: UserServiceClient, examClient: ExamServiceClient) => {
  const [users, setUsers] = useState<ListUsersResponse.AsObject>()
  const [generateUsers, setGenerateUsers] = useState<GenerateUser[]>([])
  const [createUsersRequest, setCreateUsersRequest] = useState<CreateUsersRequest>()
  const [exams, setExams] = useState<ListExamsResponse.AsObject>()
  const [selectedExam, setSelectedExam] = useState<Exam.AsObject>()
  const [numGenerate, setNumGenerate] = useState<number>(1)
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true)
  const getRandomStr = (len: number) => {
    const LENGTH = len
    const SOURCE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-@*~^"
    let result = ''
    for(let i=0; i<LENGTH; i++){
      result += SOURCE[Math.floor(Math.random() * SOURCE.length)];
    }      
    return result
  }
  useEffect(()=>{
    if (confirmLoading) return
    const req = new Empty()
    const metadata = {'Authorization': 'bearer ' + localStorage.getItem("token")}
    userClient.listUsers(req, metadata, (err, res) => {
      if (err) {
        message.error(err.message)
        return
      }
      setUsers(res.toObject())
      setIsLoadingData(false)
    })
  }, [confirmLoading])
  useEffect(()=>{
    const req = new Empty()
    const metadata = {'Authorization': 'bearer ' + localStorage.getItem("token")}
    examClient.listExams(req, metadata, (err, res) => {
      if (err) {
        message.error(err.message)
        return
      }
      setExams(res.toObject())
    })
  }, [setExams])
  const onSelectExam = (value: number) => {
    setSelectedExam(exams.examList.find((exam => exam.id === value)))
  }
  const onClickGenerateBtn = () => {
    const login_ids = []
    const passwords = []
    const exam_ids = []
    const gUsers: GenerateUser[] = []
    for (let i=0; i<numGenerate; i++) {
      const loginId = getRandomStr(8)
      const password = getRandomStr(8)
      login_ids.push(loginId)
      passwords.push(password)
      exam_ids.push(selectedExam.id)
      gUsers.push({
        loginId,
        password,
        examId: selectedExam.id,
        examName: selectedExam.name
      })
    }
    const createUsersRequest = new(CreateUsersRequest)
    createUsersRequest.setLoginIdsList(login_ids)
    createUsersRequest.setPasswordsList(passwords)
    createUsersRequest.setExamIdsList(exam_ids)
    setCreateUsersRequest(createUsersRequest)
    setGenerateUsers([...generateUsers, ...gUsers])
  }
  const onClickModalOk = () => {
    setConfirmLoading(true)
    const metadata = {'Authorization': 'bearer ' + localStorage.getItem("token")}
    userClient.createUsers(createUsersRequest, metadata, (err, res) => {
      if (err) {
        message.error(err.message)
        return
      }
      setConfirmLoading(false)
      setIsShowModal(false)
      setGenerateUsers([])
    })
    return
  }
  const onClickModalCancel = () => {
    setIsShowModal(false)
    setGenerateUsers([])
  }
  
  return {
    users,
    exams,
    numGenerate,
    isShowModal,
    createUsersRequest,
    generateUsers,
    confirmLoading,
    selectedExam,
    isLoadingData,
    setIsShowModal,
    setNumGenerate,
    onClickGenerateBtn,
    onSelectExam,
    onClickModalOk,
    onClickModalCancel
  }
}