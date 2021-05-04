package handler

import (
	"speaking-exam/server/dao"
	pb "speaking-exam/server/grpc"
	"speaking-exam/server/middleware"

	"github.com/golang/protobuf/ptypes/empty"
	"golang.org/x/net/context"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func NewUserServiceServer(dao *dao.Dao) *userServiceServer {
	s := &userServiceServer{dao: *dao}
	return s
}

type userServiceServer struct {
	pb.UnimplementedUserServiceServer
	dao dao.Dao
}

func (s *userServiceServer) Login(ctx context.Context, in *pb.LoginRequest) (*pb.LoginResponse, error) {
	user, err := s.dao.User().Login(ctx, in.LoginId, in.Password)
	if err != nil {
		return nil, err
	}
	token, err := s.dao.Auth().GetToken(ctx, user.Id)
	if err != nil {
		return nil, err
	}
	res := &pb.LoginResponse{
		Token: *token,
		User: &pb.User{
			Id:        user.Id,
			LoginId:   user.LoginId,
			Type:      user.Type,
			ExamId:    user.ExamId,
			CreatedAt: timestamppb.New(user.CreatedAt),
			UpdatedAt: timestamppb.New(user.UpdatedAt)}}
	return res, nil
}

func (s *userServiceServer) CreateUsers(ctx context.Context, in *pb.CreateUsersRequest) (*pb.CreateUsersResponse, error) {
	users, err := s.dao.User().CreateUsers(ctx, in.LoginIds, in.Passwords, in.ExamId)
	if err != nil {
		return nil, err
	}
	// object.userからpb.userに変換
	var pbUsers []*pb.User
	for _, user := range users {
		pbUser := new(pb.User)
		pbUser.LoginId = user.LoginId
		pbUser.Type = user.Type
		pbUser.ExamId = user.ExamId
		pbUsers = append(pbUsers, pbUser)
	}
	res := &pb.CreateUsersResponse{User: pbUsers}
	return res, nil
}

func (s *userServiceServer) ListUsers(ctx context.Context, in *empty.Empty) (*pb.ListUsersResponse, error) {
	return nil, nil
}

func (s *userServiceServer) GetUser(ctx context.Context, in *pb.GetUserRequest) (*pb.User, error) {
	res := &pb.User{Id: 1, LoginId: "T00001", Type: 1, ExamId: 1, CreatedAt: nil, UpdatedAt: nil}
	fmt.Println(res)
	return res, nil
}
