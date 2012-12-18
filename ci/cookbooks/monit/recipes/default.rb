package "monit"

file "/etc/monit/monitrc" do
    content <<-CONF
      set daemon 120
      set logfile /var/log/monit.log
      set idfile /var/lib/monit/id
      set statefile /var/lib/monit/state

      set eventqueue
          basedir /var/lib/monit/events
          slots 100

     set httpd port 2812 and
        use address localhost
        allow localhost

    check process mono-fcgi with pidfile /var/run/mono-fcgi.pid
      start program = "/usr/sbin/service mono-fcgi start" with timeout 60 seconds
      stop program = "/usr/sbin/service mono-fcgi stop"
      if cpu is greater than 20% for 2 cycles then restart
      if failed url http://localhost/staging/
            CONTENT == "the Art of Web Development"
            TIMEOUT 60 SECONDS
            then restart
    CONF

    mode "0600"
end

service "monit" do
    action :restart
end
