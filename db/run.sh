#!/bin/sh
set -e  

DIR=$(dirname "$(readlink -f "$0")")  
cd "$DIR"
. ./.env  

docker ps -q -f name="$DB_CONTAINER_NAME" 2>&1 \
    && echo "[db] Stopping existing database container..." \
    && docker stop "$DB_CONTAINER_NAME" > /dev/null 2>&1 \
    && docker rm "$DB_CONTAINER_NAME" > /dev/null 2>&1

[ -n "$(lsof -t -i :"$DB_PORT")" ] \
    && echo "[db] Killing process on port $DB_PORT..." \
    && kill "$(lsof -t -i :"$DB_PORT")"

echo "[db] Starting PostgreSQL container..."
sudo docker run -d \
    --name "$DB_CONTAINER_NAME" \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_PASSWORD=postgres \
    -e POSTGRES_DB="$DB_CONTAINER_NAME" \
    -p "$DB_PORT:5432" \
    -v "$(pwd)/migration.sql:/docker-entrypoint-initdb.d/migration.sql" \
    -v "$(pwd)/seed.sql:/docker-entrypoint-initdb.d/seed.sql" \
    postgres:latest \
    && echo "[db] Container started successfully!" \
    || echo "[db] Failed to start container!"

echo "[db] Waiting for PostgreSQL to be ready..."
i=0
while ! docker exec "$DB_CONTAINER_NAME" pg_isready -U postgres -d "$DB_CONTAINER_NAME" >/dev/null 2>&1; do
    i=$((i+1))
    [ "$i" -ge 7 ] \
        && echo "[db] Timed out! Assuming database is ready..." \
        && break
    sleep 1
done

echo "[db] Applying migrations..."
docker exec -i "$DB_CONTAINER_NAME" psql -U postgres -d "$DB_CONTAINER_NAME" < migration.sql \
    && echo "[db] Migrations applied successfully!" \
    || echo "[db] Migration failed!"

echo "[db] Seeding database..."
docker exec -i "$DB_CONTAINER_NAME" psql -U postgres -d "$DB_CONTAINER_NAME" < seed.sql \
    && echo "[db] Seeding completed!" \
    || echo "[db] Seeding failed!"

echo "[db] PostgreSQL container is running!"
echo "[db] Connection URL: $DB_URL"

