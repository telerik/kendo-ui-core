package "mono-devel"
package "mono-xsp4"
package "mono-xbuild"

bash "setup moz certificates" do
    code "mozroots --import --sync --machine"
end
remote_directory '/usr/lib/mono/xbuild/Microsoft/VisualStudio/v10.0' do
    source 'v10.0'
end


