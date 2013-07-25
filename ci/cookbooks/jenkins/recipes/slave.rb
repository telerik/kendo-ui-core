case node["platform"]
when "windows"
    service "jenkins-slave" do
        action [:enable, :start]
    end
else
    user "jenkins" do
        home "/var/lib/jenkins"
    end

    directory "/var/lib/jenkins" do
        owner "jenkins"
        group "nogroup"
    end

    include_recipe "jenkins::setup_user"
    include_recipe "jenkins::mount_filesrv"
end
