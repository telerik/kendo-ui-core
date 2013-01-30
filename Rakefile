require 'rake/clean'
require 'rake/testtask'

require 'bundler/setup'
require 'tempfile'
require 'uri'

VERBOSE = verbose == true

$LOAD_PATH << File.join(File.dirname(__FILE__), "build")
$LOAD_PATH << File.join(File.dirname(__FILE__), "build", "codegen", "lib")

CDN_ROOT = 'http://cdn.kendostatic.com/'
KENDO_ORIGIN_HOST = 'kendoorigin'
STAGING_CDN_ROOT = 'http://origin.kendostatic.com/staging/'

require 'version'
require 'zip'
require 'js'
require 'css'
require 'tasks'
require 'mvc'
require 'java'
require 'php'
require 'vsdoc'
require 'type_script'
require 'changelog'
require 'bundle'
require 'theme_builder'
require 'demos'
require 'download_builder'
require 'cdn'
require 'tests'
require 'codegen'

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
    'src/kendo-taglib/src' => 'wrappers/java/kendo-taglib/src/',
    'wrappers/jsp/spring-demos/src' => 'wrappers/java/spring-demos/src/'
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

task :npm do
    dir = Rake.application.original_dir
    sh "cd #{dir} && npm install", :verbose => VERBOSE
end

# Rake tasks
desc('JavaScript')
task :js => [:npm, MIN_JS, JS_BUNDLES, KENDO_CONFIG_FILE].flatten

desc('Less')
multitask :less => [:npm, MIN_CSS].flatten

desc('Build all Kendo UI distributions')
task :default => [:bundles]

bundle :name => 'complete.commercial',
       :license => 'src-license-complete',
       :eula => "complete",
       :readme => "README.KendoUI.Complete",
       :vsdoc => { %w(web mobile dataviz framework) => "all" },
       :type_script => { %w(web mobile dataviz framework) => "all" },
       :changelog => %w(web mobile dataviz framework),
       :demos => %w(web dataviz mobile),
       :contents => {
            'js' => COMPLETE_MIN_JS,
            'styles' => MIN_CSS_RESOURCES,
            'src/js' => COMPLETE_SRC_JS,
            'src/styles' => SRC_CSS
       }

bundle :name => 'trial.hotfix',
       :license => 'src-license-complete',
       :eula => 'trial',
       :vsdoc => { %w(web mobile dataviz framework) => "all" },
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
#           "dist/bundles/trial/wrappers/jsp/spring-demos/src/main/webapp/WEB-INF/lib/#{JAR_NAME}",
#           'dist/bundles/trial/wrappers/jsp/spring-demos/pom.xml',
           'mvc:assets'
       ]

bundle :name => 'trial',
       :license => 'src-license-complete',
       :eula => 'trial',
       :readme => 'README.KendoUI.Trial',
       :vsdoc => { %w(web mobile dataviz framework) => 'all' },
       :type_script => { %w(web mobile dataviz framework) => 'all' },
       :changelog => %w(web mobile dataviz framework aspnetmvc),
       :demos => %w(web dataviz mobile),
       :contents => {
            'js' => TRIAL_MIN_JS,
            'styles' => MIN_CSS_RESOURCES,
       }.merge(MVC_CONTENT), #.merge(JSP_CONTENT), uncomment when jsp goes official
       :prerequisites => [
#           "dist/bundles/trial/wrappers/jsp/spring-demos/src/main/webapp/WEB-INF/lib/#{JAR_NAME}",
#           'dist/bundles/trial/wrappers/jsp/spring-demos/pom.xml',
           'mvc:assets',
           'dist/bundles/trial/wrappers/aspnetmvc/Examples/Kendo.Mvc.Examples.csproj'
       ]

bundle :name => 'web.commercial',
       :license => 'src-license-web',
       :eula => 'web',
       :vsdoc => { %w(web framework) => "web" },
       :type_script => { %w(web framework) => "web" },
       :changelog => %w(web framework),
       :demos => %w(web),
       :contents => {
            'js' => WEB_MIN_JS,
            'styles' => WEB_MIN_CSS,
            'src/js' => WEB_SRC_JS,
            'src/styles' => WEB_SRC_CSS
       }

bundle :name => 'web.open-source',
       :license => 'src-license-web',
       :vsdoc => { %w(web framework) => 'web' },
       :type_script => { %w(web framework) => 'web' },
       :changelog => %w(web framework),
       :demos => %w(web),
       :contents => {
            'js' => WEB_MIN_JS,
            'styles' => WEB_MIN_CSS,
            'src/js' => WEB_SRC_JS,
            'src/styles' => WEB_SRC_CSS
       }

bundle :name => 'mobile.commercial',
       :license => 'src-license-mobile',
       :vsdoc => { %w(mobile framework) => 'mobile' },
       :type_script => { %w(mobile framework) => 'mobile' },
       :changelog => %w(mobile framework),
       :demos => %w(mobile),
       :eula => 'mobile',
       :contents => {
            'js' => MOBILE_MIN_JS,
            'styles' => MOBILE_MIN_CSS,
            'src/js' => MOBILE_SRC_JS,
            'src/styles' => MOBILE_SRC_CSS
       }

bundle :name => 'dataviz.commercial',
       :license => 'src-license-dataviz',
       :vsdoc => { %w(dataviz framework) => "dataviz" },
       :type_script => { %w(dataviz framework) => "dataviz" },
       :changelog => %w(dataviz framework),
       :eula => 'dataviz',
       :demos => %w(dataviz),
       :contents => {
            'js' => DATAVIZ_MIN_JS,
            'styles' => DATAVIZ_MIN_CSS,
            'src/js' => DATAVIZ_SRC_JS,
            'src/styles' => DATAVIZ_SRC_CSS
       }


