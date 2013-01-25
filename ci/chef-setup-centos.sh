yum update -y
yum groupinstall -y "Development Tools"
yum install -y curl dmidecode zlib-devel libffi-devel openssl-devel

# libyaml
cd /tmp
wget -nc http://pyyaml.org/download/libyaml/yaml-0.1.4.tar.gz
tar xzf yaml-0.1.4.tar.gz
cd yaml-0.1.4
./configure --prefix=/usr/local
make
make install

# Ruby
cd /tmp
wget -nc http://ftp.ruby-lang.org/pub/ruby/1.9/ruby-1.9.3-p374.tar.gz
tar xzf ruby-1.9.3-p374.tar.gz
cd ruby-1.9.3-p374
./configure --prefix=/usr/local --enable-shared --disable-install-doc --with-opt-dir=/usr/local/lib
make
make install

# RubyGems
cd /tmp
wget -nc http://production.cf.rubygems.org/rubygems/rubygems-1.8.24.tgz
tar xzf rubygems-1.8.24.tgz
cd rubygems-1.8.24
ruby setup.rb --no-format-executable --prefix=/usr/local

gem install chef --no-ri --no-rdoc
