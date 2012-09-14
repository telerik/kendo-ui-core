LESS = FileList['styles/**/*.less']
SRC_LESS = LESS.pathmap('dist/source/styles/%f')
SRC_CSS = FileList['styles/**/kendo*.less'].pathmap('dist/source/styles/%f').ext("css")

def find_less_src(lessfile)
    filename = lessfile.pathmap("%f")

    LESS.find { |less| File.basename(less) == filename }
end

def find_less_prerequisites(lessfile)
    dirname = lessfile.pathmap("%d")

    less = File.read(find_less_src(lessfile))

    prerequisites = FileList[less.scan(/@import "(.+)";/).flatten].pathmap("#{dirname}/%f")

    [lessfile].concat(prerequisites)
end

#Build /dist/source/styles/*.less files by copying them from styles/
rule /dist\/source\/styles\/.+\.less/ => [ lambda { |target| find_less_src(target) }] do |t|
    cp t.source, t.name
end

#Build /dist/source/styles/kendo*.css files by running less over /dist/source/styles/kendo*.less
rule /dist\/source\/styles\/kendo.+\.css/ => [ lambda { |target| find_less_prerequisites(target.ext('less')) } ] do |t|
    sh "node build/less-js/bin/lessc #{t.source} #{t.name}"
end
