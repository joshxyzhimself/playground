#!/bin/bash
# usage: bash ./env.sh

echo "--> Removing .env file."
rm -f ./.env

echo "--> Creating .env file."
EXAMPLE_BASE64_SECRET=$(openssl rand -base64 32)
EXAMPLE_HEX_SECRET=$(openssl rand -hex 32)
echo "EXAMPLE_BASE64_SECRET=$EXAMPLE_BASE64_SECRET" >> .env
echo "EXAMPLE_HEX_SECRET=$EXAMPLE_HEX_SECRET" >> .env

echo "--> Reading .env file."
cat ./.env