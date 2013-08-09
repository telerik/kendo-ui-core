require 'rake/clean'
require 'rake/testtask'

require 'bundler/setup'
require 'tempfile'
require 'erb'
require 'json'

VERBOSE = verbose == true

$LOAD_PATH << File.join(File.dirname(__FILE__), "build")
$LOAD_PATH << File.join(File.dirname(__FILE__), "build", "codegen", "lib")

CDN_ROOT = 'http://cdn.kendostatic.com/'
KENDO_ORIGIN_HOST = 'kendoorigin'
STAGING_CDN_ROOT = 'http://cdn.kendostatic.com/staging/'

PLATFORM = RbConfig::CONFIG['host_os']

if PLATFORM =~ /linux|darwin/
    ARCHIVE_ROOT = "/kendo-builds"
else
    ARCHIVE_ROOT = "\\\\telerik.com\\resources\\Controls\\DISTRIBUTIONS\\KendoUI\\Builds"
end

if ENV['DRY_RUN']
    ADMIN_URL = 'http://integrationadmin.telerik.com/'
    ADMIN_LOGIN = 'petyo.ivanov@telerik.local'
else
    ADMIN_URL = 'http://admin.telerik.com/'
    ADMIN_LOGIN = 'petyo.ivanov@telerik.com'
end

ADMIN_PASS = 'ultra'

require 'version'
require 'timezone'
require 'zip'
require 'js'
require 'css'
require 'tasks'
require 'mvc'
require 'java'
require 'php'
require 'vsdoc'
require 'intellisense'
require 'type_script'
require 'changelog'
require 'javascript_dependencies'
require 'bundle'
require 'theme_builder'
require 'demos'
require 'download_builder'
require 'internal_build_upload'
require 'cdn'
require 'tests'
require 'codegen'
require 'nuget'
require 'playground'

ROOT_MAP = {
    '.' => /(src|styles\/.+?)\//,
    'js' => 'src/',
    'styles' => /styles\/.+?\//,
    'src/js' => 'src/',
    'src/styles' => /styles\/.+?\//,
    'src/Kendo.Mvc' => 'wrappers/mvc/src/Kendo.Mvc/',
    'wrappers/aspnetmvc/LegacyThemes' => 'wrappers/mvc/legacy-themes/',
    'styles/telerik' => 'wrappers/mvc/legacy-themes/',
    'wrappers/aspnetmvc/EditorTemplates/ascx' => 'wrappers/mvc/demos/Kendo.Mvc.Examples/Views/Shared/EditorTemplates/',
    'wrappers/aspnetmvc/EditorTemplates/razor' => 'wrappers/mvc/demos/Kendo.Mvc.Examples/Views/Shared/EditorTemplates/',
    'wrappers/aspnetmvc/Binaries/Mvc3' => 'wrappers/mvc/src/Kendo.Mvc/bin/Release/',
    'wrappers/aspnetmvc/Examples' => 'wrappers/mvc/demos/Kendo.Mvc.Examples/',
    'wrappers/aspnetmvc/Examples/Content/shared' => 'demos/mvc/content/shared',
    'wrappers/aspnetmvc/Examples/bin' => 'wrappers/mvc/src/Kendo.Mvc/bin/Release/',
    'wrappers/jsp/kendo-taglib' => 'wrappers/java/kendo-taglib/target/',
    'src/kendo-taglib' => 'wrappers/java/kendo-taglib/',
    'src/php' => 'wrappers/php/',
    'wrappers/jsp/spring-demos/src' => 'wrappers/java/spring-demos/src/',
    'wrappers/php' => 'wrappers/php'
}

