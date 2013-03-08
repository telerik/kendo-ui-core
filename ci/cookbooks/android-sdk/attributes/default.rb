default['android-sdk']['setup_dir']      = '/opt/android-sdk'
default['android-sdk']['owner']          = 'jenkins'
default['android-sdk']['group']          = 'nogroup'


default['android-sdk']['version']        = '21.1'
default['android-sdk']['checksum']       = '3369a439240cf3dbe165d6b4173900a8'
default['android-sdk']['download_url']   = "http://dl.google.com/android/android-sdk_r#{node['android-sdk']['version']}-linux.tgz"

default['android-sdk']['emulator-name']  = 'android-17'
