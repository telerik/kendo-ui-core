package "openjdk-7-jdk"
package "maven"

link "/usr/lib/jvm/default-java" do
  to "/usr/lib/jvm/java-7-openjdk-amd64/"
end

ENV['JAVA_HOME'] = "/usr/lib/jvm/default-java"
