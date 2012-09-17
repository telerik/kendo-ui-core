require 'rake/clean'
$LOAD_PATH << File.join(File.dirname(__FILE__), "build")
require 'js'
require 'css'

VERSION = "2013"

# The clean target will remove the dist directory
CLEAN.include('dist')

# Required directories
directory 'dist/source/js/cultures'
directory 'dist/source/styles'
directory 'dist/js/cultures'
directory 'dist/styles'

# Rake tasks
desc('JavaScript')
task :js => ['dist/js/cultures', 'dist/source/js/cultures', :min_js]

multitask :min_js => MIN_JS

desc('Less')
task :less => ['dist/styles', 'dist/source/styles', :min_css]

multitask :min_css => MIN_CSS

desc('Build all Kendo UI distributions')
task :default => [:complete]

tree :to => "dist/complete",
     :from => ["dist/js/**/*.*", "dist/styles/**/*.*", "dist/source/**/*.*"],
     :license => "dist/complete.license"

file_license "dist/complete.license" => "resources/legal/official/src-license-complete.txt"

desc('Build Kendo UI Complete Commercial')
task :complete => [:js,:less, 'dist/complete']
