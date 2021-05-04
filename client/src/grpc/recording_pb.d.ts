import * as jspb from 'google-protobuf'

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

