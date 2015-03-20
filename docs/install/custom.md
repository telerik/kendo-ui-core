---
title: Include Only What You Need
page_title: Build a Custom Kendo UI Distribution
previous_url: /javascript-dependencies
description: "How to include only the parts of Kendo UI which your project uses"
position: 4
---

## Include Only What You Need

- [Pick the Right Combined Script Based on Your Project Type](#pick-the-right-combined-script-based-on-your-project-type)
- [Build a Custom Combined Script With the Kendo UI Download Builder](#build-a-custom-combined-script-with-the-kendo-ui-download-builder)
- [Use Grunt to Build a Custom Script](#use-grunt-to-build-a-custom-script)
- [Include Individual Widget Scripts](#include-individual-widget-scripts)

## Pick the Right Combined Script Based on Your Project Type

The following combined scripts are available in the bundles or at the CDN in order to facilitate common project types:

*  **kendo.ui.core.min.js** - contains all widgets available in the [Kendo UI Core project](https://github.com/telerik/kendo-ui-core). The script is available in the Kendo UI Core distribution.
*  **kendo.all.min.js** - contains a minified version of all features provided by Kendo UI.

> **Important**: `kendo.all.min.js` is available in the Kendo UI Professional, Telerik UI for ASP.NET MVC, Telerik UI for JSP and Telerik UI for PHP bundles. The contents of
`kendo.aspnetmvc.min.js` are **not** included in `kendo.all.min.js` - you need to include `kendo.aspnetmvc.min.js` in addition to `kendo.all.min.js` or use the
[custom download builder tool](http://www.telerik.com/download/custom-download).

* **kendo.web.min.js** Available in Kendo UI Professional, JSP, PHP and MVC. Includes the core framework and all desktop browser widgets (previously distributed as Kendo UI Web).
* **kendo.dataviz.min.js** Available in Kendo UI Professional, JSP, PHP and MVC. Includes the core framework and all data visualization widgets (previously distributed as Kendo UI DataViz).
* **kendo.mobile.min.js** Available in Kendo UI Professional, JSP, PHP and MVC. Includes the core framework and all mobile device specific widgets (previously distributed as Kendo UI Mobile).

> **Important:** Only one of the combined JavaScript files can be included at a time, because they include the Kendo UI framework. If widgets from
different Kendo UI suites will be used simultaneously, you should use **kendo.all.min.js** or build a custom script.

In addition, each of the combined script files should not be registered together with an **individual widget script** from the same suite. For example, `kendo.grid.js` should not be registered together with
`kendo.web.js` or `kendo.all.js`, because they already include the Grid scripts.

> Registering duplicate scripts may cause Javascript errors and unexpected behavior.

## Build a Custom Combined Script With the Kendo UI Download Builder

Users with a commercial license may use the [custom download builder tool](http://www.telerik.com/download/custom-download) to create a single JavaScript file which contains only the required widgets and features.

## Use Grunt to Build a Custom Script

If you use **Kendo UI Core**, you may build a custom distribution using the `grunt` build tool by following the [instructions in the README](https://github.com/telerik/kendo-ui-core#building-only-what-you-need).

Starting Q3 2014, the necessary build scripts are shipped in the `src/` directory of the downloadable commercial bundles. To build a custom distribution from the
shipped source, run the following shell commands:

```sh
    cd src
    npm install -g grunt
    npm install
    grunt custom:autocomplete,dropdownlist
```

list the components you want to be included in the custom build, separated with comma (`,`). The example above will build a custom minified script
which includes the AutoComplete and the DropDownList widgets.

> When complete, the grunt command will output a `kendo.custom.min.js` file in the `src/dist` directory.

> The grunt build task **automatically resolves** the needed dependencies for each component, so you don't have to list them.

## Include Individual Widget Scripts

The following script files, either minified or not, can be included on a per-widget basis.

- [Framework](#framework)
  - [AngularJS Directives](#angularjs-directives)
  - [MVVM](#mvvm)
  - [Core](#core)
  - [Data source](#data-source)
  - [Drag & drop](#drag-&-drop)
  - [Drawing API](#drawing-api)
  - [Effects](#effects)
  - [Router](#router)
  - [Sortable](#sortable)
  - [View](#view)
- [Web](#web)
  - [AutoComplete](#autocomplete)
  - [Button](#button)
  - [Calendar](#calendar)
  - [Color tools](#color-tools)
  - [ComboBox](#combobox)
  - [DatePicker](#datepicker)
  - [DateTimePicker](#datetimepicker)
  - [DropDownList](#dropdownlist)
  - [Editor](#editor)
  - [Gantt](#gantt)
  - [Grid](#grid)
  - [ListView](#listview)
  - [MaskedTextBox](#maskedtextbox)
  - [Menu](#menu)
  - [MultiSelect](#multiselect)
  - [Notification](#notification)
  - [NumericTextBox](#numerictextbox)
  - [PanelBar](#panelbar)
  - [PivotGrid](#pivotgrid)
  - [ProgressBar](#progressbar)
  - [Scheduler](#scheduler)
  - [Slider](#slider)
  - [Splitter](#splitter)
  - [TabStrip](#tabstrip)
  - [TimePicker](#timepicker)
  - [ToolBar](#toolbar)
  - [Tooltip](#tooltip)
  - [TreeList](#treelist)
  - [TreeView](#treeview)
  - [Upload](#upload)
  - [Validator](#validator)
  - [Window](#window)
- [DataViz](#dataviz)
  - [Barcode](#barcode)
  - [Chart](#chart)
  - [Diagram](#diagram)
  - [Gauge](#gauge)
  - [Map](#map)
  - [QRCode](#qrcode)
  - [Sparkline](#sparkline)
  - [StockChart](#stockchart)
  - [TreeMap](#treemap)
- [Mobile](#mobile)
  - [ActionSheet](#actionsheet)
  - [Application](#application)
  - [Button](#button-1)
  - [ButtonGroup](#buttongroup)
  - [Drawer](#drawer)
  - [ListView](#listview-1)
  - [ModalView](#modalview)
  - [NavBar](#navbar)
  - [PopOver](#popover)
  - [Scroller](#scroller)
  - [ScrollView](#scrollview)
  - [SplitView](#splitview)
  - [Switch](#switch)
  - [TabStrip](#tabstrip-1)
  - [Touch](#touch)
- [Server Wrappers](#server-wrappers)
  - [ASP.NET MVC](#aspnet-mvc)

## Framework

Shared components providing behaviors, data access and other services
### AngularJS Directives
1. jquery.js
1. kendo.core.js
1. kendo.angular.js

### MVVM
1. jquery.js
1. kendo.core.js
1. kendo.data.js
1. kendo.binder.js

### Core
1. jquery.js
1. kendo.core.js

### Data source
1. jquery.js
1. kendo.core.js
1. kendo.data.odata.js (OData feature)
1. kendo.data.xml.js (XML feature)
1. kendo.data.js

### Drag & drop
1. jquery.js
1. kendo.core.js
1. kendo.userevents.js
1. kendo.draganddrop.js

### Drawing API
1. jquery.js
1. kendo.core.js
1. kendo.color.js
1. kendo.pdf.js (PDF export feature)
1. kendo.drawing.js

### Effects
1. jquery.js
1. kendo.core.js
1. kendo.fx.js

### Router
1. jquery.js
1. kendo.core.js
1. kendo.router.js

### Sortable
1. jquery.js
1. kendo.core.js
1. kendo.userevents.js
1. kendo.draganddrop.js
1. kendo.sortable.js

### View
1. jquery.js
1. kendo.core.js
1. kendo.data.js
1. kendo.binder.js
1. kendo.fx.js
1. kendo.view.js


## Web

Desktop UI Widgets for mobile-ready Web Sites and Applications
### AutoComplete
1. jquery.js
1. kendo.core.js
1. kendo.data.js
1. kendo.popup.js
1. kendo.list.js
1. kendo.fx.js (Mobile scroller feature)
1. kendo.userevents.js (Mobile scroller feature)
1. kendo.draganddrop.js (Mobile scroller feature)
1. kendo.mobile.scroller.js (Mobile scroller feature)
1. kendo.autocomplete.js

### Button
1. jquery.js
1. kendo.core.js
1. kendo.button.js

### Calendar
1. jquery.js
1. kendo.core.js
1. kendo.calendar.js

### Color tools
1. jquery.js
1. kendo.core.js
1. kendo.color.js
1. kendo.popup.js
1. kendo.userevents.js
1. kendo.draganddrop.js
1. kendo.slider.js
1. kendo.colorpicker.js

### ComboBox
1. jquery.js
1. kendo.core.js
1. kendo.data.js
1. kendo.popup.js
1. kendo.list.js
1. kendo.fx.js (Mobile scroller feature)
1. kendo.userevents.js (Mobile scroller feature)
1. kendo.draganddrop.js (Mobile scroller feature)
1. kendo.mobile.scroller.js (Mobile scroller feature)
1. kendo.combobox.js

### DatePicker
1. jquery.js
1. kendo.core.js
1. kendo.calendar.js
1. kendo.popup.js
1. kendo.datepicker.js

### DateTimePicker
1. jquery.js
1. kendo.core.js
1. kendo.calendar.js
1. kendo.popup.js
1. kendo.datepicker.js
1. kendo.timepicker.js
1. kendo.datetimepicker.js

### DropDownList
1. jquery.js
1. kendo.core.js
1. kendo.data.js
1. kendo.popup.js
1. kendo.list.js
1. kendo.fx.js (Mobile scroller feature)
1. kendo.userevents.js (Mobile scroller feature)
1. kendo.draganddrop.js (Mobile scroller feature)
1. kendo.mobile.scroller.js (Mobile scroller feature)
1. kendo.dropdownlist.js

### Editor
1. jquery.js
1. kendo.core.js
1. kendo.data.js
1. kendo.popup.js
1. kendo.list.js
1. kendo.combobox.js
1. kendo.dropdownlist.js
1. kendo.userevents.js
1. kendo.draganddrop.js
1. kendo.window.js
1. kendo.color.js
1. kendo.slider.js
1. kendo.colorpicker.js
1. kendo.selectable.js (Image Browser feature)
1. kendo.listview.js (Image Browser feature)
1. kendo.upload.js (Image Browser feature)
1. kendo.filebrowser.js (Image Browser feature)
1. kendo.imagebrowser.js (Image Browser feature)
1. kendo.editor.js

### Gantt
1. jquery.js
1. kendo.core.js
1. kendo.data.js
1. kendo.popup.js
1. kendo.userevents.js
1. kendo.draganddrop.js
1. kendo.resizable.js
1. kendo.window.js
1. kendo.dom.js
1. kendo.touch.js
1. kendo.columnsorter.js
1. kendo.calendar.js
1. kendo.datepicker.js
1. kendo.timepicker.js
1. kendo.datetimepicker.js
1. kendo.numerictextbox.js
1. kendo.validator.js
1. kendo.binder.js
1. kendo.editable.js
1. kendo.gantt.list.js
1. kendo.gantt.timeline.js
1. kendo.grid.js
1. kendo.gantt.js

### Grid
1. jquery.js
1. kendo.core.js
1. kendo.data.js
1. kendo.columnsorter.js
1. kendo.calendar.js (Editing feature)
1. kendo.popup.js (Editing feature)
1. kendo.datepicker.js (Editing feature)
1. kendo.userevents.js (Editing feature)
1. kendo.numerictextbox.js (Editing feature)
1. kendo.validator.js (Editing feature)
1. kendo.binder.js (Editing feature)
1. kendo.editable.js (Editing feature)
1. kendo.draganddrop.js (Editing feature)
1. kendo.window.js (Editing feature)
1. kendo.calendar.js (Filtering feature)
1. kendo.popup.js (Filtering feature)
1. kendo.datepicker.js (Filtering feature)
1. kendo.userevents.js (Filtering feature)
1. kendo.numerictextbox.js (Filtering feature)
1. kendo.list.js (Filtering feature)
1. kendo.dropdownlist.js (Filtering feature)
1. kendo.filtermenu.js (Filtering feature)
1. kendo.popup.js (Column menu feature)
1. kendo.calendar.js (Column menu feature)
1. kendo.datepicker.js (Column menu feature)
1. kendo.userevents.js (Column menu feature)
1. kendo.numerictextbox.js (Column menu feature)
1. kendo.list.js (Column menu feature)
1. kendo.dropdownlist.js (Column menu feature)
1. kendo.filtermenu.js (Column menu feature)
1. kendo.menu.js (Column menu feature)
1. kendo.columnmenu.js (Column menu feature)
1. kendo.userevents.js (Grouping feature)
1. kendo.draganddrop.js (Grouping feature)
1. kendo.groupable.js (Grouping feature)
1. kendo.popup.js (Row filter feature)
1. kendo.list.js (Row filter feature)
1. kendo.autocomplete.js (Row filter feature)
1. kendo.filtercell.js (Row filter feature)
1. kendo.pager.js (Paging feature)
1. kendo.userevents.js (Selection feature)
1. kendo.selectable.js (Selection feature)
1. kendo.userevents.js (Column reordering feature)
1. kendo.draganddrop.js (Column reordering feature)
1. kendo.reorderable.js (Column reordering feature)
1. kendo.userevents.js (Column resizing feature)
1. kendo.draganddrop.js (Column resizing feature)
1. kendo.resizable.js (Column resizing feature)
1. kendo.popup.js (Grid adaptive rendering feature)
1. kendo.fx.js (Grid adaptive rendering feature)
1. kendo.userevents.js (Grid adaptive rendering feature)
1. kendo.draganddrop.js (Grid adaptive rendering feature)
1. kendo.mobile.scroller.js (Grid adaptive rendering feature)
1. kendo.binder.js (Grid adaptive rendering feature)
1. kendo.view.js (Grid adaptive rendering feature)
1. kendo.mobile.view.js (Grid adaptive rendering feature)
1. kendo.mobile.loader.js (Grid adaptive rendering feature)
1. kendo.mobile.pane.js (Grid adaptive rendering feature)
1. kendo.mobile.popover.js (Grid adaptive rendering feature)
1. kendo.mobile.shim.js (Grid adaptive rendering feature)
1. kendo.mobile.actionsheet.js (Grid adaptive rendering feature)
1. kendo.ooxml.js (Excel export feature)
1. kendo.excel.js (Excel export feature)
1. kendo.pdf.js (PDF export feature)
1. kendo.color.js (PDF export feature)
1. kendo.drawing.js (PDF export feature)
1. kendo.grid.js

### ListView
1. jquery.js
1. kendo.core.js
1. kendo.data.js
1. kendo.calendar.js (Editing feature)
1. kendo.popup.js (Editing feature)
1. kendo.datepicker.js (Editing feature)
1. kendo.userevents.js (Editing feature)
1. kendo.numerictextbox.js (Editing feature)
1. kendo.validator.js (Editing feature)
1. kendo.binder.js (Editing feature)
1. kendo.editable.js (Editing feature)
1. kendo.userevents.js (Selection feature)
1. kendo.selectable.js (Selection feature)
1. kendo.listview.js

### MaskedTextBox
1. jquery.js
1. kendo.core.js
1. kendo.maskedtextbox.js

### Menu
1. jquery.js
1. kendo.core.js
1. kendo.popup.js
1. kendo.menu.js

### MultiSelect
1. jquery.js
1. kendo.core.js
1. kendo.data.js
1. kendo.popup.js
1. kendo.list.js
1. kendo.fx.js (Mobile scroller feature)
1. kendo.userevents.js (Mobile scroller feature)
1. kendo.draganddrop.js (Mobile scroller feature)
1. kendo.mobile.scroller.js (Mobile scroller feature)
1. kendo.multiselect.js

### Notification
1. jquery.js
1. kendo.core.js
1. kendo.popup.js
1. kendo.notification.js

### NumericTextBox
1. jquery.js
1. kendo.core.js
1. kendo.userevents.js
1. kendo.numerictextbox.js

### PanelBar
1. jquery.js
1. kendo.core.js
1. kendo.panelbar.js

### PivotGrid
1. jquery.js
1. kendo.core.js
1. kendo.dom.js
1. kendo.data.js
1. kendo.data.xml.js
1. kendo.userevents.js
1. kendo.draganddrop.js
1. kendo.sortable.js
1. kendo.popup.js (Configurator feature)
1. kendo.list.js (Configurator feature)
1. kendo.dropdownlist.js (Configurator feature)
1. kendo.treeview.js (Configurator feature)
1. kendo.menu.js (Configurator feature)
1. kendo.window.js (Configurator feature)
1. kendo.pivot.fieldmenu.js (Configurator feature)
1. kendo.pivot.configurator.js (Configurator feature)
1. kendo.popup.js (Filtering feature)
1. kendo.menu.js (Filtering feature)
1. kendo.window.js (Filtering feature)
1. kendo.treeview.js (Filtering feature)
1. kendo.list.js (Filtering feature)
1. kendo.dropdownlist.js (Filtering feature)
1. kendo.pivot.fieldmenu.js (Filtering feature)
1. kendo.ooxml.js (Excel export feature)
1. kendo.pdf.js (PDF export feature)
1. kendo.color.js (PDF export feature)
1. kendo.drawing.js (PDF export feature)
1. kendo.fx.js (Mobile scroller feature)
1. kendo.mobile.scroller.js (Mobile scroller feature)
1. kendo.pivotgrid.js

### ProgressBar
1. jquery.js
1. kendo.core.js
1. kendo.progressbar.js

### Scheduler
1. jquery.js
1. kendo.core.js
1. kendo.data.js
1. kendo.popup.js
1. kendo.list.js
1. kendo.dropdownlist.js
1. kendo.calendar.js
1. kendo.datepicker.js
1. kendo.userevents.js
1. kendo.numerictextbox.js
1. kendo.validator.js
1. kendo.binder.js
1. kendo.editable.js
1. kendo.multiselect.js
1. kendo.draganddrop.js
1. kendo.window.js
1. kendo.scheduler.recurrence.js
1. kendo.scheduler.view.js
1. kendo.scheduler.dayview.js (Scheduler Day View feature)
1. kendo.scheduler.agendaview.js (Scheduler Agenda View feature)
1. kendo.scheduler.monthview.js (Scheduler Month View feature)
1. kendo.scheduler.timelineview.js (Scheduler Timeline View feature)
1. kendo.fx.js (Scheduler adaptive rendering feature)
1. kendo.mobile.scroller.js (Scheduler adaptive rendering feature)
1. kendo.view.js (Scheduler adaptive rendering feature)
1. kendo.mobile.view.js (Scheduler adaptive rendering feature)
1. kendo.mobile.loader.js (Scheduler adaptive rendering feature)
1. kendo.mobile.pane.js (Scheduler adaptive rendering feature)
1. kendo.mobile.popover.js (Scheduler adaptive rendering feature)
1. kendo.mobile.shim.js (Scheduler adaptive rendering feature)
1. kendo.mobile.actionsheet.js (Scheduler adaptive rendering feature)
1. kendo.pdf.js (PDF export feature)
1. kendo.color.js (PDF export feature)
1. kendo.drawing.js (PDF export feature)
1. kendo.scheduler.js

### Slider
1. jquery.js
1. kendo.core.js
1. kendo.userevents.js
1. kendo.draganddrop.js
1. kendo.slider.js

### Splitter
1. jquery.js
1. kendo.core.js
1. kendo.userevents.js
1. kendo.draganddrop.js
1. kendo.resizable.js
1. kendo.splitter.js

### TabStrip
1. jquery.js
1. kendo.core.js
1. kendo.data.js
1. kendo.tabstrip.js

### TimePicker
1. jquery.js
1. kendo.core.js
1. kendo.popup.js
1. kendo.timepicker.js

### ToolBar
1. jquery.js
1. kendo.core.js
1. kendo.toolbar.js

### Tooltip
1. jquery.js
1. kendo.core.js
1. kendo.popup.js
1. kendo.tooltip.js

### TreeList
1. jquery.js
1. kendo.core.js
1. kendo.dom.js
1. kendo.data.js
1. kendo.columnsorter.js (Sorting feature)
1. kendo.calendar.js (Filtering feature)
1. kendo.popup.js (Filtering feature)
1. kendo.datepicker.js (Filtering feature)
1. kendo.userevents.js (Filtering feature)
1. kendo.numerictextbox.js (Filtering feature)
1. kendo.list.js (Filtering feature)
1. kendo.dropdownlist.js (Filtering feature)
1. kendo.filtermenu.js (Filtering feature)
1. kendo.calendar.js (Editing feature)
1. kendo.popup.js (Editing feature)
1. kendo.datepicker.js (Editing feature)
1. kendo.userevents.js (Editing feature)
1. kendo.numerictextbox.js (Editing feature)
1. kendo.validator.js (Editing feature)
1. kendo.binder.js (Editing feature)
1. kendo.editable.js (Editing feature)
1. kendo.draganddrop.js (Editing feature)
1. kendo.window.js (Editing feature)
1. kendo.userevents.js (Selection feature)
1. kendo.selectable.js (Selection feature)
1. kendo.ooxml.js (Excel export feature)
1. kendo.excel.js (Excel export feature)
1. kendo.pdf.js (PDF export feature)
1. kendo.color.js (PDF export feature)
1. kendo.drawing.js (PDF export feature)
1. kendo.treelist.js

### TreeView
1. jquery.js
1. kendo.core.js
1. kendo.data.js
1. kendo.userevents.js
1. kendo.draganddrop.js
1. kendo.treeview.js

### Upload
1. jquery.js
1. kendo.core.js
1. kendo.upload.js

### Validator
1. jquery.js
1. kendo.core.js
1. kendo.validator.js

### Window
1. jquery.js
1. kendo.core.js
1. kendo.userevents.js
1. kendo.draganddrop.js
1. kendo.window.js


## DataViz

Data Visualization Widgets for Desktop and Mobile web apps
### Barcode
1. jquery.js
1. kendo.core.js
1. kendo.color.js
1. kendo.drawing.js
1. kendo.dataviz.core.js
1. kendo.dataviz.barcode.js

### Chart
1. jquery.js
1. kendo.core.js
1. kendo.data.js
1. kendo.userevents.js
1. kendo.color.js
1. kendo.drawing.js
1. kendo.dataviz.core.js
1. kendo.dataviz.themes.js
1. kendo.dataviz.chart.js (Polar & Radar feature)
1. kendo.dataviz.chart.polar.js (Polar & Radar feature)
1. kendo.dataviz.chart.js (Funnel chart feature)
1. kendo.dataviz.chart.funnel.js (Funnel chart feature)
1. kendo.pdf.js (PDF export feature)
1. kendo.dataviz.chart.js

### Diagram
1. jquery.js
1. kendo.core.js
1. kendo.data.js
1. kendo.userevents.js
1. kendo.fx.js
1. kendo.draganddrop.js
1. kendo.mobile.scroller.js
1. kendo.color.js
1. kendo.drawing.js
1. kendo.dataviz.core.js
1. kendo.dataviz.themes.js
1. kendo.toolbar.js
1. kendo.pdf.js (PDF export feature)
1. kendo.calendar.js (Editing feature)
1. kendo.popup.js (Editing feature)
1. kendo.datepicker.js (Editing feature)
1. kendo.numerictextbox.js (Editing feature)
1. kendo.validator.js (Editing feature)
1. kendo.binder.js (Editing feature)
1. kendo.editable.js (Editing feature)
1. kendo.window.js (Editing feature)
1. kendo.list.js (Editing feature)
1. kendo.dropdownlist.js (Editing feature)
1. kendo.dataviz.diagram.js

### Gauge
1. jquery.js
1. kendo.core.js
1. kendo.color.js
1. kendo.drawing.js
1. kendo.dataviz.core.js
1. kendo.dataviz.themes.js
1. kendo.dataviz.gauge.js

### Map
1. jquery.js
1. kendo.core.js
1. kendo.data.js
1. kendo.userevents.js
1. kendo.popup.js
1. kendo.tooltip.js
1. kendo.color.js
1. kendo.drawing.js
1. kendo.dataviz.core.js
1. kendo.fx.js
1. kendo.draganddrop.js
1. kendo.mobile.scroller.js
1. kendo.dataviz.map.js

### QRCode
1. jquery.js
1. kendo.core.js
1. kendo.color.js
1. kendo.drawing.js
1. kendo.dataviz.core.js
1. kendo.dataviz.qrcode.js

### Sparkline
1. jquery.js
1. kendo.core.js
1. kendo.data.js
1. kendo.userevents.js
1. kendo.color.js
1. kendo.drawing.js
1. kendo.dataviz.core.js
1. kendo.dataviz.themes.js
1. kendo.dataviz.chart.js
1. kendo.dataviz.sparkline.js

### StockChart
1. jquery.js
1. kendo.core.js
1. kendo.data.js
1. kendo.userevents.js
1. kendo.color.js
1. kendo.drawing.js
1. kendo.dataviz.core.js
1. kendo.dataviz.themes.js
1. kendo.dataviz.chart.js
1. kendo.dataviz.stockchart.js

### TreeMap
1. jquery.js
1. kendo.core.js
1. kendo.data.js
1. kendo.userevents.js
1. kendo.color.js
1. kendo.drawing.js
1. kendo.dataviz.core.js
1. kendo.dataviz.themes.js
1. kendo.dataviz.treeMap.js


## Mobile

Framework and Widgets for Mobile Applications
### ActionSheet
1. jquery.js
1. kendo.core.js
1. kendo.popup.js
1. kendo.fx.js
1. kendo.userevents.js
1. kendo.draganddrop.js
1. kendo.mobile.scroller.js
1. kendo.data.js
1. kendo.binder.js
1. kendo.view.js
1. kendo.mobile.view.js
1. kendo.mobile.loader.js
1. kendo.mobile.pane.js
1. kendo.mobile.popover.js
1. kendo.mobile.shim.js
1. kendo.mobile.actionsheet.js

### Application
1. jquery.js
1. kendo.core.js
1. kendo.fx.js
1. kendo.userevents.js
1. kendo.draganddrop.js
1. kendo.mobile.scroller.js
1. kendo.data.js
1. kendo.binder.js
1. kendo.view.js
1. kendo.mobile.view.js
1. kendo.mobile.loader.js
1. kendo.mobile.pane.js
1. kendo.router.js
1. kendo.mobile.application.js

### Button
1. jquery.js
1. kendo.core.js
1. kendo.userevents.js
1. kendo.mobile.button.js

### ButtonGroup
1. jquery.js
1. kendo.core.js
1. kendo.mobile.buttongroup.js

### Drawer
1. jquery.js
1. kendo.core.js
1. kendo.fx.js
1. kendo.userevents.js
1. kendo.draganddrop.js
1. kendo.mobile.scroller.js
1. kendo.data.js
1. kendo.binder.js
1. kendo.view.js
1. kendo.mobile.view.js
1. kendo.mobile.drawer.js

### ListView
1. jquery.js
1. kendo.core.js
1. kendo.data.js
1. kendo.userevents.js
1. kendo.mobile.button.js
1. kendo.mobile.listview.js

### ModalView
1. jquery.js
1. kendo.core.js
1. kendo.popup.js
1. kendo.mobile.shim.js
1. kendo.fx.js
1. kendo.userevents.js
1. kendo.draganddrop.js
1. kendo.mobile.scroller.js
1. kendo.data.js
1. kendo.binder.js
1. kendo.view.js
1. kendo.mobile.view.js
1. kendo.mobile.modalview.js

### NavBar
1. jquery.js
1. kendo.core.js
1. kendo.mobile.navbar.js

### PopOver
1. jquery.js
1. kendo.core.js
1. kendo.popup.js
1. kendo.fx.js
1. kendo.userevents.js
1. kendo.draganddrop.js
1. kendo.mobile.scroller.js
1. kendo.data.js
1. kendo.binder.js
1. kendo.view.js
1. kendo.mobile.view.js
1. kendo.mobile.loader.js
1. kendo.mobile.pane.js
1. kendo.mobile.popover.js

### Scroller
1. jquery.js
1. kendo.core.js
1. kendo.fx.js
1. kendo.userevents.js
1. kendo.draganddrop.js
1. kendo.mobile.scroller.js

### ScrollView
1. jquery.js
1. kendo.core.js
1. kendo.fx.js
1. kendo.data.js
1. kendo.userevents.js
1. kendo.draganddrop.js
1. kendo.mobile.scrollview.js

### SplitView
1. jquery.js
1. kendo.core.js
1. kendo.fx.js
1. kendo.userevents.js
1. kendo.draganddrop.js
1. kendo.mobile.scroller.js
1. kendo.data.js
1. kendo.binder.js
1. kendo.view.js
1. kendo.mobile.view.js
1. kendo.mobile.loader.js
1. kendo.mobile.pane.js
1. kendo.mobile.splitview.js

### Switch
1. jquery.js
1. kendo.core.js
1. kendo.fx.js
1. kendo.userevents.js
1. kendo.mobile.switch.js

### TabStrip
1. jquery.js
1. kendo.core.js
1. kendo.mobile.tabstrip.js

### Touch
1. jquery.js
1. kendo.core.js
1. kendo.userevents.js
1. kendo.touch.js


## Server Wrappers

Supplementary scripts for integration with server-side technologies
### ASP.NET MVC
1. jquery.js
1. kendo.core.js
1. kendo.data.js
1. kendo.popup.js
1. kendo.list.js
1. kendo.combobox.js
1. kendo.dropdownlist.js
1. kendo.multiselect.js
1. kendo.validator.js
1. kendo.aspnetmvc.js

