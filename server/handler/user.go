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
	pb.UserServiceServer
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
	users, err := s.dao.User().CreateUsers(ctx, in.LoginIds, in.Passwords, in.ExamIds)
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
		pbUser.CreatedAt = timestamppb.New(user.CreatedAt)
		pbUser.UpdatedAt = timestamppb.New(user.UpdatedAt)
		pbUsers = append(pbUsers, pbUser)
	}
	res := &pb.CreateUsersResponse{User: pbUsers}
	return res, nil
}

func (s *userServiceServer) GetCurrentUser(ctx context.Context, in *empty.Empty) (*pb.User, error) {
	user, err := s.dao.User().GetCurrentUser(ctx)
	if err != nil {
		return nil, err
	}
	// object.userからpb.userに変換
	res := &pb.User{
		Id:        user.Id,
		LoginId:   user.LoginId,
		Type:      user.Type,
		ExamId:    user.ExamId,
		CreatedAt: timestamppb.New(user.CreatedAt),
		UpdatedAt: timestamppb.New(user.UpdatedAt)}
	return res, nil
}

func (s *userServiceServer) ListUsers(ctx context.Context, in *empty.Empty) (*pb.ListUsersResponse, error) {
	users, err := s.dao.User().ListUsers(ctx)
	if err != nil {
		return nil, err
	}
	// object.userからpb.userに変換
	var pbUsers []*pb.User
	for _, user := range users {
		pbUser := new(pb.User)
		pbUser.Id = user.Id
		pbUser.LoginId = user.LoginId
		pbUser.Type = user.Type
		pbUser.ExamId = user.ExamId
		pbUser.CreatedAt = timestamppb.New(user.CreatedAt)
		pbUser.UpdatedAt = timestamppb.New(user.UpdatedAt)
		pbUsers = append(pbUsers, pbUser)
	}
	res := &pb.ListUsersResponse{User: pbUsers}
	return res, nil
}

func (s *userServiceServer) AuthFuncOverride(ctx context.Context, fullMethodName string) (context.Context, error) {
	// Login がコールされた場合は認証のチェックをskipする
	if fullMethodName == "/speakingExam.UserService/Login" {
		return ctx, nil
	}

	ctx, err := middleware.AuthFunc(ctx)
	if err != nil {
		return ctx, err
	}

	if fullMethodName == "/speakingExam.UserService/CreateUsers" || fullMethodName == "/speakingExam.UserService/ListUsers" {
		ctx, err := middleware.AuthAdmin(ctx)
		if err != nil {
			return ctx, err
		}
	}

	return ctx, nil
}
