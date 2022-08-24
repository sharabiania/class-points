# Config
- Create a `.env.prod` in each `api`, `db` folders.

## API `.env.prod`

```
STAGE="prod"
DB_HOST="db"
DB_USER=""
DB_PASS=""
DB_NAME="class_points_prod"
PORT=4321
CORS_ORIGIN='http://localhost:4000'
```

## DB `.env.prod`

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