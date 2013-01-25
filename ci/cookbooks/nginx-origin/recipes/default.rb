cookbook_file "/etc/yum.repos.d/nginx.repo" do
    source "nginx.repo"
end

package "nginx"

cookbook_file "/etc/nginx/nginx.conf" do
    source "nginx.conf"
end

cookbook_file "/etc/nginx/conf.d/default.conf" do
    source "default.conf"
end

cookbook_file "/etc/nginx/mime.types" do
    source "mime.types"
end

service "nginx" do
    action :restart
end
