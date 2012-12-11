package "libxml2-devel"
package "libxslt-devel"

gem_package "bundler"

[ '', '/cache', '/gems', '/docs', '/specifications' ].each do | dir |
    directory "/usr/lib64/ruby/gems/1.9.1#{dir}" do
        mode '0777'
        owner 'root'
        group 'root'
        recursive true
    end
end

directory "/usr/bin" do
    mode '0777'
    owner 'root'
    group 'root'
end
