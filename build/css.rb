LESS = FileList['styles/**/*.less']
SRC_CSS = FileList['styles/**/*.*']
MIN_CSS = FileList['styles/**/kendo*.less']
    .include('styles/**/*.css')
    .pathmap('dist/styles/%f')
    .ext('min.css')

def find_less_src(lessfile)
    filename = lessfile.pathmap("%f")

    result = LESS.find { |less| File.basename(less) == filename }
    p filename, LESS if result == nil
    result
end

def find_less_prerequisites(lessfile)
    dirname = lessfile.pathmap("%d")

    less = File.read(find_less_src(lessfile))

    prerequisites = FileList[less.scan(/@import "(.+)";/).flatten].pathmap("#{dirname}/%f")

    [lessfile].concat(prerequisites)
end

tree :to => 'dist/src/styles', :from => 'styles/**/*.*', :root => /styles\/.+?\//
tree :to => 'dist/styles',  :from => 'styles/*/*/**/*.*', :root => /styles\/.+?\//

#Build dist/src/styles/*.less files by copying them from styles/
rule /dist\/src\/styles\/.+\.less/ => [ lambda { |target| find_less_src(target) }] do |t|
    ensure_path t.name

    cp t.source, t.name
end

#Build dist/src/styles/kendo*.css files by running less over /dist/src/styles/kendo*.less
rule /dist\/src\/styles\/kendo.+\.css/ => [ lambda { |target| find_less_prerequisites(target.ext('less')) } ] do |t|
    ensure_path t.name

    sh "node build/less-js/bin/lessc #{t.source} #{t.name}"
end

#Build dist/styles/kendo*.min.css by running cssmin over dist/src/styles/kendo*.css
rule /dist\/styles\/.+\.min\.css/ => [ lambda { |target| target.sub('dist/styles', 'dist/src/styles').ext().ext('css') }] do |t|
    ensure_path t.name

    sh "cssmin #{t.source} > #{t.name}"
end
