require 'tasks'

CLEAN.include(DIST_JS_ROOT)

def in_dist(list)
    list.pathmap File.join(DIST_JS_ROOT, "%f")
end

MESSAGES = FileList['src/messages/*.js'].pathmap(File.join(DIST_JS_ROOT, "messages", "%f"))
CULTURES_AND_TIMEZONES = FileList['src/cultures/*.js'].pathmap(File.join(DIST_JS_ROOT, "cultures", "%f")).include(MESSAGES).include('dist/js/kendo.timezones.js')

def dependencies(component)
    in_dist(FileList[YAML.load(`node #{METAJS} --all-deps kendo.#{component}.js`).keep_if { |file| file.include? "kendo" }]).include(CULTURES_AND_TIMEZONES)
end

def maps(list)
    FileList[list - CULTURES_AND_TIMEZONES].ext('min.js.map')
end

ASPNET_MVC = File.join(DIST_JS_ROOT, 'kendo.aspnetmvc.js')
JS_BUNDLES = in_dist FileList[ 'kendo.web.js', 'kendo.dataviz.js', 'kendo.mobile.js', 'kendo.all.js', 'kendo.winjs.js', 'kendo.dataviz.mobile.js' ]

JQUERY = File.join(DIST_JS_ROOT, "jquery.min.js")
JSZIP = File.join(DIST_JS_ROOT, "jszip.min.js")
PAKO = File.join(DIST_JS_ROOT, "pako_deflate.min.js")
ANGULAR = File.join(DIST_JS_ROOT, "angular.min.js")
JQUERY_MAP = FileList[File.join(DIST_JS_ROOT, 'jquery.min.map')]

# Suites
COMPLETE_JS = dependencies("all").include('dist/js/kendo.dataviz.mobile.js')

MIN_JS = FileList[COMPLETE_JS - JS_BUNDLES - CULTURES_AND_TIMEZONES].include(ASPNET_MVC).ext('min.js')

WEB_SRC_JS = dependencies("web")
WEB_MIN_JS = WEB_SRC_JS.ext('min.js').include(JQUERY).include(ANGULAR).include(JSZIP).include(PAKO)
WEB_MIN_JS_MAP = maps(WEB_SRC_JS)

DATAVIZ_SRC_JS = dependencies("dataviz")
DATAVIZ_MIN_JS = DATAVIZ_SRC_JS.ext('min.js').include(JQUERY).include(ANGULAR).include(PAKO)
DATAVIZ_MIN_JS_MAP = maps(DATAVIZ_SRC_JS)

MOBILE_SRC_JS = dependencies("mobile")
MOBILE_MIN_JS = MOBILE_SRC_JS.ext('min.js').include(JQUERY).include(ANGULAR)
MOBILE_MIN_JS_MAP = maps(MOBILE_SRC_JS)

COMPLETE_SRC_JS = FileList[COMPLETE_JS]
COMPLETE_MIN_JS = COMPLETE_JS.ext('min.js').include(JQUERY).include(ANGULAR).include(JSZIP).include(PAKO)
COMPLETE_MIN_JS_MAP = maps(COMPLETE_JS)

MVC_SRC_JS = FileList[COMPLETE_JS].include(ASPNET_MVC)
MVC_MIN_JS = FileList[COMPLETE_MIN_JS].include(ASPNET_MVC.ext('min.js'))
MVC_MIN_JS_MAP = maps(MVC_SRC_JS)

TRIAL_MIN_JS = FileList[MVC_MIN_JS]
TRIAL_MIN_JS_MAP = FileList[MVC_MIN_JS_MAP]

CDN_MIN_JS = FileList[MVC_MIN_JS]
CDN_MIN_JS_MAP = FileList[MVC_MIN_JS_MAP]

WIN_MIN_JS = FileList[File.join(DIST_JS_ROOT, 'kendo.winjs.min.js')]
WIN_SRC_JS = FileList[File.join(DIST_JS_ROOT, 'kendo.winjs.js')]

APP_BUILDER_MIN_JS = FileList[File.join(DIST_JS_ROOT, 'kendo.dataviz.mobile.min.js')].include(JQUERY)
APP_BUILDER_CORE_MIN_JS = FileList[File.join(DIST_JS_ROOT, 'kendo.mobile.min.js')].include(JQUERY)

CORE_SRC_JS = dependencies("ui.core")
CORE_MIN_JS = CORE_SRC_JS.ext('min.js').include(JQUERY).include(ANGULAR)
CORE_MIN_JS_MAP = maps(CORE_SRC_JS)
