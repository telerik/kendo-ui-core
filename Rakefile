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

ROOT_MAP = {
    'js' => 'src/',
    'styles' => /styles\/.+?\//,
    'src/js' => 'src/',
    'src/styles' => /styles\/.+?\//,
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
       :contents => {
            'js' => COMPLETE_MIN_JS,
            'styles' => MIN_CSS_RESOURCES,
            'src/js' => COMPLETE_SRC_JS,
            'src/styles' => SRC_CSS
       }

bundle :name => 'trial',
       :license => 'src-license-complete',
       :eula => "trial",
       :contents => {
            'js' => TRIAL_MIN_JS,
            'styles' => MIN_CSS_RESOURCES,
            'wrappers/aspnetmvc/Binaries/Mvc3' => MVC_DLL,
            'wrappers/aspnetmvc/Examples/bin' => MVC_DLL,
            'wrappers/aspnetmvc/Examples' => MVC_DEMOS
       }

bundle :name => 'web.commercial',
       :license => 'src-license-web',
       :eula => "web",
       :contents => {
            'js' => WEB_MIN_JS,
            'styles' => WEB_MIN_CSS,
            'src/js' => WEB_SRC_JS,
            'src/styles' => WEB_SRC_CSS
       }

bundle :name => 'web.open-source',
       :license => 'src-license-web',
       :contents => {
            'js' => WEB_MIN_JS,
            'styles' => WEB_MIN_CSS,
            'src/js' => WEB_SRC_JS,
            'src/styles' => WEB_SRC_CSS
       }

bundle :name => 'mobile.commercial',
       :license => 'src-license-mobile',
       :contents => {
            'js' => MOBILE_MIN_JS,
            'styles' => MOBILE_MIN_CSS,
            'src/js' => MOBILE_SRC_JS,
            'src/styles' => MOBILE_SRC_CSS
       }

bundle :name => 'dataviz.commercial',
       :license => 'src-license-dataviz',
       :contents => {
            'js' => DATAVIZ_MIN_JS,
            'styles' => DATAVIZ_MIN_CSS,
            'src/js' => DATAVIZ_SRC_JS,
            'src/styles' => DATAVIZ_SRC_CSS
       }

namespace :bundles do
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
        'dataviz.commercial'
    ]
end

desc 'Build all bundles'
task :bundles =>  "bundles:all"

task :default => :bundles