MVC_CONTENT = {
    'wrappers/aspnetmvc/Binaries/Mvc3' => MVC_DLL,
    'wrappers/aspnetmvc/Examples/bin' => MVC_DLL,
    'wrappers/aspnetmvc/Examples' => MVC_DEMOS,
    'wrappers/aspnetmvc/Examples/Content/shared' => FileList['demos/mvc/content/shared/*'],
    'wrappers/aspnetmvc/EditorTemplates/ascx' => MVC_ASCX_EDITOR_TEMPLATES,
    'wrappers/aspnetmvc/EditorTemplates/razor' => MVC_RAZOR_EDITOR_TEMPLATES,
    'wrappers/aspnetmvc/LegacyThemes' => FileList['wrappers/mvc/legacy-themes/**/*'].include(LEGACY_MIN_CSS)
}

JSP_CONTENT = {
    'wrappers/jsp/kendo-taglib' => JSP_TAGLIB_JAR,
    'wrappers/jsp/spring-demos/src' => SPRING_DEMOS_SRC
}

PHP_CONTENT = {
    'wrappers/php' => PHP_DEMOS_SRC
}

# Rake tasks
desc('JavaScript')
task :js => [MIN_JS, JS_BUNDLES, KENDO_CONFIG_FILE].flatten

desc('Less')
multitask :less => [MIN_CSS].flatten

desc('Build all Kendo UI distributions')
task :default => [:bundles]

# Kendo UI Complete
bundle :name => 'complete.commercial',
       :license => 'src-license-complete',
       :eula => 'complete',
       :readme => 'README.KendoUI.Complete',
       :vsdoc => {
           %w(web mobile dataviz framework) => 'all',
           %w(web framework) => 'web',
           %w(dataviz framework) => 'dataviz',
           %w(mobile framework) => 'mobile'
       },
       :intellisense => {
           %w(web mobile dataviz framework) => 'all',
           %w(web framework) => 'web',
           %w(dataviz framework) => 'dataviz',
           %w(mobile framework) => 'mobile'
       },
       :type_script => { %w(web mobile dataviz framework) => 'all' },
       :changelog => %w(web mobile dataviz framework),
       :demos => %w(web dataviz mobile),
       :product => 'Kendo UI Complete',
       :upload_as_internal_build => true,
       :contents => {
            'js' => COMPLETE_MIN_JS + COMPLETE_MIN_JS_MAP,
            'styles' => MIN_CSS_RESOURCES,
            'src/js' => COMPLETE_SRC_JS,
            'src/styles' => SRC_CSS
       }

bundle :name => 'complete.trial',
       :license => 'src-license-complete',
       :eula => 'complete',
       :readme => 'README.KendoUI.Trial',
       :vsdoc => {
           %w(web mobile dataviz framework) => 'all',
           %w(web framework) => 'web',
           %w(dataviz framework) => 'dataviz',
           %w(mobile framework) => 'mobile'
       },
       :intellisense => {
           %w(web mobile dataviz framework) => 'all',
           %w(web framework) => 'web',
           %w(dataviz framework) => 'dataviz',
           %w(mobile framework) => 'mobile'
       },
       :type_script => { %w(web mobile dataviz framework) => 'all' },
       :changelog => %w(web mobile dataviz framework aspnetmvc),
       :demos => %w(web dataviz mobile),
       :contents => {
            'js' => COMPLETE_MIN_JS,
            'styles' => MIN_CSS_RESOURCES,
       }

# Kendo UI Web
bundle :name => 'web.commercial',
       :license => 'src-license-web',
       :eula => 'web',
       :vsdoc => { %w(web framework) => 'web' },
       :intellisense => { %w(web framework) => 'web' },
       :type_script => { %w(web framework) => 'web' },
       :changelog => %w(web framework),
       :demos => %w(web),
       :product => 'Kendo UI Web',
       :upload_as_internal_build => true,
       :contents => {
            'js' => WEB_MIN_JS + WEB_MIN_JS_MAP,
            'styles' => WEB_MIN_CSS,
            'src/js' => WEB_SRC_JS,
            'src/styles' => WEB_SRC_CSS
       }

