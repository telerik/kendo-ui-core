package "php5-cli"
package "php5-fpm"
package "php5-gd"
package "php5-sqlite"

template "/etc/php5/fpm/pool.d/www.conf" do
    source "workstation.conf.erb"
    variables({
        :process_user => "www-data",
        :process_group => "www-data"
    })
end

service "php5-fpm" do
    action :restart
end
