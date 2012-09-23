LESS = FileList['styles/**/*.less']
SRC_CSS = FileList['styles/**/*'].exclude('**/*.min.css').exclude('**/*.winjs.*').include(FileList['styles/**/kendo*.less'].ext('css')).uniq
MIN_CSS = FileList['styles/**/kendo*.less']
    .include('styles/**/*.css')
    .exclude('**/*.min.css')
    .ext('min.css')
    .uniq

MIN_CSS_RESOURCES = FileList[MIN_CSS].include('styles/*/*/*').exclude('**/*.less').exclude('**/*.winjs.*')

WEB_MIN_CSS = FileList[MIN_CSS_RESOURCES].keep_if { |f| f =~ /styles\/web\// }
WEB_SRC_CSS = FileList[SRC_CSS].keep_if { |f| f =~ /styles\/web\// }

MOBILE_MIN_CSS = FileList[MIN_CSS_RESOURCES].keep_if { |f| f =~ /styles\/mobile\// }
MOBILE_SRC_CSS = FileList[SRC_CSS].keep_if { |f| f =~ /styles\/mobile\// }

DATAVIZ_MIN_CSS = FileList[MIN_CSS_RESOURCES].keep_if { |f| f =~ /styles\/dataviz\// }
DATAVIZ_SRC_CSS = FileList[SRC_CSS].keep_if { |f| f =~ /styles\/dataviz\// }

WIN_SRC_CSS = FileList['styles/web/kendo.common.css'].include('styles/dataviz/kendo.dataviz.css')
WIN_MIN_CSS = FileList['styles/web/kendo.winjs.min.css']

file_merge 'styles/web/kendo.winjs.css' => [
    'styles/web/kendo.common.css',
    'styles/dataviz/kendo.dataviz.css',
]

CLEAN.include(MIN_CSS)
    .include('styles/winjs/kendo.winjs.css')
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

#Build styles/kendo*.css files by running less over styles/kendo*.less
rule '.css' => ['.less', lambda { |target| find_less_prerequisites(target.ext('less')) } ] do |t|
    sh "node build/less-js/bin/lessc #{t.source} #{t.name}"
end

#Build styles/kendo*.min.css by running cssmin over styles/kendo*.css
rule '.min.css' => lambda { |target| target.sub('min.css', 'css') } do |t|
    sh "cssmin #{t.source} > #{t.name}"
end
