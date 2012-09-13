require 'rake/clean'
$LOAD_PATH << File.join(File.dirname(__FILE__), "build")
require 'merge'

# All JavaScript files from src/
JS = FileList['src/kendo*.js'].include('src/cultures/*.js')
SRC_JS = JS.sub('src', 'dist/source')
MIN_JS = SRC_JS.sub('source', 'js').ext('min.js').include('dist/js/jquery.min.js')

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
directory 'dist/source/js/cultures'
directory 'dist/js/cultures'

desc('Minify JavaScript')
task :minify_js => ['dist/js/cultures', 'dist/source/js/cultures', MIN_JS].flatten

desc('Create kendo.editor.js')
task :editor => "src/kendo.editor.js"

desc('Build all Kendo UI distributions')
task :default => :minify_js
