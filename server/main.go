package main

import (
	"fmt"
	"log"
	"net"
	pb "speaking-exam/server/generated"

	"github.com/golang/protobuf/ptypes/empty"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

const (
	port = ":9090"
)

type server struct {
	pb.UnimplementedExamServiceServer
}

func (s *server) ListExams(ctx context.Context, in *empty.Empty) (*pb.ListExamResponse, error) {
	return nil, nil
}

func (s *server) GetExam(ctx context.Context, in *pb.GetExamRequest) (*pb.GetExamResponse, error) {
	res := &pb.GetExamResponse{Exam: &pb.Exam{Id: 1, Name: "test", CreatedAt: nil, UpdatedAt: nil}}
	fmt.Println(res)
	return res, nil
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterExamServiceServer(s, &server{})
	reflection.Register(s)
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
