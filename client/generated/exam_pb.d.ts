import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class ListExamResponse extends jspb.Message {
  getExamList(): Array<Exam>;
  setExamList(value: Array<Exam>): ListExamResponse;
  clearExamList(): ListExamResponse;
  addExam(value?: Exam, index?: number): Exam;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListExamResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListExamResponse): ListExamResponse.AsObject;
  static serializeBinaryToWriter(message: ListExamResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListExamResponse;
  static deserializeBinaryFromReader(message: ListExamResponse, reader: jspb.BinaryReader): ListExamResponse;
}

export namespace ListExamResponse {
  export type AsObject = {
    examList: Array<Exam.AsObject>,
  }
}

export class GetExamRequest extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): GetExamRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetExamRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetExamRequest): GetExamRequest.AsObject;
  static serializeBinaryToWriter(message: GetExamRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetExamRequest;
  static deserializeBinaryFromReader(message: GetExamRequest, reader: jspb.BinaryReader): GetExamRequest;
}

export namespace GetExamRequest {
  export type AsObject = {
    message: string,
  }
}

export class GetExamResponse extends jspb.Message {
  getExam(): Exam | undefined;
  setExam(value?: Exam): GetExamResponse;
  hasExam(): boolean;
  clearExam(): GetExamResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetExamResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetExamResponse): GetExamResponse.AsObject;
  static serializeBinaryToWriter(message: GetExamResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetExamResponse;
  static deserializeBinaryFromReader(message: GetExamResponse, reader: jspb.BinaryReader): GetExamResponse;
}

export namespace GetExamResponse {
  export type AsObject = {
    exam?: Exam.AsObject,
  }
}

export class Exam extends jspb.Message {
  getId(): number;
  setId(value: number): Exam;

  getName(): string;
  setName(value: string): Exam;

  getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Exam;
  hasCreatedAt(): boolean;
  clearCreatedAt(): Exam;

  getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Exam;
  hasUpdatedAt(): boolean;
  clearUpdatedAt(): Exam;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Exam.AsObject;
  static toObject(includeInstance: boolean, msg: Exam): Exam.AsObject;
  static serializeBinaryToWriter(message: Exam, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Exam;
  static deserializeBinaryFromReader(message: Exam, reader: jspb.BinaryReader): Exam;
}

export namespace Exam {
  export type AsObject = {
    id: number,
    name: string,
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

