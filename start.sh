cd "$(dirname "$0")"
./setup/create_hotspot.sh
npx npm-run-all --parallel client server & pid=$!
./setup/delete_hotspot.sh
