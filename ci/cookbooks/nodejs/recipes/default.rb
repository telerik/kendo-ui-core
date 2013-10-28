case node["platform"]
when "windows"
    windows_package "Node.js" do
        source "http://nodejs.org/dist/v0.10.13/node-v0.10.13-x86.msi"
        action :install
    end
else

    apt_repository "node.js" do
      uri "http://ppa.launchpad.net/chris-lea/node.js/ubuntu"
      distribution node['lsb']['codename']
      components ["main"]
      keyserver "hkp://keyserver.ubuntu.com:80/"
      key "C7917B12"
    end

    package "nodejs"
    # package "npm"
end
