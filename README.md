# qcmd web client

Web tool to search terminal commands via server API.

## Build from sources

Unix makefile is used to compile Go and TypeScript sources into directory `./build`. Then docker image is created from compiled sources. To
execute the compilation, run in directory where makefile exists:

```
make
```

## Run built docker image


```
docker run --rm -d -p 8888:8888 mkoptik/qcmd-client-web
```