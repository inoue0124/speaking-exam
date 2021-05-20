package handler

import (
	"fmt"
	"speaking-exam/server/dao"
	pb "speaking-exam/server/grpc"

	"golang.org/x/net/context"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func NewTaskServiceServer(dao *dao.Dao) *taskServiceServer {
	s := &taskServiceServer{dao: *dao}
	return s
}

type taskServiceServer struct {
	pb.TaskServiceServer
	dao dao.Dao
}

func (s *taskServiceServer) ListTasks(ctx context.Context, in *pb.ListTasksRequest) (*pb.ListTasksResponse, error) {
	tasks, err := s.dao.Task().ListTasks(ctx, in.ExamId, int32(in.Type))
	if err != nil {
		return nil, err
	}
	// object.taskからpb.taskに変換
	var pbTasks []*pb.Task
	for _, task := range tasks {
		pbTask := new(pb.Task)
		pbTask.Id = task.Id
		pbTask.ExamId = task.ExamId
		pbTask.Type = pb.TaskType(int32(task.Type))
		pbTask.TextUrl = task.TextUrl
		pbTask.ImageUrl = task.ImageUrl
		pbTask.AudioUrl = task.AudioUrl
		pbTask.MsBeforeStarting = task.MsBeforeStarting
		pbTask.MsPreparing = task.MsPreparing
		pbTask.MsRecording = task.MsRecording
		pbTask.CreatedAt = timestamppb.New(task.CreatedAt)
		pbTask.UpdatedAt = timestamppb.New(task.UpdatedAt)
		pbTasks = append(pbTasks, pbTask)
	}
	res := &pb.ListTasksResponse{Task: pbTasks}
	return res, nil
}

func (s *taskServiceServer) GetTask(ctx context.Context, in *pb.GetTaskRequest) (*pb.Task, error) {
	// 初期値の場合
	if in.Id == 0 {
		return nil, fmt.Errorf("not found")
	}
	task, err := s.dao.Task().GetTask(ctx, in.Id)
	if err != nil {
		return nil, err
	}
	// object.taskからpb.taskに変換
	pbTask := new(pb.Task)
	pbTask.Id = task.Id
	pbTask.ExamId = task.ExamId
	pbTask.Type = pb.TaskType(int32(task.Type))
	pbTask.TextUrl = task.TextUrl
	pbTask.ImageUrl = task.ImageUrl
	pbTask.AudioUrl = task.AudioUrl
	pbTask.MsBeforeStarting = task.MsBeforeStarting
	pbTask.MsPreparing = task.MsPreparing
	pbTask.MsRecording = task.MsRecording
	pbTask.CreatedAt = timestamppb.New(task.CreatedAt)
	pbTask.UpdatedAt = timestamppb.New(task.UpdatedAt)
	return pbTask, nil
}