bundle :name => 'web.open-source',
       :license => 'src-license-web',
       :vsdoc => { %w(web framework) => 'web' },
       :intellisense => { %w(web framework) => 'web' },
       :type_script => { %w(web framework) => 'web' },
       :changelog => %w(web framework),
       :demos => %w(web),
       :contents => {
            'js' => WEB_MIN_JS + WEB_MIN_JS_MAP,
            'styles' => WEB_MIN_CSS,
            'src/js' => WEB_SRC_JS,
            'src/styles' => WEB_SRC_CSS
       }

# Kendo UI Mobile
bundle :name => 'mobile.commercial',
       :license => 'src-license-mobile',
       :vsdoc => { %w(mobile framework) => 'mobile' },
       :intellisense => { %w(mobile framework) => 'mobile' },
       :type_script => { %w(mobile framework) => 'mobile' },
       :changelog => %w(mobile framework),
       :demos => %w(mobile),
       :product => 'Kendo UI Mobile',
       :upload_as_internal_build => true,
       :eula => 'mobile',
       :contents => {
            'js' => MOBILE_MIN_JS + MOBILE_MIN_JS_MAP,
            'styles' => MOBILE_MIN_CSS,
            'src/js' => MOBILE_SRC_JS,
            'src/styles' => MOBILE_SRC_CSS
       }

# Kendo UI DataViz
bundle :name => 'dataviz.commercial',
       :license => 'src-license-dataviz',
       :vsdoc => { %w(dataviz framework) => 'dataviz' },
       :intellisense => { %w(dataviz framework) => 'dataviz' },
       :type_script => { %w(dataviz framework) => 'dataviz' },
       :changelog => %w(dataviz framework),
       :eula => 'dataviz',
       :demos => %w(dataviz),
       :product => 'Kendo UI DataViz',
       :upload_as_internal_build => true,
       :contents => {
            'js' => DATAVIZ_MIN_JS + DATAVIZ_MIN_JS_MAP,
            'styles' => DATAVIZ_MIN_CSS,
            'src/js' => DATAVIZ_SRC_JS,
            'src/styles' => DATAVIZ_SRC_CSS
       }

# Kendo Complete for ASP.NET MVC
bundle :name => 'aspnetmvc.trial',
       :license => 'src-license-complete',
       :eula => 'aspnetmvc',
       :readme => 'README.KendoUI.Trial',
       :vsdoc => {
           %w(web mobile dataviz framework) => 'all',
           %w(web framework) => 'web',
           %w(dataviz framework) => 'dataviz',
           %w(mobile framework) => 'mobile'
       },
       :intellisense => {
           %w(web mobile dataviz framework) => 'all',
           %w(web framework) => 'web',
           %w(dataviz framework) => 'dataviz',
           %w(mobile framework) => 'mobile'
       },
       :type_script => { %w(web mobile dataviz framework) => 'all' },
       :changelog => %w(web mobile dataviz framework aspnetmvc),
       :contents => {
            'js' => TRIAL_MIN_JS,
            'styles' => MIN_CSS_RESOURCES,
       }
       .merge(MVC_CONTENT),
       :prerequisites => [
           'mvc:assets',
           'dist/bundles/aspnetmvc.trial/wrappers/aspnetmvc/Examples/Kendo.Mvc.Examples.csproj'
       ]

bundle :name => 'aspnetmvc.hotfix.trial',
       :license => 'src-license-complete',
       :eula => 'aspnetmvc',
       :vsdoc => {
           %w(web mobile dataviz framework) => 'all',
           %w(web framework) => 'web',
           %w(dataviz framework) => 'dataviz',
           %w(mobile framework) => 'mobile'
       },
       :intellisense => {
           %w(web mobile dataviz framework) => 'all',
           %w(web framework) => 'web',
           %w(dataviz framework) => 'dataviz',
           %w(mobile framework) => 'mobile'
       },
       :type_script => { %w(web mobile dataviz framework) => "all" },
       :changelog => %w(web mobile dataviz framework aspnetmvc),
       :contents => {
            'js' => TRIAL_MIN_JS,
            'styles' => MIN_CSS_RESOURCES,
            'wrappers/aspnetmvc/Binaries/Mvc3' => MVC_DLL,
            'wrappers/aspnetmvc/EditorTemplates/ascx' => MVC_ASCX_EDITOR_TEMPLATES,
            'wrappers/aspnetmvc/EditorTemplates/razor' => MVC_RAZOR_EDITOR_TEMPLATES,
            'wrappers/aspnetmvc/LegacyThemes' => FileList['wrappers/mvc/legacy-themes/**/*']
       },
       :prerequisites => [
           'mvc:assets'
       ]

