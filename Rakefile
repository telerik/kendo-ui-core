require 'rake/clean'

require 'bundler/setup'
require 'debugger'

$LOAD_PATH << File.join(File.dirname(__FILE__), "build")
require 'version'
require 'archive'
require 'js'
require 'css'
require 'tasks'
require 'mvc'
require 'vsdoc'

ROOT_MAP = {
    'js' => 'src/',
    'styles' => /styles\/.+?\//,
    'src/js' => 'src/',
    'src/styles' => /styles\/.+?\//,
    'src/Kendo.Mvc' => 'wrappers/mvc/src/Kendo.Mvc/',
    'wrappers/aspnetmvc/LegacyThemes' => 'wrappers/mvc/legacy-themes/',
    'wrappers/aspnetmvc/EditorTemplates/ascx' => 'wrappers/mvc/demos/Kendo.Mvc.Examples/Views/Shared/EditorTemplates/',
    'wrappers/aspnetmvc/EditorTemplates/razor' => 'wrappers/mvc/demos/Kendo.Mvc.Examples/Views/Shared/EditorTemplates/',
    'wrappers/aspnetmvc/Binaries/Mvc3' => 'wrappers/mvc/src/Kendo.Mvc/bin/Release/',
    'wrappers/aspnetmvc/Examples' => 'wrappers/mvc/demos/Kendo.Mvc.Examples/',
    'wrappers/aspnetmvc/Examples/bin' => 'wrappers/mvc/src/Kendo.Mvc/bin/Release/'
}

# Rake tasks
desc('JavaScript')
multitask :js => MIN_JS

desc('Less')
multitask :less => MIN_CSS

desc('Build all Kendo UI distributions')
task :default => [:bundles]


desc 'Build ASP.NET MVC wrappers'
task :build_mvc => 'wrappers/mvc/demos/Kendo.Mvc.Examples/bin/Kendo.Mvc.Examples.dll'

bundle :name => 'complete.commercial',
       :license => 'src-license-complete',
       :eula => "complete",
       :readme => "README.KendoUI.Complete",
       :vsdoc => { %w(web mobile dataviz framework) => "all" },
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
       :contents => {
            'js' => TRIAL_MIN_JS,
            'styles' => MIN_CSS_RESOURCES,
            'wrappers/aspnetmvc/Binaries/Mvc3' => MVC_DLL,
            'wrappers/aspnetmvc/Examples/bin' => MVC_DLL,
            'wrappers/aspnetmvc/Examples' => MVC_DEMOS,
            'wrappers/aspnetmvc/EditorTemplates/ascx' => MVC_ASCX_EDITOR_TEMPLATES,
            'wrappers/aspnetmvc/EditorTemplates/razor' => MVC_RAZOR_EDITOR_TEMPLATES,
            'wrappers/aspnetmvc/LegacyThemes' => FileList['wrappers/mvc/legacy-themes/**/*'],
       }

bundle :name => 'web.commercial',
       :license => 'src-license-web',
       :eula => "web",
       :vsdoc => { %w(web framework) => "web" },
       :contents => {
            'js' => WEB_MIN_JS,
            'styles' => WEB_MIN_CSS,
            'src/js' => WEB_SRC_JS,
            'src/styles' => WEB_SRC_CSS
       }

bundle :name => 'web.open-source',
       :license => 'src-license-web',
       :vsdoc => { %w(web framework) => "web" },
       :contents => {
            'js' => WEB_MIN_JS,
            'styles' => WEB_MIN_CSS,
            'src/js' => WEB_SRC_JS,
            'src/styles' => WEB_SRC_CSS
       }

bundle :name => 'mobile.commercial',
       :license => 'src-license-mobile',
       :vsdoc => { %w(mobile framework) => "dataviz" },
       :contents => {
            'js' => MOBILE_MIN_JS,
            'styles' => MOBILE_MIN_CSS,
            'src/js' => MOBILE_SRC_JS,
            'src/styles' => MOBILE_SRC_CSS
       }

bundle :name => 'dataviz.commercial',
       :license => 'src-license-dataviz',
       :vsdoc => { %w(dataviz framework) => "dataviz" },
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
       :contents => {
            'js' => TRIAL_MIN_JS,
            'styles' => MIN_CSS_RESOURCES,
            'wrappers/aspnetmvc/Binaries/Mvc3' => MVC_DLL,
            'wrappers/aspnetmvc/Examples/bin' => MVC_DLL,
            'wrappers/aspnetmvc/Examples' => MVC_DEMOS,
            'wrappers/aspnetmvc/EditorTemplates/ascx' => MVC_ASCX_EDITOR_TEMPLATES,
            'wrappers/aspnetmvc/EditorTemplates/razor' => MVC_RAZOR_EDITOR_TEMPLATES,
            'wrappers/aspnetmvc/LegacyThemes' => FileList['wrappers/mvc/legacy-themes/**/*'],
            'src/js' => COMPLETE_SRC_JS,
            'src/styles' => SRC_CSS,
            'src/Kendo.Mvc' => FileList['wrappers/mvc/src/Kendo.Mvc/**/*'].exclude('**/bin/**/*').exclude('**/obj/**/*').exclude('**/*.csproj'),
       },
       :prerequisites => [
           'dist/bundles/aspnetmvc.commercial/src/Kendo.Mvc/Kendo.snk',
           'dist/bundles/aspnetmvc.commercial/src/Kendo.Mvc/Kendo.Mvc.csproj',
           'dist/bundles/aspnetmvc.commercial/wrappers/aspnetmvc/Examples/Kendo.Mvc.Examples.csproj',
           'dist/bundles/aspnetmvc.commercial/src/Kendo.Mvc/CommonAssemblyInfo.cs'
       ]


namespace :bundles do
    CLEAN.include('dist/bundles')

    desc('Clean bundle files')

    task :clean do
        rm_rf 'dist/bundles'
    end

    multitask :all => [
        'trial',
        'complete.commercial',
        'web.commercial',
        'web.open-source',
        'mobile.commercial',
        'dataviz.commercial',
        'aspnetmvc.commercial'
    ]
end

desc 'Build all bundles'
task :bundles =>  "bundles:all"

task :default => :bundles
