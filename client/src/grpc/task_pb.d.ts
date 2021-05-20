import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class ListTasksRequest extends jspb.Message {
  getExamId(): number;
  setExamId(value: number): ListTasksRequest;

  getType(): TaskType;
  setType(value: TaskType): ListTasksRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListTasksRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListTasksRequest): ListTasksRequest.AsObject;
  static serializeBinaryToWriter(message: ListTasksRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListTasksRequest;
  static deserializeBinaryFromReader(message: ListTasksRequest, reader: jspb.BinaryReader): ListTasksRequest;
}

export namespace ListTasksRequest {
  export type AsObject = {
    examId: number,
    type: TaskType,
  }
}

export class ListTasksResponse extends jspb.Message {
  getTaskList(): Array<Task>;
  setTaskList(value: Array<Task>): ListTasksResponse;
  clearTaskList(): ListTasksResponse;
  addTask(value?: Task, index?: number): Task;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListTasksResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListTasksResponse): ListTasksResponse.AsObject;
  static serializeBinaryToWriter(message: ListTasksResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListTasksResponse;
  static deserializeBinaryFromReader(message: ListTasksResponse, reader: jspb.BinaryReader): ListTasksResponse;
}

export namespace ListTasksResponse {
  export type AsObject = {
    taskList: Array<Task.AsObject>,
  }
}

export class GetTaskRequest extends jspb.Message {
  getId(): number;
  setId(value: number): GetTaskRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTaskRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTaskRequest): GetTaskRequest.AsObject;
  static serializeBinaryToWriter(message: GetTaskRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTaskRequest;
  static deserializeBinaryFromReader(message: GetTaskRequest, reader: jspb.BinaryReader): GetTaskRequest;
}

export namespace GetTaskRequest {
  export type AsObject = {
    id: number,
  }
}

export class Task extends jspb.Message {
  getId(): number;
  setId(value: number): Task;

  getExamId(): number;
  setExamId(value: number): Task;

  getType(): TaskType;
  setType(value: TaskType): Task;

  getTextUrl(): string;
  setTextUrl(value: string): Task;

  getImageUrl(): string;
  setImageUrl(value: string): Task;

  getAudioUrl(): string;
  setAudioUrl(value: string): Task;

  getMsBeforeStarting(): number;
  setMsBeforeStarting(value: number): Task;

  getMsPreparing(): number;
  setMsPreparing(value: number): Task;

  getMsRecording(): number;
  setMsRecording(value: number): Task;

  getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Task;
  hasCreatedAt(): boolean;
  clearCreatedAt(): Task;

  getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Task;
  hasUpdatedAt(): boolean;
  clearUpdatedAt(): Task;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Task.AsObject;
  static toObject(includeInstance: boolean, msg: Task): Task.AsObject;
  static serializeBinaryToWriter(message: Task, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Task;
  static deserializeBinaryFromReader(message: Task, reader: jspb.BinaryReader): Task;
}

export namespace Task {
  export type AsObject = {
    id: number,
    examId: number,
    type: TaskType,
    textUrl: string,
    imageUrl: string,
    audioUrl: string,
    msBeforeStarting: number,
    msPreparing: number,
    msRecording: number,
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export enum TaskType { 
  UNKNOWN = 0,
  READING = 1,
  SHADOWING = 2,
  ROLE_PLAYING = 3,
  PICTURE_DESCRIPTION = 4,
  STORY_RETELLING = 5,
  OPINION_TELLING = 6,
}
