import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useValueRef } from "../.../../../../hooks/useValueRef";
import { Task } from "../../../grpc/task_pb";
import { useReactMediaRecorder } from "react-media-recorder";
import { RecordingServiceClient } from "../../../grpc/RecordingServiceClientPb";
import { upload } from "../.../../../../utility/upload";

export const useStoryRetelling = (
  client: RecordingServiceClient,
  tasks: Task.AsObject[],
  index: number,
  incrementStep: () => void,
  setDoneTaskId: Dispatch<SetStateAction<number>>
) => {
  const [countBeforeStarting, setCountBeforeStarting] = useState<number>();
  const refCountBeforeStarting = useValueRef(countBeforeStarting);
  const [countPreparing, setCountPreparing] = useState<number>();
  const refCountPreparing = useValueRef(countPreparing);
  const [countRecording, setCountRecording] = useState<number>();
  const refCountRecording = useValueRef(countRecording);
  const [task, setTask] = useState<Task.AsObject>();
  const [timerBeforeStarting, setTimerBeforeStarting] = useState<any>();
  const [timerPreparing, setTimerPreparing] = useState<any>();
  const [timerRecording, setTimerRecording] = useState<any>();
  const [percent, setPercent] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const isSkipRender =
    tasks.length === 0 || index < 0 || index === tasks.length;
  const [audio, setAudio] = useState<Blob>(undefined);
  const [progressText, setProgressText] = useState<string>("");
  const { startRecording, stopRecording } = useReactMediaRecorder({
    audio: true,
    onStop: (_: string, blob: Blob) => setAudio(blob),
  });

  // タスク切り替え処理
  useEffect(() => {
    if (isSkipRender) return;
    setDoneTaskId(tasks[index - 1]?.id);
    setTask(tasks[index]);
    setProgressText(index + 1 + "/" + tasks.length);
  }, [index]);

  // カウントダウン前の処理
  useEffect(() => {
    if (isSkipRender) return;
    setCountBeforeStarting(task.msBeforeStarting / 1000);
    setCountPreparing(task.msPreparing / 1000);
    setCountRecording(task.msRecording / 1000);
    // 音声提示前のカウントダウンタイマー
    setTimerBeforeStarting(
      setInterval(() => {
        setCountBeforeStarting(refCountBeforeStarting.current - 0.05);
      }, 50)
    );
  }, [task]);

  // カウントダウン後の処理
  useEffect(() => {
    if (isSkipRender) return;
    setPercent(
      ((task.msBeforeStarting / 1000 - refCountBeforeStarting.current) /
        (task.msBeforeStarting / 1000)) *
        100
    );
    if (countBeforeStarting <= 0) {
      clearInterval(timerBeforeStarting);
      const beep = new Audio("/beep.mp3");
      // beep終了後に提示音声を再生開始する
      beep.addEventListener("ended", () => {
        // urlが空の場合は次のステップへ
        if (task.audioUrl === "") {
          incrementStep();
          return;
        }
        const modelAudio = new Audio(task.audioUrl);
        // モデル音声が終わったら5秒の準備時間を与える
        modelAudio.addEventListener("ended", () => {
          // 準備時間タイマー
          setTimerPreparing(
            setInterval(() => {
              setCountPreparing(refCountPreparing.current - 0.05);
            }, 50)
          );
        });
        modelAudio.play();
      });
      beep.play();
    }
  }, [countBeforeStarting]);

  // 音声提示後の処理
  useEffect(() => {
    if (isSkipRender) return;
    setPercent(
      ((task.msPreparing / 1000 - refCountPreparing.current) /
        (task.msPreparing / 1000)) *
        100
    );
    if (countPreparing <= 0) {
      clearInterval(timerPreparing);
      const beep = new Audio("/beep.mp3");
      beep.play();
      beep.addEventListener("ended", () => {
        startRecording();
        setIsRecording(true);
        // 録音タイマー
        setTimerRecording(
          setInterval(() => {
            setCountRecording(refCountRecording.current - 0.05);
          }, 50)
        );
      });
    }
  }, [countPreparing]);

  // 録音開始前の処理
  useEffect(() => {
    if (isSkipRender) return;
    setPercent(
      ((task.msRecording / 1000 - countRecording) / (task.msRecording / 1000)) *
        100
    );
    if (countRecording <= 0) {
      clearInterval(timerRecording);
      stopRecording();
      setIsRecording(false);
    }
  }, [countRecording]);

  // 録音終了後の処理
  useEffect(() => {
    if (isSkipRender) return;
    upload(client, task, audio);
    incrementStep();
  }, [audio]);

  return {
    countBeforeStarting,
    countRecording,
    isRecording,
    percent,
    progressText,
  };
};
