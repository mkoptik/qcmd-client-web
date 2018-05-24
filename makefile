# Go parameters
GOCMD=go
GOBUILD=$(GOCMD) build
GOCLEAN=$(GOCMD) clean
GOTEST=$(GOCMD) test
GOGET=$(GOCMD) get

BINARY_NAME=qcmd-client-web

all: clean build
build:
	npm --prefix ./client run build
	$(GOBUILD) -o ./build/$(BINARY_NAME) -v ./server/main.go
	mkdir ./build/static ./build/templates
	cp ./client/dist/* ./build/static
	cp ./server/templates/index.html ./build/templates/
	docker build -t mkoptik/qcmd-client-web .
clean:
	$(GOCLEAN)
	rm -rf ./build