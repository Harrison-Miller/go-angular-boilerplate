package main

import (
	messagev1 "boilerplate/gen/proto/go/boilerplate/message/v1"
	"context"
	"github.com/felixge/httpsnoop"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"github.com/soheilhy/cmux"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"log"
	"net"
	"net/http"
)

func main() {
	// create new gRPC server
	grpcSever := grpc.NewServer()
	// register the GreeterServerImpl on the gRPC server
	messagev1.RegisterMessageServiceServer(grpcSever, &MessageServer{})

	// creating mux for gRPC gateway. This will multiplex or route request different gRPC service
	mux := runtime.NewServeMux()
	// setting up a dail up for gRPC service by specifying endpoint/target url
	err := messagev1.RegisterMessageServiceHandlerFromEndpoint(context.Background(), mux, "localhost:8081", []grpc.DialOption{grpc.WithTransportCredentials(insecure.NewCredentials())})
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

type MessageServer struct {
	messagev1.UnimplementedMessageServiceServer
}

func (m MessageServer) ListMessages(ctx context.Context, request *messagev1.ListMessagesRequest) (*messagev1.ListMessagesResponse, error) {
	return &messagev1.ListMessagesResponse{
		Messages: []string{"foo", "bar", "baz", "qux"},
	}, nil
}

