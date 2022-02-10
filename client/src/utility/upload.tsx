import { RecordingServiceClient } from "../grpc/RecordingServiceClientPb";
import { Task } from "../grpc/task_pb";
import { CreateRecordingRequest } from "../grpc/recording_pb";
import { message } from "antd";

export const upload = (
  client: RecordingServiceClient,
  task: Task.AsObject,
  audio: Blob
) => {
  if (audio === undefined) return;
  const convertToBS = async (blob: Blob) => {
    const arrayBuf = await blob.arrayBuffer();
    return new Uint8Array(arrayBuf);
  };
  const req = new CreateRecordingRequest();
  req.setTaskId(task.id);
  convertToBS(audio).then((audioData: Uint8Array) => {
    req.setAudioData(audioData);
    const metadata = {
      Authorization: "bearer " + localStorage.getItem("token"),
    };
    client.createRecording(req, metadata, (err, res) => {
      if (err) {
        message.error(err.message);
        return;
      }
    });
  });
};
