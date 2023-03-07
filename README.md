# playground

## Production

#### Install Docker using the convenience script🔗

- https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script

```sh
 curl -fsSL https://get.docker.com -o get-docker.sh
 sudo sh get-docker.sh
 ```

#### Generate and Link SSH Keys to your GitHub

```sh
ssh-keygen
cat ~/.ssh/id_rsa.pub
```

- https://github.com/settings/keys

#### Clone the repository

```sh
git clone git@github.com:joshxyzhimself/playground.git
```

#### Initialize environment file

```sh
bash ./env.sh
```

#### Run with Docker

```sh
docker compose up --build --force-recreate --detach
```

#### View Logs with Docker

```sh
docker compose logs --tail=100 --follow
```

#### Rebundling web

```sh
docker compose up --build --force-recreate --no-deps --detach web
```

## Tasks

#### Completed

- HTTP Server serves bundled client correctly.
- Docker HTTP Server serves bundled client correctly.
- Docker serves Server and Client correctly.
- Trader Dashboard
- JWT Encoder
- JWT Decoder

#### Planned / In Progress

- HOTP TOTP Playground
- Image compression with Sharp, serving with server.serve().
- Basic Authentication API with PostgreSQL and PostgREST.
- Basic CRUD with PostgreSQL and PostgREST.

#### Under Review

- None

#### References

- React Suspense
  - https://reactjs.org/docs/react-api.html#reactsuspense
  - https://beta.reactjs.org/reference/react/Suspense

#### License

MIT