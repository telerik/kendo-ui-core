require 'rake/clean'

$LOAD_PATH << File.join(File.dirname(__FILE__), "build")
require 'version'
require 'js'
require 'css'
require 'tasks'
require 'mvc'

ROOT_MAP = {
    'js' => 'src/',
    'styles' => /styles\/.+?\//,
    'src/js' => 'src/',
    'src/styles' => /styles\/.+?\//,
    'wrappers/aspnetmvc/Binaries/Mvc3' => 'wrappers/mvc/src/Kendo.Mvc/bin/Release/'
}

# Rake tasks
desc('JavaScript')
multitask :js => MIN_JS

desc('Less')
multitask :less => MIN_CSS

desc('Build all Kendo UI distributions')
task :default => [:bundles]

desc('Clean bundle files')
task :bundle_clean do
    rm_rf 'dist/bundles'
end

desc 'Build ASP.NET MVC wrappers'
task :build_mvc => 'wrappers/mvc/demos/Kendo.Mvc.Examples/bin/Kendo.Mvc.Examples.dll'

bundle :name => 'complete',
       :license => 'src-license-complete',
       :contents => {
            'js' => MIN_JS,
            'styles' => MIN_CSS_RESOURCES,
            'src/js' => SRC_JS,
            'src/styles' => SRC_CSS
       }

bundle :name => 'trial',
       :license => 'src-license-complete',
       :contents => {
            'js' => MIN_JS,
            'styles' => MIN_CSS_RESOURCES,
            'wrappers/aspnetmvc/Binaries/Mvc3' => MVC_DLL
       }

bundle :name => 'web',
       :license => 'src-license-web',
       :contents => {
            'js' => FileList[WEB_JS].include('src/kendo.web.js').ext('min.js'),
            'styles' => MIN_CSS_RESOURCES.keep_if { |f| f =~ /styles\/web\// },
            'src/js' => SRC_JS,
            'src/styles' => SRC_CSS
       }

desc 'Build all bundles'
multitask :bundles => [:trial, :complete, :web]
