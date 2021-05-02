/**
 * @fileoverview gRPC-Web generated client stub for generated
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
    exam_pb.ListExamResponse,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    exam_pb.ListExamResponse.deserializeBinary
  );

  listExams(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null): Promise<exam_pb.ListExamResponse>;

  listExams(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: exam_pb.ListExamResponse) => void): grpcWeb.ClientReadableStream<exam_pb.ListExamResponse>;

  listExams(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: exam_pb.ListExamResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/generated.ExamService/ListExams',
        request,
        metadata || {},
        this.methodInfoListExams,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/generated.ExamService/ListExams',
    request,
    metadata || {},
    this.methodInfoListExams);
  }

  methodInfogetExam = new grpcWeb.AbstractClientBase.MethodInfo(
    exam_pb.GetExamResponse,
    (request: exam_pb.GetExamRequest) => {
      return request.serializeBinary();
    },
    exam_pb.GetExamResponse.deserializeBinary
  );

  getExam(
    request: exam_pb.GetExamRequest,
    metadata: grpcWeb.Metadata | null): Promise<exam_pb.GetExamResponse>;

  getExam(
    request: exam_pb.GetExamRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: exam_pb.GetExamResponse) => void): grpcWeb.ClientReadableStream<exam_pb.GetExamResponse>;

  getExam(
    request: exam_pb.GetExamRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: exam_pb.GetExamResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/generated.ExamService/getExam',
        request,
        metadata || {},
        this.methodInfogetExam,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/generated.ExamService/getExam',
    request,
    metadata || {},
    this.methodInfogetExam);
  }

}

