/**
 * @fileoverview gRPC-Web generated client stub for speakingExam
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as recording_pb from './recording_pb';


export class RecordingServiceClient {
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

  methodInfoCreateRecording = new grpcWeb.AbstractClientBase.MethodInfo(
    recording_pb.Recording,
    (request: recording_pb.CreateRecordingRequest) => {
      return request.serializeBinary();
    },
    recording_pb.Recording.deserializeBinary
  );

  createRecording(
    request: recording_pb.CreateRecordingRequest,
    metadata: grpcWeb.Metadata | null): Promise<recording_pb.Recording>;

  createRecording(
    request: recording_pb.CreateRecordingRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: recording_pb.Recording) => void): grpcWeb.ClientReadableStream<recording_pb.Recording>;

  createRecording(
    request: recording_pb.CreateRecordingRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: recording_pb.Recording) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/speakingExam.RecordingService/CreateRecording',
        request,
        metadata || {},
        this.methodInfoCreateRecording,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/speakingExam.RecordingService/CreateRecording',
    request,
    metadata || {},
    this.methodInfoCreateRecording);
  }

}

