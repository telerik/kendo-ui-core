case node["platform"]
when "windows"
    windows_package "Node.js" do
        source "http://nodejs.org/dist/v0.10.13/node-v0.10.13-x86.msi"
        action :install
    end
else
    # See
    # https://github.com/joyent/node/wiki/installing-node.js-via-package-manager
    apt_repository "node" do
        uri "https://deb.nodesource.com/node"
        key 'nodesource.gpg.key'
        distribution node['lsb']['codename']
        components ["main"]
    end

    package "nodejs"
end
