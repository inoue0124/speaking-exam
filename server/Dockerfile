FROM golang:1.16.3

ENV GO111MODULE=on

WORKDIR /go/src/speaking-exam/server
RUN go get github.com/pilu/fresh
CMD ["fresh"]
EXPOSE 9090
