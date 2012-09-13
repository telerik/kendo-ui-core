require 'rake/clean'
$LOAD_PATH << File.join(File.dirname(__FILE__), "build")
require 'js'
require 'css'

# The clean target will remove the dist directory
CLEAN.include('dist')

# Required directories
directory 'dist/source/js/cultures'
directory 'dist/source/styles'
directory 'dist/js/cultures'
directory 'dist/styles'

# Rake tasks
desc('JavaScript')
task :js => ['dist/js/cultures', 'dist/source/js/cultures', MIN_JS].flatten

desc('Less')
task :less => ['dist/source/styles', SRC_LESS, SRC_CSS].flatten

desc('Build all Kendo UI distributions')
task :default => [:js,:less]
