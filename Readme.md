# Config
- Create a `.env` in each `api`, `db` folders.

## API `.env`

```
DB_HOST="db"
DB_NAME=""
DB_USER=""
DB_PASS=""
PORT=4321
CORS_ORIGIN="http://localhost:4000"
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

# Run Docker Container Without Re-build

```
docker-compose up
```

# Use App
- Navigate to `localhost:4000` in your browser.