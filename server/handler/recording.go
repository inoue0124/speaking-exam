package handler

import (
	"speaking-exam/server/dao"
	pb "speaking-exam/server/grpc"

	"github.com/golang/protobuf/ptypes/empty"
	"golang.org/x/net/context"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func NewRecordingServiceServer(dao *dao.Dao) *recordingServiceServer {
	s := &recordingServiceServer{dao: *dao}
	return s
}

type recordingServiceServer struct {
	pb.RecordingServiceServer
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

func (s *recordingServiceServer) ListRecordings(ctx context.Context, in *empty.Empty) (*pb.ListRecordingsResponse, error) {
	recordings, err := s.dao.Recording().ListRecordings(ctx)
	if err != nil {
		return nil, err
	}
	// object.recordingからpb.recordingに変換
	var pbRecordings []*pb.Recording
	for _, recording := range recordings {
		pbRecording := new(pb.Recording)
		pbRecording.Id = recording.Id
		pbRecording.UserId = recording.UserId
		pbRecording.TaskId = recording.TaskId
		pbRecording.AudioObjKey = recording.AudioObjKey
		pbRecording.CreatedAt = timestamppb.New(recording.CreatedAt)
		pbRecording.UpdatedAt = timestamppb.New(recording.UpdatedAt)
		pbRecordings = append(pbRecordings, pbRecording)
	}
	res := &pb.ListRecordingsResponse{Recording: pbRecordings}
	return res, nil
}
