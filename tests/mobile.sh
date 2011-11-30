 #!/bin/bash
export PATH=/usr/local/bin:$PATH
export NODE_PATH=/usr/local/lib/node_modules/:$NODE_PATH

./client.js tests/ 1>test-results.xml
