package "mono-fastcgi-server4"

cookbook_file '/etc/init/mono-fcgi.conf' do
    source 'mono-fcgi.conf'
end

service 'mono-fcgi' do
    provider Chef::Provider::Service::Upstart
    action :restart
end
