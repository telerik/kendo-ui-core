%w[bison
gettext
glib2
freetype
fontconfig
libpng
libpng-devel
libX11
libX11-devel
glib2-devel
libgdiplus-devel
libgdiplus
libexif
glibc-devel
urw-fonts
unzip
gcc
gcc-c++
automake
autoconf
libtool
make
bzip2
wget].each do |package_name|
    package package_name
end

remote_file "/tmp/mono.tar.gz" do
    source "http://download.mono-project.com/sources/mono/mono-2.10.8.tar.gz"
    action :create_if_missing
end

bash "install mono" do
    code %Q{
        cd tmp;
        tar xf mono.tar.gz;
        cd mono-*;
        ./configure --prefix=/usr/local && make && make install
    }

    only_if { !File.exists?("/usr/local/bin/mono") }
end

remote_directory '/usr/local/lib/mono/xbuild/Microsoft/VisualStudio/v10.0' do
    source 'v10.0'
end
