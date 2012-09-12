require 'rake/clean'

JS = FileList['src/kendo*.js']
        .include("src/kendo.editor.js")

MIN_JS = JS.sub(/src\/(.+)\.js/, "dist/\\1.min.js")

CLEAN.include(MIN_JS)

class MergeTask < Rake::FileTask
    def execute(args=nil)
        File.open(name, "w") do |output|
            puts "Merge #{prerequisites.join(',')} to #{name}"

            prerequisites.each do |src|
                output.write File.read(src)
            end
        end
    end
end

def merge(*args, &block)
    MergeTask.define_task(*args, &block)
end

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

task :minify_js => MIN_JS
task :default => ["dist", :minify_js]
