import { useEffect, useState } from "react";
import { TaskServiceClient } from "../grpc/TaskServiceClientPb";
import { ListTasksRequest, Task } from "../grpc/task_pb";
import { User } from "../grpc/user_pb";
import { TaskType } from "../grpc/task_pb";
import { message } from "antd";

export const useFetchTask = (client: TaskServiceClient, type: TaskType) => {
  const [tasks, setTasks] = useState<Task.AsObject[]>([]);
  useEffect(() => {
    const req = new ListTasksRequest();
    const user: User.AsObject = JSON.parse(localStorage.getItem("user"));
    req.setExamId(user.examId);
    req.setType(type);
    const metadata = {
      Authorization: "bearer " + localStorage.getItem("token"),
    };
    client.listTasks(req, metadata, (err, res) => {
      if (err) {
        message.error(err.message);
        return;
      }
      setTasks(res.toObject().taskList);
    });
  }, [setTasks]);

  return {
    tasks,
  };
};
