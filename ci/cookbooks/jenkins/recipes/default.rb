JENKINS_URL = 'http://localhost:8080/build/'

include_recipe "jenkins::install"
include_recipe "jenkins::setup_user"
include_recipe "jenkins::mount_filesrv"

cookbook_file "/etc/default/jenkins" do
    source "config"
    owner "root"
    group "root"
    mode "0600"
end

service "jenkins" do
    action :restart
end

remote_file "/tmp/jenkins-cli.jar" do
    source "#{JENKINS_URL}jnlpJars/jenkins-cli.jar"
    action :create_if_missing
end

bash "install_jenkins_plugins" do
    code %Q{
        sleep 10
        java -jar /tmp/jenkins-cli.jar -s '#{JENKINS_URL}' install-plugin git github chucknorris campfire;
        java -jar /tmp/jenkins-cli.jar -s '#{JENKINS_URL}' restart;
    }
end

cookbook_file "/var/lib/jenkins/hudson.plugins.campfire.CampfireNotifier.xml" do
    source "hudson.plugins.campfire.CampfireNotifier.xml"
    owner "jenkins"
    group "nogroup"
    mode "0600"
end
