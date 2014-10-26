
package "nginx"

template "/etc/nginx/sites-enabled/kendo" do
    source "workstation.conf.erb"
    variables({
        :home_dir => node['home_dir'] || ENV['HOME'],
        :kendo_dir => node['kendo_dir'] || File.expand_path(File.join(File.dirname(__FILE__), '..', '..', '..', '..'))
    })
end

file "/etc/nginx/sites-enabled/default" do
  action :delete
end

service "nginx" do
    action :restart
end
