require 'rake/clean'
require 'rake/testtask'
require 'bundler/setup'
require 'tempfile'
require 'erb'
require 'zip'
require 'json'
require 'winrm' unless RUBY_PLATFORM =~ /darwin/

VERBOSE = verbose == true

$LOAD_PATH << File.join(File.dirname(__FILE__), "build")
$LOAD_PATH << File.join(File.dirname(__FILE__), "build", "codegen", "lib")

CDN_ROOT = 'http://cdn.kendostatic.com/'
KENDO_ORIGIN_HOST = 'kendoorigin'
STAGING_CDN_ROOT = 'http://cdn.kendostatic.com/staging/'
DIST_JS_ROOT = "dist/js"
DIST_STYLES_ROOT = "dist/styles/"
KENDO_CONFIG_FILE = File.join("download-builder", "config", "kendo-config.json")

PLATFORM = RbConfig::CONFIG['host_os']

if PLATFORM =~ /linux|darwin/
    RELEASE_ROOT = "/kendo-dist"
    WEB_INSTALLER_ROOT = "/installers-dist"
else
    distributions = "\\\\telerik.com\\resources\\Controls\\DISTRIBUTIONS"
    RELEASE_ROOT = File.join(distributions, "KendoUI")
    WEB_INSTALLER_ROOT = File.join(distributions, "Guidance", "CurrentWebInstaller")
end

ARCHIVE_ROOT = File.join(RELEASE_ROOT, "Builds")

if ENV['DRY_RUN']
    ADMIN_URL = 'http://integrationadmin.telerik.com/'
    ADMIN_LOGIN = 'petyo.ivanov@telerik.local'
    ADMIN_RELEASE_UPLOAD_LOGIN = 'stefan.rahnev@telerik.local'

    SITE_URL = "http://wwwsit.telerik.com"
    SITE_LOGIN = "stefan.rahnev@telerik.local"
else
    ADMIN_URL = 'http://admin.telerik.com/'
    ADMIN_LOGIN = 'petyo.ivanov@telerik.com'
    ADMIN_RELEASE_UPLOAD_LOGIN = 'stefan.rahnev@telerik.com'

    SITE_URL = "http://www1.telerik.com"
    SITE_LOGIN = "stefan.rahnev@telerik.com"
end

ADMIN_PASS = 'ultra'
ADMIN_RELEASE_UPLOAD_PASS = "t3l3r1k@dm1n"
SITE_DOWNLOAD_BUILDER_UPLOAD_PASS = "t3l3r1kc0m"

ROOT_MAP = {
    '.' => /(dist\/js|dist\/styles\/.+?)\//,
    'js' => DIST_JS_ROOT,
    'styles' => /dist\/styles\/.+?\//,
    'src/js' => DIST_JS_ROOT,
    'src/styles' => /dist\/styles\//,
    'src/Kendo.Mvc/Kendo.Mvc' => 'wrappers/mvc/src/Kendo.Mvc/',
    'src/Kendo.Mvc/packages' => 'wrappers/mvc/packages/',
    'wrappers/aspnetmvc/LegacyThemes' => 'wrappers/mvc/legacy-themes/',
    'styles/telerik' => 'wrappers/mvc/legacy-themes/',
    'wrappers/aspnetmvc/EditorTemplates/ascx' => 'wrappers/mvc/demos/Kendo.Mvc.Examples/Views/Shared/EditorTemplates/',
    'wrappers/aspnetmvc/EditorTemplates/razor' => 'wrappers/mvc/demos/Kendo.Mvc.Examples/Views/Shared/EditorTemplates/',
    'wrappers/aspnetmvc/Binaries/Mvc3' => 'wrappers/mvc/src/Kendo.Mvc/bin/Release-MVC3/',
    'wrappers/aspnetmvc/Binaries/Mvc4' => 'wrappers/mvc/src/Kendo.Mvc/bin/Release/',
    'wrappers/aspnetmvc/Binaries/Mvc5' => 'wrappers/mvc/src/Kendo.Mvc/bin/Release-MVC5/',
    'wrappers/jsp/kendo-taglib' => 'wrappers/java/kendo-taglib/target/',
    'src/kendo-taglib' => 'wrappers/java/kendo-taglib/',
    'src/php' => 'wrappers/php/',
    'wrappers/jsp/spring-demos/src' => 'wrappers/java/spring-demos/src/',
    'wrappers/php' => 'wrappers/php',
    'typescript' => 'resources/typescript'
}

def md_api_suite(suite)
    case suite
    when 'all'
        FileList["docs/api/web/*.md"]
        .include('docs/api/framework/*.md')
        .include('docs/api/dataviz/**/*.md')
        .include('docs/api/mobile/*.md')

    when 'web'
        FileList["docs/api/web/*.md"]
        .include('docs/api/framework/*.md')

    when 'dataviz'
        FileList["docs/api/dataviz/**/*.md"]
         .include('docs/api/framework/*.md')

    when 'mobile'
        FileList["docs/api/mobile/*.md"]
        .include('docs/api/framework/*.md')

    when 'dataviz.mobile'
        FileList["docs/api/mobile/*.md"]
        .include('docs/api/dataviz/**/*.md')
        .include('docs/api/framework/*.md')
    end
end


require 'version'
require 'timezone'
require './build/zip'
require 'js'
require 'css'
require 'tasks'
require 'mvc'
require 'java'
require 'php'
require 'vsdoc'
require 'intellisense'
require 'type_script'
require 'json_typedef'
require 'changelog'
require 'javascript_dependencies'
require 'bundle'
require 'theme_builder'
require 'demos'
require 'download_builder'
require 'internal_build_upload'
require 'release_build_upload'
require 'release_notes'
require 'cdn'
require 'tests'
require 'codegen'
require 'nuget'
require 'winrm_tools' unless RUBY_PLATFORM =~ /darwin/
require 'playground'
require 'vs_plugin'
require './build/localization'

MVC_BINARIES = {
    'wrappers/aspnetmvc/Binaries/Mvc3' => MVC3_DLL,
    'wrappers/aspnetmvc/Binaries/Mvc4' => MVC4_DLL,
    'wrappers/aspnetmvc/Binaries/Mvc5' => MVC5_DLL
}

MVC_CONTENT = {
    'wrappers/aspnetmvc/EditorTemplates/ascx' => MVC_ASCX_EDITOR_TEMPLATES,
    'wrappers/aspnetmvc/EditorTemplates/razor' => MVC_RAZOR_EDITOR_TEMPLATES,
    'wrappers/aspnetmvc/LegacyThemes' => FileList['wrappers/mvc/legacy-themes/**/*'].include(LEGACY_MIN_CSS)
}.merge(MVC_BINARIES)

