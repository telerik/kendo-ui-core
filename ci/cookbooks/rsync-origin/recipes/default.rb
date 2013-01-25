package "xinetd"
package "rsync"

cookbook_file "/etc/xinetd.d/rsync" do
    source "rsync"
end

cookbook_file "/etc/rsyncd.conf" do
    source "rsyncd.conf"
end

bash "enable_rsync" do
    code %Q{
        chkconfig xinetd on
    }
end

service "xinetd" do
    action :restart
end
