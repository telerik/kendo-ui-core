include_recipe "java"
package "ia32-libs"

# get libraries for running selenium on android
directory "/usr/share/selenium-server/" do
    recursive true
end

remote_file "/usr/share/selenium-server/android-server-2.21.0.apk" do
    source "https://selenium.googlecode.com/files/android-server-2.21.0.apk"
    mode "0755"
    action :create_if_missing
end

selenium_libs = "/usr/share/selenium-libs/"

directory selenium_libs do
    recursive true
end

remote_file "#{selenium_libs}junit-4.11.jar" do
    source "http://search.maven.org/remotecontent?filepath=junit/junit/4.11/junit-4.11.jar"
    mode "0755"
    action :create_if_missing
end

remote_file "#{selenium_libs}hamcrest-core-1.1.jar" do
    source "http://search.maven.org/remotecontent?filepath=org/hamcrest/hamcrest-core/1.1/hamcrest-core-1.1.jar"
    mode "0755"
    action :create_if_missing
end

remote_file "#{selenium_libs}selenium-java-2.31.0.zip" do
    source "https://selenium.googlecode.com/files/selenium-java-2.31.0.zip"
    mode "0755"
    action :create_if_missing
end

bash "Unzip Selenium Java libraries" do
    cwd selenium_libs
    code %Q{
        unzip selenium-java-2.31.0.zip
        mv selenium-2.31.0/selenium-2.31.0/* .
        rm -rf selenium-2.31.0/
    }
    creates "#{selenium_libs}selenium-java-2.31.0.jar"
end

