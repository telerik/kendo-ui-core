package "nginx"

cookbook_file "/etc/nginx/nginx.conf" do
    source "nginx.conf"
end

service "nginx" do
    action :restart
end
