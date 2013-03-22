NUGET_ROOT = 'dist/nuget/KendoUIWeb/'
NUGET_CSS = NUGET_ROOT + "Content/kendo/#{VERSION}"
NUGET_JS = NUGET_ROOT + "Scripts/kendo/#{VERSION}"
NUGET_SPEC = 'dist/nuget/KendoUIWeb.nuspec'

tree :to => NUGET_CSS,
     :from => WEB_MIN_CSS,
     :root => 'styles/web'

tree :to => NUGET_JS,
     :from => WEB_MIN_JS,
     :root => 'src'


desc 'Publish a NuGet package for Kendo UI Web GPL'
task :nuget => [NUGET_CSS, NUGET_JS] do
    File.write(NUGET_SPEC, %{<?xml version="1.0"?>
<package xmlns="http://schemas.microsoft.com/packaging/2010/07/nuspec.xsd">
  <metadata>
    <version>#{VERSION}</version>
    <authors>Telerik</authors>
    <owners>Telerik</owners>
    <licenseUrl>http://www.kendoui.com/faq/licensing.aspx</licenseUrl>
    <projectUrl>http://www.kendoui.com/web.aspx</projectUrl>
    <dependencies>
      <dependency id="jQuery" version="1.9.1" />
    </dependencies>
    <id>KendoUIWeb</id>
    <requireLicenseAcceptance>false</requireLicenseAcceptance>
    <description>Kendo UI Web is a set of HTML5 widgets built on jQuery</description>
    <summary>Kendo UI Web is a set of HTML5 widgets built on jQuery</summary>
    <language>en-US</language>
  </metadata>
  <files>
    <file src="KendoUIWeb/**" target="content" />
  </files>
</package>
    })

    sh "mono --runtime=v4.0 build/lib/NuGet.exe pack #{NUGET_SPEC} -OutputDirectory dist/nuget/"
    #sh"mono --runtime=v4.0 build/lib/NuGet.exe push dist/nuget/KendoUIWeb.#{VERSION}.nupkg"
end
