cd "$(dirname "$0")"
rm -rf ../users/*
cd ../client/src
sqlite3 database.db < "dbSource.sql"
