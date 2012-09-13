require 'rake/clean'
$LOAD_PATH << File.join(File.dirname(__FILE__), "build")
require 'merge'

# All JavaScript files from src/
JS = FileList['src/kendo*.js']
        .include("src/kendo.editor.js")     # include this file explicitly because it is generated
        .include("src/kendo.aspnetmvc.js")  # include this file explicitly because it is generated

# Minified JavaScript files in dist/js
MIN_JS = JS.sub(/src\/(.+)\.js/, "dist/js/\\1.min.js")

WEB_LESS = FileList['styles/web/kendo*.less']
WEB_CSS = WEB_LESS.pathmap('dist/%p').ext("css")

# The clean target will remove the minified JavaScript
CLEAN.include(MIN_JS)

# Required directories
directory 'dist/js'
directory 'dist/styles'

# A rule telling how to build .min.js files
rule ".min.js" => [ lambda { |target| "src/#{ File.basename(target, '.min.js') }.js" } ] do |t|
    sh "uglifyjs #{t.source} > #{t.name}"
end

# A rule telling how to build .css files
rule ".css" => [ lambda { |target| "styles/web/#{ File.basename(target, '.css') }.less" } ] do |t|
    p "less #{t.source} > #{t.name}"
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

desc('Create kendo.editor.js')
task :editor => "src/kendo.editor.js"

desc('Minify the JavaScript files')
task :minify_js => ["dist/js", MIN_JS].flatten

desc('Create CSS files')
task :css => ["dist/styles", WEB_CSS].flatten do
end

desc('Build all Kendo UI distributions')
task :default => [:minify_js]
