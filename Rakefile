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

# Kendo UI Complete Commercial
tree :to => "dist/bundles/complete",
     :from => ["dist/js/**/*.*", "dist/styles/**/*.*", "dist/src/**/*.*"],
     :license => "dist/bundles/complete.license"

file_license "dist/bundles/complete.license" => "resources/legal/official/src-license-complete.txt"

desc('Build Kendo UI Complete Commercial')
task :complete => [:js,:less, 'dist/bundles/complete']

# Kendo UI Web Open src
tree :to => "dist/bundles/web.open-source",
     :from => FileList["dist/js/**/*.*"]
            .include("dist/styles/**/*.*")
            .include("dist/src/**/*.*")
            .exclude("**/*mobile*")
            .exclude("**/*dataviz*"),
     :license => "dist/bundles/web.license"

file_license "dist/bundles/web.license" => "resources/legal/official/src-license-web.txt"

desc('Build Kendo UI Web Open src')
task :web_gpl => [:js,:less, 'dist/bundles/web.open-source']

desc 'Build all bundles'
multitask :bundles => [:complete, :web_gpl]
