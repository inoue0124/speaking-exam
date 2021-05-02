#!/bin/sh

set -xe

SERVER_OUTPUT_DIR=server/grpc
CLIENT_OUTPUT_DIR=client/grpc

protoc --version
protoc --proto_path=proto `find proto -iname "*.proto"` \
  --go_out=${SERVER_OUTPUT_DIR} \
  --go-grpc_out=${SERVER_OUTPUT_DIR} \
  --js_out=import_style=commonjs:${CLIENT_OUTPUT_DIR} \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:${CLIENT_OUTPUT_DIR}