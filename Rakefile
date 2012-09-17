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

# Build ASP.NET MVC wrappers
tree :to => 'dist/wrappers/mvc',
     :from => FileList['wrappers/mvc/**/*.*'].exclude('**/Kendo*.dll'),
     :depth => 2

file 'dist/wrappers/mvc/src/Kendo.Mvc/bin/Release/Kendo.Mvc.dll' =>
    FileList['dist/wrappers/mvc/src/**/*.cs']
        .include('dist/wrappers/mvc/src/**/*.resx') do
    msbuild 'dist/wrappers/mvc/src/Kendo.Mvc/Kendo.Mvc.csproj'
end

file 'dist/wrappers/mvc/demos/Kendo.Mvc.Examples/bin/Kendo.Mvc.Examples.dll' =>
    FileList['dist/wrappers/mvc/demos/**/*.cs'] do
    msbuild 'dist/wrappers/mvc/demos/Kendo.Mvc.Examples/Kendo.Mvc.Examples.csproj'
end

desc 'Build ASP.NET MVC wrappers'
task :build_mvc => ['dist/wrappers/mvc',
    'dist/wrappers/mvc/src/Kendo.Mvc/bin/Release/Kendo.Mvc.dll',
    'dist/wrappers/mvc/demos/Kendo.Mvc.Examples/bin/Kendo.Mvc.Examples.dll'
]

# Kendo UI Complete Commercial
tree :to => 'dist/bundles/complete',
     :from => ['dist/js/**/*.*', 'dist/styles/**/*.*', 'dist/src/**/*.*'],
     :license => 'dist/bundles/complete.license'

file_license 'dist/bundles/complete.license' => 'resources/legal/official/src-license-complete.txt'

desc('Build Kendo UI Complete Commercial')
task :complete => [:js,:less, 'dist/bundles/complete']

# Kendo UI Complete Trial

tree :to => 'dist/bundles/complete.trial',
     :from => ['dist/js/**/*.*', 'dist/styles/**/*.*', 'dist/src/**/*.*', 'dist/wrappers/**/*.*'],
     :license => 'dist/bundles/complete.trial.license'

file_license 'dist/bundles/complete.trial.license' => 'resources/legal/official/src-license-complete.txt'

desc('Build Kendo UI Trial')
task :trial => [:js, :less, :build_mvc, 'dist/bundles/complete.trial']

# Kendo UI Web Open src
tree :to => 'dist/bundles/web.open-source',
     :from => FileList['dist/js/**/*.*']
            .include('dist/styles/**/*.*')
            .include('dist/src/**/*.*')
            .exclude('**/*mobile*')
            .exclude('**/*dataviz*'),
     :license => 'dist/bundles/web.license'

file_license 'dist/bundles/web.license' => 'resources/legal/official/src-license-web.txt'

desc('Build Kendo UI Web Open src')
task :web_gpl => [:js,:less, 'dist/bundles/web.open-source']

desc 'Build all bundles'
multitask :bundles => [:complete, :web_gpl]
