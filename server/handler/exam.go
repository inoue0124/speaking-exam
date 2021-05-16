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
	pb.ExamServiceServer
	dao dao.Dao
}

func (s *examServiceServer) ListExams(ctx context.Context, in *empty.Empty) (*pb.ListExamsResponse, error) {
	exams, err := s.dao.Exam().ListExams(ctx)
	if err != nil {
		return nil, err
	}
	// object.examからpb.examに変換
	var pbExams []*pb.Exam
	for _, exam := range exams {
		pbExam := new(pb.Exam)
		pbExam.Id = exam.Id
		pbExam.Name = exam.Name
		pbExam.CreatedAt = timestamppb.New(exam.CreatedAt)
		pbExam.UpdatedAt = timestamppb.New(exam.UpdatedAt)
		pbExams = append(pbExams, pbExam)
	}
	res := &pb.ListExamsResponse{Exam: pbExams}
	return res, nil
}
