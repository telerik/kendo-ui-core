---
title: Only What You Need
page_title: Only What You Need | Kendo UI Getting Started
description: "Customize Kendo UI for your project and add the HTML5 UI controls you need."
previous_url: /install/custom
slug: include_only_what_you_need_kendoui_installation
position: 4
---

# Only What You Need

## Combined Scripts

To facilitate the common project types, the following combined scripts are available in the bundles or on CDN:

*  The `kendo.ui.core.min.js` contains all widgets supported by the [Kendo UI Core distribution]({% slug bundle_supportfor_kendoui_components %}). The relevant script is available in the Kendo UI Core package as well.
*  The `kendo.all.min.js` contains a minified version of all features provided by Kendo UI.

> **Important**  
>
> The `kendo.all.min.js` is available in the Kendo UI Professional, Telerik UI for ASP.NET MVC, Telerik UI for JSP and Telerik UI for PHP bundles. However, the `kendo.all.min.js` does not include the `kendo.aspnetmvc.min.js`. To install it, add `kendo.aspnetmvc.min.js` to `kendo.all.min.js`, or use the [custom download builder tool](http://www.telerik.com/download/custom-download).

* The `kendo.web.min.js` is available in Kendo UI Professional, JSP, PHP, and MVC. It includes the core framework and all desktop browser widgets (previously distributed as Kendo UI Web).
* The `kendo.dataviz.min.js` is available in Kendo UI Professional, JSP, PHP, and MVC. It includes the core framework and all data visualization widgets (previously distributed as Kendo UI DataViz).
* The `kendo.mobile.min.js` is available in Kendo UI Professional, JSP, PHP, and MVC. It includes the core framework and all mobile device specific widgets (previously distributed as Kendo UI Mobile).

> **Important**  
>
> Only one of the combined JavaScript files can be included at a time, because they include the Kendo UI framework. To simultaneously use widgets from different Kendo UI suites, use the `kendo.all.min.js` or build a custom script.

In addition, none of the combined script files should be registered together with an individual widget script from the same suite. For example, `kendo.grid.js` should not be registered together with `kendo.web.js` or `kendo.all.js` because they already include the Grid scripts.

> **Important**  
>
> Registering duplicate scripts might cause JavaScript errors and unexpected behavior.

## Individual Widget Scripts

Below are listed the references to the script files which, whether minified or not, can be included on a per-widget basis depending on the flavor you want to add to your project.

+ [List of Kendo UI widgets in terms of their bundle support]({% slug bundle_supportfor_kendoui_components %})  
+ [Script Files for Data Management]({% slug scirpt_filesfor_datamanagement_widgets %})  
+ [Script Files for Editors]({% slug scirpt_filesfor_editors_widgets %})
+ [Script Files for Charts]({% slug script_filesfor_charts_widgets %})
+ [Script Files for Gauges]({% slug script_filesfor_gauges_widgets %})
+ [Script Files for Barcodes]({% slug script_filesfor_barcodes_widgets %})
+ [Script Files for Diagrams and Maps]({% slug script_filesfor_diagramsandmaps_widgets %})
+ [Script Files for Scheduling]({% slug scirpt_filesfor_scheduling_widgets %})
+ [Script Files for Layout]({% slug scirpt_filesfor_layout_widgets %})
+ [Script Files for Navigation]({% slug scirpt_filesfor_navigation_widgets %})
+ [Script Files for Interactivity and UX]({% slug scirpt_filesfor_interactivityandux_widgets %})
+ [Script Files for Hybrid UI]({% slug script_filesfor_hybridui_widgets %})
+ [Script Files for Tools, Frameworks and Utilities]({% slug script_filesfor_tools_frameworks_utilities %})
+ [Script Files for Server-Side Wrappers]({% slug script_filesfor_serverside_wrappers %})

## Build Scripts

### Employ Download Builder

Users with a commercial license might use the [custom download builder tool](http://www.telerik.com/download/custom-download) to create a single JavaScript file which contains only the required widgets and features.

> **Important**  
>
> Do not use multiple custom combined scripts, as they will contain duplicate code. Instead, create one combined script file, which includes everything you need.

### Use Gulp

If you use the Kendo UI Core package, you can build a custom distribution using the `gulp` build tool by following the instructions in [README](https://github.com/telerik/kendo-ui-core#building-only-what-you-need).

As of the Kendo UI 2014 Q3 release, the necessary build scripts are shipped in the `src/` directory of the downloadable commercial bundles. To build a custom distribution from the shipped source, run the shell commands from the example below.

###### Example

```sh
    cd src
    npm install -g gulp
    npm install
    gulp custom -c autocomplete,dropdownlist
```

List the components you want to be included in the custom build and separate them with a comma (`,`). The example above builds a custom minified script which includes the AutoComplete and the DropDownList widgets.

> **Important**  
>
> When complete, the `gulp` command outputs a `kendo.custom.min.js` file in the `src/dist` directory. The Gulp build task automatically resolves the needed dependencies for each component, so you do not have to list them. Do not use multiple custom combined scripts, as they will contain duplicate code. Instead, create one combined script file, which includes everything you need.

## See Also

Other articles on getting started with Kendo UI:

* [Get Started with Kendo UI]({% slug getting_started_installation_kendoui %})
* [Kendo UI CDN Services]({% slug kendoui_cdn_services_installation %})
* [JavaScript Prerequisites]({% slug javascript_prerequisites_kendoui_installation %})
* [Initialize Widgets Using jQuery Plug-Ins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize Widgets Using Markup]({% slug initialize_widgets_using_markup_installation %})
* [Access Widget DOM Elements: wrapper and element]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Set Data Attributes]({% slug dataattributes_configuration_installation %})
* [Widget Methods and Events]({% slug widget_methodsand_events_kendoui_installation %})
* [Destroy Widgets]({% slug destroywidgets_kendoui_gettingstarted %})
* [Edit Widgets]({% slug kendoui_editing_gettingstarted %})
* [Create Custom Widgets]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Bower Packages]({% slug kendoui_bower_packages_kendoui_installation %})
* [NuGet Packages]({% slug kendoui_nuget_packages %})
