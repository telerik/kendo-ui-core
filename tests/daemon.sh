 #!/bin/bash
export PATH=/usr/local/bin:$PATH
export NODE_PATH=/usr/local/lib/node_modules/:$NODE_PATH

 case $1 in
    start)
       nohup ./server.js 1>/tmp/kendo-server-out 2>&1 &:
       echo $! > /tmp/kendo-test-server.pid
       ;;
     stop)
       kill `cat /tmp/kendo-test-server.pid` ;;
     *)
       echo "usage: daemon.sh {start|stop}" ;;
 esac
 exit 0
