/**
 * @fileoverview gRPC-Web generated client stub for speakingExam
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as task_pb from './task_pb';


export class TaskServiceClient {
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

  methodInfoListTasks = new grpcWeb.AbstractClientBase.MethodInfo(
    task_pb.ListTasksResponse,
    (request: task_pb.ListTasksRequest) => {
      return request.serializeBinary();
    },
    task_pb.ListTasksResponse.deserializeBinary
  );

  listTasks(
    request: task_pb.ListTasksRequest,
    metadata: grpcWeb.Metadata | null): Promise<task_pb.ListTasksResponse>;

  listTasks(
    request: task_pb.ListTasksRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: task_pb.ListTasksResponse) => void): grpcWeb.ClientReadableStream<task_pb.ListTasksResponse>;

  listTasks(
    request: task_pb.ListTasksRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: task_pb.ListTasksResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/speakingExam.TaskService/ListTasks',
        request,
        metadata || {},
        this.methodInfoListTasks,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/speakingExam.TaskService/ListTasks',
    request,
    metadata || {},
    this.methodInfoListTasks);
  }

  methodInfoGetTask = new grpcWeb.AbstractClientBase.MethodInfo(
    task_pb.Task,
    (request: task_pb.GetTaskRequest) => {
      return request.serializeBinary();
    },
    task_pb.Task.deserializeBinary
  );

  getTask(
    request: task_pb.GetTaskRequest,
    metadata: grpcWeb.Metadata | null): Promise<task_pb.Task>;

  getTask(
    request: task_pb.GetTaskRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: task_pb.Task) => void): grpcWeb.ClientReadableStream<task_pb.Task>;

  getTask(
    request: task_pb.GetTaskRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: task_pb.Task) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/speakingExam.TaskService/GetTask',
        request,
        metadata || {},
        this.methodInfoGetTask,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/speakingExam.TaskService/GetTask',
    request,
    metadata || {},
    this.methodInfoGetTask);
  }

}

