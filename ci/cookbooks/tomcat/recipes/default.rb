package "tomcat7"
package "tomcat7-admin"

ENV['CATALINA_HOME'] = "/var/lib/tomcat7"

link "/usr/share/tomcat7conf" do
  to "/var/lib/tomcat7/conf"
end

link "/usr/share/tomcat7conf/catalina.policy" do
  to "/etc/tomcat7/policy.d/03catalina.policy"
end

link "/usr/share/tomcat7log" do
  to "/var/log/tomcat7"
end

service "tomcat7" do
    action :enable
end

cookbook_file "/etc/tomcat7/server.xml" do
    source "server.xml"
    owner "root"
    group "root"
    mode "0644"
    notifies :restart, resources(:service => "tomcat7")
end

