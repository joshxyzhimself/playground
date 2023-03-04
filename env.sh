#!/bin/bash
# usage: bash ./env.sh

PLAYGROUND_ENVIRONMENT="$1"

if [ -z "$PLAYGROUND_ENVIRONMENT" ]; then
    echo "You must provide the PLAYGROUND_ENVIRONMENT parameter ('development' or 'production')." 1>&2
    exit 1
fi

echo "--> Removing .env file symlink."
rm -f ./client/.env
rm -f ./server/.env

echo "--> Removing .env file."
rm -f ./.env

echo "--> Creating .env file."
PLAYGROUND_SECRET=$(openssl rand 32)
PLAYGROUND_HEX_SECRET=$(echo -n "$PLAYGROUND_SECRET" | xxd -p -c 32)
PLAYGROUND_BASE32_SECRET=$(echo -n "$PLAYGROUND_SECRET" | base32)
PLAYGROUND_BASE64_SECRET=$(echo -n "$PLAYGROUND_SECRET" | base64)
echo "PLAYGROUND_ENVIRONMENT=$PLAYGROUND_ENVIRONMENT" >> .env
echo "PLAYGROUND_HEX_SECRET=$PLAYGROUND_HEX_SECRET" >> .env
echo "PLAYGROUND_BASE32_SECRET=$PLAYGROUND_BASE32_SECRET" >> .env
echo "PLAYGROUND_BASE64_SECRET=$PLAYGROUND_BASE64_SECRET" >> .env
echo "POSTGRES_USER=postgres" >> .env
echo "POSTGRES_PASSWORD=postgres" >> .env
echo "PGRST_DB_SCHEMAS=public" >> .env
echo "PGRST_DB_EXTRA_SEARCH_PATH=public" >> .env
echo "PGRST_JWT_SECRET=$PLAYGROUND_BASE64_SECRET" >> .env
echo "PGRST_JWT_SECRET_IS_BASE64=true" >> .env

echo "--> Reading .env file."
cat ./.env

echo "--> Creating .env file symlink."
ln ./.env ./client/.env
ln ./.env ./server/.env