bash "install_forever" do
    code "npm install -g forever"
    creates "/usr/bin/forever"
end

cookbook_file '/etc/init/scratchpad.conf' do
    source 'scratchpad.conf'
end

service 'scratchpad' do
    provider Chef::Provider::Service::Upstart
    action :restart
end

