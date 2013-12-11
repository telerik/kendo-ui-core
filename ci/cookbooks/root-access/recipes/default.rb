if node["platform"] != "windows"
    directory "/root/.ssh" do
        owner "root"
        group "root"
        mode "0700"
    end

    cookbook_file "/root/.ssh/authorized_keys" do
        source "ssh/authorized_keys"
        owner "root"
        group "root"
        mode "0600"
    end
end
