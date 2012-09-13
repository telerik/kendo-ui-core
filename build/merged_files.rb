#Composite JavaScript files
merge "src/kendo.editor.js" => [
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

merge "src/kendo.aspnetmvc.js" => [
    "src/aspnetmvc/kendo.data.aspnetmvc.js",
    "src/aspnetmvc/kendo.combobox.aspnetmvc.js",
    "src/aspnetmvc/kendo.validator.aspnetmvc.js"
]

# Suites
WEB_JS = [
    "dist/source/js/kendo.core.js",
    "dist/source/js/kendo.fx.js",
    "dist/source/js/kendo.data.odata.js",
    "dist/source/js/kendo.data.xml.js",
    "dist/source/js/kendo.data.js",
    "dist/source/js/kendo.binder.js",
    "dist/source/js/kendo.validator.js",
    "dist/source/js/kendo.userevents.js",
    "dist/source/js/kendo.draganddrop.js",
    "dist/source/js/kendo.mobile.scroller.js",
    "dist/source/js/kendo.groupable.js",
    "dist/source/js/kendo.reorderable.js",
    "dist/source/js/kendo.resizable.js",
    "dist/source/js/kendo.sortable.js",
    "dist/source/js/kendo.selectable.js",
    "dist/source/js/kendo.pager.js",
    "dist/source/js/kendo.popup.js",
    "dist/source/js/kendo.list.js",
    "dist/source/js/kendo.calendar.js",
    "dist/source/js/kendo.datepicker.js",
    "dist/source/js/kendo.autocomplete.js",
    "dist/source/js/kendo.dropdownlist.js",
    "dist/source/js/kendo.combobox.js",
    "dist/source/js/kendo.columnmenu.js",
    "dist/source/js/kendo.grid.js",
    "dist/source/js/kendo.listview.js",
    "dist/source/js/kendo.editor.js",
    "dist/source/js/kendo.numerictextbox.js",
    "dist/source/js/kendo.menu.js",
    "dist/source/js/kendo.editable.js",
    "dist/source/js/kendo.filtermenu.js",
    "dist/source/js/kendo.panelbar.js",
    "dist/source/js/kendo.tabstrip.js",
    "dist/source/js/kendo.timepicker.js",
    "dist/source/js/kendo.datetimepicker.js",
    "dist/source/js/kendo.treeview.js",
    "dist/source/js/kendo.slider.js",
    "dist/source/js/kendo.splitter.js",
    "dist/source/js/kendo.upload.js",
    "dist/source/js/kendo.window.js"
]

DATAVIZ_JS = [
    "dist/source/js/kendo.core.js",
    "dist/source/js/kendo.data.odata.js",
    "dist/source/js/kendo.data.xml.js",
    "dist/source/js/kendo.data.js",
    "dist/source/js/kendo.binder.js",
    "dist/source/js/kendo.dataviz.core.js",
    "dist/source/js/kendo.dataviz.themes.js",
    "dist/source/js/kendo.dataviz.chart.js",
    "dist/source/js/kendo.dataviz.gauge.js",
    "dist/source/js/kendo.dataviz.svg.js",
    "dist/source/js/kendo.dataviz.vml.js"
]

MOBILE_JS = [
    "dist/source/js/kendo.core.js",
    "dist/source/js/kendo.fx.js",
    "dist/source/js/kendo.data.odata.js",
    "dist/source/js/kendo.data.xml.js",
    "dist/source/js/kendo.data.js",
    "dist/source/js/kendo.binder.js",
    "dist/source/js/kendo.validator.js",
    "dist/source/js/kendo.history.js",
    "dist/source/js/kendo.userevents.js",
    "dist/source/js/kendo.draganddrop.js",
    "dist/source/js/kendo.popup.js",
    "dist/source/js/kendo.touch.js",
    "dist/source/js/kendo.mobile.popover.js",
    "dist/source/js/kendo.mobile.loader.js",
    "dist/source/js/kendo.mobile.scroller.js",
    "dist/source/js/kendo.mobile.shim.js",
    "dist/source/js/kendo.mobile.view.js",
    "dist/source/js/kendo.mobile.modalview.js",
    "dist/source/js/kendo.mobile.splitview.js",
    "dist/source/js/kendo.mobile.pane.js",
    "dist/source/js/kendo.mobile.application.js",
    "dist/source/js/kendo.mobile.actionsheet.js",
    "dist/source/js/kendo.mobile.button.js",
    "dist/source/js/kendo.mobile.buttongroup.js",
    "dist/source/js/kendo.mobile.listview.js",
    "dist/source/js/kendo.mobile.navbar.js",
    "dist/source/js/kendo.mobile.scrollview.js",
    "dist/source/js/kendo.mobile.switch.js",
    "dist/source/js/kendo.mobile.tabstrip.js"

]

merge "dist/source/js/kendo.web.js" => WEB_JS
merge "dist/source/js/kendo.dataviz.js" => DATAVIZ_JS
merge "dist/source/js/kendo.mobile.js" => MOBILE_JS
merge "dist/source/js/kendo.all.js" => WEB_JS.concat(DATAVIZ_JS).concat(MOBILE_JS).uniq
