bash "Install supervisor from NPM" do
    code "npm install -g supervisor"
    creates "/usr/bin/supervisor"
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
