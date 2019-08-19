---
title: Introduction
page_title: Introduction | Progress Telerik UI for ASP.NET Core
description: "Download and install Progress Telerik UI for ASP.NET Core (aka MVC 6 or ASP.NET Core MVC), and run the sample application."
previous_url: /aspnetmvc-apps/mvc-6/introduction, /mvc-6/introduction
slug: overview_aspnetmvc6_aspnetmvc
position: 1
---

# Welcome to Telerik UI for ASP.NET Core

Thank you for choosing Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET Core!  

[UI for ASP.NET Core](https://www.telerik.com/aspnet-core-ui) is a set of server-side wrappers (HTML and Tag helpers) that allow you to use the Kendo UI widgets in .NET Core. From a client-side point of view, the vanilla HTML/JavaScript Kendo UI widgets and their ASP.NET Core helpers represent the same functionalities and provide the same capabilities.

The Telerik UI ASP.NET Core HTML and Tag helpers:
* Allow you to configure a Kendo UI widget through the C# or VB.NET code&mdash;for example, to set its value, data source, and so on.
* Render the HTML and JavaScript that are needed to initialize a Kendo UI widget whose options propagate to the client-side through its initialization script.

## Widgets vs. Helpers

The Kendo UI widgets:

* Allow for a complete server-platform independence.
* Provide full control over the placement of the initialization scripts.
* Support the integration with the [MVVM](http://docs.telerik.com/kendo-ui/framework/mvvm/overview), [AngularJS](http://docs.telerik.com/kendo-ui/framework/AngularJS/introduction), and [Single-Page Application](http://docs.telerik.com/kendo-ui/framework/spa/overview) development patterns.
* Support [Visual Studio IntelliSense](http://docs.telerik.com/kendo-ui/third-party/vs-intellisense) for the client-side API.

The UI for ASP.NET Core helpers:

* Allow you to create widgets with no HTML and JavaScript coding.
* Provide for server-side data binding and, in some cases, server-side rendering.
* Allow you to use the `ToDataSourceResult()` extension method for binding Kendo UI widgets to server-side collections and for performing data operations (paging, sorting, filtering, and grouping).
* Provide integration with some ASP.NET Core features such as security trimming and editor templates.
* Support unobtrusive validation based on Data Annotation attributes.
* Enable a simple implementation of CRUD operations.
* Support Visual Studio IntelliSense for the server-side configuration syntax.
* Enable Visual Studio Extensions for automatic creation of new Telerik UI ASP.NET Core applications and for automatic updating of the Telerik UI version.
* Enable you to use scaffolding to generate widget declarations and related controller action methods.

## Getting Started

<iframe width="853" height="480" src="https://www.youtube.com/embed/jAOZY9TZi78?list=PLvmaC-XMqeBaHWzU1zyFgaNi2pcuix6Ps" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

More resources on getting started with UI for ASP.NET Core:

* [First Steps with UI for ASP.NET Core on Visual Studio for Windows]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First Steps with UI for ASP.NET Core on Visual Studio for Mac]({% slug gettingstarted_firststeps_vsmac %})
* [First Steps with UI for ASP.NET Core with CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})

## Supported Environments

UI for ASP.NET Core targets the stable releases of the ASP.NET Core framework. The target runtime is [CoreCLR](https://github.com/dotnet/coreclr). The UI for ASP.NET Core suite also supports the full desktop CLR.

## List of Helpers

|Group                      |HTML Helpers                               |Tag Helpers   
| :---                      | :---                                      | :---                                         
| **Data Source**           |[DataSource HtmlHelper Demos](https://demos.telerik.com/aspnet-core/datasource/index)                      |[Data Source TagHelper Docs]({% slug taghelpers_datasource_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/datasource/tag-helper)
| **Data Management**       |[Grid HtmlHelper Docs]({% slug htmlhelpers_grid_aspnetcore_overview %}) & [Demos](https://demos.telerik.com/aspnet-core/grid/index)     |[Grid TagHelper Docs]({% slug taghelpers_grid_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/grid/tag-helper)
|                           |[ListView HtmlHelper Docs]({% slug htmlhelpers_listview_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/listview/index)    |N/A
|                           |[PivotGrid HtmlHelper Docs]({% slug overview_pivotgridhelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/pivotgrid/index)  |[PivotGrid TagHelper Docs]({% slug taghelpers_pivotgrid_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/pivotgrid/tag-helper)
|                           |[Spreadsheet HtmlHelper Docs]({% slug htmlhelpers_spreadsheet_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/spreadsheet/index) |[Spreadsheet TagHelper Docs]({% slug taghelpers_spreadsheet_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/spreadsheet/tag-helper)
|                           |[TreeList HtmlHelper Docs]({% slug htmlhelpers_treelist_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/treelist/index)   |[TreeList TagHelper Docs]({% slug taghelpers_treelist_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/treelist/tag-helper)
|**Editors**                |[AutoComplete HtmlHelper Docs]({% slug htmlhelpers_autocomplete_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/autocomplete/index)  |[AutoComplete TagHelper Docs]({% slug taghelpers_autocomplete_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/autocomplete/tag-helper)
|                           |[ColorPalette HtmlHelper Docs]({% slug overview_colorpalettehelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/colorpicker/palette)  |N/A
|                           |[ColorPicker HtmlHelper Docs]({% slug overview_colorpickerhelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/colorpicker/index)  |[ColorPicker TagHelper Docs]({% slug taghelpers_colorpicker_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/colorpicker/tag-helper)
|                           |[ComboBox HtmlHelper Docs]({% slug htmlhelpers_combobox_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/combobox/index)     |[ComboBox TagHelper Docs]({% slug taghelpers_combobox_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/combobox/tag-helper)
|                           |[DateInput HtmlHelper Docs]({% slug htmlhelpers_dateinput_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/dateinput/index)    |[DateInput TagHelper Docs]({% slug taghelpers_dateinput_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/dateinput/tag-helper)
|                           |[DatePicker HtmlHelper Docs]({% slug htmlhelpers_datepicker_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/datepicker/index)   |[DatePicker TagHelper Docs]({% slug taghelpers_datepicker_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/datepicker/tag-helper)
|                           |[DateRangePicker HtmlHelper Docs]({% slug htmlhelpers_daterangepicker_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/daterangepicker/index)  |N/A
|                           |[DateTimePicker HtmlHelper Docs]({% slug htmlhelpers_datetimepicker_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/datetimepicker/index)   |[DateTimePicker TagHelper Docs]({% slug taghelpers_datetimepicker_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/datetimepicker/tag-helper)
|                           |[DropDownList HtmlHelper Docs]({% slug htmlhelpers_dropdownlist_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/dropdownlist/index)     |[DropDownList TagHelper Docs]({% slug taghelpers_dropdownlist_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/dropdownlist/tag-helper)
|                           |[DropDownTree HtmlHelper Docs]({% slug htmlhelpers_dropdowntree_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/dropdowntree/index)    |[DropDownTree TagHelper Docs]({% slug taghelpers_dropdowntree_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/dropdowntree/tag-helper)
|                           |[Editor HtmlHelper Docs]({% slug htmlhelpers_editor_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/editor/index)           |[Editor TagHelper Docs]({% slug taghelpers_editor_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/editor/tag-helper)
|                           |[FlatColorPicker HtmlHelper Docs]({% slug overview_flatcolorpickerhelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/colorpicker/flatcolorpicker)  |N/A
|                           |[ListBox HtmlHelper Docs]({% slug htmlhelpers_listbox_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/listbox/index)          |[ListBox TagHelper Docs]({% slug taghelpers_listbox_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/listbox/tag-helper)
|                           |[MaskedTextBox HtmlHelper Docs]({% slug htmlhelpers_maskedtextbox_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/maskedtextbox/index)    |[MaskedTextBox TagHelper Docs]({% slug taghelpers_maskedtextbox_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/maskedtextbox/tag-helper)
|                           |[MultiColumnComboBox HtmlHelper Docs]({% slug htmlhelpers_multicolumncombobox_aspnetcore %})    |[MultiColumnComboBox TagHelper Docs]({% slug taghelpers_multicolumncombobox_aspnetcore %})
|                           |[MultiSelect HtmlHelper Docs]({% slug htmlhelpers_multiselect_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/multiselect/index)      |[MultiSelect TagHelper Docs]({% slug taghelpers_multiselect_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/multiselect/tag-helper)
|                           |[NumericTextBox HtmlHelper Docs]({% slug htmlhelpers_numerictextbox_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/numerictextbox/index)  |[NumericTextBox TagHelper Docs]({% slug taghelpers_numerictextbox_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/numerictextbox/tag-helper)
|                           |[Slider HtmlHelper Docs]({% slug overview_sliderhelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/slider/index)          |[Slider TagHelper Docs]({% slug taghelpers_slider_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/slider/tag-helper)
|                           |[Switch HtmlHelper Docs]({% slug overview_switchhelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/switch/index)         |[Switch TagHelper Docs]({% slug taghelpers_switch_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/switch/tag-helper)
|                           |[TimePicker HtmlHelper Docs]({% slug overview_timepickerhelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/timepicker/index)      |[TimePicker TagHelper Docs]({% slug taghelpers_timepicker_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/timepicker/tag-helper)
|                           |[Upload HtmlHelper Docs]({% slug htmlhelpers_upload_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/upload/index)          |[Upload TagHelper Docs]({% slug taghelpers_upload_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/upload/tag-helper)
|                           |[Validator HtmlHelper Demos](https://demos.telerik.com/aspnet-core/validator/index)                         |[Validator TagHelper Docs]({% slug taghelpers_validator_aspnetcore %})
|**Charts**                 |[Chart HtmlHelper Docs]({% slug areacharts_aspnetcore_htmlhelper %}) & [Demos](https://demos.telerik.com/aspnet-core/chart-api/index)            |[Chart TagHelper Docs]({% slug taghelpers_chart_aspnetcore %})
|                           |[StockChart HtmlHelper Docs]({% slug overview_stockcharthelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/financial/index)      |N/A
|                           |[TreeMap HtmlHelper Docs]({% slug overview_treemaphelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/treemap/index)         |[TreeMap TagHelper Docs]({% slug taghelpers_treemap_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/treemap/tag-helper)
|**Gauges**                 |[ArcGauge HtmlHelper Docs]({% slug overview_arcgaugehelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/arc-gauge/index)       |[ArcGauge TagHelper Docs]({% slug taghelpers_arcgauge_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/arc-gauge/tag-helper)
|                           |[LinearGauge HtmlHelper Docs]({% slug overview_lineargaugehelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/linear-gauge/index)     |[LinearGauge TagHelper Docs]({% slug taghelpers_lineargauge_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/linear-gauge/tag-helper)
|                           |[RadialGauge HtmlHelper Docs]({% slug overview_radialgaugehelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/radial-gauge/index)    |[RadialGauge TagHelper Docs]({% slug taghelpers_radialgauge_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/radial-gauge/tag-helper)
|**Barcodes**               |[Barcode HtmlHelper Docs]({% slug overview_barcodehelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/barcode/index)         |[Barcode TagHelper Docs]({% slug taghelpers_barcode_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/barcode/tag-helper)
|                           |[QRCode HtmlHelper Docs]({% slug overview_qrcodehelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/qrcode/index)         |[QRCode TagHelper Docs]({% slug taghelpers_qrcode_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/qrcode/tag-helper)
|**Diagrams and Maps**      |[Map HtmlHelper Docs]({% slug htmlhelpers_map_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/map/index)            |[Map TagHelper Docs]({% slug taghelpers_map_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/map/tag-helper)
|**Scheduling**             |[Calendar HtmlHelper Docs]({% slug overview_calendarhelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/calendar/index)       |[Calendar TagHelper Docs]({% slug taghelpers_calendar_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/calendar/tag-helper)
|                           |[Gantt HtmlHelper Docs]({% slug htmlhelpers_gantt_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/gantt/index)           |[Gantt TagHelper Docs]({% slug taghelpers_gantt_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/gantt/tag-helper)
|                           |[MultiViewCalendar HtmlHelper Docs]({% slug overview_multiviewcalendar_htmlhelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/multiviewcalendar/index)|[MultiViewCalendar TagHelper Docs]({% slug overview_multiviewcalendar_taghelper_aspnetcore %})
|                           |[Scheduler HtmlHelper Docs]({% slug htmlhelpers_scheduler_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/scheduler/index)       |[Scheduler TagHelper Docs]({% slug taghelpers_scheduler_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/scheduler/tag-helper)
|**Layout**                 |[Dialog HtmlHelper Docs]({% slug overview_dialoghelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/dialog/index)           |[Dialog TagHelper Docs]({% slug taghelpers_dialog_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/dialog/tag-helper)
|                           |[Notification HtmlHelper Docs]({% slug htmlhelpers_notification_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/notification/index)    |[Notification TagHelper Docs]({% slug taghelpers_notification_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/notification/tag-helper)
|                           |N/A    |[Popup TagHelper Docs]({% slug taghelpers_popup_aspnetcore %})
|                           |N/A    |[ResponsivePanel TagHelper Docs]({% slug taghelpers_responsivepanel_aspnetcore %})
|                           |[Splitter HtmlHelper Docs]({% slug htmlhelpers_splitter_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/splitter/index)      |[Splitter TagHelper Docs]({% slug taghelpers_splitter_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/splitter/tag-helper)
|                           |[Tooltip HtmlHelper Docs]({% slug htmlhelpers_tooltip_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/tooltip/index)         |[Tooltip TagHelper Docs]({% slug taghelpers_tooltip_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/tooltip/tag-helper)
|                           |[Window HtmlHelper Docs]({% slug htmlhelpers_window_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/window/index)          |[Window TagHelper Docs]({% slug taghelpers_window_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/window/tag-helper)
|**Navigation**             |[Button HtmlHelper Docs]({% slug htmlhelpers_button_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/button/index)          |[Button TagHelper Docs]({% slug taghelpers_button_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/button/tag-helper)
|                           |[ButtonGroup HtmlHelper Docs]({% slug htmlhelpers_buttongroup_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/buttongroup/index)      |[ButtonGroup TagHelper Docs]({% slug taghelpers_buttongroup_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/buttongroup/tag-helper)
|                           |[Drawer HtmlHelper Docs]({% slug htmlhelpers_drawer_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/drawer/index)         |[Drawer TagHelper Docs]({% slug taghelpers_drawer_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/drawer/tag-helper)
|                           |[Menu HtmlHelper Docs]({% slug htmlhelpers_menu_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/menu/index)            |[Menu TagHelper Docs]({% slug taghelpers_menu_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/menu/tag-helper)
|                           |[PanelBar HtmlHelper Docs]({% slug htmlhelpers_panelbar_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/panelbar/index)        |[PanelBar TagHelper Docs]({% slug taghelpers_panelbar_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/panelbar/tag-helper)
|                           |[RadioButton HtmlHelper Docs]({% slug htmlhelpers_radiobutton_aspnetcore %})     |N/A
|                           |[TabStrip HtmlHelper Docs]({% slug htmlhelpers_tabstrip_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/tabstrip/index)         |[TabStrip TagHelper Docs]({% slug taghelpers_tabstrip_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/tabstrip/tag-helper)
|                           |[ToolBar HtmlHelper Docs]({% slug htmlhelpers_toolbar_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/toolbar/index)          |[ToolBar TagHelper Docs]({% slug taghelpers_toolbar_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/toolbar/tag-helper)
|                           |[TreeView HtmlHelper Docs]({% slug htmlhelpers_treeview_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/treeview/index)        |[TreeView TagHelper Docs]({% slug taghelpers_treeview_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/treeview/tag-helper)
|**Conversational UI**      |[Chat HtmlHelper Docs]({% slug htmlhelpers_chat_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/chat/index)             |[Chat TagHelper Docs]({% slug taghelpers_chat_aspnetcore %})
|**Interactivity and UX**   |[DragAndDrop HtmlHelper Demos](https://demos.telerik.com/aspnet-core/dragdrop/index)                                             |[DragAndDrop TagHelper Docs]({% slug taghelpers_dragdrop_aspnetcore %})
|                           |[ProgressBar HtmlHelper Docs]({% slug htmlhelpers_progressbar_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/progressbar/index)      |[ProgressBar TagHelper Docs]({% slug taghelpers_progressbar_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/progressbar/tag-helper)
|                           |[Sortable HtmlHelper Docs]({% slug htmlhelpers_sortable_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/sortable/index)         |[Sortable TagHelper Docs]({% slug taghelpers_sortable_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/sortable/tag-helper)
|**Media**                  |[MediaPLayer HtmlHelper Docs]({% slug htmlhelpers_mediaplayer_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/mediaplayer/index)      |N/A
|                           |[ScrollView HtmlHelper Docs]({% slug htmlhelpers_scrollview_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/scrollview/index)       |[ScrollView TagHelper Docs]({% slug taghelpers_scrollview_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/scrollview/tag-helper)
|**PDF**                    |[PDFViewer HtmlHelper Docs]({% slug htmlhelpers_pdfviewer_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/pdfviewer/index)        |[PDFViewer TagHelper Docs]({% slug taghelpers_pdfviewer_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/pdfviewer/tag-helper)

## Monitoring the Progress Live Services

Progress provides up-to-date information about the live services it delivers to its customers on a daily basis&mdash;for example, the Kendo UI CDN services, Kendo UI Dojo playground, and Telerik NuGet feed.

* [Progress<sup>®</sup> Telerik<sup>®</sup> Live Services Status Page](http://status.telerik.com/)

## Trial Version and Commercial License

This UI for ASP.NET Core library is a commercial UI library. You are welcome to explore its full functionality and get technical support from the team when you register for a free 30-day trial. To use it commercially, you need to [purchase a license](https://www.telerik.com/purchase/kendo-ui). Feel free to review the Telerik UI for ASP.NET Core [License Agreement](https://www.telerik.com/purchase/license-agreement/kendo-ui) to get acquainted with the full terms of use.

## Support Options

For any issues you might encounter while working with UI for ASP.NET Core, use any of the available support channels:

* UI for ASP.NET Core license holders and active trialists can take advantage of the outstanding customer support delivered by the developers building the library. To submit a support ticket, use the [UI for ASP.NET Core dedicated support](https://www.telerik.com/account/support-tickets/) system.
* [UI for ASP.NET Core forums](https://www.telerik.com/forums/aspnet-core-ui) are part of the free support you can get from the community and from the UI for ASP.NET Core team on all kinds of general issues.
* [UI for ASP.NET Core feedback portal](https://feedback.telerik.com/aspnet-core-ui) and [UI for ASP.NET Core roadmap](https://www.telerik.com/support/whats-new/kendo-ui/roadmap) provide information on the features in discussion and also the planned ones for release.
* You may still need a tailor-made solution for your project. In such cases, go straight to [Progress Services](https://www.progress.com/services).

## Learning Resources

* [Virtual Classroom](https://progress.exceedlms.com/student/path/369634-telerik-asp-net-mvc-net-core)
* [Knowledge Base](https://docs.telerik.com/aspnet-core/knowledge-base.html)
* [Support Resources Hub Page](https://www.telerik.com/support/aspnet-core)

## Next Steps

* [First steps on Visual Studio for Windows (online guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First steps on Visual Studio for Mac (online guide)]({% slug gettingstarted_firststeps_vsmac %})
* [First steps with CLI (online guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Including client-side resources]({% slug copyclientresources_aspnetmvc6_aspnetmvc %})
* [Integrating UI for ASP.NET Core in Visual Studio]({% slug overview_visualstudio_aspnetcore %})
* [Upgrading UI for ASP.NET Core in Visual Studio]({% slug upgrade_aspnetcore %})
