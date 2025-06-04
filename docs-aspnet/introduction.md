---
title: Introduction
page_title: Introduction
description: "Download and install {{ site.product_long }}, and run the sample application."
previous_url: /aspnetmvc-apps/mvc-6/introduction, /mvc-6/introduction, /getting-started/kendo-ui-vs-mvc-wrappers
slug: overview_aspnetmvc6_aspnetmvc
position: 1
---
{% if site.core %}
    {% assign telerik_product_url = "aspnet-core-ui" %}
{% else %}
    {% assign telerik_product_url = "aspnet-mvc" %}
{% endif %}

# Welcome to {{ site.product }} Components

Thank you for choosing Progress<sup>®</sup> Telerik<sup>®</sup> {{ site.product_short }}!

[{{ site.product }}](https://www.telerik.com/{{ telerik_product_url }}) is a set of 110+ performance optimized components that allow you to deliver high-quality applications faster. These components come in the form of HTML{% if site.core %} and Tag{% endif %} helpers that wrap the [HTML/JavaScript Kendo UI widgets](https://docs.telerik.com/kendo-ui/introduction) and bring them to .NET {{ site.framework_short }}. From client-side perspective, the vanilla HTML/JavaScript Kendo UI widgets and their {{ site.framework }} server-side wrappers have the same functionality and provide the same capabilities.


The {{ site.product }} HTML{% if site.core %} and Tag{% endif %} helpers:
* Allow you to configure a Kendo UI widget through C# or VB.NET code&mdash;for example, to set its value, data source, and so on.
* Render the HTML and JavaScript that are needed to initialize a Kendo UI widget.
* Propagate the widget’s options to the client-side through its initialization script.

To read more about the benefits of using {{ site.product }}, visit the {% if site.core %}<a href="https://www.telerik.com/aspnet-core-ui" target="_blank">product overview page</a>{% else %}<a href="https://www.telerik.com/aspnet-mvc" target="_blank">product overview page</a>{% endif %}.

{% if site.has_cta_panels == true %}
{% include cta-panel-introduction.html %}
{% endif %}

## List of Helpers

<IntroTable>
   <IntroTableColumn>
      <IntroTableSection title="Barcodes">
         <IntroTableAnchor title="BarCode" href="slug:overview_barcodehelper_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="QRCode" href="slug:overview_qrcodehelper_aspnetcore"></IntroTableAnchor>
      </IntroTableSection>
      <IntroTableSection title="Chart Wizard">
         <IntroTableAnchor title="Chart Wizard" href="slug:htmlhelpers_overview_chartwizard"></IntroTableAnchor>
      </IntroTableSection>
      <IntroTableSection title="Charts">
         <IntroTableAnchor title="Chart" href="slug:htmlhelpers_charts_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="HeatMap" href="slug:overview_heatmaphelper_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="Sparkline" href="slug:overview_sparklineshelper_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="StockChart" href="slug:overview_stockcharthelper_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="TreeMap" href="slug:overview_treemaphelper_aspnetcore"></IntroTableAnchor>
      </IntroTableSection>
      <IntroTableSection title="Conversational UI">
         <IntroTableAnchor title="AIPrompt" href="slug:htmlhelpers_overview_aiprompt"></IntroTableAnchor>
         <IntroTableAnchor title="Chat" href="slug:htmlhelpers_chat_aspnetcore"></IntroTableAnchor>
      </IntroTableSection>
      <IntroTableSection title="Data Source">
         <IntroTableAnchor title="DataSource" href="slug:htmlhelpers_datasource_aspnetcore"></IntroTableAnchor>
      </IntroTableSection>
      <IntroTableSection title="Data Management">
         <IntroTableAnchor title="FileManager" href="slug:htmlhelpers_filemanager_aspnetcore_overview"></IntroTableAnchor>
         <IntroTableAnchor title="Filter" href="slug:htmlhelpers_filter_aspnetcore_overview"></IntroTableAnchor>
         <IntroTableAnchor title="Grid" href="slug:htmlhelpers_grid_aspnetcore_overview"></IntroTableAnchor>
         <IntroTableAnchor title="ListView" href="slug:htmlhelpers_listview_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="Pager" href="slug:htmlhelpers_pager_aspnet_overview"></IntroTableAnchor>
         <IntroTableAnchor title="PivotGrid" href="slug:overview_pivotgridhelper_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="PivotGridV2" href="slug:overview_pivotgridhelperv2_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="PropertyGrid" href="slug:htmlhelpers_overview_propertygrid"></IntroTableAnchor>
         <IntroTableAnchor title="Spreadsheet" href="slug:htmlhelpers_spreadsheet_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="TaskBoard" href="slug:htmlhelpers_taskboard_aspnetcore_overview"></IntroTableAnchor>
         <IntroTableAnchor title="TreeList" href="slug:htmlhelpers_treelist_aspnetcore"></IntroTableAnchor>
      </IntroTableSection>
      <IntroTableSection title="Diagrams and Maps">
         <IntroTableAnchor title="Diagram" href="slug:htmlhelpers_diagram_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="Map" href="slug:htmlhelpers_map_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="OrgChart" href="slug:htmlhelpers_orgchart_aspnetcore"></IntroTableAnchor>
      </IntroTableSection>
   </IntroTableColumn>
   <IntroTableColumn>
      <IntroTableSection title="Editors">
         <IntroTableAnchor title="AutoComplete" href="slug:htmlhelpers_autocomplete_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="Captcha" href="slug:htmlhelpers_captcha_overview"></IntroTableAnchor>
         <IntroTableAnchor title="CheckBox" href="slug:htmlhelpers_checkbox_aspnetcore_overview"></IntroTableAnchor>
         <IntroTableAnchor title="CheckBoxGroup" href="slug:htmlhelpers_checkboxgroup_aspnetcore_overview"></IntroTableAnchor>
         <IntroTableAnchor title="ColorGradient" href="slug:htmlhelpers_overview_colorgradient"></IntroTableAnchor>
         <IntroTableAnchor title="ColorPalette" href="slug:overview_colorpalettehelper_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="ColorPicker" href="slug:overview_colorpickerhelper_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="ComboBox" href="slug:htmlhelpers_combobox_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="DateInput" href="slug:htmlhelpers_dateinput_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="DatePicker" href="slug:htmlhelpers_datepicker_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="DateRangePicker" href="slug:htmlhelpers_daterangepicker_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="DateTimePicker" href="slug:htmlhelpers_datetimepicker_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="DropDownList" href="slug:htmlhelpers_dropdownlist_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="DropDownTree" href="slug:htmlhelpers_dropdowntree_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="Editor" href="slug:htmlhelpers_editor_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="FlatColorPicker" href="slug:overview_flatcolorpickerhelper_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="ImageEditor" href="slug:htmlhelpers_imageeditor_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="ListBox" href="slug:htmlhelpers_listbox_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="MaskedTextBox" href="slug:htmlhelpers_maskedtextbox_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="MultiColumnComboBox" href="slug:htmlhelpers_multicolumncombobox_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="MultiSelect" href="slug:htmlhelpers_multiselect_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="NumericTextBox" href="slug:htmlhelpers_numerictextbox_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="OTP Input" href="slug:overview_otpinputhelper"></IntroTableAnchor>
         <IntroTableAnchor title="RadioButton" href="slug:htmlhelpers_radiobutton_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="RadioGroup" href="slug:htmlhelpers_radiogroup_aspnetcore_overview"></IntroTableAnchor>
         <IntroTableAnchor title="Rating" href="slug:htmlhelpers_rating_aspnetcore_overview"></IntroTableAnchor>
         <IntroTableAnchor title="Signature" href="slug:overview_telerikui_signature_component"></IntroTableAnchor>
         <IntroTableAnchor title="Slider" href="slug:overview_sliderhelper_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="Switch" href="slug:overview_switchhelper_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="TextArea" href="slug:htmlhelpers_overview_textarea"></IntroTableAnchor>
         <IntroTableAnchor title="TextBox" href="slug:htmlhelpers_overview_textbox"></IntroTableAnchor>
         <IntroTableAnchor title="TimeDurationPicker" href="slug:htmlhelpers_timedurationpickerhelper_overview"></IntroTableAnchor>
         <IntroTableAnchor title="TimePicker" href="slug:overview_timepickerhelper_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="Upload" href="slug:htmlhelpers_upload_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="Validator Demos" href="https://demos.telerik.com/{{ site.platform }}/validator"></IntroTableAnchor>
      </IntroTableSection>
   </IntroTableColumn>
   <IntroTableColumn>
      <IntroTableSection title="Gauges">
         <IntroTableAnchor title="ArcGauge" href="slug:overview_arcgaugehelper_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="CircularGauge" href="slug:overview_circulargaugehelper_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="LinearGauge" href="slug:overview_lineargaugehelper_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="RadialGauge" href="slug:overview_radialgaugehelper_aspnetcore"></IntroTableAnchor>
      </IntroTableSection>
      <IntroTableSection title="Interactivity and UX">
         <IntroTableAnchor title="Circular ProgressBar" href="slug:htmlhelpers_circular_progressbar_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="Loader" href="slug:htmlhelpers_loader_aspnetcore_overview"></IntroTableAnchor>
         <IntroTableAnchor title="ProgressBar" href="slug:htmlhelpers_progressbar_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="SkeletonContainer" href="slug:htmlhelpers_skeletoncontainer_aspnetcore_overview"></IntroTableAnchor>
         <IntroTableAnchor title="Sortable" href="slug:htmlhelpers_sortable_aspnetcore"></IntroTableAnchor>
      </IntroTableSection>
      <IntroTableSection title="Layout">
         <IntroTableAnchor title="Avatar" href="slug:overview_avatarhelper_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="Badge" href="slug:overview_badgehelper_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="Cards" href="slug:cards_aspnetmvc6_aspnetmvc"></IntroTableAnchor>
         <IntroTableAnchor title="Dialog" href="slug:overview_dialoghelper_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="DockManager" href="slug:overview_dockmanagerhelper_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="ExpansionPanel" href="slug:htmlhelpers_expansionpanel_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="Form" href="slug:htmlhelpers_form_aspnetcore_overview"></IntroTableAnchor>
         <IntroTableAnchor title="GridLayout" href="slug:htmlhelpers_aspnet_gridlayout_overview"></IntroTableAnchor>
         <IntroTableAnchor title="Notification" href="slug:htmlhelpers_notification_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="PopOver" href="slug:htmlhelpers_overview_popover"></IntroTableAnchor>
         <IntroTableAnchor title="Responsive Panel" href="slug:htmlhelpers_responsivepanel_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="Splitter" href="slug:htmlhelpers_splitter_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="StackLayout" href="slug:htmlhelpers_aspnet_stacklayout_overview"></IntroTableAnchor>
         <IntroTableAnchor title="TileLayout" href="slug:htmlhelpers_aspnet_tilelayout_overview"></IntroTableAnchor>
         <IntroTableAnchor title="Tooltip" href="slug:htmlhelpers_tooltip_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="Window" href="slug:htmlhelpers_window_aspnetcore"></IntroTableAnchor>
      </IntroTableSection>
      <IntroTableSection title="Media">
         <IntroTableAnchor title="MediaPLayer" href="slug:htmlhelpers_mediaplayer_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="ScrollView" href="slug:htmlhelpers_scrollview_aspnetcore"></IntroTableAnchor>
      </IntroTableSection>
   </IntroTableColumn>
   <IntroTableColumn>
      <IntroTableSection title="Navigation">
         <IntroTableAnchor title="ActionSheet" href="slug:htmlhelpers_actionsheet_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="AppBar" href="slug:htmlhelpers_appbar_aspnetcore_overview"></IntroTableAnchor>
         <IntroTableAnchor title="BottomNavigation" href="slug:htmlhelpers_bottomnavigation_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="Breadcrumb" href="slug:htmlhelpers_breadcrumb_aspnetcore_overview"></IntroTableAnchor>
         <IntroTableAnchor title="Button" href="slug:htmlhelpers_button_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="ButtonGroup" href="slug:htmlhelpers_buttongroup_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="Chip" href="slug:htmlhelpers_chip_aspnetcore_overview"></IntroTableAnchor>
         <IntroTableAnchor title="ChipList" href="slug:htmlhelpers_chiplist_aspnetcore_overview"></IntroTableAnchor>
         <IntroTableAnchor title="Drawer" href="slug:htmlhelpers_drawer_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="DropDownButton" href="slug:htmlhelpers_dropdownbutton_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="FloatingActionButton" href="slug:htmlhelpers_floatingactionbutton_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="Menu" href="slug:htmlhelpers_menu_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="PanelBar" href="slug:htmlhelpers_panelbar_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="SplitButton" href="slug:htmlhelpers_splitbutton_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="Stepper" href="slug:htmlhelpers_stepper_aspnetcore_overview"></IntroTableAnchor>
         <IntroTableAnchor title="TabStrip" href="slug:htmlhelpers_tabstrip_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="Timeline" href="slug:overview_htmlhelpers_timeline_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="ToolBar" href="slug:htmlhelpers_toolbar_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="TreeView" href="slug:htmlhelpers_treeview_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="Wizard" href="slug:htmlhelpers_wizard_aspnetcore_overview"></IntroTableAnchor>
      </IntroTableSection>
      <IntroTableSection title="PDF">
         <IntroTableAnchor title="PDFViewer" href="slug:htmlhelpers_pdfviewer_aspnetcore"></IntroTableAnchor>
      </IntroTableSection>
      <IntroTableSection title="Scheduling">
         <IntroTableAnchor title="Calendar" href="slug:htmlhelpers_overview_calendarhelper_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="Gantt" href="slug:htmlhelpers_gantt_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="MultiViewCalendar" href="slug:overview_multiviewcalendar_htmlhelper_aspnetcore"></IntroTableAnchor>
         <IntroTableAnchor title="Scheduler" href="slug:htmlhelpers_scheduler_aspnetcore"></IntroTableAnchor>
      </IntroTableSection>
      <IntroTableSection title="Template">
         <IntroTableAnchor title="Template" href="slug:htmlhelpers_overview_template"></IntroTableAnchor>
      </IntroTableSection>
   </IntroTableColumn>
   <IntroTableColumn>
      <IntroTableSection title="Document Processing">
         <IntroTableAnchor title="PdfProcessing" href="https://docs.telerik.com/devtools/document-processing/libraries/radpdfprocessing/overview"></IntroTableAnchor>
         <IntroTableAnchor title="SpreadProcessing" href="https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/overview"></IntroTableAnchor>
         <IntroTableAnchor title="SpreadStreamProcessing" href="https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/overview"></IntroTableAnchor>
         <IntroTableAnchor title="WordsProcessing" href="https://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/overview"></IntroTableAnchor>
         <IntroTableAnchor title="ZipLibrary" href="https://docs.telerik.com/devtools/document-processing/libraries/radziplibrary/overview"></IntroTableAnchor>
      </IntroTableSection>
   </IntroTableColumn>
 </IntroTable>

## Getting Started

To make your first steps with {{ site.product_short }}, you can {% if site.core %}<a href="https://www.telerik.com/aspnet-core-ui" target="_blank">start a free trial</a>{% else %}<a href="https://www.telerik.com/aspnet-mvc" target="_blank">start a free trial</a>{% endif %} and check some of the getting started tutorials:

{% if site.core %}
* [First Steps with {{ site.product_short }} on Visual Studio for Windows]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})&mdash;A tutorial demonstrating how to start using {{ site.product }} in new or existing projects.
* [Using a Project Template in VS for Windows]({% slug gettingstarted_project_template %})&mdash;The easiest way to create a new project with {{ site.product }}.
* [First Steps with {{ site.product_short }} and CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})&mdash;Use .NET CLI to create a project that uses {{ site.product }} controls.
* [Video Onboarding]({% slug virtualclass_uiforcore %})&mdash;A free course developed to help you get started with the Telerik UI for ASP.NET Core components and features.

