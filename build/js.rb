require 'tasks'

JS_BUNDLES = FileList[ 'src/kendo.web.js',
                       'src/kendo.dataviz.js',
                       'src/kendo.mobile.js',
                       'src/kendo.all.js',
                       'src/kendo.winjs.js' ]

JS_BUNDLES_MIN = JS_BUNDLES.ext('min.js');

# All JavaScript files from src/
SRC_JS = FileList['src/kendo*.js']
    .include('src/kendo.editor.js')
    .include('src/kendo.aspnetmvc.js')
    .include('src/cultures/*.js')
    .exclude('**/*.min.js')
    .exclude(JS_BUNDLES)

MIN_JS = SRC_JS.ext('min.js').exclude(JS_BUNDLES_MIN)

CLEAN.include(MIN_JS).include(JS_BUNDLES).include(JS_BUNDLES_MIN)

JS_BUILDFILE = 'build/js.rb'

#Build src/*.min.js files by running uglifyjs over src/*.js
rule '.min.js' => lambda { |t| t.sub('min.js', 'js') } do |t|
    compilejs(t.source, t.name)
end

#Rebuild kendo-config.json based on data present in the source code
KENDO_CONFIG_FILE = File.join(Rake.application.original_dir, "download-builder", "config", "kendo-config.json")
file KENDO_CONFIG_FILE => SRC_JS do |t|
    sh "node #{COMPILEJS} --kendo-config --overwrite", :verbose => VERBOSE
end

#Composite JavaScript files
file_merge "src/kendo.editor.js" => [
    "src/editor/main.js",
    "src/editor/dom.js",
    "src/editor/serializer.js",
    "src/editor/range.js",
    "src/editor/system.js",
    "src/editor/inlineformat.js",
    "src/editor/formatblock.js",
    "src/editor/linebreak.js",
    "src/editor/lists.js",
    "src/editor/link.js",
    "src/editor/image.js",
    "src/editor/components.js",
    "src/editor/indent.js",
    "src/editor/viewhtml.js",
    "src/editor/pendingformats.js",
]
file "src/kendo.editor.js" => JS_BUILDFILE

file_merge "src/kendo.aspnetmvc.js" => [
    "src/aspnetmvc/kendo.data.aspnetmvc.js",
    "src/aspnetmvc/kendo.combobox.aspnetmvc.js",
    "src/aspnetmvc/kendo.multiselect.aspnetmvc.js",
    "src/aspnetmvc/kendo.imagebrowser.aspnetmvc.js",
    "src/aspnetmvc/kendo.validator.aspnetmvc.js"
]
file "src/kendo.aspnetmvc.js" => JS_BUILDFILE

# Suites
WEB_JS = FileList[
    "src/kendo.core.js",
    "src/kendo.fx.js",
    "src/kendo.data.odata.js",
    "src/kendo.data.xml.js",
    "src/kendo.data.js",
    "src/kendo.binder.js",
    "src/kendo.validator.js",
    "src/kendo.userevents.js",
    "src/kendo.draganddrop.js",
    "src/kendo.mobile.scroller.js",
    "src/kendo.groupable.js",
    "src/kendo.reorderable.js",
    "src/kendo.resizable.js",
    "src/kendo.sortable.js",
    "src/kendo.selectable.js",
    "src/kendo.pager.js",
    "src/kendo.popup.js",
    "src/kendo.tooltip.js",
    "src/kendo.list.js",
    "src/kendo.calendar.js",
    "src/kendo.datepicker.js",
    "src/kendo.autocomplete.js",
    "src/kendo.dropdownlist.js",
    "src/kendo.combobox.js",
    "src/kendo.multiselect.js",
    "src/kendo.colorpicker.js",
    "src/kendo.columnmenu.js",
    "src/kendo.grid.js",
    "src/kendo.listview.js",
    "src/kendo.imagebrowser.js",
    "src/kendo.editor.js",
    "src/kendo.numerictextbox.js",
    "src/kendo.menu.js",
    "src/kendo.editable.js",
    "src/kendo.filtermenu.js",
    "src/kendo.panelbar.js",
    "src/kendo.tabstrip.js",
    "src/kendo.timepicker.js",
    "src/kendo.datetimepicker.js",
    "src/kendo.treeview.js",
    "src/kendo.slider.js",
    "src/kendo.splitter.js",
    "src/kendo.upload.js",
    "src/kendo.window.js"
]

WEB_SRC_JS = FileList[WEB_JS].include('src/cultures/*.js', 'src/kendo.web.js').exclude('**/*.min.js')
WEB_MIN_JS = FileList[WEB_SRC_JS].ext('min.js').include('src/jquery.min.js')

DATAVIZ_JS = FileList[
    "src/kendo.core.js",
    "src/kendo.data.odata.js",
    "src/kendo.data.xml.js",
    "src/kendo.data.js",
    "src/kendo.binder.js",
    "src/kendo.userevents.js",
    "src/kendo.dataviz.core.js",
    "src/kendo.dataviz.themes.js",
    "src/kendo.dataviz.chart.js",
    "src/kendo.dataviz.gauge.js",
    "src/kendo.dataviz.stock.js",
    "src/kendo.dataviz.sparkline.js",
    "src/kendo.dataviz.svg.js",
    "src/kendo.dataviz.vml.js"
]

