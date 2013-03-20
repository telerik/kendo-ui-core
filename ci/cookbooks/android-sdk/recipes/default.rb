include_recipe "java"
package "ia32-libs"

directory "/usr/share/selenium-server/" do
    recursive true
end

remote_file "/usr/share/selenium-server/android-server-2.21.0.apk" do
    source "https://selenium.googlecode.com/files/android-server-2.21.0.apk"
    mode "0644"
    action :create_if_missing
end
