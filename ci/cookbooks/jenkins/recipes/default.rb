JENKINS_URL = 'http://localhost:8080/'
package "java-1.6.0-openjdk"

remote_file "/tmp/jenkins.rpm" do
    source "http://pkg.jenkins-ci.org/redhat/jenkins-1.492-1.1.noarch.rpm"
    action :create_if_missing
end

package "jenkins" do
    source "/tmp/jenkins.rpm"
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

=begin
bash "install_jenkins_plugins" do
    code %Q{
        java -jar /tmp/jenkins-cli.jar -s '#{JENKINS_URL}' install-plugin git github chucknorris campfire;
        java -jar /tmp/jenkins-cli.jar -s '#{JENKINS_URL}' restart;
    }
end
=end

cookbook_file 'CI.xml' do
    source 'CI.xml'
end

bash "setup_CI_job" do
    code %Q{
        java -jar /tmp/jenkins-cli.jar -s '#{JENKINS_URL}' create-job CI < CI.xml;
        java -jar /tmp/jenkins-cli.jar -s '#{JENKINS_URL}' restart;
    }
end
