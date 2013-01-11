apt_repository "jenkins" do
  uri "http://pkg.jenkins-ci.org/debian"
  components ["binary/"]
  key "http://pkg.jenkins-ci.org/debian/jenkins-ci.org.key"
end

package "jenkins"

cookbook_file "/var/lib/jenkins/config.xml" do
    source "config.xml"
    owner "jenkins"
    group "nogroup"
    mode "0600"
end

template "/var/lib/jenkins/jenkins.model.JenkinsLocationConfiguration.xml" do
    variables( :host => node.name )
    source "jenkins.model.JenkinsLocationConfiguration.xml.erb"
    owner "jenkins"
    group "nogroup"
    mode "0600"
end
