# Start from a Debian image with the latest version of Go installed
# and a workspace (GOPATH) configured at /go.
FROM golang

COPY ./build /go/bin/

WORKDIR /go/bin
ENTRYPOINT /go/bin/qcmd-client-web

EXPOSE 8888