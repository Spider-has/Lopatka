FROM golang:1.21-alpine

RUN go version
ENV GOPATH=/

COPY ./ ./

RUN go mod download

# RUN apt-get update
# RUN apt-get -y install postgresql-client

# RUN chmod +x wait-for-postgres.sh

RUN go build -o test-app ./cmd/main.go

CMD ["./test-app"]