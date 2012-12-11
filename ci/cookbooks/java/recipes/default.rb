package "java-1.7.0-openjdk"
package "java-1.7.0-openjdk-devel"

remote_file "/tmp/maven.tar.gz" do
    source "http://apache.online.bg/maven/maven-3/3.0.4/binaries/apache-maven-3.0.4-bin.tar.gz"
    action :create_if_missing
end

bash "unpack maven" do
    code <<-SH
       tar xzf /tmp/maven.tar.gz --strip-components=1 -C /usr/local/
    SH
end

