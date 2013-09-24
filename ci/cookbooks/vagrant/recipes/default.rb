# A recipe that will be executed if the machine is setup with Vagrant
link "/home/kendo/kendo" do
    action :create
    owner "kendo"
    to "/vagrant"
end
