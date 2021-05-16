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

  methodInfoListRecordings = new grpcWeb.AbstractClientBase.MethodInfo(
    recording_pb.ListRecordingsResponse,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    recording_pb.ListRecordingsResponse.deserializeBinary
  );

  listRecordings(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null): Promise<recording_pb.ListRecordingsResponse>;

  listRecordings(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: recording_pb.ListRecordingsResponse) => void): grpcWeb.ClientReadableStream<recording_pb.ListRecordingsResponse>;

  listRecordings(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: recording_pb.ListRecordingsResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/speakingExam.RecordingService/ListRecordings',
        request,
        metadata || {},
        this.methodInfoListRecordings,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/speakingExam.RecordingService/ListRecordings',
    request,
    metadata || {},
    this.methodInfoListRecordings);
  }

  methodInfodownloadRecordings = new grpcWeb.AbstractClientBase.MethodInfo(
    recording_pb.DownloadRecordingsResponse,
    (request: recording_pb.DownloadRecordingsRequest) => {
      return request.serializeBinary();
    },
    recording_pb.DownloadRecordingsResponse.deserializeBinary
  );

  downloadRecordings(
    request: recording_pb.DownloadRecordingsRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/speakingExam.RecordingService/downloadRecordings',
      request,
      metadata || {},
      this.methodInfodownloadRecordings);
  }

}

