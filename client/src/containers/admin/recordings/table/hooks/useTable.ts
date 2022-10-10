import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  ListRecordingsResponse,
  DownloadRecordingsRequest,
  DownloadRecordingsResponse,
} from "../../../../../grpc/recording_pb";
import { RecordingServiceClient } from "../../../../../grpc/RecordingServiceClientPb";
import { message } from "antd";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import { LambdaClient } from "../../../../../gateways/lambdaClient";

export const useTable = (
  recordingClient: RecordingServiceClient,
  lambdaClient: LambdaClient
) => {
  const [recordings, setRecordings] =
    useState<ListRecordingsResponse.AsObject>();
  const [selectedRecordingKeys, setSelectedRecordingKeys] = useState<number[]>(
    []
  );
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const generateCSVData = () => {
    var csv = "\ufeff" + "録音ID,ユーザID,タスクID,ファイル名,作成日\n";
    var list;
    if (hasSelected) {
      list = selectedRecordingKeys
        .flatMap((id) =>
          recordings.recordingList.find((recording) => recording.id == id)
        )
        .sort((a, b) => a.id - b.id);
    } else {
      list = recordings.recordingList;
    }
    list.forEach((el) => {
      const timestamp = new Timestamp();
      timestamp.setSeconds(el.createdAt.seconds);
      timestamp.setNanos(el.createdAt.nanos);
      var line =
        el["id"] +
        "," +
        el["userId"] +
        "," +
        el["taskId"] +
        "," +
        el["audioObjKey"].split(".")[0] +
        ".mp3" +
        "," +
        timestamp.toDate().toLocaleString() +
        "\n";
      csv += line;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    return blob;
  };
  const downloadCSV = () => {
    const csv = generateCSVData();
    let link = document.createElement("a");
    link.href = window.URL.createObjectURL(csv);
    link.download = "record_list.csv";
    link.click();
  };
  useEffect(() => {
    const req = new Empty();
    const metadata = {
      Authorization: "bearer " + localStorage.getItem("token"),
    };
    recordingClient.listRecordings(req, metadata, (err, res) => {
      if (err) {
        message.error(err.message);
        return;
      }
      setRecordings(res.toObject());
      setIsLoadingData(false);
    });
  }, [setRecordings]);
  const onClickDownloadWebmBtn = useCallback(() => {
    setIsDownloading(true);
    const req = new DownloadRecordingsRequest();
    req.setAudioObjKeysList(
      selectedRecordingKeys.flatMap(
        (id) =>
          recordings.recordingList.find((recording) => recording.id == id)
            .audioObjKey
      )
    );
    const metadata = {
      Authorization: "bearer " + localStorage.getItem("token"),
    };
    const stream = recordingClient.downloadRecordings(req, metadata);
    const audioData = [];
    stream.on("data", (data: DownloadRecordingsResponse) => {
      audioData.push(data.getAudioData());
    });
    stream.on("end", () => {
      const blob = new Blob(audioData, { type: "application/zip" });
      const url = (window.URL || window.webkitURL).createObjectURL(blob);
      const a = document.createElement("a");
      a.download = "record.zip";
      a.href = url;
      a.click();
      downloadCSV();
      setIsDownloading(false);
    });
    stream.on("error", (err) => {
      message.error(err.message);
      setIsDownloading(false);
    });
  }, [selectedRecordingKeys]);
  const onClickDownloadMp3Btn = useCallback(async () => {
    setIsDownloading(true);
    const email = window.prompt(
      "ダウンロードURLを送信するメールアドレスを入力してください。",
      ""
    );
    const csv = generateCSVData();
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const base64Csv = fileReader.result;
      if (base64Csv instanceof ArrayBuffer) {
        throw Error("csv読み込みエラー");
      }
      const headers = new Headers({
        Accept: "application/json",
      });
      const params = {
        audioObjKeys: selectedRecordingKeys.flatMap(
          (id) =>
            recordings.recordingList.find((recording) => recording.id == id)
              .audioObjKey
        ),
        email,
        csv: base64Csv.split(",")[1],
      };
      try {
        lambdaClient.execute("/download_audio", "POST", headers, params);
        window.alert(
          "MP3へ変換完了後、ダウンロードURLを送信します。時間がかかる場合があるのでしばらくお待ちください。"
        );
        setIsDownloading(false);
      } catch (err) {
        console.log(err);
        message.error(err.message);
        setIsDownloading(false);
      }
    };
    fileReader.readAsDataURL(csv);
  }, [selectedRecordingKeys]);
  const onSelectChange = (selectedRowKeys) => {
    setSelectedRecordingKeys(selectedRowKeys);
  };
  const hasSelected = useMemo<boolean>(() => {
    return selectedRecordingKeys.length > 0;
  }, [selectedRecordingKeys]);
  const onClickDownloadCSVBtn = useCallback(() => {
    setIsDownloading(true);
    downloadCSV();
    setIsDownloading(false);
  }, [recordings]);
  const userFilter = Array.from(
    new Set(recordings?.recordingList.map((recording) => recording.userId))
  )
    .sort((a, b) => a - b)
    .flatMap((userId) => {
      return { text: userId, value: userId };
    });
  const taskFilter = Array.from(
    new Set(recordings?.recordingList.map((recording) => recording.taskId))
  ).flatMap((taskId) => {
    return { text: taskId, value: taskId };
  });
  return {
    recordings,
    selectedRecordingKeys,
    hasSelected,
    userFilter,
    taskFilter,
    isDownloading,
    isLoadingData,
    onClickDownloadWebmBtn,
    onClickDownloadMp3Btn,
    onClickDownloadCSVBtn,
    onSelectChange,
  };
};
