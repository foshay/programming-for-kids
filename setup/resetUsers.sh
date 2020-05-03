cd "$(dirname "$0")"
cd ../client/src
sqlite3 database.db < "dbSource.sql"
