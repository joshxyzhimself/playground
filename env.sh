#!/bin/bash
# usage: bash ./env.sh

echo "--> Removing .env file symlink."
rm -f ./client/.env
rm -f ./server/.env

echo "--> Removing .env file."
rm -f ./.env

echo "--> Creating .env file."
PLAYGROUND_BASE64_SECRET=$(openssl rand -base64 32)
PLAYGROUND_HEX_SECRET=$(openssl rand -hex 32)
echo "PLAYGROUND_BASE64_SECRET=$PLAYGROUND_BASE64_SECRET" >> .env
echo "PLAYGROUND_HEX_SECRET=$PLAYGROUND_HEX_SECRET" >> .env

echo "--> Reading .env file."
cat ./.env

echo "--> Creating .env file symlink."
ln ./.env ./client/.env
ln ./.env ./server/.env