To get a quick overview of  {{ site.product_short }}, you can also see the following video:

<iframe width="853" height="480" src="https://www.youtube.com/embed/jAOZY9TZi78?list=PLvmaC-XMqeBaHWzU1zyFgaNi2pcuix6Ps" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

{% else %}
* [First Steps with {{ site.product_short }}]({% slug gettingstarted_aspnetmvc %})&mdash;Create your first project with {{ site.product }} controls by using a project template.
* [Installing Telerik UI for ASP.NET MVC with NuGet]({% slug nuget_install_aspnetmvc6_aspnetmvc %})&mdash;Learn how to add the Telerik NuGet server to Visual Studio and to install the {{ site.product }} controls in your project.
* [Scaffolding the Telerik UI for ASP.NET MVC project]({% slug scaffolding_aspnetcore %})&mdash;Learn how to use standard scaffolding to generate MVC-helper declarations together with the related Controller action methods.
* [Telerik UI for ASP.NET MVC fundamentals]({% slug fundamentals_aspnetmvc %})&mdash;Learn the basics about the {{ site.product }} HTML Helpers.
* [Integrating the Telerik UI for ASP.NET MVC project with Visual Studio]({% slug overview_visualstudio_aspnetcore %})&mdash;Take advantage of the Visual Studio extensions that help you with the project creation and configuration.
* [Video Onboarding]({% slug virtualclass_uiformvc %})&mdash;A free course developed to help you get started with the Telerik UI for ASP.NET MVC components and features
{% endif %}

