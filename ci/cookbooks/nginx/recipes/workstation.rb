
package "nginx"

cookbook_file "/etc/nginx/nginx.conf" do
    source "workstation.conf"
end

service "nginx" do
    action :restart
end
