case node["platform"]
when "windows"
    windows_package "Node.js" do
        source "http://nodejs.org/dist/v0.10.13/node-v0.10.13-x86.msi"
        action :install
    end
else
    bash "Add nodejs PPA" do
        code <<-SH
            apt-add-repository -y ppa:chris-lea/node.js
            apt-get update -y
        SH
    end

    package "nodejs"
    # package "npm"
end
