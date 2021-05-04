package main

import (
	"log"
	"net"
	"speaking-exam/server/dao"
	pb "speaking-exam/server/grpc"
	"speaking-exam/server/handler"
	"speaking-exam/server/middleware"

	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	grpc_auth "github.com/grpc-ecosystem/go-grpc-middleware/auth"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

const (
	port = ":9090"
)

func main() {
	dao, err := dao.New()
	if err != nil {
		log.Fatal(err)
	}
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer(
		grpc.UnaryInterceptor(grpc_middleware.ChainUnaryServer(
			grpc_auth.UnaryServerInterceptor(middleware.AuthFunc),
		)),
	)
	pb.RegisterUserServiceServer(s, handler.NewUserServiceServer(&dao))
	pb.RegisterTaskServiceServer(s, handler.NewTaskServiceServer(&dao))
	reflection.Register(s)
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
