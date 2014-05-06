bash "install_forever" do
    code "npm install -g forever"
    creates "/usr/bin/forever"
end

services = [
    { name: 'dojo', port: 3300 },
    { name: 'dojo-runner', port: 3301 }
]

services.each do |app|
    template "/etc/init/#{app[:name]}.conf" do
        variables( :app => app )
        source "dojo.conf"
    end

    service app[:name] do
        provider Chef::Provider::Service::Upstart
        action [:enable,:restart]
    end
end