{
    'VS2012' => { :bin => 'Release', :dll => MVC4_DLL, :demos => MVC_DEMOS },
    'VS2013' => { :bin => 'Release-MVC5', :dll => MVC5_DLL, :demos => FileList[MVC_DEMOS].exclude('**/Web.config') }
}.each do |key, value|

    ROOT_MAP.merge!( {
        "wrappers/aspnetmvc/Examples/#{key}/Kendo.Mvc.Examples" => 'wrappers/mvc/demos/Kendo.Mvc.Examples/',
        "wrappers/aspnetmvc/Examples/#{key}/Kendo.Mvc.Examples/Content/shared" => 'demos/mvc/content/shared',
        "wrappers/aspnetmvc/Examples/#{key}/Kendo.Mvc.Examples/bin" => "wrappers/mvc/src/Kendo.Mvc/bin/#{value[:bin]}/",
        "wrappers/aspnetmvc/Examples/#{key}/packages" => 'wrappers/mvc/packages/'
    } )

    MVC_CONTENT.merge!( {
        "wrappers/aspnetmvc/Examples/#{key}/packages" => FileList['wrappers/mvc/packages/**/*.*'],
        "wrappers/aspnetmvc/Examples/#{key}/Kendo.Mvc.Examples/bin" => value[:dll],
        "wrappers/aspnetmvc/Examples/#{key}/Kendo.Mvc.Examples" => value[:demos],
        "wrappers/aspnetmvc/Examples/#{key}/Kendo.Mvc.Examples/Content/shared" => FileList['demos/mvc/content/shared/*'],
    } )
end

JSP_CONTENT = {
    'wrappers/jsp/kendo-taglib' => JSP_TAGLIB_JAR,
    'wrappers/jsp/spring-demos/src' => SPRING_DEMOS_SRC
}

PHP_CONTENT = {
    'wrappers/php' => PHP_DEMOS_SRC
}


file KENDO_CONFIG_FILE do |t|
    sh "./node_modules/.bin/grunt download_builder:config"
end

# Rake tasks
desc('JavaScript')

task :js do
    grunt :all
end

desc "Build less files in dist/styles"
task :less do
    grunt :styles
end

desc('Build all Kendo UI distributions')
task :default => [:bundles]

# Kendo UI Professional
bundle :name => 'professional.commercial',
       :license => 'src-license-complete',
       :eula => 'complete',
       :readme => 'README.KendoUI.Complete',
       :vsdoc => %w(all web mobile dataviz),
       :intellisense => %w(all web mobile dataviz),
       :type_script => %w(all web mobile dataviz),
       :changelog => %w(components),
       :demos => {
           :suites => %w(web dataviz mobile),
           :dir => 'examples'
       },
       :product => 'Kendo UI Professional',
       :upload_as_internal_build => true,
       :release_build => {
           :file_metadata => {
             :zip => {
              :label => "Manual Installation",
              :download_name => "telerik.kendoui.professional.#{VERSION}.commercial.zip",
              :file_category => "Installation",
              :file_type => "Paid Files",
              :extension => "ZIP",
              :file_markers => ["Default File"],
              :websites => ["Telerik", "SiteFinity"],
              :download_message => 'You have successfully downloaded the Kendo UI Commercial version. See <a href="http://docs.telerik.com/kendo-ui/getting-started/introduction">this article</a> on how to get started.',
              :whats_included_message => "<strong>Quick Start Demos<br />Minified Javascript Files<br />Minified Css Styles<br />Complete Source Code</strong>"
             },
             :msi => {
              :label => "Automatic Installation",
              :download_name => "telerik.kendoui.professional.#{VERSION}.commercial.msi",
              :file_category => "Installation",
              :file_type => "Paid Files",
              :extension => "MSI",
              :file_markers => ["Default File For Common Installer"],
              :websites => ["Telerik"],
              :download_message => 'You successfully downloaded the Kendo UI Professional installer. See <a href="http://docs.telerik.com/kendo-ui/getting-started/introduction">this article</a> on how to get started.',
              :whats_included_message => "<strong>Quick Start Demos<br />Minified Javascript Files<br />Minified Css Styles<br />Complete Source Code</strong>"
             },
             :exe => {
              :label => "Control Panel:",
              :download_name => "TelerikControlPanelSetup.KUI.Professional.#{VERSION}.exe",
              :file_category => "Installation",
              :file_type => "Paid Files",
              :extension => "EXE",
              :file_markers => ["Is Bolded"],
              :websites => ["Telerik"],
              :download_message => 'You successfully downloaded the Kendo UI Professional installer. See <a href="http://docs.telerik.com/kendo-ui/getting-started/introduction">this article</a> on how to get started.',
              :whats_included_message => "<strong>Installer EXE package</strong>"
             }
           },
           :download_builder => true,
       },
       :contents => {
            'js' => COMPLETE_MIN_JS + COMPLETE_MIN_JS_MAP + JQUERY_MAP,
            'styles' => MIN_CSS_RESOURCES,
            'src/js' => COMPLETE_SRC_JS,
            'src/styles' => SRC_CSS
       }

bundle :name => 'professional.trial',
       :license => 'src-license-complete',
       :eula => 'complete',
       :readme => 'README.KendoUI.Trial',
       :vsdoc => %w(all web mobile dataviz),
       :intellisense => %w(all web mobile dataviz),
       :type_script => %w(all web mobile dataviz),
       :changelog => %w(components),
       :demos => {
           :suites => %w(web dataviz mobile),
           :dir => 'examples'
       },
       :contents => {
            'js' => COMPLETE_MIN_JS + COMPLETE_MIN_JS_MAP + JQUERY_MAP,
            'styles' => MIN_CSS_RESOURCES,
       },
       :product => 'Kendo UI Professional',
       :release_build => {
          :file_metadata => {
             :zip => {
              :label => "Manual Installation",
              :download_name => "telerik.kendoui.professional.#{VERSION}.trial.zip",
              :file_category => "Installation",
              :file_type => "Trial Files",
              :extension => "ZIP",
              :file_markers => ["Default File"],
              :websites => ["Telerik", "SiteFinity"],
              :download_message => 'You have successfully downloaded the Kendo UI Professional Trial version. See <a href="http://docs.telerik.com/kendo-ui/getting-started/introduction">this article</a> on how to get started.',
              :whats_included_message => "<strong>Quick Start Demos<br />Minified Javascript Files<br />Minified Css Styles</strong>"
             },
             :msi => {
              :label => "Automatic Installation",
              :download_name => "telerik.kendoui.professional.#{VERSION}.trial.msi",
              :file_category => "Installation",
              :file_type => "Trial Files",
              :extension => "MSI",
              :file_markers => ["Default File For Common Installer"],
              :websites => ["Telerik"],
              :download_message => 'You successfully downloaded the Kendo UI Professional Trial installer. See <a href="http://docs.telerik.com/kendo-ui/getting-started/introduction">this article</a> on how to get started.'
             }
           },
           :changelog => true,
       },
       :beta_build => {
          :file_metadata => {
             :zip => {
              :label => "Q#{VERSION_Q} #{VERSION_YEAR} Beta - Manual Installation",
              :download_name => "telerik.kendoui.professional.#{VERSION}.beta.trial.zip",
              :file_category => "Beta",
              :file_type => "Additional files - shown to all",
              :extension => "ZIP",
              :websites => ["Telerik"],
              :download_message => 'You have successfully downloaded Kendo UI Professional Q#{VERSION_Q} #{VERSION_YEAR} Beta release. See <a href="http://docs.telerik.com/kendo-ui/getting-started/introduction">this article</a> on how to get started.',
              :whats_included_message => "<strong>Quick Start Demos<br />Minified Javascript Files<br />Minified Css Styles</strong>"
             },
             :msi => {
              :label => "Q#{VERSION_Q} #{VERSION_YEAR} Beta -Automatic Installation",
              :download_name => "telerik.kendoui.professional.#{VERSION}.beta.trial.msi",
              :file_category => "Beta",
              :file_type => "Additional files - shown to all",
              :extension => "MSI",
              :websites => ["Telerik"],
              :download_message => 'You have successfully downloaded Kendo UI Professional Q#{VERSION_Q} #{VERSION_YEAR} Beta release. See <a href="http://docs.telerik.com/kendo-ui/getting-started/introduction">this article</a> on how to get started.',
              :whats_included_message => "<strong>Quick Start Demos<br />Minified Javascript Files<br />Minified Css Styles</strong>"
             }
           },
          :changelog => true,
       }

