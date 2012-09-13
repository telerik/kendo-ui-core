require 'rake/clean'
$LOAD_PATH << File.join(File.dirname(__FILE__), "build")
require 'merge'
require 'merged_files'

# All JavaScript files from src/
JS = FileList['src/kendo*.js'].include('src/cultures/*.js')
SRC_JS = JS.sub('src', 'dist/source')
MIN_JS = SRC_JS.sub('source', 'js').ext('min.js')
    .include('dist/js/jquery.min.js')
    .include('dist/js/kendo.web.min.js')
    .include('dist/js/kendo.dataviz.min.js')
    .include('dist/js/kendo.mobile.min.js')
    .include('dist/js/kendo.all.min.js')

# The clean target will remove the dist directory
CLEAN.include('dist')

#Build /dist/source/js/*.js files by copying them from src/
rule /dist\/source\/js\/.+\.js/ => [ lambda { |target| target.sub('dist/source/js', 'src') }] do |t|
    cp t.source, t.name
end

#Build /dist/js/*.min.js files by running uglifyjs over /dist/source/js/*.js
rule /dist\/js\/.+\.js/ => [ lambda { |target| target.sub('dist/js', 'dist/source/js').ext().ext('js') }] do |t|
    sh "uglifyjs #{t.source} > #{t.name}"
end

file 'dist/js/jquery.min.js' => 'src/jquery.min.js' do |t|
    cp 'src/jquery.min.js', t.name
end


# Required directories
directory 'dist/source/js/cultures'
directory 'dist/js/cultures'

desc('Minify JavaScript')
task :minify_js => ['dist/js/cultures', 'dist/source/js/cultures', MIN_JS].flatten

desc('Create kendo.editor.js')
task :editor => "src/kendo.editor.js"

desc('Build all Kendo UI distributions')
task :default => :minify_js
