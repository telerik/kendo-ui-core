package "ntp"

cookbook_file "/etc/ntp.conf" do
    source "ntp.conf"
end

service "ntp" do
    action :restart
end
