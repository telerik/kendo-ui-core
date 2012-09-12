require 'rake/clean'


SRC = FileList['src/kendo*.js']
OBJ = SRC.sub(/src\/(.+)\.js/, "dist/\\1.min.js")

CLEAN.include(OBJ)

directory 'dist'

rule ".min.js" => [ lambda { |target| target.sub(/dist\/(.+)\.min\.js/, "src/\\1.js") } ] do |t|
    sh "uglifyjs #{t.source} > #{t.name}"
end

task :default => OBJ
