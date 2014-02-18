%w{v10.0 v11.0}.each do |version|
    remote_directory  "C:\\Program Files (x86)\\MSBuild\\Microsoft\\VisualStudio\\#{version}\\" do
        source version
    end
end

if platform?('windows')
    windows_package 'Microsoft .NET Framework 4.5' do
        source 'http://download.microsoft.com/download/b/a/4/ba4a7e71-2906-4b2d-a0e1-80cf16844f5f/dotnetfx45_full_x86_x64.exe'
        installer_type :custom
        options '/quiet /norestart'
        action :install
    end

    windows_package 'Microsoft SQL Server 2012 Express LocalDB' do
        source 'http://download.microsoft.com/download/8/D/D/8DD7BDBA-CEF7-4D8E-8C16-D9F69527F909/ENU/x64/SqlLocalDB.MSI'
        action :install
    end

    remote_file "#{Chef::Config[:file_cache_path]}/VsSDK_sfx.exe" do
        source 'http://download.microsoft.com/download/C/F/D/CFD1CDDA-3046-4D13-8A6C-793EBAFDECFE/VsSDK_sfx.exe'
    end

    execute 'Extract Visual Studio 2010 SP1 SDK' do
        command "#{Chef::Config[:file_cache_path]}/VsSDK_sfx.exe /x:vssdk /q"
    end

    windows_package 'Visual Studio 2010 SP1 SDK' do
        source  "C:/vssdk/vssdk.msi"
        action :install
    end
end
