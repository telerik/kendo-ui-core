ns_root = "http://kendobuild/build"
$jenkins_slave = "kendobuild-winslave1"

function download([string]$url, [string]$filename) {
    if (!($PSBoundParameters.ContainsKey('filename'))) {
        $filename = $url.split("/")[-1].split("?")[0]
    }

    $fullPath = "$home\Downloads\$filename"
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
            $paramList = $("/i", $installer) + $paramList
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

downloadAndInstall "git" "https://msysgit.googlecode.com/files/Git-1.8.3-preview20130601.exe" @(
    "/sp-", "/verysilent", "/suppressmsgboxes",
    "/noicons", "/type=default", "/components=assoc,assoc_sh",
    "/closeapplications", "/restartapplications",
    "/log=msysgit-install.log"
)
registerPath "C:\Program Files (x86)\Git\bin"

downloadAndInstall "ruby" "http://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-1.9.3-p448.exe" @(
    "/sp-", "/verysilent", "/suppressmsgboxes",
    "/noicons",
    "/closeapplications", "/restartapplications",
    "/log=ruby-install.log"
)
registerPath "C:\Ruby193\bin"

downloadAndInstall "7z" "http://downloads.sourceforge.net/project/sevenzip/7-Zip/9.20/7z920.exe?r=&ts=1374160542&use_mirror=garr" @( "/S" )
registerPath "C:\Program Files (x86)\7-Zip"

$devkitDir = "C:\DevKit\"
$devkit = download "https://github.com/downloads/oneclick/rubyinstaller/DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe"
if (!(unzip $devkit $devkitDir)) {
    write-host "Installing the Ruby DevKit..."
    cd $devkitDir
    ruby dk.rb init
    ruby dk.rb install
}

downloadAndInstall "java" "http://javadl.sun.com/webapps/download/AutoDL?BundleId=79063" @( "/s" ) "jre-7u25-windows-i586.exe"
registerPath "C:\Program Files (x86)\Java\jre7\bin"

if (!($jenkins_slave -eq $false)) {
    $slaveJar = download "$jenkins_root/jnlpJars/slave.jar"
    start-process -FilePath "java" -ArgumentList @(
        "-jar", $slaveJar,
        "-jnlpUrl", "$jenkins_root/computer/$jenkins_slave/slave-agent.jnlp"
    )
}