# Kendo UI Web (obsolete)
bundle :name => 'web.commercial',
       :license => 'src-license-web',
       :eula => 'web',
       :vsdoc => %w(web),
       :intellisense => %w(web),
       :type_script => %w(web),
       :changelog => %w(web framework),
       :demos => {
           :suites => %w(web),
           :dir => 'examples'
       },
       :product => 'Kendo UI Web',
       :contents => {
            'js' => WEB_MIN_JS + WEB_MIN_JS_MAP + JQUERY_MAP,
            'styles' => WEB_MIN_CSS,
            'src/js' => WEB_SRC_JS,
            'src/styles' => WEB_SRC_CSS
       }
#Kendo UI Web GPL (obsolete)
bundle :name => 'web.open-source',
       :license => 'src-license-web',
       :vsdoc => %w(web),
       :intellisense => %w(web),
       :type_script => %w(web),
       :changelog => %w(web framework),
       :demos => {
           :suites => %w(web),
           :dir => 'examples'
       },
       :contents => {
            'js' => WEB_MIN_JS + WEB_MIN_JS_MAP + JQUERY_MAP,
            'styles' => WEB_MIN_CSS,
            'src/js' => WEB_SRC_JS,
            'src/styles' => WEB_SRC_CSS
       }

# Kendo UI Mobile (obsolete)
bundle :name => 'mobile.commercial',
       :license => 'src-license-mobile',
       :vsdoc => %w(mobile),
       :intellisense => %w(mobile),
       :type_script => %w(mobile),
       :changelog => %w(mobile framework),
       :demos => {
           :suites => %w(mobile),
           :dir => 'examples'
       },
       :product => 'Kendo UI Mobile',
       :eula => 'mobile',
       :contents => {
            'js' => MOBILE_MIN_JS + MOBILE_MIN_JS_MAP + JQUERY_MAP,
            'styles' => MOBILE_MIN_CSS,
            'src/js' => MOBILE_SRC_JS,
            'src/styles' => MOBILE_SRC_CSS
       }

# Kendo UI DataViz (obsolete)
bundle :name => 'dataviz.commercial',
       :license => 'src-license-dataviz',
       :vsdoc => %w(dataviz),
       :intellisense => %w(dataviz),
       :type_script => %w(dataviz),
       :changelog => %w(dataviz framework),
       :eula => 'dataviz',
       :demos => {
           :suites => %w(dataviz),
           :dir => 'examples'
       },
       :product => 'Kendo UI DataViz',
       :contents => {
            'js' => DATAVIZ_MIN_JS + DATAVIZ_MIN_JS_MAP + JQUERY_MAP,
            'styles' => DATAVIZ_MIN_CSS + WEB_MIN_CSS,
            'src/js' => DATAVIZ_SRC_JS,
            'src/styles' => DATAVIZ_SRC_CSS
       }

# UI for ASP.NET MVC
bundle :name => 'aspnetmvc.trial',
       :license => 'src-license-complete',
       :eula => 'aspnetmvc',
       :readme => 'README.KendoUI.Trial',
       :vsdoc => %w(all web mobile dataviz),
       :intellisense => %w(all web mobile dataviz),
       :type_script => %w(all web mobile dataviz),
       :changelog => %w(components aspnetmvc),
       :upload_as_release_build => true,
       :demos => {
           :suites => %w(web dataviz mobile),
           :dir => [
               'wrappers/aspnetmvc/Examples/VS2012/Kendo.Mvc.Examples/html',
               'wrappers/aspnetmvc/Examples/VS2013/Kendo.Mvc.Examples/html'
           ],
           :template_dir => 'mvc'
       },
       :product => 'UI for ASP.NET MVC',
       :release_build => {
          :file_metadata => {
             :zip => {
              :label => "Manual Installation",
              :download_name => "telerik.ui.for.aspnetmvc.#{VERSION}.trial.zip",
              :file_category => "Installation",
              :file_type => "Trial Files",
              :extension => "ZIP",
              :file_markers => ["Default File"],
              :websites => ["Telerik"],
              :download_message => 'You have successfully downloaded Telerik UI for ASP.NET MVC Trial version. See <a href="http://docs.telerik.com/kendo-ui/getting-started/using-kendo-with/aspnet-mvc/introduction">this article</a> on how to get started.',
              :whats_included_message => "<strong>Quick Start Demos <br />Minified Javascript Files<br />Minified Css Styles<br />ASP.NET MVC Server Wrappers</strong>"
             },
             :msi => {
              :label => "Automatic Installation",
              :download_name => "telerik.ui.for.aspnetmvc.#{VERSION}.trial.msi",
              :file_category => "Installation",
              :file_type => "Trial Files",
              :extension => "MSI",
              :file_markers => ["Default File", "Default File For Common Installer"],
              :websites => ["Telerik"],
              :download_message => 'You have successfully downloaded Telerik UI for ASP.NET MVC Trial version. See <a href="http://docs.telerik.com/kendo-ui/getting-started/using-kendo-with/aspnet-mvc/introduction">this article</a> on how to get started.',
              :whats_included_message => "<strong>Quick Start Demos <br />Minified Javascript Files<br />Minified Css Styles<br />ASP.NET MVC Server Wrappers</strong>"
             },
             :exe => {
              :label => "Web Installer:",
              :download_name => "TelerikUIForAspNetMvcSetup.#{VERSION}.exe",
              :file_category => "Installation",
              :file_type => "Trial Files",
              :extension => "EXE",
              :file_markers => ["Is Common Installer", "Is Bolded"],
              :websites => ["Telerik"],
              :download_message => 'You have successfully downloaded Telerik UI for ASP.NET MVC Trial installer. See <a href="http://docs.telerik.com/kendo-ui/getting-started/using-kendo-with/aspnet-mvc/introduction">this article</a> on how to get started.',
              :whats_included_message => "<strong>Installer EXE package</strong>"
             },
             :nuget => {
              :label => "Telerik UI for ASP.NET MVC NuGet package",
              :download_name => "telerik.ui.for.aspnetmvc.#{VERSION}.trial.nupkg.zip",
              :file_category => "Other Setup Files",
              :file_type => "Trial Files",
              :extension => "ZIP",
              :websites => ["Telerik"],
              :download_message => "You successfully downloaded Telerik UI for ASP.NET MVC Trial NuGet package.",
              :whats_included_message => "<strong>Trial NuGet package for Telerik UI for ASP.NET MVC</strong>"
             }
          },
          :demos => true,
          :changelog => true,
       },
       :beta_build => {
          :file_metadata => {
             :zip => {
              :label => "Q#{VERSION_Q} #{VERSION_YEAR} Beta - Manual Installation",
              :download_name => "telerik.ui.for.aspnetmvc.#{VERSION}.beta.trial.zip",
              :file_category => "Beta",
              :file_type => "Additional files - shown to all",
              :extension => "ZIP",
              :websites => ["Telerik"],
              :download_message => 'You have successfully downloaded Telerik UI for ASP.NET MVC Q#{VERSION_Q} #{VERSION_YEAR} Beta release. See <a href="http://docs.telerik.com/kendo-ui/getting-started/using-kendo-with/aspnet-mvc/introduction">this article</a> on how to get started.',
              :whats_included_message => "<strong>Quick Start Demos <br />Minified Javascript Files<br />Minified Css Styles<br />ASP.NET MVC Server Wrappers</strong>"
             },
             :msi => {
              :label => "Q#{VERSION_Q} #{VERSION_YEAR} Beta - Automatic Installation",
              :download_name => "telerik.ui.for.aspnetmvc.#{VERSION}.beta.trial.msi",
              :file_category => "Beta",
              :file_type => "Additional files - shown to all",
              :extension => "MSI",
              :websites => ["Telerik"],
              :download_message => 'You have successfully downloaded Telerik UI for ASP.NET MVC Q#{VERSION_Q} #{VERSION_YEAR} Beta release. See <a href="http://docs.telerik.com/kendo-ui/getting-started/using-kendo-with/aspnet-mvc/introduction">this article</a> on how to get started.',
              :whats_included_message => "<strong>Quick Start Demos <br />Minified Javascript Files<br />Minified Css Styles<br />ASP.NET MVC Server Wrappers</strong>"
             }
          },
          :demos => true,
          :changelog => true,
       },
       :contents => {
            'js' => TRIAL_MIN_JS + MVC_MIN_JS_MAP + JQUERY_MAP,
            'styles' => MIN_CSS_RESOURCES,
       }
       .merge(MVC_CONTENT),
       :prerequisites => [
           'mvc:assets',
           'dist/bundles/aspnetmvc.trial/wrappers/aspnetmvc/Examples/VS2012/Kendo.Mvc.Examples/Kendo.Mvc.Examples.csproj',
           'dist/bundles/aspnetmvc.trial/wrappers/aspnetmvc/Examples/VS2012/Kendo.Mvc.Examples.sln',
           'dist/bundles/aspnetmvc.trial/wrappers/aspnetmvc/Examples/VS2013/Kendo.Mvc.Examples/Kendo.Mvc.Examples.csproj',
           'dist/bundles/aspnetmvc.trial/wrappers/aspnetmvc/Examples/VS2013/Kendo.Mvc.Examples/Web.config',
           'dist/bundles/aspnetmvc.trial/wrappers/aspnetmvc/Examples/VS2013/Kendo.Mvc.Examples/Views/Web.config',
           'dist/bundles/aspnetmvc.trial/wrappers/aspnetmvc/Examples/VS2013/Kendo.Mvc.Examples/Areas/razor/Views/Web.config',
           'dist/bundles/aspnetmvc.trial/wrappers/aspnetmvc/Examples/VS2013/Kendo.Mvc.Examples/Areas/aspx/Views/Web.config',
           'dist/bundles/aspnetmvc.trial/wrappers/aspnetmvc/Examples/VS2013/Kendo.Mvc.Examples.sln'
       ]

