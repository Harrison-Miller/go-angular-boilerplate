FROM golang:1.19-alpine

WORKDIR /app

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY gen/proto/go gen/proto/go
COPY cmd cmd

RUN go build -o /holopanel cmd/main.go

CMD ["/holopanel"]
