include_recipe "java"
package "ia32-libs"

sdk_tgz_file      = "android-sdk-#{node['android-sdk']['version']}.tgz"
setup_dir         = node['android-sdk']['setup_dir']
sdk_install_dir   = File.join(setup_dir, node['android-sdk']['version'])
sdk_android_path  = File.join(sdk_install_dir, 'tools', 'android')
sdk_current_link  = File.join(setup_dir, 'current')

android_sdk_tarfile = File.join(Chef::Config[:file_cache_path], sdk_tgz_file)

remote_file android_sdk_tarfile do
  source      node['android-sdk']['download_url']
  checksum    node['android-sdk']['checksum']
  action      :create_if_missing
end

directory setup_dir do
  recursive true
  action :create
end

execute "android: untar" do
  command "tar -zxf #{android_sdk_tarfile} && mv android-sdk-linux #{sdk_install_dir}"
  cwd setup_dir
  creates sdk_install_dir
end

execute "android: directory permission" do
  command "chown -R root:root #{sdk_install_dir}; " +
    "chmod -R a+r #{sdk_install_dir}; " +
    "find #{sdk_install_dir} -type d | xargs chmod 755"
  action :nothing
end

android_binary = File.join(sdk_install_dir, "tools", "android")
execute "android: update sdk" do
  command "#{android_binary} update sdk --no-ui --filter sysimg-17,platform,tool,platform-tool"
  environment   ({'ANDROID_HOME' => sdk_install_dir})
  path [ File.join(sdk_install_dir, "tools") ]
  not_if "#{android_binary} list target | grep armeabi-v7a"
  notifies :run, "execute[android: directory permission]"
end


###
#### Symlink current SDK and update environment variables
###

link sdk_current_link do
  to     sdk_install_dir
end

# profile for bash
template "/etc/profile.d/android-sdk.sh"  do
  source "android-sdk.sh.erb"
  mode   0755
  variables(
    :android_home => sdk_current_link
  )
end

# profile for zsh
script 'Register Android SDK in zsh environment' do
  interpreter   'bash'
  cwd           '/tmp'
  not_if        "cat /etc/zsh/zshenv | grep ANDROID_HOME"
  code <<-EOSHELL
    cat <<EOF >> /etc/zsh/zshenv
# <android-sdk>
export ANDROID_HOME="#{sdk_current_link}"
export PATH="\\${PATH}:\\${ANDROID_HOME}/tools:\\${ANDROID_HOME}/platform-tools"
# </android-sdk>
EOF
  EOSHELL
end

### Create virtual device
execute "android: create android virtual device (avd)" do
  command "echo 'no' | #{android_binary} -s create avd --name #{node['android-sdk']['emulator-name']} --target android-17 --path /opt/avd --force --abi armeabi-v7a"
  creates "/opt/avd"
end

template "/etc/init/emulator.conf" do
  source "emulator.conf.erb"
  variables(
    :emulator => File.join(sdk_current_link, "tools", "emulator"),
    :avd => node['android-sdk']['emulator-name']
  )
  mode "644"
  notifies :restart, "service[android: emulator]"
end

service "android: emulator" do
  service_name "emulator"
  provider Chef::Provider::Service::Upstart
  supports :status => true, :restart => true, :reload => true
  action [ :enable, :start ]
end
