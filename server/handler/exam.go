package handler

import (
	"fmt"
	pb "speaking-exam/server/grpc"

	"github.com/golang/protobuf/ptypes/empty"
	"golang.org/x/net/context"
)

type ExamServiceServer struct {
	pb.UnimplementedExamServiceServer
}

func (s *ExamServiceServer) ListExams(ctx context.Context, in *empty.Empty) (*pb.ListExamResponse, error) {
	return nil, nil
}

func (s *ExamServiceServer) GetExam(ctx context.Context, in *pb.GetExamRequest) (*pb.Exam, error) {
	res := &pb.Exam{Id: 1, Name: "test", CreatedAt: nil, UpdatedAt: nil}
	fmt.Println(res)
	return res, nil
}
