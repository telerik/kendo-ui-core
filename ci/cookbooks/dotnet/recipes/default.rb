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
end
