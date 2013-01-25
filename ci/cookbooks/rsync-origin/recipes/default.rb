package "rsync"

cookbook_file "/etc/rsyncd.conf" do
    source "rsyncd.conf"
end
