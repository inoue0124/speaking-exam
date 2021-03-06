import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class LoginRequest extends jspb.Message {
  getLoginId(): string;
  setLoginId(value: string): LoginRequest;

  getPassword(): string;
  setPassword(value: string): LoginRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LoginRequest): LoginRequest.AsObject;
  static serializeBinaryToWriter(message: LoginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginRequest;
  static deserializeBinaryFromReader(message: LoginRequest, reader: jspb.BinaryReader): LoginRequest;
}

export namespace LoginRequest {
  export type AsObject = {
    loginId: string,
    password: string,
  }
}

export class LoginResponse extends jspb.Message {
  getToken(): string;
  setToken(value: string): LoginResponse;

  getUser(): User | undefined;
  setUser(value?: User): LoginResponse;
  hasUser(): boolean;
  clearUser(): LoginResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LoginResponse): LoginResponse.AsObject;
  static serializeBinaryToWriter(message: LoginResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginResponse;
  static deserializeBinaryFromReader(message: LoginResponse, reader: jspb.BinaryReader): LoginResponse;
}

export namespace LoginResponse {
  export type AsObject = {
    token: string,
    user?: User.AsObject,
  }
}

export class CreateUsersRequest extends jspb.Message {
  getLoginIdsList(): Array<string>;
  setLoginIdsList(value: Array<string>): CreateUsersRequest;
  clearLoginIdsList(): CreateUsersRequest;
  addLoginIds(value: string, index?: number): CreateUsersRequest;

  getPasswordsList(): Array<string>;
  setPasswordsList(value: Array<string>): CreateUsersRequest;
  clearPasswordsList(): CreateUsersRequest;
  addPasswords(value: string, index?: number): CreateUsersRequest;

  getExamIdsList(): Array<number>;
  setExamIdsList(value: Array<number>): CreateUsersRequest;
  clearExamIdsList(): CreateUsersRequest;
  addExamIds(value: number, index?: number): CreateUsersRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateUsersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateUsersRequest): CreateUsersRequest.AsObject;
  static serializeBinaryToWriter(message: CreateUsersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateUsersRequest;
  static deserializeBinaryFromReader(message: CreateUsersRequest, reader: jspb.BinaryReader): CreateUsersRequest;
}

export namespace CreateUsersRequest {
  export type AsObject = {
    loginIdsList: Array<string>,
    passwordsList: Array<string>,
    examIdsList: Array<number>,
  }
}

export class CreateUsersResponse extends jspb.Message {
  getUserList(): Array<User>;
  setUserList(value: Array<User>): CreateUsersResponse;
  clearUserList(): CreateUsersResponse;
  addUser(value?: User, index?: number): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateUsersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateUsersResponse): CreateUsersResponse.AsObject;
  static serializeBinaryToWriter(message: CreateUsersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateUsersResponse;
  static deserializeBinaryFromReader(message: CreateUsersResponse, reader: jspb.BinaryReader): CreateUsersResponse;
}

export namespace CreateUsersResponse {
  export type AsObject = {
    userList: Array<User.AsObject>,
  }
}

export class ListUsersResponse extends jspb.Message {
  getUserList(): Array<User>;
  setUserList(value: Array<User>): ListUsersResponse;
  clearUserList(): ListUsersResponse;
  addUser(value?: User, index?: number): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListUsersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListUsersResponse): ListUsersResponse.AsObject;
  static serializeBinaryToWriter(message: ListUsersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListUsersResponse;
  static deserializeBinaryFromReader(message: ListUsersResponse, reader: jspb.BinaryReader): ListUsersResponse;
}

export namespace ListUsersResponse {
  export type AsObject = {
    userList: Array<User.AsObject>,
  }
}

export class UpdateUserRequest extends jspb.Message {
  getId(): number;
  setId(value: number): UpdateUserRequest;

  getLoginId(): string;
  setLoginId(value: string): UpdateUserRequest;

  getPassword(): string;
  setPassword(value: string): UpdateUserRequest;

  getType(): number;
  setType(value: number): UpdateUserRequest;

  getExamId(): number;
  setExamId(value: number): UpdateUserRequest;

  getDoneTaskId(): number;
  setDoneTaskId(value: number): UpdateUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateUserRequest): UpdateUserRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateUserRequest;
  static deserializeBinaryFromReader(message: UpdateUserRequest, reader: jspb.BinaryReader): UpdateUserRequest;
}

export namespace UpdateUserRequest {
  export type AsObject = {
    id: number,
    loginId: string,
    password: string,
    type: number,
    examId: number,
    doneTaskId: number,
  }
}

export class UpdateDoneTaskIdRequest extends jspb.Message {
  getDoneTaskId(): number;
  setDoneTaskId(value: number): UpdateDoneTaskIdRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateDoneTaskIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateDoneTaskIdRequest): UpdateDoneTaskIdRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateDoneTaskIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateDoneTaskIdRequest;
  static deserializeBinaryFromReader(message: UpdateDoneTaskIdRequest, reader: jspb.BinaryReader): UpdateDoneTaskIdRequest;
}

export namespace UpdateDoneTaskIdRequest {
  export type AsObject = {
    doneTaskId: number,
  }
}

export class User extends jspb.Message {
  getId(): number;
  setId(value: number): User;

  getLoginId(): string;
  setLoginId(value: string): User;

  getPasswordHash(): string;
  setPasswordHash(value: string): User;

  getType(): number;
  setType(value: number): User;

  getExamId(): number;
  setExamId(value: number): User;

  getDoneTaskId(): number;
  setDoneTaskId(value: number): User;

  getDoneTaskType(): number;
  setDoneTaskType(value: number): User;

  getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): User;
  hasCreatedAt(): boolean;
  clearCreatedAt(): User;

  getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): User;
  hasUpdatedAt(): boolean;
  clearUpdatedAt(): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    id: number,
    loginId: string,
    passwordHash: string,
    type: number,
    examId: number,
    doneTaskId: number,
    doneTaskType: number,
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

