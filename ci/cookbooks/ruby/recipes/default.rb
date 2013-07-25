if node["platform"] != "windows" then
    package "libxml2-dev"
    package "libxslt1-dev"
end

gem_package "bundler"
gem_package "rake"
