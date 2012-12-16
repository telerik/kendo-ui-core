apt-get install -y python-software-properties
apt-add-repository -y ppa:brightbox/ruby-ng
apt-get update -y

apt-get install -y ruby1.9.3 build-essential
gem install chef --no-ri --no-rdoc
