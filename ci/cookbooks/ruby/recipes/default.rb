case node["platform"]
when "windows"
    windows_path "c:\\opscode\\chef\\embedded\\bin" do
        :add
    end
else
    package "libxml2-dev"
    package "libxslt1-dev"
end

gem_package "bundler"
gem_package "rake" do
    version "0.9.2.2"
end
