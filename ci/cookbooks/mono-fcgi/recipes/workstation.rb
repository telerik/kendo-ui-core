
package "mono-fastcgi-server4"

template '/etc/init/mono-fcgi.conf' do
    source 'workstation.conf.erb'
    variables({
        :kendo_dir => node['kendo_dir'] || File.expand_path(File.join(File.dirname(__FILE__), '..', '..', '..', '..'))
    })
end

service 'mono-fcgi' do
    provider Chef::Provider::Service::Upstart
    action :restart
end
