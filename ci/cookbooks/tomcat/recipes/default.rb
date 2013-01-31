package "tomcat7"
package "tomcat7-admin"

cookbook_file "/etc/tomcat7/server.xml" do
    source "server.xml"
    owner "root"
    group "root"
    mode "0644"
    notifies :restart, resources(:service => "tomcat")
end

service "tomcat" do
    action :restart
end

