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
import * as exam_pb from './exam_pb';


export class ExamServiceClient {
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

  methodInfoListExams = new grpcWeb.AbstractClientBase.MethodInfo(
    exam_pb.ListExamsResponse,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    exam_pb.ListExamsResponse.deserializeBinary
  );

  listExams(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null): Promise<exam_pb.ListExamsResponse>;

  listExams(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: exam_pb.ListExamsResponse) => void): grpcWeb.ClientReadableStream<exam_pb.ListExamsResponse>;

  listExams(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: exam_pb.ListExamsResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/speakingExam.ExamService/ListExams',
        request,
        metadata || {},
        this.methodInfoListExams,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/speakingExam.ExamService/ListExams',
    request,
    metadata || {},
    this.methodInfoListExams);
  }

}

