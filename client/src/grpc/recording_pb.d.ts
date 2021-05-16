import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class CreateRecordingRequest extends jspb.Message {
  getTaskId(): number;
  setTaskId(value: number): CreateRecordingRequest;

  getAudioData(): Uint8Array | string;
  getAudioData_asU8(): Uint8Array;
  getAudioData_asB64(): string;
  setAudioData(value: Uint8Array | string): CreateRecordingRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRecordingRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRecordingRequest): CreateRecordingRequest.AsObject;
  static serializeBinaryToWriter(message: CreateRecordingRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRecordingRequest;
  static deserializeBinaryFromReader(message: CreateRecordingRequest, reader: jspb.BinaryReader): CreateRecordingRequest;
}

export namespace CreateRecordingRequest {
  export type AsObject = {
    taskId: number,
    audioData: Uint8Array | string,
  }
}

export class ListRecordingsResponse extends jspb.Message {
  getRecordingList(): Array<Recording>;
  setRecordingList(value: Array<Recording>): ListRecordingsResponse;
  clearRecordingList(): ListRecordingsResponse;
  addRecording(value?: Recording, index?: number): Recording;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRecordingsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListRecordingsResponse): ListRecordingsResponse.AsObject;
  static serializeBinaryToWriter(message: ListRecordingsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRecordingsResponse;
  static deserializeBinaryFromReader(message: ListRecordingsResponse, reader: jspb.BinaryReader): ListRecordingsResponse;
}

export namespace ListRecordingsResponse {
  export type AsObject = {
    recordingList: Array<Recording.AsObject>,
  }
}

export class DownloadRecordingsRequest extends jspb.Message {
  getAudioObjKeysList(): Array<string>;
  setAudioObjKeysList(value: Array<string>): DownloadRecordingsRequest;
  clearAudioObjKeysList(): DownloadRecordingsRequest;
  addAudioObjKeys(value: string, index?: number): DownloadRecordingsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DownloadRecordingsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DownloadRecordingsRequest): DownloadRecordingsRequest.AsObject;
  static serializeBinaryToWriter(message: DownloadRecordingsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DownloadRecordingsRequest;
  static deserializeBinaryFromReader(message: DownloadRecordingsRequest, reader: jspb.BinaryReader): DownloadRecordingsRequest;
}

export namespace DownloadRecordingsRequest {
  export type AsObject = {
    audioObjKeysList: Array<string>,
  }
}

export class DownloadRecordingsResponse extends jspb.Message {
  getAudioData(): Uint8Array | string;
  getAudioData_asU8(): Uint8Array;
  getAudioData_asB64(): string;
  setAudioData(value: Uint8Array | string): DownloadRecordingsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DownloadRecordingsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DownloadRecordingsResponse): DownloadRecordingsResponse.AsObject;
  static serializeBinaryToWriter(message: DownloadRecordingsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DownloadRecordingsResponse;
  static deserializeBinaryFromReader(message: DownloadRecordingsResponse, reader: jspb.BinaryReader): DownloadRecordingsResponse;
}

export namespace DownloadRecordingsResponse {
  export type AsObject = {
    audioData: Uint8Array | string,
  }
}

export class Recording extends jspb.Message {
  getId(): number;
  setId(value: number): Recording;

  getUserId(): number;
  setUserId(value: number): Recording;

  getTaskId(): number;
  setTaskId(value: number): Recording;

  getAudioObjKey(): string;
  setAudioObjKey(value: string): Recording;

  getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Recording;
  hasCreatedAt(): boolean;
  clearCreatedAt(): Recording;

  getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Recording;
  hasUpdatedAt(): boolean;
  clearUpdatedAt(): Recording;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Recording.AsObject;
  static toObject(includeInstance: boolean, msg: Recording): Recording.AsObject;
  static serializeBinaryToWriter(message: Recording, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Recording;
  static deserializeBinaryFromReader(message: Recording, reader: jspb.BinaryReader): Recording;
}

export namespace Recording {
  export type AsObject = {
    id: number,
    userId: number,
    taskId: number,
    audioObjKey: string,
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

