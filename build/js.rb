require 'tasks'

# All JavaScript files from src/
JS = FileList['src/kendo*.js'].include('src/cultures/*.js')
SRC_JS = JS.sub('src', 'dist/src')
MIN_JS = SRC_JS.sub('src', 'js').ext('min.js')
    .include('dist/js/jquery.min.js')
    .include('dist/js/kendo.web.min.js')
    .include('dist/js/kendo.dataviz.min.js')
    .include('dist/js/kendo.mobile.min.js')
    .include('dist/js/kendo.all.min.js')

#Build dist/src/js/*.js files by copying them from src/
rule /dist\/src\/js\/.+\.js/ => [ lambda { |target| target.sub('dist/src/js', 'src') }] do |t|
    ensure_path t.name

    cp t.source, t.name
end

#Build dist/js/*.min.js files by running uglifyjs over dist/src/js/*.js
rule /dist\/js\/.+\.min\.js/ => [ lambda { |target| target.sub('dist/js', 'dist/src/js').ext().ext('js') }] do |t|
    ensure_path t.name

    sh "uglifyjs #{t.source} > #{t.name}"
end

#Copy src/jquery.min.js when it changes to dist/js/jquery.min.js
file_copy :to => 'dist/js/jquery.min.js', :from => 'src/jquery.min.js'

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

file_merge "src/kendo.aspnetmvc.js" => [
    "src/aspnetmvc/kendo.data.aspnetmvc.js",
    "src/aspnetmvc/kendo.combobox.aspnetmvc.js",
    "src/aspnetmvc/kendo.validator.aspnetmvc.js"
]

# Suites
WEB_JS = [
    "dist/src/js/kendo.core.js",
    "dist/src/js/kendo.fx.js",
    "dist/src/js/kendo.data.odata.js",
    "dist/src/js/kendo.data.xml.js",
    "dist/src/js/kendo.data.js",
    "dist/src/js/kendo.binder.js",
    "dist/src/js/kendo.validator.js",
    "dist/src/js/kendo.userevents.js",
    "dist/src/js/kendo.draganddrop.js",
    "dist/src/js/kendo.mobile.scroller.js",
    "dist/src/js/kendo.groupable.js",
    "dist/src/js/kendo.reorderable.js",
    "dist/src/js/kendo.resizable.js",
    "dist/src/js/kendo.sortable.js",
    "dist/src/js/kendo.selectable.js",
    "dist/src/js/kendo.pager.js",
    "dist/src/js/kendo.popup.js",
    "dist/src/js/kendo.list.js",
    "dist/src/js/kendo.calendar.js",
    "dist/src/js/kendo.datepicker.js",
    "dist/src/js/kendo.autocomplete.js",
    "dist/src/js/kendo.dropdownlist.js",
    "dist/src/js/kendo.combobox.js",
    "dist/src/js/kendo.columnmenu.js",
    "dist/src/js/kendo.grid.js",
    "dist/src/js/kendo.listview.js",
    "dist/src/js/kendo.editor.js",
    "dist/src/js/kendo.numerictextbox.js",
    "dist/src/js/kendo.menu.js",
    "dist/src/js/kendo.editable.js",
    "dist/src/js/kendo.filtermenu.js",
    "dist/src/js/kendo.panelbar.js",
    "dist/src/js/kendo.tabstrip.js",
    "dist/src/js/kendo.timepicker.js",
    "dist/src/js/kendo.datetimepicker.js",
    "dist/src/js/kendo.treeview.js",
    "dist/src/js/kendo.slider.js",
    "dist/src/js/kendo.splitter.js",
    "dist/src/js/kendo.upload.js",
    "dist/src/js/kendo.window.js"
]

DATAVIZ_JS = [
    "dist/src/js/kendo.core.js",
    "dist/src/js/kendo.data.odata.js",
    "dist/src/js/kendo.data.xml.js",
    "dist/src/js/kendo.data.js",
    "dist/src/js/kendo.binder.js",
    "dist/src/js/kendo.dataviz.core.js",
    "dist/src/js/kendo.dataviz.themes.js",
    "dist/src/js/kendo.dataviz.chart.js",
    "dist/src/js/kendo.dataviz.gauge.js",
    "dist/src/js/kendo.dataviz.svg.js",
    "dist/src/js/kendo.dataviz.vml.js"
]

MOBILE_JS = [
    "dist/src/js/kendo.core.js",
    "dist/src/js/kendo.fx.js",
    "dist/src/js/kendo.data.odata.js",
    "dist/src/js/kendo.data.xml.js",
    "dist/src/js/kendo.data.js",
    "dist/src/js/kendo.binder.js",
    "dist/src/js/kendo.validator.js",
    "dist/src/js/kendo.history.js",
    "dist/src/js/kendo.userevents.js",
    "dist/src/js/kendo.draganddrop.js",
    "dist/src/js/kendo.popup.js",
    "dist/src/js/kendo.touch.js",
    "dist/src/js/kendo.mobile.popover.js",
    "dist/src/js/kendo.mobile.loader.js",
    "dist/src/js/kendo.mobile.scroller.js",
    "dist/src/js/kendo.mobile.shim.js",
    "dist/src/js/kendo.mobile.view.js",
    "dist/src/js/kendo.mobile.modalview.js",
    "dist/src/js/kendo.mobile.splitview.js",
    "dist/src/js/kendo.mobile.pane.js",
    "dist/src/js/kendo.mobile.application.js",
    "dist/src/js/kendo.mobile.actionsheet.js",
    "dist/src/js/kendo.mobile.button.js",
    "dist/src/js/kendo.mobile.buttongroup.js",
    "dist/src/js/kendo.mobile.listview.js",
    "dist/src/js/kendo.mobile.navbar.js",
    "dist/src/js/kendo.mobile.scrollview.js",
    "dist/src/js/kendo.mobile.switch.js",
    "dist/src/js/kendo.mobile.tabstrip.js"
]

file_merge "dist/src/js/kendo.web.js" => WEB_JS
file_merge "dist/src/js/kendo.dataviz.js" => DATAVIZ_JS
file_merge "dist/src/js/kendo.mobile.js" => MOBILE_JS
file_merge "dist/src/js/kendo.all.js" => WEB_JS.concat(DATAVIZ_JS).concat(MOBILE_JS).uniq
