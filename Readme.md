# Config
- Create a `.env` in each `api`, `db` folders.

## API `.env`

```
DB_HOST="localhost"
DB_NAME=""
DB_USER=""
DB_PASS=""
PORT=4321
CORS_ORIGIN=""
```

## DB `.env`

```
MYSQL_ROOT_PASSWORD=""
MYSQL_DATABASE=""
```

# Build

```
docker-compose up --build
```

# Run Without Re-build

```
docker-compose up
```