bundle :name => 'aspnetmvc.commercial',
       :license => 'src-license-complete',
       :eula => 'aspnetmvc',
       :vsdoc => {
           %w(web mobile dataviz framework) => 'all',
           %w(web framework) => 'web',
           %w(dataviz framework) => 'dataviz',
           %w(mobile framework) => 'mobile'
       },
       :intellisense => {
           %w(web mobile dataviz framework) => 'all',
           %w(web framework) => 'web',
           %w(dataviz framework) => 'dataviz',
           %w(mobile framework) => 'mobile'
       },
       :type_script => { %w(web mobile dataviz framework) => "all" },
       :changelog => %w(web mobile dataviz framework aspnetmvc),
       :product => 'Kendo UI Complete for ASP.NET MVC',
       :upload_as_internal_build => true,
       :contents => {
            'js' => MVC_MIN_JS + MVC_MIN_JS_MAP,
            'styles' => MIN_CSS_RESOURCES,
            'src/js' => MVC_SRC_JS,
            'src/styles' => SRC_CSS,
            'src/Kendo.Mvc' => FileList['wrappers/mvc/src/Kendo.Mvc/**/*']
                .exclude('**/bin/**/*')
                .exclude('**/obj/**/*')
                .exclude('**/*.csproj'),
       }.merge(MVC_CONTENT),
       :prerequisites => [
           'mvc:assets',
           'dist/bundles/aspnetmvc.commercial/src/Kendo.Mvc/Kendo.snk',
           'dist/bundles/aspnetmvc.commercial/src/Kendo.Mvc/Kendo.Mvc.csproj',
           'dist/bundles/aspnetmvc.commercial/wrappers/aspnetmvc/Examples/Kendo.Mvc.Examples.csproj',
           'dist/bundles/aspnetmvc.commercial/src/Kendo.Mvc/CommonAssemblyInfo.cs'
       ]

bundle :name => 'aspnetmvc.hotfix.commercial',
       :license => 'src-license-complete',
       :eula => 'aspnetmvc',
       :vsdoc => {
           %w(web mobile dataviz framework) => 'all',
           %w(web framework) => 'web',
           %w(dataviz framework) => 'dataviz',
           %w(mobile framework) => 'mobile'
       },
       :intellisense => {
           %w(web mobile dataviz framework) => 'all',
           %w(web framework) => 'web',
           %w(dataviz framework) => 'dataviz',
           %w(mobile framework) => 'mobile'
       },
       :type_script => { %w(web mobile dataviz framework) => "all" },
       :changelog => %w(web mobile dataviz framework aspnetmvc),
       :product => 'Kendo UI Complete for ASP.NET MVC',
       :upload_as_internal_build => true,
       :vs_extension => true,
       :contents => {
            'js' => MVC_MIN_JS,
            'styles' => MIN_CSS_RESOURCES,
            'wrappers/aspnetmvc/Binaries/Mvc3' => MVC_DLL,
            'wrappers/aspnetmvc/EditorTemplates/ascx' => MVC_ASCX_EDITOR_TEMPLATES,
            'wrappers/aspnetmvc/EditorTemplates/razor' => MVC_RAZOR_EDITOR_TEMPLATES,
            'wrappers/aspnetmvc/LegacyThemes' => FileList['wrappers/mvc/legacy-themes/**/*']
       }


