windows_zipfile "c:\\sysinternals" do
    source "http://download.sysinternals.com/files/PSTools.zip"
    action :unzip
    not_if {::File.exists?("c:\\sysinternals\\PsExec.exe")}
end

windows_path "c:\\sysinternals" do
    :add
end
