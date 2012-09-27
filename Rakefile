require 'rake/clean'

require 'bundler/setup'
require 'debugger'
require 'tempfile'

VERBOSE = verbose == true

$LOAD_PATH << File.join(File.dirname(__FILE__), "build")

CDN_ROOT = 'http://cdn.kendostatic.com/'

require 'version'
require 'zip'
require 'js'
require 'css'
require 'tasks'
require 'mvc'
require 'java'
require 'vsdoc'
require 'changelog'
require 'bundle'
require 'theme_builder'
require 'demos'
require 'download_builder'
require 'cdn'
require 'tests'

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
    'wrappers/aspnetmvc/Examples/bin' => 'wrappers/mvc/src/Kendo.Mvc/bin/Release/'
}

MVC_CONTENT = {
    'wrappers/aspnetmvc/Binaries/Mvc3' => MVC_DLL,
    'wrappers/aspnetmvc/Examples/bin' => MVC_DLL,
    'wrappers/aspnetmvc/Examples' => MVC_DEMOS,
    'wrappers/aspnetmvc/Examples/Content/shared' => FileList['demos/mvc/content/shared/*'],
    'wrappers/aspnetmvc/EditorTemplates/ascx' => MVC_ASCX_EDITOR_TEMPLATES,
    'wrappers/aspnetmvc/EditorTemplates/razor' => MVC_RAZOR_EDITOR_TEMPLATES,
    'wrappers/aspnetmvc/LegacyThemes' => FileList['wrappers/mvc/legacy-themes/**/*']
}

# Rake tasks
desc('JavaScript')
multitask :js => MIN_JS

desc('Less')
multitask :less => MIN_CSS

desc('Build all Kendo UI distributions')
task :default => [:bundles]

bundle :name => 'complete.commercial',
       :license => 'src-license-complete',
       :eula => "complete",
       :readme => "README.KendoUI.Complete",
       :vsdoc => { %w(web mobile dataviz framework) => "all" },
       :changelog => %w(web mobile dataviz framework),
       :demos => %w(web dataviz mobile),
       :contents => {
            'js' => COMPLETE_MIN_JS,
            'styles' => MIN_CSS_RESOURCES,
            'src/js' => COMPLETE_SRC_JS,
            'src/styles' => SRC_CSS
       }

bundle :name => 'trial',
       :license => 'src-license-complete',
       :eula => "trial",
       :readme => "README.KendoUI.Trial",
       :vsdoc => { %w(web mobile dataviz framework) => "all" },
       :changelog => %w(web mobile dataviz framework aspnetmvc),
       :demos => %w(web dataviz mobile),
       :contents => {
            'js' => TRIAL_MIN_JS,
            'styles' => MIN_CSS_RESOURCES
       }.merge(MVC_CONTENT),
       :prerequisites => [
           'mvc:assets',
           'dist/bundles/trial/wrappers/aspnetmvc/Examples/Kendo.Mvc.Examples.csproj'
       ]

bundle :name => 'web.commercial',
       :license => 'src-license-web',
       :eula => "web",
       :vsdoc => { %w(web framework) => "web" },
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
       :vsdoc => { %w(web framework) => "web" },
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
       :vsdoc => { %w(mobile framework) => "mobile" },
       :changelog => %w(mobile framework),
       :demos => %w(mobile),
       :contents => {
            'js' => MOBILE_MIN_JS,
            'styles' => MOBILE_MIN_CSS,
            'src/js' => MOBILE_SRC_JS,
            'src/styles' => MOBILE_SRC_CSS
       }

bundle :name => 'dataviz.commercial',
       :license => 'src-license-dataviz',
       :vsdoc => { %w(dataviz framework) => "dataviz" },
       :changelog => %w(dataviz framework),
       :demos => %w(dataviz),
       :contents => {
            'js' => DATAVIZ_MIN_JS,
            'styles' => DATAVIZ_MIN_CSS,
            'src/js' => DATAVIZ_SRC_JS,
            'src/styles' => DATAVIZ_SRC_CSS
       }


bundle :name => 'aspnetmvc.commercial',
       :license => 'src-license-complete',
       :eula => "aspnetmvc",
       :vsdoc => { %w(web mobile dataviz framework) => "all" },
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
       :eula => "aspnetmvc",
       :vsdoc => { %w(web mobile dataviz framework) => "all" },
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
           'styles/telerik' => FileList['wrappers/mvc/legacy-themes/**/*']
       }

WIN_JS_RESOURCES = WIN_MIN_JS + WIN_SRC_JS + WIN_SRC_CSS + WIN_MIN_CSS

bundle :name => 'winjs.commercial',
       :contents => {
            '.' => WIN_JS_RESOURCES
       }

BUNDLES = [
    'trial',
    'complete.commercial',
    'web.commercial',
    'web.open-source',
    'mobile.commercial',
    'dataviz.commercial',
    'aspnetmvc.commercial',
    'aspnetmvc.hotfix.commercial',
    'winjs.commercial',
    'cdn.commercial'
]

namespace :build do
    WEB_ROOT = "/var/www"
    ARCHIVE_ROOT = "/kendo-builds"

    def zip_targets(destination)
        zip_bundles = []

        BUNDLES.each do |bundle|
            zip_filename = ('kendoui.' + bundle).sub(/\.[^\.]+$/, ".#{VERSION}\\0.zip")
            zip_filename = "#{ARCHIVE_ROOT}/#{destination}/#{zip_filename}"

            file_copy :to => zip_filename,
                      :from => "dist/bundles/#{bundle}.zip"

            zip_bundles.push(zip_filename)
        end

        zip_demos = "#{ARCHIVE_ROOT}/#{destination}/production.zip"

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

    desc('Runs a build over the stable branch')
    task :stable => [:bundles, 'demos:production', 'demos:staging', 'download_builder:staging', zip_targets("Stable")].flatten do
        sh "rsync -avc dist/demos/staging/ #{WEB_ROOT}/staging/"
        sh "rsync -avc dist/download-builder-staging/ #{WEB_ROOT}/download-builder-staging/"
    end

    write_changelog "#{WEB_ROOT}/changelog/index.html", %w(web mobile dataviz framework aspnetmvc)

    desc('Runs a build over the production branch')
    task "production" => ["tests:Production", "vsdoc:production:test", :bundles, 'demos:production', 'demos:staging', 'download_builder:staging', zip_targets("Production"), "#{WEB_ROOT}/changelog/index.html"].flatten do
        sh "rsync -avc dist/demos/staging/ #{WEB_ROOT}/production/"
    end

    desc('Runs test suite over the master branch')
    task "ci" => ["tests:CI", "vsdoc:master:test"]
end

namespace :bundles do
    CLEAN.include('dist/bundles')

    desc('Clean bundle files')

    task :clean do
        rm_rf 'dist/bundles'
    end

    task :all => BUNDLES
end

desc 'Build all bundles'
task :bundles =>  "bundles:all"

task :default => :bundles