bundle :name => 'cdn.commercial',
       :license => 'src-license-cdn',
       :vsdoc => {
           %w(web mobile dataviz framework) => 'all',
           %w(web framework) => 'web',
           %w(dataviz framework) => 'dataviz',
           %w(mobile framework) => 'mobile'
       },
       :intellisense => {
           %w(web mobile dataviz framework) => 'all',
           %w(web framework) => 'web',
           %w(dataviz framework) => 'dataviz',
           %w(mobile framework) => 'mobile'
       },
       :vsdoc_dest => 'js',
       :contents => {
           'js' => COMPLETE_MIN_JS + COMPLETE_MIN_JS_MAP + MVC_MIN_JS + MVC_MIN_JS_MAP,
           'styles' => MIN_CSS_RESOURCES,
           'styles/telerik' => FileList['wrappers/mvc/legacy-themes/**/*'].include(LEGACY_MIN_CSS)
       }

WIN_JS_RESOURCES = WIN_MIN_JS + WIN_SRC_JS + WIN_SRC_CSS + WIN_MIN_CSS

bundle :name => 'winjs.commercial',
       :contents => {
            '.' => WIN_JS_RESOURCES
       }

bundle :name => 'icenium',
       :contents => {
            'styles' => ICENIUM_MIN_CSS,
            'js' => ICENIUM_MIN_JS
       }

