# Install ruby + ruby devkit + chef, if necessary

$donwload_root = "http://gyoshev.telerik.com/chef-prerequisites"

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

function unzip([string]$archive, [string]$destination) {
    $exists = test-path $destination -pathType container
    if (!($exists)) {
        write-host "Unpacking $archive to $destination..."
        start-process -FilePath "7z" -ArgumentList @("x", "-o$destination", $archive) -Wait
    } else {
        write-host "Destination directory $destination exists, skipping archive inflation"
    }
    return $exists
}

if (!(installed("chef-solo"))) {
    write-host "Bootstrapping node for chef-solo..."

    downloadAndInstall "ruby" "$download_root/rubyinstaller-1.9.3-p448.exe" @(
        "/sp-", "/verysilent", "/suppressmsgboxes",
        "/noicons",
        "/closeapplications", "/restartapplications",
        "/log=ruby-install.log"
    )
    registerPath "C:\Ruby193\bin"

    downloadAndInstall "7z" "$download_root/7z920.exe" @( "/S" )
    registerPath "C:\Program Files (x86)\7-Zip"

    $devkitDir = "C:\DevKit\"
    $devkit = download "$download_root/DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe"
    if (!(unzip $devkit $devkitDir)) {
        write-host "Installing the Ruby DevKit..."
        cd $devkitDir
        ruby dk.rb init
        ruby dk.rb install
    }

    downloadAndInstall "chef-solo" "$download_root/chef-client-11.6.0-1.windows.msi" @( "/quiet", "/norestart" ) "chef-11.6.msi"
    registerPath "C:\opscode\chef\bin"
}
