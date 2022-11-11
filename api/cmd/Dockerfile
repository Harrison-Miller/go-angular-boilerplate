FROM golang:1.19-alpine

WORKDIR /app

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY gen/proto/go gen/proto/go
COPY api api

RUN go build -o /api api/cmd/main.go

CMD ["/api"]