bundle :name => 'aspnetmvc.hotfix.trial',
       :license => 'src-license-complete',
       :eula => 'aspnetmvc',
       :vsdoc => %w(all web mobile dataviz),
       :intellisense => %w(all web mobile dataviz),
       :type_script => %w(all web mobile dataviz),
       :changelog => %w(components aspnetmvc),
       :product => 'UI for ASP.NET MVC',
       :release_build => {
         :file_metadata => {
             :zip => {
              :label => "DLL, Scripts and Skins",
              :download_name => "telerik.ui.for.aspnetmvc.hotfix.#{VERSION}.trial.zip",
              :file_category => "Installation",
              :file_type => "Trial Files",
              :extension => "ZIP",
              :file_markers => ["Use this file in VS Extensions and license key generation"],
              :vs_hotfix => true,
              :websites => ["Telerik"],
              :download_message => 'You have successfully downloaded Telerik UI for ASP.NET MVC Trial version. See <a href="http://docs.telerik.com/kendo-ui/getting-started/using-kendo-with/aspnet-mvc/introduction">this article</a> on how to get started.',
              :whats_included_message => "<strong>Minified Javascript Files<br />Minified Css Styles<br />ASP.NET MVC Server Wrappers</strong>"
             }
          }
       },
       :contents => {
            'js' => TRIAL_MIN_JS + MVC_MIN_JS_MAP + JQUERY_MAP,
            'styles' => MIN_CSS_RESOURCES,
            'wrappers/aspnetmvc/EditorTemplates/ascx' => MVC_ASCX_EDITOR_TEMPLATES,
            'wrappers/aspnetmvc/EditorTemplates/razor' => MVC_RAZOR_EDITOR_TEMPLATES,
            'wrappers/aspnetmvc/LegacyThemes' => FileList['wrappers/mvc/legacy-themes/**/*']
       }.merge(MVC_BINARIES),
       :prerequisites => [
           'mvc:assets'
       ]

