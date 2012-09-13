require 'rake/clean'
$LOAD_PATH << File.join(File.dirname(__FILE__), "build")
require 'merge'

# All JavaScript files from src/
JS = FileList['src/kendo*.js']
SRC_JS = JS.pathmap('dist/source/js/%f') # %f is the filename
MIN_JS = SRC_JS.pathmap('dist/js/%f').ext('min.js').include('dist/js/jquery.min.js')

# The clean target will remove the dist directory
CLEAN.include('dist')

#Build /dist/source/js/*.js files by copying them from src/
rule /dist\/source\/js\/.+\.js/ => [ lambda { |target| "src/#{target.pathmap('%f')}" }] do |t|
    cp t.source, t.name
end

#Build /dist/js/*.min.js files by running uglifyjs. Depends on building /dist/source/js/*.js
rule /dist\/js\/.+\.js/ => [ lambda { |target| "dist/source/js/#{target.pathmap('%n').ext('js')}" }] do |t|
    sh "uglifyjs #{t.source} > #{t.name}"
end

file 'dist/js/jquery.min.js' => 'src/jquery.min.js' do |t|
    cp t.source, t.name
end

merge "src/kendo.editor.js" => [
    "src/editor/main.js",
    "src/editor/dom.js",
    "src/editor/serializer.js",
    "src/editor/range.js",
    "src/editor/system.js",
    "src/editor/inlineformat.js",
    "src/editor/formatblock.js",
    "src/editor/linebreak.js",
    "src/editor/lists.js",
    "src/editor/link.js",
    "src/editor/image.js",
    "src/editor/components.js",
    "src/editor/indent.js",
    "src/editor/viewhtml.js",
    "src/editor/pendingformats.js",
]

merge "src/kendo.aspnetmvc.js" => [
    "src/aspnetmvc/kendo.data.aspnetmvc.js",
    "src/aspnetmvc/kendo.combobox.aspnetmvc.js",
    "src/aspnetmvc/kendo.validator.aspnetmvc.js"
]

# Required directories
directory 'dist/source/js'
directory 'dist/js'

desc('Minify JavaScript')
task :minify_js => ['dist/js', 'dist/source/js', MIN_JS].flatten

desc('Create kendo.editor.js')
task :editor => "src/kendo.editor.js"

desc('Build all Kendo UI distributions')
task :default => :minify_js
