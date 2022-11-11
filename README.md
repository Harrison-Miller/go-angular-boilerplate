# Go Angular Boilerplate
This project is meant to kickstart any development of a basic website using go as a backend and angular for the frontend.
It uses protocol buffer to generate server and client files for go and typescript.

## Customize
Before you get started you should rename anything that says 'boilerplate' with your own project name.

* Make sure to rename the go module to the github address of your project.
* Docker image names in docker-compose (though these are just used for development)
* default package name in buf.gen.yaml should be the <go module>/gen/proto/go

## Install dependencies and tools
Have docker installed

```shell
brew install bufbuild/buf/buf
brew install node@16
# follow brew instructions to setup PATH
npm install
```

## Development
Before building for the first time, or after modifying anything in the proto directory run
`./scripts/generate.sh`

To start the development environment
`docker compose up -d`

Run the angular dev server (from the ui directory)
`npm run start`

Go to http://localhost:4200 and start developing the angular application.

To rebuild the go application run
```shell
docker compose build api
docker compose up -d
```

If you update the proto files make sure to run `./scripts/generate.sh` and rebuild the go application you will likely need to restart ng serve.

## Protocol buffer development

Use `buf lint` from the proto directory to determine if you're breaking any proto linting rules.
Generally you should follow the structure `<app name>/<service name>/<version>/<service>.proto`

Make sure the package in the file is the same as the directory structure `<app name>.<service name>.<version>`