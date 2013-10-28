apt_repository "php5" do
  uri "http://ppa.launchpad.net/ondrej/php5/ubuntu"
  distribution node['lsb']['codename']
  components ["main"]
  keyserver "hkp://keyserver.ubuntu.com:80/"
  key "E5267A6C"
end

package "php5-common"
package "php5-cli"
package "php5-gd"
package "php5-sqlite"
package "php5-fpm"

cookbook_file "/etc/php5/fpm/php.ini" do
    source "php.ini"
end

cookbook_file "/etc/php5/fpm/pool.d/www.conf" do
    source "www.conf"
end

service "php5-fpm" do
    action :restart
end
