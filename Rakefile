require 'rake/clean'
require './build/merge'

JS = FileList['src/kendo*.js']
        .include("src/kendo.editor.js")
        .include("src/kendo.aspnetmvc.js")

MIN_JS = JS.sub(/src\/(.+)\.js/, "dist/\\1.min.js")

CLEAN.include(MIN_JS)


directory 'dist'

rule ".min.js" => [ lambda { |target| "src/#{ File.basename(target, '.min.js') }.js" } ] do |t|
    sh "uglifyjs #{t.source} > #{t.name}"
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
task :minify_js => MIN_JS

desc('Build all Kendo UI distributions')
task :default => ["dist", :minify_js]
