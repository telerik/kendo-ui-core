# Install chef
function download([string]$url, [string]$filename) {
    if (!($PSBoundParameters.ContainsKey('filename'))) {
        $filename = $url.split("/")[-1].split("?")[0]
    }

    $fullPath = $env:temp + "\$filename"
    if (!(test-path $fullPath)) {
        write-host "Downloading $filename..."
        $client = new-object System.Net.WebClient
        [System.Net.GlobalProxySelection]::Select = [System.Net.GlobalProxySelection]::GetEmptyWebProxy()
        trap { $error[0].Exception.ToString() } $client.DownloadFile($url, $fullPath)
    }

    return $fullPath
}

function installed([string]$command) {
    return get-command $command -TotalCount 1 -ErrorAction SilentlyContinue
}

function registerPath($path) {
    if ($env:Path.indexOf($path) -eq -1) {
        $env:Path += ";$path"
        [Environment]::SetEnvironmentVariable("Path", $env:Path, [System.EnvironmentVariableTarget]::Machine)
    }
}

function downloadAndInstall([string]$name, [string]$url, [string[]]$paramList, [string]$filename) {
    if (!(installed $name)) {
        # Download
        $installer = download $url $filename

        # Install
        write-host "Installing $name..."
        if ($installer.split(".")[-1] = "exe") {
            start-process -FilePath $installer -ArgumentList $paramList -Wait
        } else {
            $paramList = $("/package", $installer) + $paramList
            start-process -FilePath "msiexec" -ArgumentList $paramList -Wait
        }
    } else {
        write-host "$name already installed."
    }
}

downloadAndInstall "chef-solo" "http://opscode.com/chef/install.msi" @( "/quiet", "/norestart" ) "chef-install.msi"
registerPath "C:\opscode\chef\bin"
