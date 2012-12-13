JENKINS_URL = 'http://localhost:8080/build/'

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

cookbook_file "/var/lib/jenkins/hudson.plugins.campfire.CampfireNotifier.xml" do
    source "hudson.plugins.campfire.CampfireNotifier.xml"
    owner "jenkins"
    group "jenkins"
    mode "0600"
end

cookbook_file "/etc/sysconfig/jenkins" do
    source "sysconfig-jenkins"
    owner "root"
    group "root"
    mode "0600"
end
