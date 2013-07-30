case node["platform"]
when "windows"
    # jre-7u25-windows-i586
    windows_package "Java 7 Update 25" do
        source "http://javadl.sun.com/webapps/download/AutoDL?BundleId=79063"
        action :install
    end

    ENV['JAVA_HOME'] = "C:\\Program Files (x86)\\Java\\jre7\\bin"
else
    package "openjdk-7-jdk"
    package "maven"

    link "/usr/lib/jvm/default-java" do
      to "/usr/lib/jvm/java-7-openjdk-amd64/"
    end

    ENV['JAVA_HOME'] = "/usr/lib/jvm/default-java"
end
