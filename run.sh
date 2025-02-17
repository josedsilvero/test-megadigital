#!/bin/sh
set -e

DIR=$(dirname "$(readlink -f "$0")")

. "$DIR/.env"

check_db() {
  psql "$DATABASE_URL" -c "SELECT 1;" > /dev/null 2>&1
  return $?
}

cd "$DIR/db"
echo "[db] booting db container..."
./run.sh

cd "$DIR/ui"
echo "[ui] installing dependencies..."
npm i

cd "$DIR/api"
echo "[api] installing dependencies..."
npm i

echo "[api] launching on the background"
"$DIR/api/run.sh" > /dev/null 2>&1 &

echo "[ui] launching on the background"
"$DIR/ui/run.sh" > /dev/null 2>&1 &


echo ""
echo "------------------------------------------------------"
echo "------------------- DONE  ----------------------------"
echo "------------------------------------------------------"
echo ""
echo ">>> if you need to reboot the api and the ui, run:"
echo ""
echo "api/run.sh"
echo "ui/run.sh"
echo ""
echo ""
echo ">>> to try your running solution:"
echo ""
echo "api:  http://localhost:3777/graphql"
echo " ui:  http://localhost:8777"
echo " db:  $DATABASE_URL"

cd "$DIR"
