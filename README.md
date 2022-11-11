## Install dependencies and tools
Have docker installed

```shell
brew install bufbuild/buf/buf
brew install node@16
npm install
```

## Development
Before building for the first time, or after modifying anything in the proto directory run
`./scripts/generate.sh`

To start the development environment
`docker compose up -d`

Run the angular dev server
`npm run start`

Go to http://localhost:4200 and start developing the angular application.

To rebuild the go application run
```shell
docker compose build api
docker compose up -d
```

If you update the proto files make sure to run `./scripts/generate.sh` and rebuild the go application you will likely need to restart ng serve.