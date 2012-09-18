require 'rake/clean'

$LOAD_PATH << File.join(File.dirname(__FILE__), "build")
require 'js'
require 'css'

VERSION = "2013"

# The clean target will remove the dist directory
CLEAN.include('dist')

# Required directories
directory 'dist/src/js/cultures'
directory 'dist/src/styles'
directory 'dist/js/cultures'
directory 'dist/styles'

# Rake tasks
desc('JavaScript')
task :js => ['dist/js/cultures', 'dist/src/js/cultures', :min_js]

multitask :min_js => MIN_JS

desc('Less')
task :less => ['dist/styles', 'dist/src/styles', :min_css]

multitask :min_css => MIN_CSS

desc('Build all Kendo UI distributions')
task :default => [:bundles]

desc('Clean bundle files')
task :bundle_clean do
    rm_rf 'dist/bundles'
end

MVC_SRC = FileList['wrappers/mvc/src/**/*.cs']
            .include('wrappers/mvc/src/**/*.resx')
            .include('wrappers/mvc/src/**/*.csproj')
            .include('wrappers/mvc/src/**/*.snk')
            .include('wrappers/mvc/src/**/*.dll')

MVC_DLL = FileList['wrappers/mvc/src/Kendo.Mvc/Resources/Messages.*.resx']
            .include('Kendo.Mvc.dll')
            .pathmap('dist/wrappers/mvc/src/Kendo.Mvc/bin/Release/%f')
            .sub(/Messages\.(.+).resx/, '\1/Kendo.Mvc.resources.dll')

rule '.resources.dll' => 'dist/wrappers/mvc/src/Kendo.Mvc/bin/Release/Kendo.Mvc.dll'

MVC_DEMOS_SRC = FileList['wrappers/mvc/demos/**/*']
                .exclude('**/Kendo.Mvc.Examples.dll')
                .exclude('**/Kendo*.txt')
                .reject { |f| File.directory? f }

tree :to => 'dist/wrappers/mvc',
     :from => FileList['wrappers/mvc/**/*'],
     :root => 'wrappers/mvc/'

# Build ASP.NET MVC wrappers

file 'dist/wrappers/mvc/src/Kendo.Mvc/bin/Release/Kendo.Mvc.dll' =>
    MVC_SRC.sub('wrappers/', 'dist/wrappers/') do |t|
    msbuild 'dist/wrappers/mvc/src/Kendo.Mvc/Kendo.Mvc.csproj'
end

# Build ASP.NET MVC demos

file 'dist/wrappers/mvc/demos/Kendo.Mvc.Examples/bin/Kendo.Mvc.Examples.dll' =>
    MVC_DEMOS_SRC.sub('wrappers/', 'dist/wrappers/')
    .include('dist/wrappers/mvc/src/Kendo.Mvc/bin/Release/Kendo.Mvc.dll') do
    msbuild 'dist/wrappers/mvc/demos/Kendo.Mvc.Examples/Kendo.Mvc.Examples.csproj'
end

desc 'Build ASP.NET MVC wrappers'
task :build_mvc => [
    'dist/wrappers/mvc/demos/Kendo.Mvc.Examples/bin/Kendo.Mvc.Examples.dll'
]

=begin
# Kendo UI Complete Commercial
tree :to => 'dist/bundles/complete',
     :from => ['dist/js/**/*.*', 'dist/styles/**/*.*', 'dist/src/**/*.*'],
     :root => 'dist/',
     :license => 'dist/bundles/complete.license'

file_license 'dist/bundles/complete.license' => 'resources/legal/official/src-license-complete.txt'

desc('Build Kendo UI Complete Commercial')
task :complete => [:js,:less, 'dist/bundles/complete']

=end
# Kendo UI Trial

tree :to => 'dist/bundles/trial',
     :from => [MIN_JS, MIN_CSS],
     :root => 'dist/'

tree :to => 'dist/bundles/trial/wrappers/aspnetmvc/Binaries/Mvc3',
     :from => MVC_DLL,
     :root => 'dist/wrappers/mvc/src/Kendo.Mvc/bin/Release/'

file_license 'dist/bundles/trial.license' => 'resources/legal/official/src-license-complete.txt'

desc('Build Kendo UI Trial')
task :trial => [:js, :less,
    'dist/bundles/trial',
    'dist/bundles/trial/wrappers/aspnetmvc/Binaries/Mvc3'
]

=begin
# Kendo UI Web Open src
tree :to => 'dist/bundles/web.open-source',
     :from => FileList['dist/js/**/*.*']
            .include('dist/styles/**/*.*')
            .include('dist/src/**/*.*')
            .exclude('**/*mobile*')
            .exclude('**/*dataviz*'),
     :root => 'dist/',
     :license => 'dist/bundles/web.license'

file_license 'dist/bundles/web.license' => 'resources/legal/official/src-license-web.txt'

desc('Build Kendo UI Web Open src')
task :web_gpl => [:js,:less, 'dist/bundles/web.open-source']
=end

desc 'Build all bundles'
multitask :bundles => [:trial]