bundle :name => 'aspnetmvc.commercial',
       :license => 'src-license-complete',
       :eula => 'aspnetmvc',
       :vsdoc => %w(all web mobile dataviz),
       :intellisense => %w(all web mobile dataviz),
       :type_script => %w(all web mobile dataviz),
       :changelog => %w(components aspnetmvc),
       :demos => {
           :suites => %w(web dataviz mobile),
           :dir => [
               'wrappers/aspnetmvc/Examples/VS2012/Kendo.Mvc.Examples/html',
               'wrappers/aspnetmvc/Examples/VS2013/Kendo.Mvc.Examples/html'
           ],
           :template_dir => 'mvc'
       },
       :product => 'UI for ASP.NET MVC',
       :upload_as_internal_build => false,
       :release_build => {
          :file_metadata => {
             :zip => {
              :label => "Manual Installation",
              :download_name => "telerik.ui.for.aspnetmvc.#{VERSION}.commercial.zip",
              :file_category => "Installation",
              :file_type => "Paid Files",
              :extension => "ZIP",
              :file_markers => ["Default File"],
              :websites => ["Telerik"],
              :download_message => 'You have successfully downloaded Telerik UI for ASP.NET MVC Commercial version. See <a href="http://docs.telerik.com/kendo-ui/getting-started/using-kendo-with/aspnet-mvc/introduction">this article</a> on how to get started.',
              :whats_included_message => "<strong>Quick Start Demos <br />Minified Javascript Files<br />Minified Css Styles<br />ASP.NET MVC Server Wrappers <br />Complete Source Code</strong>"
             },
             :msi => {
              :label => "Automatic Installation",
              :download_name => "telerik.ui.for.aspnetmvc.#{VERSION}.commercial.msi",
              :file_category => "Installation",
              :file_type => "Paid Files",
              :extension => "MSI",
              :file_markers => ["Default File", "Default File For Common Installer"],
              :websites => ["Telerik"],
              :download_message => 'You have successfully downloaded Telerik UI for ASP.NET MVC Commercial version. See <a href="http://docs.telerik.com/kendo-ui/getting-started/using-kendo-with/aspnet-mvc/introduction">this article</a> on how to get started.',
              :whats_included_message => "<strong>Quick Start Demos <br />Minified Javascript Files<br />Minified Css Styles<br />ASP.NET MVC Server Wrappers <br />Complete Source Code</strong>"
             },
             :exe => {
              :label => "Control Panel:",
              :download_name => "TelerikControlPanelSetup.MVC.#{VERSION}.exe",
              :file_category => "Installation",
              :file_type => "Paid Files",
              :extension => "EXE",
              :file_markers => ["Is Bolded"],
              :websites => ["Telerik"],
              :download_message => 'You have successfully downloaded Telerik UI for ASP.NET MVC Commercial installer. See <a href="http://docs.telerik.com/kendo-ui/getting-started/using-kendo-with/aspnet-mvc/introduction">this article</a> on how to get started.',
              :whats_included_message => "<strong>Installer EXE package</strong>"
             },
             :nuget => {
              :label => "Telerik UI for ASP.NET MVC NuGet package",
              :download_name => "telerik.ui.for.aspnetmvc.#{VERSION}.commercial.nupkg.zip",
              :file_category => "Other Setup Files",
              :file_type => "Paid Files",
              :extension => "ZIP",
              :websites => ["Telerik"],
              :download_message => "You successfully downloaded Telerik UI for ASP.NET MVC Commercial NuGet package.",
              :whats_included_message => "<strong>Commercial NuGet package for Telerik UI for ASP.NET MVC</strong>"
             }
          }
       },
       :contents => {
            'js' => MVC_MIN_JS + MVC_MIN_JS_MAP + JQUERY_MAP,
            'styles' => MIN_CSS_RESOURCES,
            'src/js' => MVC_SRC_JS,
            'src/styles' => SRC_CSS,
            'src/Kendo.Mvc/packages' => FileList['wrappers/mvc/packages/**/*.*'],
            'src/Kendo.Mvc/Kendo.Mvc' => FileList['wrappers/mvc/src/Kendo.Mvc/**/*']
                .exclude('**/bin/**/*')
                .exclude('**/obj/**/*')
                .exclude('**/*.csproj'),
       }.merge(MVC_CONTENT),
       :prerequisites => [
           'mvc:assets',
           'dist/bundles/aspnetmvc.commercial/src/Kendo.Mvc/Kendo.Mvc.sln',
           'dist/bundles/aspnetmvc.commercial/src/Kendo.Mvc/Kendo.Mvc/Kendo.snk',
           'dist/bundles/aspnetmvc.commercial/src/Kendo.Mvc/Kendo.Mvc/CommonAssemblyInfo.cs',
           'dist/bundles/aspnetmvc.commercial/src/Kendo.Mvc/Kendo.Mvc/Kendo.Mvc.csproj',
           'dist/bundles/aspnetmvc.commercial/wrappers/aspnetmvc/Examples/VS2012/Kendo.Mvc.Examples/Kendo.Mvc.Examples.csproj',
           'dist/bundles/aspnetmvc.commercial/wrappers/aspnetmvc/Examples/VS2012/Kendo.Mvc.Examples.sln',
           'dist/bundles/aspnetmvc.commercial/wrappers/aspnetmvc/Examples/VS2013/Kendo.Mvc.Examples/Kendo.Mvc.Examples.csproj',
           'dist/bundles/aspnetmvc.commercial/wrappers/aspnetmvc/Examples/VS2013/Kendo.Mvc.Examples/Web.config',
           'dist/bundles/aspnetmvc.commercial/wrappers/aspnetmvc/Examples/VS2013/Kendo.Mvc.Examples/Views/Web.config',
           'dist/bundles/aspnetmvc.commercial/wrappers/aspnetmvc/Examples/VS2013/Kendo.Mvc.Examples/Areas/razor/Views/Web.config',
           'dist/bundles/aspnetmvc.commercial/wrappers/aspnetmvc/Examples/VS2013/Kendo.Mvc.Examples/Areas/aspx/Views/Web.config',
           'dist/bundles/aspnetmvc.commercial/wrappers/aspnetmvc/Examples/VS2013/Kendo.Mvc.Examples.sln'
       ]

bundle :name => 'aspnetmvc.internal.commercial',
       :license => 'src-license-complete',
       :eula => 'aspnetmvc',
       :vsdoc => %w(all web mobile dataviz),
       :intellisense => %w(all web mobile dataviz),
       :type_script => %w(all web mobile dataviz),
       :changelog => %w(components aspnetmvc),
       :product => 'UI for ASP.NET MVC',
       :upload_as_internal_build => true,
       :contents => {
            'js' => MVC_MIN_JS + MVC_MIN_JS_MAP + JQUERY_MAP,
            'styles' => MIN_CSS_RESOURCES,
            'wrappers/aspnetmvc/EditorTemplates/ascx' => MVC_ASCX_EDITOR_TEMPLATES,
            'wrappers/aspnetmvc/EditorTemplates/razor' => MVC_RAZOR_EDITOR_TEMPLATES,
            'wrappers/aspnetmvc/LegacyThemes' => FileList['wrappers/mvc/legacy-themes/**/*'],
            'src/js' => MVC_SRC_JS,
            'src/styles' => SRC_CSS,
            'src/Kendo.Mvc/packages' => FileList['wrappers/mvc/packages/**/*.*'],
            'src/Kendo.Mvc/Kendo.Mvc' => FileList['wrappers/mvc/src/Kendo.Mvc/**/*']
                .exclude('**/bin/**/*')
                .exclude('**/obj/**/*')
                .exclude('**/*.csproj'),
       }.merge(MVC_BINARIES),
       :prerequisites => [
           'mvc:assets',
           'dist/bundles/aspnetmvc.internal.commercial/src/Kendo.Mvc/Kendo.Mvc.sln',
           'dist/bundles/aspnetmvc.internal.commercial/src/Kendo.Mvc/Kendo.Mvc/Kendo.snk',
           'dist/bundles/aspnetmvc.internal.commercial/src/Kendo.Mvc/Kendo.Mvc/CommonAssemblyInfo.cs',
           'dist/bundles/aspnetmvc.internal.commercial/src/Kendo.Mvc/Kendo.Mvc/Kendo.Mvc.csproj'
       ]

