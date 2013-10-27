apt_repository "ruby-ng" do
  uri "http://ppa.launchpad.net/brightbox/ruby-ng/ubuntu"
  distribution node['lsb']['codename']
  components ["main"]
  keyserver "keyserver.ubuntu.com"
  key "C3173AA6"
end

package "build-essential"
package "ruby1.9.3"

gem_package "chef"
