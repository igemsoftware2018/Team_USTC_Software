# BioHub (Team_USTC_Software)

Welcome to BioHub.

[Our Wiki](http://2018.igem.org/Team:USTC-Software/index.html)  [Our Website](https://biohub.tech/)

USTC-Software

## Installation

### Requirements

- `python >= 3.5`
- `pip`
- `mysql >= 5.7`
- `redis`
- `nodejs`

### Deployment

```shell
git clone https://github.com/igemsoftware2018/Team_USTC_Software
cd Team_USTC_Software
```

#### Backend

```shell
cd Backend
```

- Make sure `mysql`,`redis` services are running.
- Edit configuration.

```shell
cp config.json.example config.json
vim config.json
```

- Create runtime environment.

```shell
python3 -m venv .env
source .env/bin/activate
(.env) $ pip install -r requirements/dev.txt
```

- Initialize.

```shell
./biohub-cli.py init
```

- Run server.

```shell
./biohub-cli.py runserver
```

### Frontend

Frontend pages are built with angular, it's easy to setup with angular-cli tools (`ng`).

```shell
cd Frontend
```

##### Debug mode

```shell
ng serve
```

#### Production mode

```
ng server --prod
```

