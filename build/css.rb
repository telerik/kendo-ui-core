LESS = FileList['styles/**/*.less']

SRC_CSS = FileList['styles/**/*.*'].exclude('**/*.winjs.*').include(FileList['styles/**/kendo*.less'].ext('css')).sub('styles/', DIST_STYLES_ROOT).uniq

MIN_CSS = FileList['styles/**/kendo*.less']
    .include('styles/**/*.css')
    .exclude('**/*.min.css')
    .ext('min.css')
    .sub('styles/', 'dist/styles/')
    .uniq


MIN_CSS_RESOURCES = FileList[MIN_CSS + FileList['styles/*/*/*'].sub('styles/', DIST_STYLES_ROOT)].exclude('**/*.less').exclude('**/*.winjs.*')

WEB_MIN_CSS = FileList[MIN_CSS_RESOURCES].keep_if { |f| f =~ /styles\/web\// }
WEB_SRC_CSS = FileList[SRC_CSS].keep_if { |f| f =~ /styles\/(web|common)\// }

MOBILE_MIN_CSS = FileList[MIN_CSS_RESOURCES].keep_if { |f| f =~ /styles\/mobile\// }
MOBILE_SRC_CSS = FileList[SRC_CSS].keep_if { |f| f =~ /styles\/(mobile|common)\// }

DATAVIZ_MIN_CSS = FileList[MIN_CSS_RESOURCES].keep_if { |f| f =~ /styles\/dataviz\// }
DATAVIZ_SRC_CSS = FileList[SRC_CSS].keep_if { |f| f =~ /styles\/dataviz\// }

WIN_SRC_CSS = FileList["#{DIST_STYLES_ROOT}web/kendo.common.css"].include("#{DIST_STYLES_ROOT}dataviz/kendo.dataviz.css").include("#{DIST_STYLES_ROOT}web/kendo.rtl.css")
WIN_MIN_CSS = FileList["#{DIST_STYLES_ROOT}web/kendo.winjs.min.css"]

ICENIUM_MIN_RESOURCES = FileList[MOBILE_MIN_CSS].keep_if { |f| f =~ /styles\/mobile\/images\// }
ICENIUM_MIN_CSS = FileList["#{DIST_STYLES_ROOT}mobile/kendo.icenium.min.css"].include(ICENIUM_MIN_RESOURCES).include(DATAVIZ_MIN_CSS).exclude("#{DIST_STYLES_ROOT}dataviz/kendo.dataviz.min.css")

CLEAN.include('dist/styles')

# Legacy themes support

LEGACY_MIN_CSS = FileList['wrappers/mvc/legacy-themes/*.css']
    .exclude('**/*.min.css')
    .ext('min.css')

rule '.min.css' => lambda { |target| target.sub('min.css', 'css') } do |t|
    cssmin(t.source, t.name)
end

CLEAN.include(LEGACY_MIN_CSS)
