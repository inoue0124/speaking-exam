package handler

import (
	"fmt"
	"speaking-exam/server/dao"
	pb "speaking-exam/server/grpc"

	"github.com/golang/protobuf/ptypes/empty"
	"golang.org/x/net/context"
)

func NewUserServiceServer(dao *dao.Dao) *userServiceServer {
	s := &userServiceServer{dao: *dao}
	return s
}

type userServiceServer struct {
	pb.UnimplementedUserServiceServer
	dao dao.Dao
}

func (s *userServiceServer) ListUsers(ctx context.Context, in *empty.Empty) (*pb.ListUserResponse, error) {
	return nil, nil
}

func (s *userServiceServer) GetUser(ctx context.Context, in *pb.GetUserRequest) (*pb.User, error) {
	res := &pb.User{Id: 1, LoginId: "T00001", Type: 1, ExamId: 1, CreatedAt: nil, UpdatedAt: nil}
	fmt.Println(res)
	return res, nil
}
