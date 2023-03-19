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

#### Relaunch all services

```sh
git pull && docker compose up --build --force-recreate --detach
```

#### Relaunch one service

```sh
git pull && docker compose up --build --force-recreate --no-deps --detach playground-playground
```

#### License

MIT