## Support Options

For any issues you may come across while working with {{ site.product_short }}, use any of the available support channels:

* {{ site.product_short }} license holders and active trialists can take advantage of the outstanding customer support delivered by the developers building the library. To submit a support ticket, use the [{{ site.product_short }} dedicated support](https://www.telerik.com/account/support-tickets/) system.
* [{{ site.product_short }} forums](https://www.telerik.com/forums/{{ telerik_product_url }}) are part of the free support you can get from the community and from the {{ site.product_short }} team on all kinds of general issues.
* [{{ site.product_short }} feedback portal](https://feedback.telerik.com/{{ telerik_product_url }}) and [{{ site.product_short }} roadmap](https://www.telerik.com/support/whats-new/kendo-ui/roadmap) provide information on the features in discussion and also the planned ones for release.
* In case you need a tailor-made solution for your project, go straight to [Progress Services](https://www.progress.com/services).

## Learning Resources

{% if site.core %}
* [Online Demos](https://demos.telerik.com/aspnet-core/)
* [Knowledge Base](https://docs.telerik.com/aspnet-core/knowledge-base.html)
* [Support Resources Hub Page](https://www.telerik.com/support/aspnet-core)
* [Code Examples with Telerik UI for ASP.NET Core](https://github.com/telerik/ui-for-aspnet-core-examples)
{% else %}
* [Online Demos](https://demos.telerik.com/aspnet-mvc/)
* [Tutorials]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Support Resources Hub Page](https://www.telerik.com/support/aspnet-mvc)
* [Code Examples with Telerik UI for ASP.NET MVC](https://github.com/telerik/ui-for-aspnet-mvc-examples)
* [Code Examples with ASP.NET MVC](https://github.com/telerik/kendo-examples-asp-net-mvc)
* [Code Examples with ASP.NET Web Technologies](https://github.com/telerik/kendo-examples-asp-net)

{% endif %}

>If you prefer videos, check out the free [Online Technical Training](https://docs.telerik.com/{{site.platform}}/virtual-classroom).

## Next Steps

{% if site.core %}
* [First steps on Visual Studio for Windows (online guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First steps with CLI (online guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Including client-side resources]({% slug copyclientresources_aspnetmvc6_aspnetmvc %})
* [Integrating UI for ASP.NET Core in Visual Studio]({% slug overview_visualstudio_aspnetcore %})
* [Upgrading UI for ASP.NET Core in Visual Studio]({% slug upgrade_aspnetcore %})
{% else %}
* [Downloading and installing Telerik UI for ASP.NET MVC]({% slug downloadinstall_aspnetcore %})
* [Exploring the Telerik UI for ASP.NET MVC fundamentals]({% slug fundamentals_aspnetmvc %})
* [Integrating Telerik UI for ASP.NET MVC in Visual Studio]({% slug overview_visualstudio_aspnetcore %})
* [Upgrading Telerik UI for ASP.NET MVC]({% slug upgrade_aspnetcore %})
{% endif %}