DATAVIZ_SRC_JS = FileList[DATAVIZ_JS].include('src/cultures/*.js', 'src/kendo.dataviz.js').exclude('**/*.min.js')
DATAVIZ_MIN_JS = FileList[DATAVIZ_SRC_JS].ext('min.js').include('src/jquery.min.js')

MOBILE_JS = FileList[
    "src/kendo.core.js",
    "src/kendo.fx.js",
    "src/kendo.data.odata.js",
    "src/kendo.data.xml.js",
    "src/kendo.data.js",
    "src/kendo.binder.js",
    "src/kendo.validator.js",
    "src/kendo.history.js",
    "src/kendo.userevents.js",
    "src/kendo.draganddrop.js",
    "src/kendo.popup.js",
    "src/kendo.touch.js",
    "src/kendo.mobile.popover.js",
    "src/kendo.mobile.loader.js",
    "src/kendo.mobile.scroller.js",
    "src/kendo.mobile.shim.js",
    "src/kendo.mobile.view.js",
    "src/kendo.mobile.modalview.js",
    "src/kendo.mobile.splitview.js",
    "src/kendo.mobile.pane.js",
    "src/kendo.mobile.application.js",
    "src/kendo.mobile.actionsheet.js",
    "src/kendo.mobile.button.js",
    "src/kendo.mobile.buttongroup.js",
    "src/kendo.mobile.listview.js",
    "src/kendo.mobile.navbar.js",
    "src/kendo.mobile.scrollview.js",
    "src/kendo.mobile.switch.js",
    "src/kendo.mobile.tabstrip.js"
]

MOBILE_SRC_JS = FileList[MOBILE_JS].include('src/cultures/*.js', 'src/kendo.mobile.js').exclude('**/*.min.js')
MOBILE_MIN_JS = FileList[MOBILE_SRC_JS].ext('min.js').include('src/jquery.min.js')

COMPLETE_MIN_JS = (WEB_MIN_JS + DATAVIZ_MIN_JS + MOBILE_MIN_JS).include('src/kendo.all.min.js').uniq
COMPLETE_SRC_JS = (WEB_SRC_JS + DATAVIZ_SRC_JS + MOBILE_SRC_JS).include('src/kendo.all.js').uniq

MVC_MIN_JS = FileList[COMPLETE_MIN_JS].include('src/kendo.aspnetmvc.min.js')
MVC_SRC_JS = FileList[COMPLETE_SRC_JS].include('src/kendo.aspnetmvc.js')

TRIAL_MIN_JS = FileList[MVC_MIN_JS]
CDN_MIN_JS = FileList[MVC_MIN_JS]

WIN_JS = FileList[
    "src/kendo.core.js",
    "src/kendo.fx.js",
    "src/kendo.data.odata.js",
    "src/kendo.data.xml.js",
    "src/kendo.data.js",
    "src/kendo.binder.js",
    "src/kendo.validator.js",
    "src/kendo.userevents.js",
    "src/kendo.draganddrop.js",
    "src/kendo.mobile.scroller.js",
    "src/kendo.groupable.js",
    "src/kendo.reorderable.js",
    "src/kendo.resizable.js",
    "src/kendo.sortable.js",
    "src/kendo.selectable.js",
    "src/kendo.pager.js",
    "src/kendo.popup.js",
    "src/kendo.list.js",
    "src/kendo.calendar.js",
    "src/kendo.datepicker.js",
    "src/kendo.autocomplete.js",
    "src/kendo.dropdownlist.js",
    "src/kendo.combobox.js",
    "src/kendo.grid.js",
    "src/kendo.listview.js",
    "src/kendo.numerictextbox.js",
    "src/kendo.editable.js",
    "src/kendo.filtermenu.js",
    "src/kendo.timepicker.js",
    "src/kendo.slider.js",
    "src/kendo.dataviz.core.js",
    "src/kendo.dataviz.themes.js",
    "src/kendo.dataviz.chart.js",
    "src/kendo.dataviz.gauge.js",
    "src/kendo.dataviz.stock.js",
    "src/kendo.dataviz.sparkline.js",
    "src/kendo.dataviz.svg.js"
]

WIN_MIN_JS = FileList['src/kendo.winjs.min.js']
WIN_SRC_JS = FileList['src/kendo.winjs.js']

# file_merge "src/kendo.web.js" => WEB_JS
# file "src/kendo.web.js" => JS_BUILDFILE

# file_merge "src/kendo.dataviz.js" => DATAVIZ_JS
# file "src/kendo.dataviz.js" => JS_BUILDFILE

# file_merge "src/kendo.mobile.js" => MOBILE_JS
# file "src/kendo.mobile.js" => JS_BUILDFILE

# file_merge "src/kendo.all.js" => (WEB_JS + DATAVIZ_JS + MOBILE_JS).uniq
# file "src/kendo.all.js" => JS_BUILDFILE

# file_merge "src/kendo.winjs.js" => WIN_JS
# file "src/kendo.winjs.js" => JS_BUILDFILE

file "src/kendo.web.js" => WEB_JS do |t|
    compilejs_bundle(t)
end

file "src/kendo.dataviz.js" => DATAVIZ_JS do |t|
    compilejs_bundle(t)
end

file "src/kendo.mobile.js" => MOBILE_JS do |t|
    compilejs_bundle(t)
end

file "src/kendo.all.js" => (WEB_JS + DATAVIZ_JS + MOBILE_JS).uniq do |t|
    compilejs_bundle(t)
end

file "src/kendo.winjs.js" => WIN_JS do |t|
    compilejs_bundle(t)
end
