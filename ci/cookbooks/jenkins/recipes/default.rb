JENKINS_URL = 'http://localhost:8080/'
package "java-1.7.0-openjdk"
package "java-1.7.0-openjdk-devel"
package "dejavu-sans-fonts"

remote_file "/tmp/jenkins.rpm" do
    source "http://pkg.jenkins-ci.org/redhat/jenkins-1.492-1.1.noarch.rpm"
    action :create_if_missing
end

package "jenkins" do
    source "/tmp/jenkins.rpm"
    version "1.492-1.1"
    action :install
end

directory "/var/lib/jenkins/.ssh" do
    owner "jenkins"
    group "jenkins"
    mode "0700"
end

%w[id_rsa id_rsa.pub authorized_keys known_hosts].each do |file|
    cookbook_file "/var/lib/jenkins/.ssh/#{file}" do
        source "ssh/#{file}"
        owner "jenkins"
        group "jenkins"
        mode "0600"
    end
end

service "jenkins" do
  action :start
end

remote_file "/tmp/jenkins-cli.jar" do
    source "#{JENKINS_URL}jnlpJars/jenkins-cli.jar"
    action :create_if_missing
end

bash "install_jenkins_plugins" do
    code %Q{
        java -jar /tmp/jenkins-cli.jar -s '#{JENKINS_URL}' install-plugin git github chucknorris campfire;
        java -jar /tmp/jenkins-cli.jar -s '#{JENKINS_URL}' restart;
    }
end

def jenkins_job(name)
    cookbook_file "#{name}.xml" do
        source "#{name}.xml"
    end

    bash "setup #{name} jenkins job" do
        code %Q{
            sleep 10;
            java -jar /tmp/jenkins-cli.jar -s '#{JENKINS_URL}' create-job #{name} < #{name}.xml;
            if [[ ! $? -eq 0 ]]

            then
                java -jar /tmp/jenkins-cli.jar -s '#{JENKINS_URL}' update-job #{name} < #{name}.xml;
            fi

            # java -jar /tmp/jenkins-cli.jar -s '#{JENKINS_URL}' restart;
        }
    end
end

jenkins_job "CI"
jenkins_job "production-bundles"

# Mono

%w[bison
gettext
glib2
freetype
fontconfig
libpng
libpng-devel
libX11
libX11-devel
glib2-devel
libgdiplus-devel
libgdiplus
libexif
glibc-devel
urw-fonts
unzip
gcc
gcc-c++
automake
autoconf
libtool
make
bzip2
wget].each do |package_name|
    package package_name
end

remote_file "/tmp/mono.tar.gz" do
    source "http://download.mono-project.com/sources/mono/mono-2.10.8.tar.gz"
    action :create_if_missing
end

bash "install mono" do
    code %Q{
        cd tmp;
        tar xf mono.tar.gz;
        cd mono-*;
        ./configure --prefix=/usr/local && make && make install
    }

    only_if { !File.exists?("/usr/local/bin/mono") }
end

remote_directory '/usr/local/lib/mono/xbuild/Microsoft/VisualStudio/v10.0' do
    source 'v10.0'
end

package 'xorg-x11-server-Xvfb'
package 'xorg-x11-xauth'

remote_file "/tmp/remi-release-6.rpm" do
    source "http://rpms.famillecollet.com/enterprise/remi-release-6.rpm"
    action :create_if_missing
end

package "remi-repository" do
    source "/tmp/remi-release-6.rpm"
    action :install
end

bash "install firefox" do
    code %q{
        yum install -y --enablerepo=remi --disablerepo=updates firefox
    }
end

yum_key "google-chrome" do
    url "https://dl-ssl.google.com/linux/linux_signing_key.pub"
    action :add
end

yum_repository "google-chrome" do
    description "google-chrome - 64-bit"
    url "http://dl.google.com/linux/chrome/rpm/stable/x86_64"
    key "google-chrome"
    action :add
end

package "google-chrome-stable"
