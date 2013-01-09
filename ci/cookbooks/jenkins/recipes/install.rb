apt_repository "jenkins" do
  uri "http://pkg.jenkins-ci.org/debian"
  components ["binary/"]
  key "http://pkg.jenkins-ci.org/debian/jenkins-ci.org.key"
end

package "jenkins"