bundle :name => 'aspnetmvc.commercial',
       :license => 'src-license-complete',
       :eula => 'aspnetmvc',
       :vsdoc => { %w(web mobile dataviz framework) => "all" },
       :type_script => { %w(web mobile dataviz framework) => "all" },
       :changelog => %w(web mobile dataviz framework aspnetmvc),
       :contents => {
            'js' => MVC_MIN_JS,
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
       :vsdoc => { %w(web mobile dataviz framework) => "all" },
       :type_script => { %w(web mobile dataviz framework) => "all" },
       :changelog => %w(web mobile dataviz framework aspnetmvc),
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
       :contents => {
           'js' => COMPLETE_MIN_JS + MVC_MIN_JS,
           'styles' => MIN_CSS_RESOURCES,
           'styles/telerik' => FileList['wrappers/mvc/legacy-themes/**/*'].include(LEGACY_MIN_CSS)
       }

WIN_JS_RESOURCES = WIN_MIN_JS + WIN_SRC_JS + WIN_SRC_CSS + WIN_MIN_CSS

bundle :name => 'winjs.commercial',
       :contents => {
            '.' => WIN_JS_RESOURCES
       }

bundle :name => 'jsp.beta',
       :license => 'src-license-complete',
       :eula => 'jsp',
       :changelog => %w(web mobile dataviz framework jsp),
       :beta => true,
       :contents => {
            'js' => MVC_MIN_JS,
            'styles' => MIN_CSS_RESOURCES,
# not required for the beta
#            'src/js' => COMPLETE_SRC_JS,
#            'src/styles' => SRC_CSS,
#            'src/kendo-taglib/src' => JSP_TAGLIB_SRC
       }.merge(JSP_CONTENT),
       :prerequisites => [
           "java:assets",
           "dist/bundles/#{JSP_BUNDLE}/wrappers/jsp/spring-demos/src/main/webapp/WEB-INF/lib/#{JAR_NAME}",
           "dist/bundles/#{JSP_BUNDLE}/wrappers/jsp/spring-demos/pom.xml",
           #"dist/bundles/#{JSP_BUNDLE}/src/kendo-taglib/pom.xml"
       ]

BUNDLES = [
    'trial',
    'complete.commercial',
    'web.commercial',
    'web.open-source',
    'mobile.commercial',
    'dataviz.commercial',
    'aspnetmvc.commercial',
    'jsp.beta',
    'aspnetmvc.hotfix.commercial',
    'trial.hotfix',
    'winjs.commercial',
    'cdn.commercial'
]

namespace :build do
    WEB_ROOT = "/var/www"
    ARCHIVE_ROOT = "/kendo-builds"

    def zip_targets(destination)
        zip_bundles = []

        BUNDLES.each do |bundle|
            latest_zip_filename = "#{ARCHIVE_ROOT}/#{destination}/#{('kendoui.' + bundle).sub(/\.[^\.]+$/, ".latest\\0.zip")}"

            file_copy :to => latest_zip_filename,
                      :from => "dist/bundles/#{bundle}.zip"

            zip_bundles.push(latest_zip_filename)

            versioned_zip_filename = "#{ARCHIVE_ROOT}/#{destination}/#{('kendoui.' + bundle).sub(/\.[^\.]+$/, ".#{VERSION}\\0.zip")}"

            file_copy :to => versioned_zip_filename,
                      :from => "dist/bundles/#{bundle}.zip"

            zip_bundles.push(versioned_zip_filename)
        end

        zip_demos = "#{ARCHIVE_ROOT}/#{destination}/online-examples.zip"

        file_copy :to => zip_demos,
                  :from => "dist/demos/production.zip"

        zip_bundles.push(zip_demos)

        tree :to => "/kendo-builds/WinJS/#{destination}",
             :from => FileList[WIN_JS_RESOURCES].pathmap('dist/bundles/winjs.commercial/%f'),
             :root => 'dist/bundles/winjs.commercial/'

        zip_bundles.push("#{ARCHIVE_ROOT}/WinJS/#{destination}")

        clean_task = "#{ARCHIVE_ROOT}/#{destination}"

        task clean_task do
            sh "find #{ARCHIVE_ROOT}/#{destination}/* -mtime +2 -exec rm {} \\;"
        end

        zip_bundles.push(clean_task)

        zip_bundles
    end

    namespace :production do
        desc 'Run tests and VSDoc'
        task :tests => ["tests:Production", "vsdoc:production:test"]

        desc 'Update the /production build machine web site'
        task :demos => [ 'demos:staging', 'download_builder:staging' ] do
            sh "rsync -avc dist/demos/staging/ #{WEB_ROOT}/production/"
        end

        changelog = "#{WEB_ROOT}/changelog/index.html"
        write_changelog changelog, %w(web mobile dataviz framework aspnetmvc)

        desc 'Package and publish bundles to the Production directory, and update the changelog'
        task :bundles => ['bundles:all', 'demos:production',  zip_targets("Production"), changelog].flatten
    end

    namespace :master do
        desc 'Runs test suite over the master branch'
        task :tests => ["tests:CI", "vsdoc:master:test", "type_script:master:test"]

        desc 'Update the /staging build machine web site'
        task :demos => [ 'demos:staging', 'download_builder:staging' ] do
            sh "rsync -avc dist/demos/staging/ #{WEB_ROOT}/staging/"
            sh "rsync -avc dist/download-builder-staging/ #{WEB_ROOT}/download-builder-staging/"
        end

        desc 'Package and publish bundles to the Stable directory'
        task :bundles => ['bundles:all', 'demos:production', zip_targets("Stable")].flatten
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
