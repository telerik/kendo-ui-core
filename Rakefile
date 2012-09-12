require 'rake/clean'

JS = FileList['src/kendo*.js']
MIN_JS = JS.sub(/src\/(.+)\.js/, "dist/\\1.min.js")

CLEAN.include(MIN_JS)

directory 'dist'

rule ".min.js" => [ lambda { |target| target.sub(/dist\/(.+)\.min\.js/, "src/\\1.js") } ] do |t|
    sh "uglifyjs #{t.source} > #{t.name}"
end

task :minify_js => MIN_JS

task :default => :minify_js
