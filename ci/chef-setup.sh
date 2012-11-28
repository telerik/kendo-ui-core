# stop firewall
service iptables save
service iptables stop
chkconfig iptables off

# EPEL
rpm -ivh 'http://mirror.telepoint.bg/fedora/epel/6/i386/epel-release-6-7.noarch.rpm'
yum update -y
yum install -y glib-devel gcc rpm-build rpmdevtools readline-devel ncurses-devel gdbm-devel tcl-devel openssl-devel db4-devel byacc libyaml-devel libffi-devel make

rpmdev-setuptree

cd ~/rpmbuild/SOURCES
if [[ ! -f ruby-1.9.3-p327.tar.gz ]]
then
        wget http://ftp.ruby-lang.org/pub/ruby/1.9/ruby-1.9.3-p327.tar.gz
fi

cd ~/rpmbuild/SPECS
if [[ ! -f ruby19.spec ]]
then
        wget https://raw.github.com/imeyer/ruby-1.9.3-rpm/master/ruby19.spec
fi

rpmbuild -bb ruby19.spec
ARCH=`uname -m`
KERNEL_REL=`uname -r`
KERNEL_TMP=${KERNEL_REL%.$ARCH}
DISTRIB=${KERNEL_TMP##*.}

yum localinstall -y ~/rpmbuild/RPMS/${ARCH}/ruby-1.9.3p327-1.${DISTRIB}.${ARCH}.rpm

gem install chef --no-ri --no-rdoc
