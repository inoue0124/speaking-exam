import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class ListExamsResponse extends jspb.Message {
  getExamList(): Array<Exam>;
  setExamList(value: Array<Exam>): ListExamsResponse;
  clearExamList(): ListExamsResponse;
  addExam(value?: Exam, index?: number): Exam;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListExamsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListExamsResponse): ListExamsResponse.AsObject;
  static serializeBinaryToWriter(message: ListExamsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListExamsResponse;
  static deserializeBinaryFromReader(message: ListExamsResponse, reader: jspb.BinaryReader): ListExamsResponse;
}

export namespace ListExamsResponse {
  export type AsObject = {
    examList: Array<Exam.AsObject>,
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