bundle :name => 'aspnetmvc.hotfix.commercial',
       :license => 'src-license-complete',
       :eula => 'aspnetmvc',
       :vsdoc => %w(all web mobile dataviz),
       :intellisense => %w(all web mobile dataviz),
       :type_script => %w(all web mobile dataviz),
       :changelog => %w(components aspnetmvc),
       :product => 'UI for ASP.NET MVC',
       :upload_as_internal_build => true,
       :product => 'UI for ASP.NET MVC',
       :release_build => {
          :file_metadata => {
             :zip => {
              :label => "DLL, Scripts and Skins",
              :download_name => "telerik.ui.for.aspnetmvc.hotfix.#{VERSION}.commercial.zip",
              :file_category => "Installation",
              :file_type => "Paid Files",
              :extension => "ZIP",
              :file_markers => ["Use this file in VS Extensions and license key generation"],
              :vs_hotfix => true,
              :websites => ["Telerik"],
              :download_message => 'You have successfully downloaded Telerik UI for ASP.NET MVC Commercial version. See <a href="http://docs.telerik.com/kendo-ui/getting-started/using-kendo-with/aspnet-mvc/introduction">this article</a> on how to get started.',
              :whats_included_message => "<strong>Minified Javascript Files<br />Minified Css Styles<br />ASP.NET MVC Server Wrappers</strong>"
             }
          }
       },
       :vs_extension => true,
       :contents => {
            'js' => MVC_MIN_JS + MVC_MIN_JS_MAP + JQUERY_MAP,
            'styles' => MIN_CSS_RESOURCES,
            'wrappers/aspnetmvc/EditorTemplates/ascx' => MVC_ASCX_EDITOR_TEMPLATES,
            'wrappers/aspnetmvc/EditorTemplates/razor' => MVC_RAZOR_EDITOR_TEMPLATES,
            'wrappers/aspnetmvc/LegacyThemes' => FileList['wrappers/mvc/legacy-themes/**/*']
       }.merge(MVC_BINARIES)


bundle :name => 'cdn.commercial',
       :license => 'src-license-cdn',
       :vsdoc => %w(all web mobile dataviz),
       :intellisense => %w(all web mobile dataviz),
       :vsdoc_dest => 'js',
       :contents => {
           'js' => COMPLETE_MIN_JS + COMPLETE_MIN_JS_MAP + MVC_MIN_JS + MVC_MIN_JS_MAP + JQUERY_MAP,
           'styles' => MIN_CSS_RESOURCES,
           'styles/telerik' => FileList['wrappers/mvc/legacy-themes/**/*'].include(LEGACY_MIN_CSS)
       }

WIN_JS_RESOURCES = WIN_MIN_JS + WIN_SRC_JS + WIN_SRC_CSS + WIN_MIN_CSS

bundle :name => 'winjs.commercial',
       :contents => {
            '.' => WIN_JS_RESOURCES
       }

bundle :name => 'appbuilder.professional',
       :license => 'src-license-appbuilder',
       :type_script => %w(dataviz.mobile),
       :changelog => %w(dataviz mobile framework),
       :skip_changelog_in_zip => true,
       :product => 'Kendo UI Professional',
       :contents => {
            'styles' => APP_BUILDER_MIN_CSS,
            'js' => APP_BUILDER_MIN_JS,
            'typescript' => FileList['resources/typescript/jquery.d.ts']
       },
       :upload_to_appbuilder => true,
       :appbuilder_features => "Kendo UI DataViz"

bundle :name => 'appbuilder.core',
       :license => 'src-license-appbuilder-core',
       :type_script => %w(mobile),
       :changelog => %w(mobile framework),
       :skip_changelog_in_zip => true,
       :product => 'Kendo UI Core',
       :contents => {
            'styles' => APP_BUILDER_CORE_MIN_CSS,
            'js' => APP_BUILDER_CORE_MIN_JS,
            'typescript' => FileList['resources/typescript/jquery.d.ts']
       },
       :upload_to_appbuilder => true

# UI for JSP
bundle :name => 'jsp.trial',
       :license => 'src-license-complete',
       :eula => 'jsp',
       :readme => 'README.KendoUI.Trial',
       :changelog => %w(components jsp),
       :type_script => %w(all web mobile dataviz),
       :product => 'UI for JSP',
       :release_build => {
          :file_metadata => {
             :zip => {
              :label => "Manual Installation",
              :download_name => "telerik.ui.for.jsp.#{VERSION}.trial.zip",
              :file_category => "Installation",
              :file_type => "Trial Files",
              :extension => "ZIP",
              :file_markers => ["Default File"],
              :websites => ["Telerik"],
              :download_message => 'You have successfully downloaded Telerik UI for JSP Trial version. See <a href="http://docs.telerik.com/kendo-ui/getting-started/using-kendo-with/jsp/introduction">this article</a> on how to get started.',
              :whats_included_message => "<strong>Quick Start Demos<br />Minified Javascript Files<br />Minified Css Styles<br />JSP Server Wrappers</strong>"
             }
          },
          :changelog => true,
        },
        :beta_build => {
          :file_metadata => {
             :zip => {
              :label => "Q#{VERSION_Q} #{VERSION_YEAR} Beta - Manual Installation",
              :download_name => "telerik.ui.for.jsp.#{VERSION}.beta.trial.zip",
              :file_category => "Beta",
              :file_type => "Additional files - shown to all",
              :extension => "ZIP",
              :websites => ["Telerik"],
              :download_message => 'You have successfully downloaded Telerik UI for JSP Q#{VERSION_Q} #{VERSION_YEAR} Beta release. See <a href="http://docs.telerik.com/kendo-ui/getting-started/using-kendo-with/jsp/introduction">this article</a> on how to get started.',
              :whats_included_message => "<strong>Quick Start Demos<br />Minified Javascript Files<br />Minified Css Styles<br />JSP Server Wrappers</strong>"
             }
          },
          :changelog => true,
        },
       :contents => {
            'js' => COMPLETE_MIN_JS + COMPLETE_MIN_JS_MAP + JQUERY_MAP,
            'styles' => MIN_CSS_RESOURCES,
       }
       .merge(JSP_CONTENT),
       :prerequisites => [
           "java:assets",
           "dist/bundles/jsp.trial/wrappers/jsp/spring-demos/src/main/webapp/WEB-INF/lib/#{JAR_NAME}",
           'dist/bundles/jsp.trial/wrappers/jsp/spring-demos/pom.xml'
       ]

bundle :name => 'jsp.commercial',
       :license => 'src-license-complete',
       :eula => 'jsp',
       :changelog => %w(components jsp),
       :product => 'UI for JSP',
       :upload_as_internal_build => true,
       :release_build => {
         :file_metadata => {
             :zip => {
              :label => "Manual Installation",
              :download_name => "telerik.ui.for.jsp.#{VERSION}.commercial.zip",
              :file_category => "Installation",
              :file_type => "Paid Files",
              :extension => "ZIP",
              :file_markers => ["Default File"],
              :websites => ["Telerik"],
              :download_message => 'You have successfully downloaded Telerik UI for JSP Commercial version. See <a href="http://docs.telerik.com/kendo-ui/getting-started/using-kendo-with/jsp/introduction">this article</a> on how to get started.',
              :whats_included_message => "<strong>Quick Start Demos<br />Minified Javascript Files<br />Minified Css Styles<br />JSP Server Wrappers<br />Complete Source Code</strong>"
             }
          }
        },
       :type_script => %w(all web mobile dataviz),
       :contents => {
            'js' => COMPLETE_MIN_JS + COMPLETE_MIN_JS_MAP + JQUERY_MAP,
            'styles' => MIN_CSS_RESOURCES,
            'src/js' => COMPLETE_SRC_JS,
            'src/styles' => SRC_CSS,
            'src/kendo-taglib' => JSP_TAGLIB_SRC.exclude('**/test/**/*')
       }.merge(JSP_CONTENT),
       :prerequisites => [
           "java:assets",
           "dist/bundles/jsp.commercial/wrappers/jsp/spring-demos/src/main/webapp/WEB-INF/lib/#{JAR_NAME}",
           "dist/bundles/jsp.commercial/wrappers/jsp/spring-demos/pom.xml",
           "dist/bundles/jsp.commercial/src/kendo-taglib/pom.xml"
       ]

