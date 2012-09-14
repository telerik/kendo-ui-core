LESS = FileList['styles/**/*.less']
SRC_LESS = LESS.pathmap('dist/source/styles/%f')
SRC_CSS = FileList['styles/**/kendo*.less']
            .include('styles/**/*.css')
            .pathmap('dist/source/styles/%f')
            .ext("css")
MIN_CSS = SRC_CSS.pathmap('dist/styles/%f').ext('min.css')

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

cp_files 'dist/source/styles' => 'styles/**/*.css'

#Build dist/source/styles/*.less files by copying them from styles/
rule /dist\/source\/styles\/.+\.less/ => [ lambda { |target| find_less_src(target) }] do |t|
    cp t.source, t.name
end

#Build dist/source/styles/kendo*.css files by running less over /dist/source/styles/kendo*.less
rule /dist\/source\/styles\/kendo.+\.css/ => [ lambda { |target| find_less_prerequisites(target.ext('less')) } ] do |t|
    sh "node build/less-js/bin/lessc #{t.source} #{t.name}"
end

#Build dist/styles/kendo*.min.css by running cssmin over dist/source/styles/kendo*.css
rule /dist\/styles\/.+\.min\.css/ => [ lambda { |target| target.sub('dist/styles', 'dist/source/styles').ext().ext('css') }] do |t|
    sh "cssmin #{t.source} > #{t.name}"
end
