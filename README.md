# Running the app
## 1. Create the docker image
```sh
docker build . -t <your username>/web-socket-prototype
```

## 2. Run docker image
```sh
docker run -p 8080:80 -d <your username>/web-socket-prototype
```