# Development

From the root directory

install npm dependencies including openapi generator needed later
`npm install`

generate code using protobuf files also generate openapi spec
`buf generate proto`

generate angular services from openapi spec
`npm run generate`

build start all docker containers
`docker compose build`
`docker compose up -d`

run dev angular server
`npm run start`