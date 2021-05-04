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

  methodInfoLogin = new grpcWeb.AbstractClientBase.MethodInfo(
    user_pb.LoginResponse,
    (request: user_pb.LoginRequest) => {
      return request.serializeBinary();
    },
    user_pb.LoginResponse.deserializeBinary
  );

  login(
    request: user_pb.LoginRequest,
    metadata: grpcWeb.Metadata | null): Promise<user_pb.LoginResponse>;

  login(
    request: user_pb.LoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_pb.LoginResponse) => void): grpcWeb.ClientReadableStream<user_pb.LoginResponse>;

  login(
    request: user_pb.LoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_pb.LoginResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/speakingExam.UserService/Login',
        request,
        metadata || {},
        this.methodInfoLogin,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/speakingExam.UserService/Login',
    request,
    metadata || {},
    this.methodInfoLogin);
  }

  methodInfoCreateUsers = new grpcWeb.AbstractClientBase.MethodInfo(
    user_pb.CreateUsersResponse,
    (request: user_pb.CreateUsersRequest) => {
      return request.serializeBinary();
    },
    user_pb.CreateUsersResponse.deserializeBinary
  );

  createUsers(
    request: user_pb.CreateUsersRequest,
    metadata: grpcWeb.Metadata | null): Promise<user_pb.CreateUsersResponse>;

  createUsers(
    request: user_pb.CreateUsersRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_pb.CreateUsersResponse) => void): grpcWeb.ClientReadableStream<user_pb.CreateUsersResponse>;

  createUsers(
    request: user_pb.CreateUsersRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_pb.CreateUsersResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/speakingExam.UserService/CreateUsers',
        request,
        metadata || {},
        this.methodInfoCreateUsers,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/speakingExam.UserService/CreateUsers',
    request,
    metadata || {},
    this.methodInfoCreateUsers);
  }

  methodInfoListUsers = new grpcWeb.AbstractClientBase.MethodInfo(
    user_pb.ListUsersResponse,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    user_pb.ListUsersResponse.deserializeBinary
  );

  listUsers(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null): Promise<user_pb.ListUsersResponse>;

  listUsers(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_pb.ListUsersResponse) => void): grpcWeb.ClientReadableStream<user_pb.ListUsersResponse>;

  listUsers(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_pb.ListUsersResponse) => void) {
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

}

