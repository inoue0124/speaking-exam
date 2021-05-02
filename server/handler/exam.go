package handler

import (
	"speaking-exam/server/dao"
	pb "speaking-exam/server/grpc"

	"github.com/golang/protobuf/ptypes/empty"
	"golang.org/x/net/context"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func NewExamServiceServer(dao *dao.Dao) *examServiceServer {
	s := &examServiceServer{dao: *dao}
	return s
}

type examServiceServer struct {
	pb.UnimplementedExamServiceServer
	dao dao.Dao
}

func (s *examServiceServer) ListExams(ctx context.Context, in *empty.Empty) (*pb.ListExamResponse, error) {
	return nil, nil
}

func (s *examServiceServer) GetExam(ctx context.Context, in *pb.GetExamRequest) (*pb.Exam, error) {
	exam, err := s.dao.Exam().FindById(ctx, in.Id)
	if err != nil {
		return nil, err
	}
	res := &pb.Exam{Id: exam.Id, Name: exam.Name, CreatedAt: timestamppb.New(exam.CreatedAt), UpdatedAt: timestamppb.New(exam.UpdatedAt)}
	return res, nil
}
