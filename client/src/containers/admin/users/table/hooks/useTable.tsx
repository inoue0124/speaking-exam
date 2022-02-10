import {
  CreateUsersRequest,
  ListUsersResponse,
  User,
} from "../../../../../grpc/user_pb";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { useState, useEffect, useCallback } from "react";
import { Input } from "antd";
import { Exam, ListExamsResponse } from "../../../../../grpc/exam_pb";
import { UserServiceClient } from "../../../../../grpc/UserServiceClientPb";
import { ExamServiceClient } from "../../../../../grpc/ExamServiceClientPb";
import { message } from "antd";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import { keyOfTaskType } from "../../../../../grpc/keyOfTaskType";

export type GenerateUser = {
  loginId: string;
  password: string;
  examId: number;
  examName: string;
};

export const useTable = (
  userClient: UserServiceClient,
  examClient: ExamServiceClient
) => {
  const [users, setUsers] = useState<ListUsersResponse.AsObject>();
  const [generateUsers, setGenerateUsers] = useState<GenerateUser[]>([]);
  const [createUsersRequest, setCreateUsersRequest] =
    useState<CreateUsersRequest>();
  const [exams, setExams] = useState<ListExamsResponse.AsObject>();
  const [selectedExam, setSelectedExam] = useState<Exam.AsObject>();
  const [numGenerate, setNumGenerate] = useState<number>(1);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const [dataSource, setDatasource] = useState<User.AsObject[]>();
  const getRandomStr = (len: number) => {
    const LENGTH = len;
    const SOURCE =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-@*~^";
    let result = "";
    for (let i = 0; i < LENGTH; i++) {
      result += SOURCE[Math.floor(Math.random() * SOURCE.length)];
    }
    return result;
  };
  const downloadCSV = () => {
    var csv =
      "\ufeff" + "ユーザID,ログインID,テストID,テスト名,終了タスク名,作成日\n";
    users.userList.forEach((el) => {
      const timestamp = new Timestamp();
      timestamp.setSeconds(el.createdAt.seconds);
      timestamp.setNanos(el.createdAt.nanos);
      var line =
        el["id"] +
        "," +
        el["loginId"] +
        "," +
        el["examId"] +
        "," +
        exams.examList.find((exam) => exam.id === el["examId"]).name +
        "," +
        keyOfTaskType(el["doneTaskType"]) +
        "," +
        timestamp.toDate().toLocaleString() +
        "\n";
      csv += line;
    });
    let blob = new Blob([csv], { type: "text/csv" });
    let link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "user_list.csv";
    link.click();
  };
  const downloadGeneratedUserCSV = () => {
    var csv = "\ufeff" + "ログインID,パスワード,テストID,テスト名\n";
    generateUsers.forEach((el) => {
      var line =
        el["loginId"] +
        "," +
        el["password"] +
        "," +
        el["examId"] +
        "," +
        el["examName"] +
        "\n";
      csv += line;
    });
    let blob = new Blob([csv], { type: "text/csv" });
    let link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "password_list.csv";
    link.click();
  };
  useEffect(() => {
    if (confirmLoading) return;
    const req = new Empty();
    const metadata = {
      Authorization: "bearer " + localStorage.getItem("token"),
    };
    userClient.listUsers(req, metadata, (err, res) => {
      if (err) {
        message.error(err.message);
        return;
      }
      setUsers(res.toObject());
      setDatasource(res.toObject().userList);
      setIsLoadingData(false);
    });
  }, [confirmLoading]);
  useEffect(() => {
    const req = new Empty();
    const metadata = {
      Authorization: "bearer " + localStorage.getItem("token"),
    };
    examClient.listExams(req, metadata, (err, res) => {
      if (err) {
        message.error(err.message);
        return;
      }
      setExams(res.toObject());
    });
  }, [setExams]);
  const onSelectExam = (value: number) => {
    setSelectedExam(exams.examList.find((exam) => exam.id === value));
  };
  const onClickGenerateBtn = () => {
    const login_ids = [];
    const passwords = [];
    const exam_ids = [];
    const gUsers: GenerateUser[] = [];
    for (let i = 0; i < numGenerate; i++) {
      const loginId = getRandomStr(8);
      const password = getRandomStr(8);
      login_ids.push(loginId);
      passwords.push(password);
      exam_ids.push(selectedExam.id);
      gUsers.push({
        loginId,
        password,
        examId: selectedExam.id,
        examName: selectedExam.name,
      });
    }
    const createUsersRequest = new CreateUsersRequest();
    createUsersRequest.setLoginIdsList(login_ids);
    createUsersRequest.setPasswordsList(passwords);
    createUsersRequest.setExamIdsList(exam_ids);
    setCreateUsersRequest(createUsersRequest);
    setGenerateUsers([...generateUsers, ...gUsers]);
  };
  const onClickModalOk = () => {
    setConfirmLoading(true);
    const metadata = {
      Authorization: "bearer " + localStorage.getItem("token"),
    };
    userClient.createUsers(createUsersRequest, metadata, (err, res) => {
      if (err) {
        message.error(err.message);
        return;
      }
      downloadGeneratedUserCSV();
      setConfirmLoading(false);
      setIsShowModal(false);
      setGenerateUsers([]);
    });
    return;
  };
  const onClickModalCancel = () => {
    setIsShowModal(false);
    setGenerateUsers([]);
  };
  const onClickDownloadCSVBtn = useCallback(() => {
    downloadCSV();
  }, [users, exams]);
  const searchInput = (
    <Input
      placeholder="ログインID検索"
      value={searchText}
      onChange={(e) => {
        const currValue = e.target.value;
        setSearchText(currValue);
        const filteredData = users.userList.filter((user) =>
          user.loginId.includes(currValue)
        );
        setDatasource(filteredData);
      }}
    />
  );

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
    searchInput,
    dataSource,
    setIsShowModal,
    setNumGenerate,
    onClickGenerateBtn,
    onSelectExam,
    onClickModalOk,
    onClickModalCancel,
    onClickDownloadCSVBtn,
  };
};
