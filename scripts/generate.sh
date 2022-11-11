echo "Clearing old generated files"
rm -rf gen
rm -rf ui/src/app/api

echo "Generating go files and openapi spec"
buf generate proto

echo "Generating typescript clients"
cd ui && npm run generate