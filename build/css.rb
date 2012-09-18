LESS = FileList['styles/**/*.less']
SRC_CSS = FileList['styles/**/*.*']
MIN_CSS = FileList['styles/**/kendo*.less']
    .include('styles/**/*.css')
    .ext('min.css')

CLEAN.include(MIN_CSS)
    .include(LESS.ext('css'))

def find_less_src(lessfile)
    filename = lessfile.pathmap("%f")

    LESS.find { |less| File.basename(less) == filename }
end

def find_less_prerequisites(lessfile)
    dirname = lessfile.pathmap("%d")

    src = find_less_src(lessfile)

    return unless src

    less = File.read(src)

    prerequisites = FileList[less.scan(/@import "(.+)";/).flatten].pathmap("#{dirname}/%f")

    [lessfile].concat(prerequisites)
end

#Build dist/src/styles/kendo*.css files by running less over /dist/src/styles/kendo*.less
rule '.css' => ['.less', lambda { |target| find_less_prerequisites(target.ext('less')) } ] do |t|
    sh "node build/less-js/bin/lessc #{t.source} #{t.name}"
end

#Build dist/styles/kendo*.min.css by running cssmin over dist/src/styles/kendo*.css
rule '.min.css' => [ lambda { |target| target.sub('min.css', 'css') }] do |t|
    sh "cssmin #{t.source} > #{t.name}"
end
