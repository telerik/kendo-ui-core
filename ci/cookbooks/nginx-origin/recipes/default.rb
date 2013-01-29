cookbook_file "/etc/yum.repos.d/nginx.repo" do
    source "nginx.repo"
end

package "nginx"

bash "set nginx user shell" do
    code "chsh -s /bin/bash nginx"
end

directory "/var/cache/nginx/.ssh" do
    owner "nginx"
    group "nginx"
    mode "0700"
end

cookbook_file "/var/cache/nginx/.ssh/authorized_keys"  do
    source "authorized_keys"
    owner "nginx"
    group "nginx"
    mode "0600"
end

cookbook_file "/etc/nginx/nginx.conf" do
    source "nginx.conf"
end

cookbook_file "/etc/nginx/mime.types" do
    source "mime.types"
end

directory "/usr/share/nginx/html" do
    owner "nginx"
    group "nginx"
    mode "0755"
end

directory "/usr/share/nginx/html/staging" do
    owner "nginx"
    group "nginx"
    mode "0755"
end

service "nginx" do
    action :restart
end
