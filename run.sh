#! /bin/bash
host=127.0.0.1
port=9000
function run_browser {
    if google-chrome 2>/dev/null; then
        google-chrome $host:$port
    else
        firefox $host:$port
    fi
}
function run_server {
    if [[ $(eval "lsof -i:$port") ]]; then
         eval "fuser -k $port/tcp" 2>&1
    fi
    npm run server &
}
# Install node modules
npm i
# begin test
npm test
# run coverage
npm run coverage
# run server
run_server
# browser run
run_browser


