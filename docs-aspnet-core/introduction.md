---
title: Introduction
page_title: Introduction | Progress Telerik UI for ASP.NET Core
description: "Download and install Progress Telerik UI for ASP.NET Core (aka MVC 6 or ASP.NET Core MVC), and run the sample application."
previous_url: /aspnetmvc-apps/mvc-6/introduction, /mvc-6/introduction
slug: overview_aspnetmvc6_aspnetmvc
position: 1
---

<<<<<<< HEAD
# Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET Core

[Telerik UI for ASP.NET Core](https://www.telerik.com/aspnet-core-ui) is a set of server-side wrappers that allows you to use the [Kendo UI widgets](../kendo-ui/introduction) in .NET Core.

This article demonstrates how to use Telerik UI for ASP.NET Core in ASP.NET Core applications.
=======
# Welcome to Telerik UI for ASP.NET Core

Thank you for choosing Progress<sup>®</sup> Telerik UI for ASP.NET Core!  
>>>>>>> 8e0bc34... docs: replace links to jQuery with respective for core, iterate on intro (#9827)

[UI for ASP.NET Core](https://www.telerik.com/aspnet-core-ui) is a set of server-side wrappers that allows you to use the [Kendo UI widgets](../kendo-ui/introduction) in .NET Core.

<<<<<<< HEAD
## Resources

To get started, refer to the [ASP.NET Core Documentation](https://docs.asp.net/en/latest/index.html).

To facilitate the process of tracking down particular issues or behaviors, use the following repositories which contain source code, instructions, and issue trackers for the ASP.NET project.

- [ASP.NET Core](https://github.com/aspnet/AspNetCore) (on GitHub)
- [ASP.NET Core Announcements](https://github.com/aspnet/announcements/) (for important changes)
- [Telerik UI for ASP.NET Core Demos and Sample Applications](https://demos.telerik.com/aspnet-core)

## Setup

To set up and install Telerik UI for ASP.NET Core, refer to the following sections:

* [Prerequisites](#prerequisites)
* [Download](#download)
* [Installation](#installation)
* [Distribution Contents](#distribution-contents)

### Prerequisites

Telerik UI for ASP.NET Core requires .NET Core.

The offline sample application requires:

* [.NET Core](https://www.microsoft.com/net/learn/get-started)
* [Visual Studio](https://www.visualstudio.com/downloads/)

### Download

To download Telerik UI for ASP.NET Core:

1. Log in to your [Telerik account](https://www.telerik.com/login/).

1. Click **Downloads** in the top navigation.

1. Click **Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET Core**.

1. In the **Installation**  section select to download the Telerik online installer (`exe` file), the `MSI` installer file directly.

The Telerik UI for ASP.NET Core suite can be included in a project via NuGet without locally installing the suite on the machine. Further information on how to configure such application could be found in the [Getting Started article]({% slug gettingstarted_aspnetmvc6_aspnetmvc %}#configuration-Add).

### Installation

Run the Telerik UI for ASP.NET Core installer. The automatic setup will guide you through the rest of the installation. The setup installs Telerik UI for ASP.NET Core in `C:\Program Files (x86)\Progress\Telerik UI for ASP.NET Core <version>`.

### Distribution Contents

Telerik UI for ASP.NET Core contains the following directories:

* `js`&mdash;These are the minified JavaScript files.
* `styles`&mdash;The minified CSS files and images used by the themes.
* `src`&mdash;The complete JavaScript, CSS, and C# source code. Note that this directory is not available in the trial version.
* `typescript`&mdash;The TypeScript definitions for the Kendo combined scripts (*kendo.all*, *kendo.dataviz*, *kendo.web* and *kendo.mobile*).
* `vsdoc`&mdash;The intellisense definitions for the Kendo combined scripts (as the above).
* `VSExtensions`&mdash;The extensions for Visual Studio 2017.
* `wrappers\aspnetcore\Binaries\AspNet.Core`&mdash;Containing the .nupkg NuGet package file.
* `wrappers\aspnetcore\Examples\AspNet.Core\VS2017`&mdash;The ASP.NET Core sample application built with Visual Studio 2017.
* `wrappers\aspnetcore\EditorTemplates\razor`&mdash;The ready-to-use editor templates based on the Kendo UI widgets.

## Sample Application

Telerik UI for ASP.NET Core comes with a sample .NET Core application, built with Visual Studio 2017, which is an offline version of the [Telerik UI for ASP.NET Core Demos](https://demos.telerik.com/aspnet-core).

> **Important**
>
> As of the Kendo UI R2 2018 release, the Visual Studio 2015 version of the sample application is no longer distributed because of its deprecated format and limited tooling support.

### Running the Sample Application

To run the sample application:

1. Navigate to the installation directory of Telerik UI for ASP.NET Core.

1. Open the Visual Studio 2017 sample project `wrappers\aspnetcore\Examples\AspNet.Core\VS2017\Kendo.Mvc.Examples\Kendo.Mvc.Examples.csproj`.

1. Press `CTRL+F5` to build and run the application.

### Distribution Contents

The sample application Visual Studio Project contains the following items:

* `Views`&mdash;The Razor views.
* `Controllers`&mdash;The Controller classes.
* `Models`&mdash;The Model classes.
* `wwwroot`&mdash;The web application root which, in the **App_Data** folder, contains the LocalDB sample database and the other client resources such as libraries, scripts, styles, and others.

## Upgrade

You can upgrade the version of the Telerik UI for ASP.NET Core wrappers and also switch from a trial to a developer license.

### Upgrade to Newer Versions

To update Telerik UI for ASP.NET Core to a new version, either:

* Upgrade with NuGet and Bower, or
* Manually replace the references and files.

#### Upgrade with NuGet and Bower

To upgrade the version with NuGet and Bower:

1. In Visual Studio, open the NuGet Package Manager on the **Installed** tab and click **Update** for the **Telerik.UI.for.AspNet.Core** package.
1. In Visual Studio, open the Bower Package Manager on the **Installed** tab and click **Update** for the **kendo-ui** package.
1. In the application, manually replace any references which point to the old Kendo UI resource files such as scripts and styles.

> **Important**
>
> To properly load the Telerik and Kendo UI packages, both [NuGet](https://docs.telerik.com/aspnet-mvc/getting-started/nuget-install#set-up-nuget-package-source) and [Bower](https://docs.telerik.com/kendo-ui/intro/installation/bower-install#kendo-ui-professional) require authentication.

#### Manual Upgrade

1. [Download](#download) the desired version from the **Download** section of your account.
1. Replace all [scripts, styles, and images](#distribution-contents) that are related to Telerik UI for ASP.NET Core with the desired version of the framework.
1. Change the reference to the new `Kendo.MVC` dll and verify that the dll refers to the correct ASP.NET Core version.
1. In the application, manually replace any references which point to the old Kendo UI resource files such as scripts and styles.

### Upgrade from Trial to Licensed Versions

1. Before you upgrade to a licensed version, delete (uninstall) the trial version from your machine. This deletion eliminates the possibility for trial assemblies to end up in the project references or in production.
1. [Install](#installation) the licensed Kendo UI version and follow the steps for updating the Telerik UI for ASP.NET Core version.
=======
## Getting Started

* [Getting Started with UI for ASP.NET Core on Windows]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Getting Started with UI for ASP.NET Core on MAC OS]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})

## Supported Environments

UI for ASP.NET Core targets the stable releases of the ASP.NET Core framework. The target runtime is [CoreCLR](https://github.com/dotnet/coreclr). The UI for ASP.NET Core suite also supports the full desktop CLR.

## List of Wrappers

|Group                      |HtmlHelpers                               |Tag Helpers   
| :---                      | :---                                      | :---                                         
| **Data Source**           |[DataSource HtmlHelper Demos](https://demos.telerik.com/aspnet-core/datasource/index)                      |[Data Source Tag Helper Docs]({% slug taghelpers_datasource_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/datasource/tag-helper)
| **Data Management**       |[Grid HtmlHelper Docs]({% slug htmlhelpers_grid_aspnetcore_overview %}) & [Demos](https://demos.telerik.com/aspnet-core/grid/index)     |[Grid Tag Helper Docs]({% slug taghelpers_grid_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/grid/tag-helper)
|                           |[ListView HtmlHelper Docs]({% slug htmlhelpers_listview_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/listview/index)    |N/A
|                           |[PivotGrid HtmlHelper Docs]({% slug overview_pivotgridhelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/pivotgrid/index)  |[PivotGrid Tag Helper Docs]({% slug taghelpers_pivotgrid_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/pivotgrid/tag-helper)
|                           |[Spreadsheet HtmlHelper Docs]({% slug htmlhelpers_spreadsheet_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/spreadsheet/index) |[Spreadsheet Tag Helper Docs]({% slug taghelpers_spreadsheet_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/spreadsheet/tag-helper)
|                           |[TreeList HtmlHelper Docs]({% slug htmlhelpers_treelist_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/treelist/index)   |[TreeList Tag Helper Docs]({% slug taghelpers_treelist_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/treelist/tag-helper)
|**Editors**                |[AutoComplete HtmlHelper Docs]({% slug htmlhelpers_autocomplete_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/autocomplete/index)  |[AutoComplete Tag Helper Docs]({% slug taghelpers_autocomplete_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/autocomplete/tag-helper)
|                           |[ColorPalette HtmlHelper Docs]({% slug overview_colorpalettehelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/colorpicker/palette)  |N/A
|                           |[ColorPicker HtmlHelper Docs]({% slug overview_colorpickerhelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/colorpicker/index)  |[ColorPicker Tag Helper Docs]({% slug taghelpers_colorpicker_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/colorpicker/tag-helper)
|                           |[ComboBox HtmlHelper Docs]({% slug htmlhelpers_combobox_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/combobox/index)     |[ComboBox Tag Helper Docs]({% slug taghelpers_combobox_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/combobox/tag-helper)
|                           |[DateInput HtmlHelper Docs]({% slug htmlhelpers_dateinput_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/dateinput/index)    |[DateInput Tag Helper Docs]({% slug taghelpers_dateinput_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/dateinput/tag-helper)
|                           |[DatePicker HtmlHelper Docs]({% slug htmlhelpers_datepicker_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/datepicker/index)   |[DatePicker Tag Helper Docs]({% slug taghelpers_datepicker_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/datepicker/tag-helper)
|                           |[DateRangePicker HtmlHelper Docs]({% slug htmlhelpers_daterangepicker_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/daterangepicker/index)  |N/A
|                           |[DateTimePicker HtmlHelper Docs]({% slug htmlhelpers_datetimepicker_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/datetimepicker/index)   |[DateTimePicker Tag Helper Docs]({% slug taghelpers_datetimepicker_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/datetimepicker/tag-helper)
|                           |[DropDownList HtmlHelper Docs]({% slug htmlhelpers_dropdownlist_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/dropdownlist/index)     |[DropDownList Tag Helper Docs]({% slug taghelpers_dropdownlist_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/dropdownlist/tag-helper)
|                           |[DropDownTree HtmlHelper Docs]({% slug htmlhelpers_dropdowntree_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/dropdowntree/index)    |[DropDownTree Tag Helper Docs]({% slug taghelpers_dropdowntree_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/dropdowntree/tag-helper)
|                           |[Editor HtmlHelper Docs]({% slug htmlhelpers_editor_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/editor/index)           |[Editor Tag Helper Docs]({% slug taghelpers_editor_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/editor/tag-helper)
|                           |[FlatColorPicker HtmlHelper Docs]({% slug overview_flatcolorpickerhelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/colorpicker/flatcolorpicker)  |N/A
|                           |[ListBox HtmlHelper Docs]({% slug htmlhelpers_listbox_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/listbox/index)          |[ListBox Tag Helper Docs]({% slug taghelpers_listbox_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/listbox/tag-helper)
|                           |[MaskedTextBox HtmlHelper Docs]({% slug htmlhelpers_maskedtextbox_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/maskedtextbox/index)    |[MaskedTextBox Tag Helper Docs]({% slug taghelpers_maskedtextbox_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/maskedtextbox/tag-helper)
|                           |[MultiColumnComboBox HtmlHelper Docs]({% slug htmlhelpers_multicolumncombobox_aspnetcore %})    |[MultiColumnComboBox Tag Helper Docs]({% slug taghelpers_multicolumncombobox_aspnetcore %})
|                           |[MultiSelect HtmlHelper Docs]({% slug htmlhelpers_multiselect_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/multiselect/index)      |[MultiSelect Tag Helper Docs]({% slug taghelpers_multiselect_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/multiselect/tag-helper)
|                           |[NumericTextBox HtmlHelper Docs]({% slug htmlhelpers_numerictextbox_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/numerictextbox/index)  |[NumericTextBox Tag Helper Docs]({% slug taghelpers_numerictextbox_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/numerictextbox/tag-helper)
|                           |[Slider HtmlHelper Docs]({% slug overview_sliderhelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/slider/index)          |[Slider Tag Helper Docs]({% slug taghelpers_slider_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/slider/tag-helper)
|                           |[Switch HtmlHelper Docs]({% slug overview_switchhelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/switch/index)         |[Switch Tag Helper Docs]({% slug taghelpers_switch_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/switch/tag-helper)
|                           |[TimePicker HtmlHelper Docs]({% slug overview_timepickerhelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/timepicker/index)      |[TimePicker Tag Helper Docs]({% slug taghelpers_timepicker_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/timepicker/tag-helper)
|                           |[Upload HtmlHelper Docs]({% slug htmlhelpers_upload_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/upload/index)          |[Upload Tag Helper Docs]({% slug taghelpers_upload_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/upload/tag-helper)
|                           |[Validator HtmlHelper Demos](https://demos.telerik.com/aspnet-core/validator/index)                         |[Validator Tag Helper Docs]({% slug taghelpers_validator_aspnetcore %})
|**Charts**                 |[Chart HtmlHelper Docs]({% slug areacharts_aspnetcore_htmlhelper %}) & [Demos](https://demos.telerik.com/aspnet-core/chart-api/index)            |[Chart Tag Helper Docs]({% slug taghelpers_chart_aspnetcore %})
|                           |[StockChart HtmlHelper Docs]({% slug overview_stockcharthelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/financial/index)      |N/A
|                           |[TreeMap HtmlHelper Docs]({% slug overview_treemaphelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/treemap/index)         |[TreeMap Tag Helper Docs]({% slug taghelpers_treemap_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/treemap/tag-helper)
|**Gauges**                 |[ArcGauge HtmlHelper Docs]({% slug overview_arcgaugehelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/arc-gauge/index)       |[ArcGauge Tag Helper Docs]({% slug taghelpers_arcgauge_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/arc-gauge/tag-helper)
|                           |[LinearGauge HtmlHelper Docs]({% slug overview_lineargaugehelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/linear-gauge/index)     |[LinearGauge Tag Helper Docs]({% slug taghelpers_lineargauge_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/linear-gauge/tag-helper)
|                           |[RadialGauge HtmlHelper Docs]({% slug overview_radialgaugehelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/radial-gauge/index)    |[RadialGauge Tag Helper Docs]({% slug taghelpers_radialgauge_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/radial-gauge/tag-helper)
|**Barcodes**               |[Barcode HtmlHelper Docs]({% slug overview_barcodehelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/barcode/index)         |[Barcode Tag Helper Docs]({% slug taghelpers_barcode_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/barcode/tag-helper)
|                           |[QRCode HtmlHelper Docs]({% slug overview_qrcodehelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/qrcode/index)         |[QRCode Tag Helper Docs]({% slug taghelpers_qrcode_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/qrcode/tag-helper)
|**Diagrams and Maps**      |[Map HtmlHelper Docs]({% slug htmlhelpers_map_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/map/index)            |[Map Tag Helper Docs]({% slug taghelpers_map_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/map/tag-helper)
|**Scheduling**             |[Calendar HtmlHelper Docs]({% slug overview_calendarhelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/calendar/index)       |[Calendar Tag Helper Docs]({% slug taghelpers_calendar_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/calendar/tag-helper)
|                           |[Gantt HtmlHelper Docs]({% slug htmlhelpers_gantt_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/gantt/index)           |[Gantt Tag Helper Docs]({% slug taghelpers_gantt_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/gantt/tag-helper)
|                           |[MultiViewCalendar HtmlHelper Docs]({% slug overview_multiviewcalendar_htmlhelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/multiviewcalendar/index)|[MultiViewCalendar Tag Helper Docs]({% slug overview_multiviewcalendar_taghelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/multiviewcalendar/tag-helper)
|                           |[Scheduler HtmlHelper Docs]({% slug htmlhelpers_scheduler_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/scheduler/index)       |[Scheduler Tag Helper Docs]({% slug taghelpers_scheduler_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/scheduler/tag-helper)
|**Layout**                 |[Dialog HtmlHelper Docs]({% slug overview_dialoghelper_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/dialog/index)           |[Dialog Tag Helper Docs]({% slug taghelpers_dialog_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/dialog/tag-helper)
|                           |[Notification HtmlHelper Docs]({% slug htmlhelpers_notification_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/notification/index)    |[Notification Tag Helper Docs]({% slug taghelpers_notification_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/notification/tag-helper)
|                           |N/A    |[Popup Tag Helper Docs]({% slug taghelpers_popup_aspnetcore %})
|                           |N/A    |[ResponsivePanel Tag Helper Docs]({% slug taghelpers_responsivepanel_aspnetcore %})
|                           |[Splitter HtmlHelper Docs]({% slug htmlhelpers_splitter_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/splitter/index)      |[Splitter Tag Helper Docs]({% slug taghelpers_splitter_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/splitter/tag-helper)
|                           |[Tooltip HtmlHelper Docs]({% slug htmlhelpers_tooltip_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/tooltip/index)         |[Tooltip Tag Helper Docs]({% slug taghelpers_tooltip_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/tooltip/tag-helper)
|                           |[Window HtmlHelper Docs]({% slug htmlhelpers_window_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/window/index)          |[Window Tag Helper Docs]({% slug taghelpers_window_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/window/tag-helper)
|**Navigation**             |[Button HtmlHelper Docs]({% slug htmlhelpers_button_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/button/index)          |[Button Tag Helper Docs]({% slug taghelpers_button_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/button/tag-helper)
|                           |[ButtonGroup HtmlHelper Docs]({% slug htmlhelpers_buttongroup_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/buttongroup/index)      |[ButtonGroup Tag Helper Docs]({% slug taghelpers_buttongroup_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/buttongroup/tag-helper)
|                           |[Drawer HtmlHelper Docs]({% slug htmlhelpers_drawer_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/drawer/index)         |[Drawer Tag Helper Docs]({% slug taghelpers_drawer_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/drawer/tag-helper)
|                           |[Menu HtmlHelper Docs]({% slug htmlhelpers_menu_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/menu/index)            |[Menu Tag Helper Docs]({% slug taghelpers_menu_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/menu/tag-helper)
|                           |[PanelBar HtmlHelper Docs]({% slug htmlhelpers_panelbar_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/panelbar/index)        |[PanelBar Tag Helper Docs]({% slug taghelpers_panelbar_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/panelbar/tag-helper)
|                           |[RadioButton HtmlHelper Docs]({% slug htmlhelpers_radiobutton_aspnetcore %})     |N/A
|                           |[TabStrip HtmlHelper Docs]({% slug htmlhelpers_tabstrip_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/tabstrip/index)         |[TabStrip Tag Helper Docs]({% slug taghelpers_tabstrip_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/tabstrip/tag-helper)
|                           |[ToolBar HtmlHelper Docs]({% slug htmlhelpers_toolbar_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/toolbar/index)          |[ToolBar Tag Helper Docs]({% slug taghelpers_toolbar_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/toolbar/tag-helper)
|                           |[TreeView HtmlHelper Docs]({% slug htmlhelpers_treeview_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/treeview/index)        |[TreeView Tag Helper Docs]({% slug taghelpers_treeview_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/treeview/tag-helper)
|**Conversational UI**      |[Chat HtmlHelper Docs]({% slug htmlhelpers_chat_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/chat/index)             |[Chat Tag Helper Docs]({% slug taghelpers_chat_aspnetcore %})
|**Interactivity and UX**   |[DragAndDrop HtmlHelper Demos](https://demos.telerik.com/aspnet-core/dragdrop/index)                                             |[DragAndDrop Tag Helper Docs]({% slug taghelpers_dragdrop_aspnetcore %})
|                           |[ProgressBar HtmlHelper Docs]({% slug htmlhelpers_progressbar_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/progressbar/index)      |[ProgressBar Tag Helper Docs]({% slug taghelpers_progressbar_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/progressbar/tag-helper)
|                           |[Sortable HtmlHelper Docs]({% slug htmlhelpers_sortable_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/sortable/index)         |[Sortable Tag Helper Docs]({% slug taghelpers_sortable_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/sortable/tag-helper)
|**Media**                  |[MediaPLayer HtmlHelper Docs]({% slug htmlhelpers_mediaplayer_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/mediaplayer/index)      |N/A
|                           |[ScrollView HtmlHelper Docs]({% slug htmlhelpers_scrollview_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/scrollview/index)       |[ScrollView Tag Helper Docs]({% slug taghelpers_scrollview_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/scrollview/tag-helper)
|**PDF**                    |[PDFViewer HtmlHelper Docs]({% slug htmlhelpers_pdfviewer_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/pdfviewer/index)        |[PDFViewer Tag Helper Docs]({% slug taghelpers_pdfviewer_aspnetcore %}) & [Demos](https://demos.telerik.com/aspnet-core/pdfviewer/tag-helper)

## Trial Version and Commercial License

This UI for ASP.NET Core library is a commercial UI library. You are welcome to explore its full functionality and get technical support from the team when you register for a free 30-day trial. To use it commercially, you need to [purchase a license](https://www.telerik.com/purchase/kendo-ui). Feel free to review the Kendo UI for jQuery [License Agreement](https://www.telerik.com/purchase/license-agreement/kendo-ui) to get acquainted with the full terms of use.
>>>>>>> 8e0bc34... docs: replace links to jQuery with respective for core, iterate on intro (#9827)

## Support Options

<<<<<<< HEAD
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
* [Tag Helpers for ASP.NET Core]({% slug taghelpers_aspnetmvc6_aspnetmvc %})
=======
For any issues you might encounter while working with UI for ASP.NET Core, use any of the available support channels:

* Kendo UI Professional license holders and active trialists can take advantage of the outstanding customer support delivered by the developers building the library. To submit a support ticket, use the [UI for ASP.NET Core dedicated support](https://www.telerik.com/account/support-tickets/) system.
* [UI for ASP.NET Core forums](https://www.telerik.com/forums/aspnet-core-ui) are part of the free support you can get from the community and from the UI for ASP.NET Core team on all kinds of general issues.
* [UI for ASP.NET Core feedback portal](https://feedback.telerik.com/aspnet-core-ui) and [UI for ASP.NET Core roadmap](https://www.telerik.com/support/whats-new/kendo-ui/roadmap) provide information on the features in discussion and also the planned ones for release.
* Kendo UI for jQuery uses [GitHub Issues](https://github.com/telerik/kendo/issues/) as its bug tracker and you can submit any related reports there. Also, check out the [closed list](https://github.com/telerik/kendo/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aclosed).
* You may still need a tailor-made solution for your project. In such cases, go straight to [Progress Services](https://www.progress.com/services).

## Learning Resources

* [UI for ASP.NET Core Virtual Classroom](https://progress.exceedlms.com/student/path/369634-telerik-asp-net-mvc-net-core)
* [Other UI for ASP.NET Core Support and Learning Resources](https://www.telerik.com/support/aspnet-core)

## Next Steps

* [Getting Started with UI for ASP.NET Core (Windows)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Getting Started with UI for ASP.NET Core (MAC OS)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Including client-side resources]({% slug copyclientresources_aspnetmvc6_aspnetmvc %})
* [Integrating UI for ASP.NET Core in VS]({% slug overview_visualstudio_aspnetcore %})
* [Upgrading UI for ASP.NET Core in VS]({% slug upgrade_aspnetcore %})
* [UI for ASP.NET Core HtmlHelpers Documentation]({% slug overview_barcodehelper_aspnetcore %})
* [UI for ASP.NET Core Tag Helpers Documentation]({% slug taghelpers_aspnetmvc6_aspnetmvc %})
>>>>>>> 8e0bc34... docs: replace links to jQuery with respective for core, iterate on intro (#9827)
