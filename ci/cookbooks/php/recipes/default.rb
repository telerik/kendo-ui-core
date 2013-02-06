package "php5"
package "php5-sqlite"
package "php5-fpm"

cookbook_file "/etc/php5/fpm/php.ini" do
    source "php.ini"
end

cookbook_file "/etc/php5/fpm/pool.d/www.conf" do
    source "www.conf"
end

directory "/var/run/php-fpm/" do
    owner "jenkins"
    group "nogroup"
    recursive true
end

service "php5-fpm" do
    action :restart
end
