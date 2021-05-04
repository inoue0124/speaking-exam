package handler

import (
	"speaking-exam/server/dao"
	pb "speaking-exam/server/grpc"

	"golang.org/x/net/context"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func NewRecordingServiceServer(dao *dao.Dao) *recordingServiceServer {
	s := &recordingServiceServer{dao: *dao}
	return s
}

type recordingServiceServer struct {
	pb.UnimplementedRecordingServiceServer
	dao dao.Dao
}

func (s *recordingServiceServer) CreateRecording(ctx context.Context, in *pb.CreateRecordingRequest) (*pb.Recording, error) {
	recording, err := s.dao.Recording().CreateRecording(ctx, in.TaskId, in.AudioData)
	if err != nil {
		return nil, err
	}
	// object.recordingからpb.recordingに変換
	res := &pb.Recording{
		Id:          recording.Id,
		UserId:      recording.UserId,
		TaskId:      recording.TaskId,
		AudioObjKey: recording.AudioObjKey,
		CreatedAt:   timestamppb.New(recording.CreatedAt),
		UpdatedAt:   timestamppb.New(recording.UpdatedAt)}
	return res, nil
}
