user "jenkins" do
    home "/var/lib/jenkins"
end

directory "/var/lib/jenkins" do
    owner "jenkins"
    group "nogroup"
end

include_recipe "jenkins::setup_user"
include_recipe "jenkins::mount_filesrv"
