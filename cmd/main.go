package main

import (
	"context"
	"github.com/felixge/httpsnoop"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"github.com/soheilhy/cmux"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/status"
	authv1 "holopanel/gen/proto/go/holopanel/auth/v1"
	projectv1 "holopanel/gen/proto/go/holopanel/project/v1"
	"log"
	"net"
	"net/http"
)

func main() {
	// create new gRPC server
	grpcSever := grpc.NewServer()
	// register the GreeterServerImpl on the gRPC server
	projectv1.RegisterProjectServiceServer(grpcSever, &ProjectServer{})
	authv1.RegisterAuthServiceServer(grpcSever, &AuthServer{})

	// creating mux for gRPC gateway. This will multiplex or route request different gRPC service
	mux := runtime.NewServeMux()
	// setting up a dail up for gRPC service by specifying endpoint/target url
	err := projectv1.RegisterProjectServiceHandlerFromEndpoint(context.Background(), mux, "localhost:8081", []grpc.DialOption{grpc.WithTransportCredentials(insecure.NewCredentials())})
	if err != nil {
		log.Fatal(err)
	}
	err = authv1.RegisterAuthServiceHandlerFromEndpoint(context.Background(), mux, "localhost:8081", []grpc.DialOption{grpc.WithTransportCredentials(insecure.NewCredentials())})
	if err != nil {
		log.Fatal(err)
	}

	// Creating a normal HTTP server
	server := http.Server{
		Handler: withLogger(mux),
	}
	// creating a listener for server
	l, err := net.Listen("tcp", ":8081")
	if err != nil {
		log.Fatal(err)
	}
	m := cmux.New(l)
	// a different listener for HTTP1
	httpL := m.Match(cmux.HTTP1Fast())
	// a different listener for HTTP2 since gRPC uses HTTP2
	grpcL := m.Match(cmux.HTTP2())
	// start server
	// passing dummy listener
	go server.Serve(httpL)
	// passing dummy listener
	go grpcSever.Serve(grpcL)
	// actual listener
	m.Serve()
}

func withLogger(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		m := httpsnoop.CaptureMetrics(handler, writer, request)
		log.Printf("http[%d]-- %s -- %s\n", m.Code, m.Duration, request.URL.Path)
	})
}

type AuthServer struct {
	authv1.UnimplementedAuthServiceServer
}

func (a AuthServer) Login(ctx context.Context, request *authv1.LoginRequest) (*authv1.LoginResponse, error) {
	if request.GetUsername() == "Verra" && request.GetPassword() == "password" {
		return &authv1.LoginResponse{
			Token: "success",
		}, nil
	}

	return nil, status.Error(codes.PermissionDenied, "Failed to login")
}

func (a AuthServer) Logout(ctx context.Context, request *authv1.LogoutRequest) (*authv1.LogoutResponse, error) {
	return &authv1.LogoutResponse{}, nil
}

type ProjectServer struct {
	projectv1.UnimplementedProjectServiceServer
}

func (p ProjectServer) ListProjects(ctx context.Context, request *projectv1.ListProjectsRequest) (*projectv1.ListProjectsResponse, error) {
	return &projectv1.ListProjectsResponse{
		ProjectNames: []string{"foo", "bar", "baz", "qux"},
	}, nil
}
