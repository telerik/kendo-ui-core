LESS = FileList['styles/**/*.less']

SRC_CSS = FileList['styles/**/*.*'].exclude('**/*.winjs.*').include(FileList['styles/**/kendo*.less'].ext('css')).sub('styles/', DIST_STYLES_ROOT).uniq

MIN_CSS = FileList['styles/**/kendo*.less']
    .include('styles/**/*.css')
    .exclude('**/*.min.css')
    .ext('min.css')
    .sub('styles/', 'dist/styles/')
    .uniq

MIN_CSS_RESOURCES = FileList[MIN_CSS + FileList['styles/**/*']
    .keep_if { |f| !File.directory?(f) }
    .sub('styles/', DIST_STYLES_ROOT)]
    .exclude('**/*.less').exclude('**/*.winjs.*')

WEB_MIN_CSS = FileList[MIN_CSS_RESOURCES].keep_if { |f| f =~ /styles\/web\// }
WEB_SRC_CSS = FileList[SRC_CSS].keep_if { |f| f =~ /styles\/(web|common)\// }

MOBILE_MIN_CSS = FileList[MIN_CSS_RESOURCES].keep_if { |f| f =~ /styles\/mobile\// }
MOBILE_SRC_CSS = FileList[SRC_CSS].keep_if { |f| f =~ /styles\/(mobile|common)\// }

DATAVIZ_MIN_CSS = FileList[MIN_CSS_RESOURCES].keep_if { |f| f =~ /styles\/dataviz\// }
DATAVIZ_SRC_CSS = FileList[SRC_CSS].keep_if { |f| f =~ /styles\/dataviz\// }

CORE_MIN_CSS_RESOURCES = FileList[MIN_CSS_RESOURCES]
    .exclude("dist/styles/kendo.common-bootstrap.min.css")
    .exclude("dist/styles/kendo.common.min.css")
    .keep_if { |f| f =~ /styles\/(web|common|mobile)\// }

CORE_SRC_CSS = FileList[SRC_CSS]
    .keep_if { |f| f =~ /styles\/(web|common|mobile)\// }
    .exclude("dist/styles/web/kendo.common-bootstrap.css")
    .exclude("dist/styles/web/kendo.common-bootstrap.less")
    .exclude("dist/styles/web/kendo.common.css")
    .exclude("dist/styles/web/kendo.common.less")
	.exclude("dist/styles/web/common/gantt.less")
    .exclude("dist/styles/web/common/grid.less")
	.exclude("dist/styles/web/common/pivot.less")
    .exclude("dist/styles/web/common/editor.less")
    .exclude("dist/styles/web/common/scheduler.less")
    .exclude("dist/styles/web/common/imagebrowser.less")
    .exclude("dist/styles/web/common/treeview.less")
    .exclude("dist/styles/web/common/upload.less")

WIN_SRC_CSS = FileList["#{DIST_STYLES_ROOT}web/kendo.common.css"].include("#{DIST_STYLES_ROOT}dataviz/kendo.dataviz.css").include("#{DIST_STYLES_ROOT}web/kendo.rtl.css")
WIN_MIN_CSS = FileList["#{DIST_STYLES_ROOT}web/kendo.winjs.min.css"]

APP_BUILDER_MIN_RESOURCES = FileList[MOBILE_MIN_CSS].keep_if { |f| f =~ /styles\/mobile\/images\// }
APP_BUILDER_MIN_CSS = FileList["#{DIST_STYLES_ROOT}mobile/kendo.dataviz.mobile.min.css"].include(APP_BUILDER_MIN_RESOURCES).include(DATAVIZ_MIN_CSS).exclude("#{DIST_STYLES_ROOT}dataviz/kendo.dataviz.min.css")
APP_BUILDER_CORE_MIN_CSS  = FileList["#{DIST_STYLES_ROOT}mobile/kendo.mobile.all.min.css"].include(APP_BUILDER_MIN_RESOURCES)

CLEAN.include('dist/styles')

# Legacy themes support

LEGACY_MIN_CSS = FileList['wrappers/mvc/legacy-themes/*.css']
    .exclude('**/*.min.css')
    .ext('min.css')

rule '.min.css' => lambda { |target| target.sub('min.css', 'css') } do |t|
    cssmin(t.source, t.name)
end

CLEAN.include(LEGACY_MIN_CSS)
