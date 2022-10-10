FROM golang AS gen_go_grpc

ARG VER=v1.0.0

RUN GOBIN=/ GO111MODULE=on go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

FROM debian:buster-slim

ARG VERS=3.12.4
ARG ARCH=linux-x86_64
ARG ARCH2=linux.amd64
ARG GEN_GO_VER=1.25.0
ARG GEN_GRPC_WEB=1.2.1

RUN apt update -y && apt upgrade -y && \
  apt install wget unzip make -y && \
  apt clean -y && \
  rm -rf /var/lib/apt/lists/*

RUN wget "https://github.com/protocolbuffers/protobuf/releases/download/v${VERS}/protoc-${VERS}-${ARCH}.zip" && \
  unzip "protoc-${VERS}-${ARCH}.zip" -d protoc && \
  rm "protoc-${VERS}-${ARCH}.zip"

RUN wget "https://github.com/protocolbuffers/protobuf-go/releases/download/v${GEN_GO_VER}/protoc-gen-go.v${GEN_GO_VER}.${ARCH2}.tar.gz" && \
  tar zxf "protoc-gen-go.v${GEN_GO_VER}.${ARCH2}.tar.gz" -C /protoc/bin && \
  rm "protoc-gen-go.v${GEN_GO_VER}.${ARCH2}.tar.gz"

RUN wget "https://github.com/grpc/grpc-web/releases/download/${GEN_GRPC_WEB}/protoc-gen-grpc-web-${GEN_GRPC_WEB}-${ARCH}" \
  -O /protoc/bin/protoc-gen-grpc-web && \
  chmod +x /protoc/bin/protoc-gen-grpc-web

COPY --from=gen_go_grpc /protoc-gen-go-grpc /protoc/bin/

ENV PATH=$PATH:/protoc/bin/
WORKDIR /app
