package "java-1.6.0-openjdk"

remote_file "/tmp/jenkins.rpm" do
    source "http://pkg.jenkins-ci.org/redhat/jenkins-1.492-1.1.noarch.rpm"
    action :create_if_missing
end

package "jenkins" do
    source "/tmp/jenkins.rpm"
    action :install
end
