package handler

import (
	"io"
	"os"
	"speaking-exam/server/dao"
	pb "speaking-exam/server/grpc"
	"speaking-exam/server/middleware"

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

func (s *recordingServiceServer) DownloadRecordings(in *pb.DownloadRecordingsRequest, stream pb.RecordingService_DownloadRecordingsServer) error {
	// 保存先のディレクトリ作成
	if err := os.MkdirAll("/record", 0755); err != nil {
		return err
	}
	// 録音音声をs3からダウンロード
	if err := s.dao.Recording().DownloadRecordings(in.AudioObjKeys); err != nil {
		return err
	}
	// zipファイル化
	if err := s.dao.Recording().ArchiveRecordings(in.AudioObjKeys); err != nil {
		return err
	}
	// レスポンスをストリームで送信
	zipFile, err := os.Open("/record/record.zip")
	if err != nil {
		return err
	}
	buf := make([]byte, 1024)
	for {
		_, err := zipFile.Read(buf)
		if err == io.EOF {
			break
		}
		if err != nil {
			return err
		}
		data := &pb.DownloadRecordingsResponse{AudioData: buf}
		stream.Send(data)
	}
	// 一時ファイルの削除
	if err := os.RemoveAll("/record"); err != nil {
		return err
	}
	return nil
}

func (s *recordingServiceServer) AuthFuncOverride(ctx context.Context, fullMethodName string) (context.Context, error) {
	ctx, err := middleware.AuthFunc(ctx)
	if err != nil {
		return ctx, err
	}

	if fullMethodName == "/speakingExam.RecordingService/ListRecordings" || fullMethodName == "/speakingExam.RecordingService/DownloadRecordings" {
		ctx, err := middleware.AuthAdmin(ctx)
		if err != nil {
			return ctx, err
		}
	}

	return ctx, nil
}
