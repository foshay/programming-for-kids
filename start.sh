cd "$(dirname "$0")"
npx nodemon server.js localhost 5000 &
cd ./client
npm start