require 'winrm'

class WinRemote
    def initialize(server)
        endpoint = "http://#{server}:5985/wsman"
        @winrm = WinRM::WinRMWebService.new(endpoint, :plaintext, :user => "telerik.com\\TeamFoundationUser", :pass => "voyant69", :disable_sspi => true)
    end

    def exec(command)
        @winrm.cmd(command) do |stdout, stderr|
            STDOUT.print stdout
            STDERR.print stderr
        end
    end

    def clean_dir(directory)
        exec("del #{directory}* /q")
        exec("FOR /D %p IN (\"#{directory}*.*\") DO rmdir \"%p\" /s /q")
    end

    def build(solution)
        exec("%windir%\\Microsoft.NET\\Framework\\v4.0.30319\\msbuild #{solution}")
    end

    def stop_iis()
        exec('iisreset /stop')
    end

    def start_iis()
        exec('iisreset /start')
    end

    def cp_r(source, destination)
        exec("xcopy #{source} #{destination} /y /e")
    end

    def deploy(source, destination)
        clean_dir(destination)
        cp_r(source, destination)
    end
end

