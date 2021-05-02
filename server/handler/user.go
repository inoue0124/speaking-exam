package handler

import (
	"fmt"
	pb "speaking-exam/server/grpc"

	"github.com/golang/protobuf/ptypes/empty"
	"golang.org/x/net/context"
)

type UserServiceServer struct {
	pb.UnimplementedUserServiceServer
}

func (s *UserServiceServer) ListUsers(ctx context.Context, in *empty.Empty) (*pb.ListUserResponse, error) {
	return nil, nil
}

func (s *UserServiceServer) GetUser(ctx context.Context, in *pb.GetUserRequest) (*pb.User, error) {
	res := &pb.User{Id: 1, LoginId: "T00001", Type: 1, ExamId: 1, CreatedAt: nil, UpdatedAt: nil}
	fmt.Println(res)
	return res, nil
}
