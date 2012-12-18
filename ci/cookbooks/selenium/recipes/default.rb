directory "/usr/share/selenium-server/" do
    recursive true
end

remote_file "/usr/share/selenium-server/selenium-server-standalone.jar" do
    source "http://selenium.googlecode.com/files/selenium-server-standalone-2.26.0.jar"
    mode "0644"
    action :create_if_missing
end