# UI for PHP
bundle :name => 'php.trial',
       :license => 'src-license-complete',
       :eula => 'php',
       :readme => 'README.KendoUI.Trial',
       :changelog => %w(components php),
       :type_script => %w(all web mobile dataviz),
       :product => 'UI for PHP',
       :release_build => {
          :file_metadata => {
             :zip => {
              :label => "Manual Installation",
              :download_name => "telerik.ui.for.php.#{VERSION}.trial.zip",
              :file_category => "Installation",
              :file_type => "Trial Files",
              :extension => "ZIP",
              :file_markers => ["Default File"],
              :websites => ["Telerik"],
              :download_message => 'You have successfully downloaded Telerik UI for PHP Trial version. See <a href="http://docs.telerik.com/kendo-ui/getting-started/using-kendo-with/php/introduction">this article</a> on how to get started.',
              :whats_included_message => "<strong>Quick Start Demos<br />Minified Javascript Files<br />Minified Css Styles<br />PHP Server Wrappers</strong>"
             }
          },
          :changelog => true,
        },
        :beta_build => {
          :file_metadata => {
             :zip => {
              :label => "Q#{VERSION_Q} #{VERSION_YEAR} Beta - Manual Installation",
              :download_name => "telerik.ui.for.php.#{VERSION}.beta.trial.zip",
              :file_category => "Beta",
              :file_type => "Additional files - shown to all",
              :extension => "ZIP",
              :websites => ["Telerik"],
              :download_message => 'You have successfully downloaded Telerik UI for PHP Q#{VERSION_Q} #{VERSION_YEAR} Beta release. See <a href="http://docs.telerik.com/kendo-ui/getting-started/using-kendo-with/php/introduction">this article</a> on how to get started.',
              :whats_included_message => "<strong>Quick Start Demos<br />Minified Javascript Files<br />Minified Css Styles<br />PHP Server Wrappers</strong>"
             }
          },
          :changelog => true,
        },
       :contents => {
            'js' => COMPLETE_MIN_JS + COMPLETE_MIN_JS_MAP + JQUERY_MAP,
            'styles' => MIN_CSS_RESOURCES,
       }
       .merge(PHP_CONTENT),
       :prerequisites => [
           "php:assets"
       ]

bundle :name => 'php.commercial',
       :license => 'src-license-complete',
       :eula => 'php',
       :changelog => %w(components php),
       :product => 'UI for PHP',
       :upload_as_internal_build => true,
       :release_build => {
          :file_metadata => {
             :zip => {
              :label => "Manual Installation",
              :download_name => "telerik.ui.for.php.#{VERSION}.commercial.zip",
              :file_category => "Installation",
              :file_type => "Paid Files",
              :extension => "ZIP",
              :file_markers => ["Default File"],
              :websites => ["Telerik"],
              :download_message => 'You have successfully downloaded Telerik UI for PHP Commercial version. See <a href="http://docs.telerik.com/kendo-ui/getting-started/using-kendo-with/php/introduction">this article</a> on how to get started.',
              :whats_included_message => "<strong>Quick Start Demos<br />Minified Javascript Files<br />Minified Css Styles<br />PHP Server Wrappers<br />Complete Source Code</strong>"
             }
          }
        },
       :type_script => %w(all web mobile dataviz),
       :contents => {
            'js' => COMPLETE_MIN_JS + COMPLETE_MIN_JS_MAP + JQUERY_MAP,
            'styles' => MIN_CSS_RESOURCES,
            'src/js' => COMPLETE_SRC_JS,
            'src/styles' => SRC_CSS,
            'src/php' => PHP_LIB_SRC
       }.merge(PHP_CONTENT),
       :prerequisites => [
           "php:assets"
       ]

# Kendo UI Core
bundle :name => 'core',
       :license => 'src-license-core',
       :product => 'Kendo UI Core',
       :changelog => %w(components),
       :changelog_exclude => %(
            grid scheduler upload editor treeview
            chart sparkline diagram map stockchart barcode qrcode lineargauge radialgauge
        ),
       :readme => 'README.KendoUI.Core',
       :release_build => {
          :file_metadata => {
             :zip => {
              :label => "Manual Installation",
              :download_name => "telerik.kendoui.#{VERSION}.core.zip",
              :file_category => "Installation",
              :file_type => "Free Product Files",
              :extension => "ZIP",
              :file_markers => ["Default File"],
              :websites => ["Telerik", "SiteFinity"],
              :download_message => 'You have successfully downloaded Kendo UI Core (Apache 2.0) version. See <a href="http://docs.telerik.com/kendo-ui/getting-started/introduction">this article</a> on how to get started.',
              :whats_included_message => "<strong>Quick Start Demos<br />Minified Javascript Files<br />Minified Css Styles<br />Complete Source Code</strong>"
             }
          }
        },
       :contents => {
            'js' => CORE_MIN_JS + CORE_MIN_JS_MAP + JQUERY_MAP,
            'styles' => CORE_MIN_CSS_RESOURCES,
            'src/js' => CORE_SRC_JS,
            'src/styles' => CORE_SRC_CSS
       }

BUNDLES = [
    'aspnetmvc.commercial',
    'aspnetmvc.internal.commercial',
    'aspnetmvc.hotfix.commercial',
    'aspnetmvc.hotfix.trial',
    'aspnetmvc.trial',
    'cdn.commercial',
    'professional.commercial',
    'professional.trial',
    'jsp.commercial',
    'jsp.trial',
    'php.commercial',
    'php.trial',
    'winjs.commercial',
    'appbuilder.professional',
    'appbuilder.core',
    'core'
]

