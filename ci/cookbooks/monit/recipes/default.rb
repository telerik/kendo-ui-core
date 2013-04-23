package "monit"

cookbook_file "/etc/monit/monitrc" do
    mode "0600"
end

service "monit" do
    action :restart
end
