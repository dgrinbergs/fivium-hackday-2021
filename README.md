# Running the app
## 1. Create the docker image
```sh
docker build . -t dgrinbergs/web-socket-prototype
```

## 2. Run docker image
```sh
docker run -p 8080:8080 -d dgrinbergs/web-socket-prototype
```