namespace :build do
    WEB_ROOT = "/var/www"
    TOMCAT_ROOT = "/var/lib/tomcat7/webapps"

    def zip_targets(destination)
        zip_bundles = []

        BUNDLES.each do |bundle|
            latest_zip_filename = File.join(ARCHIVE_ROOT, destination, latest_bundle_name(bundle) + ".zip")

            file_copy :to => latest_zip_filename,
                      :from => "dist/bundles/#{bundle}.zip"

            zip_bundles.push(latest_zip_filename)

            versioned_zip_filename = File.join(ARCHIVE_ROOT, destination, versioned_bundle_name(bundle) + ".zip")

            file_copy :to => versioned_zip_filename,
                      :from => "dist/bundles/#{bundle}.zip"

            zip_bundles.push(versioned_zip_filename)
        end

        zip_demos = "#{ARCHIVE_ROOT}/#{destination}/online-examples.zip"

        file_copy :to => zip_demos,
                  :from => "dist/demos/production.zip"

        zip_bundles.push(zip_demos)

        db_root = "#{ARCHIVE_ROOT}/#{destination}/download-builder"
        db_version = "#{VERSION}".sub(/((\w+|\.){6})\./, '\1 ')

        db_content = "#{db_root}/#{db_version}.zip"
        file_copy :to => db_content,
                  :from => "dist/download-builder/content.zip"

        db_config_file = File.join(db_root, "kendo-config.#{db_version}.js")
        file_copy :to => db_config_file,
                  :from => "dist/download-builder/kendo-config.js"

        zip_bundles.push(db_config_file, db_content)

        tree :to => "#{ARCHIVE_ROOT}/WinJS/#{destination}",
             :from => FileList[WIN_JS_RESOURCES].pathmap('dist/bundles/winjs.commercial/%f'),
             :root => 'dist/bundles/winjs.commercial/'

        zip_bundles.push("#{ARCHIVE_ROOT}/WinJS/#{destination}")

        tree :to => "#{ARCHIVE_ROOT}/AppBuilder/#{destination}/js",
             :from => FileList[APP_BUILDER_MIN_JS].pathmap('dist/bundles/appbuilder.professional/js/%f'),
             :root => 'dist/bundles/appbuilder.professional/js'

        zip_bundles.push("#{ARCHIVE_ROOT}/AppBuilder/#{destination}/js")

        tree :to => "#{ARCHIVE_ROOT}/AppBuilder/#{destination}/styles",
             :from => FileList[APP_BUILDER_MIN_CSS].sub!(/dist\/styles\/(mobile|dataviz)/, 'dist/bundles/appbuilder.professional/styles'),
             :root => 'dist/bundles/appbuilder.professional/styles'

        tree :to => "#{ARCHIVE_ROOT}/AppBuilder/#{destination}/js",
             :from => FileList[APP_BUILDER_CORE_MIN_JS].pathmap('dist/bundles/appbuilder.core/js/%f'),
             :root => 'dist/bundles/appbuilder.core/js'

        zip_bundles.push("#{ARCHIVE_ROOT}/AppBuilder/#{destination}/js")

        tree :to => "#{ARCHIVE_ROOT}/AppBuilder/#{destination}/styles",
             :from => FileList[APP_BUILDER_CORE_MIN_CSS].sub!(/dist\/styles\/(mobile|dataviz)/, 'dist/bundles/appbuilder.core/styles'),
             :root => 'dist/bundles/appbuilder.core/styles'

        zip_bundles.push("#{ARCHIVE_ROOT}/AppBuilder/#{destination}/styles")

        clean_task = "#{ARCHIVE_ROOT}/#{destination}"

        task clean_task do
            sh "find #{ARCHIVE_ROOT}/#{destination}/* -maxdepth 0 -type f -mtime +2 -exec rm {} \\;"
            sh "find #{ARCHIVE_ROOT}/#{destination}/download-builder/* -maxdepth 0 -type f -not -newermt 'today 00:00' -exec rm {} \\;"
        end

        zip_bundles.push(clean_task)

        zip_bundles
    end

    def xml_changelogs(destination)
        [
            'professional.trial',
            'aspnetmvc.trial',
            'php.trial',
            'jsp.trial'
        ].map do |bundle|
            filename = versioned_bundle_name(bundle) + ".xml"

            destination_file = File.join(ARCHIVE_ROOT, destination, 'changelogs', filename)

            file_copy :to => destination_file,
                      :from => "dist/bundles/#{bundle}.changelog.xml"

            destination_file
        end
    end

    { :production => "Production", :master => "Stable" }.each do |env, destination|
        namespace env do
            desc 'Build and publish ASP.NET MVC DLLs for #{destination} distribution'
            task :aspnetmvc_binaries => [ "mvc:binaries", "tests:aspnetmvc", 'vs_plugin:build' ] do
                sh "if not exist L: ( net use L: #{ARCHIVE_ROOT} /user:telerik.com\\KendoBuildUser Kend0Tf$UseR )"

                target_dir = "L:\\#{destination}\\binaries\\"

                sh "if not exist #{target_dir} ( mkdir #{target_dir} )"
                sh "xcopy dist\\binaries\\* #{target_dir} /E /Y"

                sh "xcopy plugins\\KendoBootstrapper\\KendoBootstrapper\\bin\\*.vsix L:\\#{destination}\\ /E /Y"
            end

            desc 'Copy ASP.NET MVC DLLs from distribution archive'
            task :get_binaries do
                sh "rsync -avc --del #{ARCHIVE_ROOT}/#{destination}/binaries/* dist/binaries/"
            end
        end
    end

    namespace :production do
        desc 'Run tests and VSDoc'
        task :tests => ["tests:Production", "vsdoc:production:test"]

        desc 'Update the /production build machine web site'
        task :demos => [ 'demos:staging', 'download_builder:staging' ] do
            sh "rsync -avc dist/demos/staging/ #{WEB_ROOT}/production/"
        end

        changelog = "#{WEB_ROOT}/changelog/index.html"
        write_changelog changelog, %w(components aspnetmvc)

        desc 'Package and publish bundles to the Production directory, and update the changelog'
        task :bundles => [
            :get_binaries,
            'bundles:all',
            'demos:production',
            'download_builder:bundle',
            zip_targets("Production"),
            xml_changelogs("Production"),
            changelog
        ].flatten
    end

    namespace :master do
        desc 'Runs test suite over the master branch'
        task :tests => ["tests:CI", "vsdoc:master:test", "intellisense:master:test", "type_script:master:test"]

        desc 'Update the /staging build machine web site'
        task :demos => [
            :get_binaries,
            'demos:staging',
            'download_builder:staging',
            'demos:staging_java',
            'demos:staging_php',
            'demos:staging_mvc'
        ] do
            sh "rsync -avc dist/demos/staging/ #{WEB_ROOT}/staging/"
            sh "rsync -avc dist/download-builder-staging/ #{WEB_ROOT}/download-builder-staging/"
            sh "rsync -avc --del dist/demos/staging-java/ #{TOMCAT_ROOT}/staging-java/"
            # sh "curl -s -m 300 --netrc \"http://localhost:8081/manager/text/reload?path=/staging-java\""
            sh "rsync -avc --del dist/demos/staging-php/ #{WEB_ROOT}/staging-php/"


            # Deploy MVC demos on kendoiis
            remote = WinRemote.new "kendoiis.telerik.com"

            sh "rsync -avc --del dist/aspnetmvc-demos/ /mnt/kendo-iis/stable-demos-src/"

            shares = "c:\\shares"
            source = "#{shares}\\stable-demos-src"

            remote.build("#{source}\\VS2012\\Kendo.Mvc.Examples.sln")
            remote.build("#{source}\\VS2013\\Kendo.Mvc.Examples.sln")

            remote.stop_iis()
            remote.deploy("#{source}\\VS2012\\Kendo.Mvc.Examples", "#{shares}\\staging-mvc\\")
            remote.deploy("#{source}\\VS2013\\Kendo.Mvc.Examples", "#{shares}\\staging-mvc5\\")
            remote.start_iis()
        end

        desc 'Package and publish bundles to the Stable directory'
        task :bundles => [
            :get_binaries,
            'bundles:all',
            'demos:production',
            'download_builder:bundle',
            zip_targets("Stable"),
            xml_changelogs("Stable")
        ].flatten
    end

    namespace :update do
        task :demos => [
            'demos:staging'
        ] do
            sh "rsync -avc dist/demos/staging/ #{WEB_ROOT}/update/"
        end
    end

end

namespace :bundles do
    CLEAN.include('dist/bundles')

    desc('Clean bundle files')

    task :clean do
        rm_rf 'dist/bundles'
    end

    task :all => BUNDLES
end

Rake::TestTask.new do |t|
    t.test_files = FileList['build/codegen/tests/*.rb']
end

desc 'Build all bundles'
task :bundles =>  "bundles:all"

task :default => :bundles