# Kendo UI Complete for JSP
bundle :name => 'jsp.trial',
       :license => 'src-license-complete',
       :eula => 'jsp',
       :readme => 'README.KendoUI.Trial',
       :changelog => %w(web mobile dataviz framework jsp),
       :type_script => { %w(web mobile dataviz framework) => 'all' },
       :contents => {
            'js' => COMPLETE_MIN_JS,
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
       :changelog => %w(web mobile dataviz framework jsp),
       :product => 'Kendo UI Complete for JSP',
       :upload_as_internal_build => true,
       :type_script => { %w(web mobile dataviz framework) => 'all' },
       :contents => {
            'js' => COMPLETE_MIN_JS + COMPLETE_MIN_JS_MAP,
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
# Kendo UI Complete for PHP
bundle :name => 'php.trial',
       :license => 'src-license-complete',
       :eula => 'php',
       :readme => 'README.KendoUI.Trial',
       :changelog => %w(web mobile dataviz framework php),
       :type_script => { %w(web mobile dataviz framework) => 'all' },
       :contents => {
            'js' => COMPLETE_MIN_JS,
            'styles' => MIN_CSS_RESOURCES,
       }
       .merge(PHP_CONTENT),
       :prerequisites => [
           "php:assets"
       ]

bundle :name => 'php.commercial',
       :license => 'src-license-complete',
       :eula => 'php',
       :changelog => %w(web mobile dataviz framework php),
       :product => 'Kendo UI Complete for PHP',
       :upload_as_internal_build => true,
       :contents => {
            'js' => MVC_MIN_JS + MVC_MIN_JS_MAP,
            'styles' => MIN_CSS_RESOURCES,
            'src/js' => COMPLETE_SRC_JS,
            'src/styles' => SRC_CSS,
            'src/php' => PHP_LIB_SRC
       }.merge(PHP_CONTENT),
       :prerequisites => [
           "php:assets"
       ]

BUNDLES = [
    'aspnetmvc.commercial',
    'aspnetmvc.hotfix.commercial',
    'aspnetmvc.hotfix.trial',
    'aspnetmvc.trial',
    'cdn.commercial',
    'complete.commercial',
    'complete.trial',
    'dataviz.commercial',
    'jsp.commercial',
    'jsp.trial',
    'mobile.commercial',
    'php.commercial',
    'php.trial',
    'web.commercial',
    'web.open-source',
    'winjs.commercial',
    'icenium'
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

        zip_download_builder = "#{ARCHIVE_ROOT}/#{destination}/download-builder.zip"
        file_copy :to => zip_download_builder,
                  :from => "dist/download-builder.zip"
        zip_bundles.push(zip_download_builder)

        tree :to => "#{ARCHIVE_ROOT}/WinJS/#{destination}",
             :from => FileList[WIN_JS_RESOURCES].pathmap('dist/bundles/winjs.commercial/%f'),
             :root => 'dist/bundles/winjs.commercial/'

        zip_bundles.push("#{ARCHIVE_ROOT}/WinJS/#{destination}")

        tree :to => "#{ARCHIVE_ROOT}/Icenium/#{destination}/js",
             :from => FileList[ICENIUM_MIN_JS].pathmap('dist/bundles/icenium/js/%f'),
             :root => 'dist/bundles/icenium/js'

        zip_bundles.push("#{ARCHIVE_ROOT}/Icenium/#{destination}/js")

        tree :to => "#{ARCHIVE_ROOT}/Icenium/#{destination}/styles",
             :from => FileList[ICENIUM_MIN_CSS].pathmap('dist/bundles/icenium/styles/%f'),
             :root => 'dist/bundles/icenium/styles'

        zip_bundles.push("#{ARCHIVE_ROOT}/Icenium/#{destination}/styles")

        clean_task = "#{ARCHIVE_ROOT}/#{destination}"

        task clean_task do
            sh "find #{ARCHIVE_ROOT}/#{destination}/* -mtime +2 -exec rm {} \\;"
        end

        zip_bundles.push(clean_task)

        zip_bundles
    end

    def publish_binaries(destination)
        sh "if exist L: ( net use L: /delete /yes )"
        sh "net use L: #{ARCHIVE_ROOT} /user:telerik.com\\TeamFoundationUser voyant69"

        target_dir = "L:\\#{destination}\\binaries\\"

        sh "if not exist #{target_dir} ( mkdir #{target_dir} )"
        sh "xcopy dist\\binaries\\* #{target_dir} /E /Y"
    end

    namespace :production do
        desc 'Run tests and VSDoc'
        task :tests => ["tests:Production", "vsdoc:production:test"]

        desc 'Update the /production build machine web site'
        task :demos => [ 'demos:staging', 'download_builder:staging' ] do
            sh "rsync -avc dist/demos/staging/ #{WEB_ROOT}/production/"
        end

        desc 'Build and publish ASP.NET MVC DLLs'
        task :aspnetmvc_binaries => [ "mvc:binaries" ] do
            publish_binaries "Production"
        end

        desc 'Copy ASP.NET MVC DLLs from distribution archive'
        task :get_binaries do
            sh "rsync -avc --del #{ARCHIVE_ROOT}/Production/binaries/* dist/binaries/"
        end

        changelog = "#{WEB_ROOT}/changelog/index.html"
        write_changelog changelog, %w(web mobile dataviz framework aspnetmvc)

        desc 'Package and publish bundles to the Production directory, and update the changelog'
        task :bundles => [:get_binaries, 'bundles:all', 'demos:production', 'download_builder:bundle', zip_targets("Production"), changelog].flatten
    end

    namespace :master do
        desc 'Runs test suite over the master branch'
        task :tests => ["tests:CI", "vsdoc:master:test", "intellisense:master:test", "type_script:master:test"]

        desc 'Update the /staging build machine web site'
        task :demos => [
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
            sh "rsync -avc --del dist/demos/staging-mvc/ /mnt/kendo-iis/staging-mvc/"
        end

        desc 'Build and publish ASP.NET MVC DLLs'
        task :aspnetmvc_binaries => [ "mvc:binaries" ] do
            publish_binaries "Stable"
        end

        desc 'Copy ASP.NET MVC DLLs from distribution archive'
        task :get_binaries do
            sh "rsync -avc --del #{ARCHIVE_ROOT}/Stable/binaries/* dist/binaries/"
        end

        desc 'Package and publish bundles to the Stable directory'
        task :bundles => [:get_binaries, 'bundles:all', 'demos:production', 'download_builder:bundle', zip_targets("Stable")].flatten
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
