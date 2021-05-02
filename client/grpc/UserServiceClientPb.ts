/**
 * @fileoverview gRPC-Web generated client stub for speakingExam
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as user_pb from './user_pb';


export class UserServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoListUsers = new grpcWeb.AbstractClientBase.MethodInfo(
    user_pb.ListUserResponse,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    user_pb.ListUserResponse.deserializeBinary
  );

  listUsers(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null): Promise<user_pb.ListUserResponse>;

  listUsers(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_pb.ListUserResponse) => void): grpcWeb.ClientReadableStream<user_pb.ListUserResponse>;

  listUsers(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_pb.ListUserResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/speakingExam.UserService/ListUsers',
        request,
        metadata || {},
        this.methodInfoListUsers,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/speakingExam.UserService/ListUsers',
    request,
    metadata || {},
    this.methodInfoListUsers);
  }

  methodInfogetUser = new grpcWeb.AbstractClientBase.MethodInfo(
    user_pb.User,
    (request: user_pb.GetUserRequest) => {
      return request.serializeBinary();
    },
    user_pb.User.deserializeBinary
  );

  getUser(
    request: user_pb.GetUserRequest,
    metadata: grpcWeb.Metadata | null): Promise<user_pb.User>;

  getUser(
    request: user_pb.GetUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_pb.User) => void): grpcWeb.ClientReadableStream<user_pb.User>;

  getUser(
    request: user_pb.GetUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_pb.User) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/speakingExam.UserService/getUser',
        request,
        metadata || {},
        this.methodInfogetUser,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/speakingExam.UserService/getUser',
    request,
    metadata || {},
    this.methodInfogetUser);
  }

  methodInfocreateUser = new grpcWeb.AbstractClientBase.MethodInfo(
    user_pb.User,
    (request: user_pb.CreateUserRequest) => {
      return request.serializeBinary();
    },
    user_pb.User.deserializeBinary
  );

  createUser(
    request: user_pb.CreateUserRequest,
    metadata: grpcWeb.Metadata | null): Promise<user_pb.User>;

  createUser(
    request: user_pb.CreateUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_pb.User) => void): grpcWeb.ClientReadableStream<user_pb.User>;

  createUser(
    request: user_pb.CreateUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_pb.User) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/speakingExam.UserService/createUser',
        request,
        metadata || {},
        this.methodInfocreateUser,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/speakingExam.UserService/createUser',
    request,
    metadata || {},
    this.methodInfocreateUser);
  }

}

