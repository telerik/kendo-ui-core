case node["platform"]
when "windows"
    windows_package "Git version 1.8.3-preview20130601" do
        source "https://msysgit.googlecode.com/files/Git-1.8.3-preview20130601.exe"
        action :install
    end

    execute "Set HOME environtment variable" do
        command 'setx HOME "%USERPROFILE%"'
    end
else
    package "git"
end
