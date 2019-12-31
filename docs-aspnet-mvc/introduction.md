---
title: Introduction
page_title: Introduction | Progress Telerik UI for ASP.NET MVC
description: "Download and install Progress Telerik UI for ASP.NET MVC, and run a sample application."
previous_url: /getting-started/kendo-ui-vs-mvc-wrappers
slug: overview_aspnetmvc
position: 1
---

# Welcome to Telerik UI for ASP.NET MVC

Thank you for choosing Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET MVC!  

Telerik UI for ASP.NET MVC is a set of server-side wrappers (HTML helpers) that allow you to use the Kendo UI widgets in .NET MVC. From a client-side point of view, the vanilla HTML/JavaScript Kendo UI widgets and their ASP.NET MVC helpers represent the same functionalities and provide the same capabilities.

The Telerik UI ASP.NET MVC HTML helpers:
* Allow you to configure a Kendo UI widget through the C# or VB.NET code&mdash;for example, to set its value, data source, and so on.
* Render the HTML and JavaScript that are needed to initialize a Kendo UI widget whose options propagate to the client-side through its initialization script.

## Widgets vs. Helpers

The Kendo UI widgets:

* Allow for a complete server-platform independence.
* Provide full control over the placement of the initialization scripts.
* Support the integration with the [MVVM](http://docs.telerik.com/kendo-ui/framework/mvvm/overview), [AngularJS](http://docs.telerik.com/kendo-ui/framework/AngularJS/introduction), and [Single-Page Application](http://docs.telerik.com/kendo-ui/framework/spa/overview) development patterns.
* Support [Visual Studio IntelliSense](http://docs.telerik.com/kendo-ui/third-party/vs-intellisense) for the client-side API.

The UI for ASP.NET MVC helpers:

* Allow you to create widgets with no HTML and JavaScript coding.
* Provide for server-side data binding and, in some cases, server-side rendering.
* Allow you to use the `ToDataSourceResult()` extension method for binding Kendo UI widgets to server-side collections and for performing data operations (paging, sorting, filtering, and grouping).
* Provide integration with some ASP.NET MVC features such as security trimming and editor templates.
* Support unobtrusive validation based on Data Annotation attributes.
* Enable a simple implementation of CRUD operations.
* Support Visual Studio IntelliSense for the server-side configuration syntax.
* Enable Visual Studio Extensions for automatic creation of new Telerik UI ASP.NET MVC applications and for automatic updating of the Telerik UI version.
* Enable you to use scaffolding to generate widget declarations and related controller action methods.

## Getting Started

* [Telerik UI for ASP.NET MVC fundamentals]({% slug fundamentals_aspnetmvc %})
* [Installing Telerik UI for ASP.NET MVC with NuGet]({% slug aspnetmvc_nuget %})
* [Scaffolding the Telerik UI for ASP.NET MVC project]({% slug scaffolding_aspnetmvc %})
* [Integrating the Telerik UI for ASP.NET MVC project with Visual Studio]({% slug overview_visualstudio_aspnetmvc %})

## Supported Environments

Telerik UI for ASP.NET MVC supports:

* [.NET Framework v3.5](https://www.microsoft.com/en-us/download/details.aspx?id=21) and later.
* [ASP.NET MVC 3](http://www.asp.net/mvc/mvc3) and later.
* Visual Studio 2012 and later.
* [IIS 5](https://www.microsoft.com/en-us/download/details.aspx?id=24843) and later.
* [C#](https://msdn.microsoft.com/en-us/library/aa288436(v=vs.71).aspx)  and [VB.NET](http://www.tutorialspoint.com/vb.net/).
* [SharePoint 2010](https://msdn.microsoft.com/en-us/library/office/dd776256(v=office.12).aspx) and later.

The Telerik UI for ASP.NET MVC Visual Studio extensions support Visual Studio 2015 and later.

## List of Helpers

|Group                      |HTML Helpers                                 
| :---                      | :---                                                                            
| **Data Source**           |[DataSource Demos](https://demos.telerik.com/aspnet-mvc/datasource)                      
| **Data Management**       |[Filter Docs]({% slug overview_filterhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/filter)     
|                           |[Grid Docs]({% slug overview_gridhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/grid)     
|                           |[ListView Docs]({% slug overview_listviewhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/listview)    
|                           |[PivotGrid Docs]({% slug overview_pivotgridhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/pivotgrid)  
|                           |[Spreadsheet Docs]({% slug overview_spreadsheethelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/spreadsheet)
|                           |[TreeList Docs]({% slug overview_treelisthelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/treelist)   
|**Editors**                |[AutoComplete Docs]({% slug overview_autocompletehelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/autocomplete)  
|                           |[ColorPalette Docs]({% slug overview_colorpalettehelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/colorpicker/palette)  
|                           |[ColorPicker Docs]({% slug overview_colorpickerhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/colorpicker)  
|                           |[ComboBox Docs]({% slug overview_combobox_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/combobox)     
|                           |[DateInput Docs]({% slug overview_dateinputhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/dateinput)                               
|                           |[DatePicker Docs]({% slug overview_datepickerhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/datepicker)                              
|                           |[DateRangePicker Docs]({% slug overview_daterangepickerhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/daterangepicker)
|                           |[DateTimePicker Docs]({% slug overview_datetimepickerhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/datetimepicker)  
|                           |[DropDownList Docs]({% slug overview_dropdownlisthelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/dropdownlist)     
|                           |[DropDownTree Docs]({% slug overview_dropdowntreehelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/dropdowntree)    
|                           |[Editor Docs]({% slug overview_editorhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/editor)           
|                           |[FlatColorPicker Docs]({% slug overview_flatcolorpickerhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/colorpicker/flatcolorpicker)
|                           |[ListBox Docs]({% slug overview_listboxhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/listbox)          
|                           |[MaskedTextBox Docs]({% slug overview_maskedtextboxhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/maskedtextbox)   
|                           |[MultiColumnComboBox Docs]({% slug overview_multicolumncombobox_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/multicolumncombobox)   
|                           |[MultiSelect Docs]({% slug overview_multiselecthelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/multiselect)      
|                           |[NumericTextBox Docs]({% slug overview_numerictextboxhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/numerictextbox)
|                           |[Rating]({% slug overview_ratinghelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/rating)  
|                           |[Slider Docs]({% slug overview_sliderhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/slider)          
|                           |[Switch Docs]({% slug overview_switchhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/switch)
|                           |[TimePicker Docs]({% slug overview_timepickerhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/timepicker)      
|                           |[Upload Docs]({% slug overview_uploadhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/upload)                    
|                           |[Validator Demos](https://demos.telerik.com/aspnet-mvc/validator)                    
|**Charts**                 |[Chart Docs]({% slug overview_charthelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/chart-api)           
|                           |[StockChart Docs]({% slug overview_stockcharthelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/financial)     
|                           |[TreeMap Docs]({% slug overview_treemaphelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/treemap)         
|**Gauges**                 |[ArcGauge Docs]({% slug overview_arcgaugehelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/arc-gauge)       
|                           |[LinearGauge Docs]({% slug overview_lineargaugehelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/linear-gauge)     
|                           |[RadialGauge Docs]({% slug overview_radialgaugehelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/radial-gauge)    
|**Barcodes**               |[Barcode Docs]({% slug overview_barcodehelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/barcode)         
|                           |[QRCode Docs]({% slug overview_qrcodehelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/qrcode)         
|**Diagrams and Maps**      |[Diagram Docs]({% slug overview_diagramhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/diagram)            
|                           |[Map Docs]({% slug overview_maphelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/map)            
|**Scheduling**             |[Calendar Docs]({% slug overview_calendarhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/calendar)       
|                           |[Gantt Docs]({% slug overview_gantthelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/gantt)          
|                           |[MultiViewCalendar Docs]({% slug overview_multiviewcalendar_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/multiviewcalendar)
|                           |[Scheduler Docs]({% slug overview_schedulerhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/scheduler)       
|**Layout**                 |[Dialog Docs]({% slug overview_dialoghelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/dialog)           
|                           |[Notification Docs]({% slug overview_notificatiomhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/notification)    
|                           |[ResponsivePanel Demos](https://demos.telerik.com/aspnet-mvc/responsive-panel)      
|                           |[Splitter Docs]({% slug overview_splitterhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/splitter)      
|                           |[Tooltip Docs]({% slug overview_tooltiphelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/tooltip)         
|                           |[Window Docs]({% slug overview_windowhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/window)          
|**Navigation**             |[Button Docs]({% slug overview_buttonhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/button)          
|                           |[ButtonGroup Docs]({% slug overview_buttongrouphelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/buttongroup)     
|                           |[Drawer Docs]({% slug htmlhelpers_drawer_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/drawer)         
|                           |[Menu Docs]({% slug overview_menu_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/menu)            
|                           |[PanelBar Docs]({% slug overview_panelbarhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/panelbar)     
|                           |[RadioButton Docs]({% slug overview_radiobuttonhelper_aspnetmvc %})     
|                           |[TabStrip Docs]({% slug overview_tabstrip_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/tabstrip)         
|                           |[Timeline Docs]({% slug overview_timeline_aspnetmvc %})    
|                           |[ToolBar Docs]({% slug overview_toolbarhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/toolbar)      
|                           |[TreeView Docs]({% slug overview_treeviewhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/treeview)        
|**Conversational UI**      |[Chat Docs]({% slug overview_chathelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/chat)             
|**Interactivity and UX**   |[ProgressBar Docs]({% slug overview_progressbarhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/progressbar)      
|                           |[Sortable Docs]({% slug overview_sortablehelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/sortable)         
|**Media**                  |[MediaPLayer Docs]({% slug overview_mediaplayerhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/mediaplayer)      
|                           |[ScrollView Docs]({% slug htmlhelpers_scrollview_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/scrollview)       
|**PDF**                    |[PDFViewer Docs]({% slug overview_pdfviewerhelper_aspnetmvc %}) & [Demos](https://demos.telerik.com/aspnet-mvc/pdfviewer)        
|**Hybrid UI**              |[Hybrid UI Docs]({% slug overview_pdfviewerhelper_aspnetmvc %})         

## Monitoring the Progress Live Services

Progress provides up-to-date information about the live services it delivers to its customers on a daily basis&mdash;for example, the Kendo UI CDN services, Kendo UI Dojo playground, and Telerik NuGet feed.

* [Progress<sup>®</sup> Telerik<sup>®</sup> Live Services Status Page](http://status.telerik.com/)

## Trial Version and Commercial License

This UI for ASP.NET MVC library is a commercial UI library. You are welcome to explore its full functionality and get technical support from the team when you register for a free 30-day trial. To use it commercially, you need to [purchase a license](https://www.telerik.com/purchase/kendo-ui). Feel free to review the Telerik UI for ASP.NET MVC [License Agreement](https://www.telerik.com/purchase/license-agreement/kendo-ui) to get acquainted with the full terms of use.

## Support Options

For any issues you might encounter while working with UI for ASP.NET MVC, use any of the available support channels:

* UI for ASP.NET MVC license holders and active trialists can take advantage of the outstanding customer support delivered by the developers building the library. To submit a support ticket, use the [UI for ASP.NET MVC dedicated support](https://www.telerik.com/account/support-tickets/) system.
* [UI for ASP.NET MVC forums](https://www.telerik.com/forums/aspnet-mvc) are part of the free support you can get from the community and from the UI for ASP.NET MVC team on all kinds of general issues.
* [UI for ASP.NET MVC feedback portal](https://feedback.telerik.com/aspnet-mvc) and [UI for ASP.NET MVC roadmap](https://www.telerik.com/support/whats-new/kendo-ui/roadmap) provide information on the features in discussion and also the planned ones for release.
* You may still need a tailor-made solution for your project. In such cases, go straight to [Progress Services](https://www.progress.com/services).

## Learning Resources

* [Virtual Classroom](https://progress.exceedlms.com/student/path/369634-telerik-asp-net-mvc-net-core)
* [Tutorials]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Support Resources Hub Page](https://www.telerik.com/support/aspnet-mvc)
* [Collected Examples on ASP.NET MVC](https://github.com/telerik/kendo-examples-asp-net-mvc)
* [Collected Examples on ASP.NET Web Technologies](https://github.com/telerik/kendo-examples-asp-net)
* [Collected Examples on Telerik UI for ASP.NET MVC](https://github.com/telerik/ui-for-aspnet-mvc-examples)

## Next Steps

* [Downloading and installing Telerik UI for ASP.NET MVC]({% slug overview_downloadinstallation_mvc %})
* [Exploring the Telerik UI for ASP.NET MVC fundamentals]({% slug fundamentals_aspnetmvc %})
* [Integrating Telerik UI for ASP.NET MVC in Visual Studio]({% slug overview_visualstudio_aspnetmvc %})
* [Upgrading Telerik UI for ASP.NET MVC]({% slug upgrade_aspnetmvc %})

