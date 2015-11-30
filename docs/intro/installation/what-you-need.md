---
title: Include Only What You Need
page_title: Include Only What You Need | Kendo UI Installation
description: "Customize Kendo UI for your project and add the HTML5 UI controls you need."
previous_url: /install/custom
slug: include_only_what_you_need_kendoui_installation
position: 4
---

# Include Only What You Need

## Combined Scripts

The following combined scripts are available in the bundles or at the CDN in order to facilitate the common project types:

*  `kendo.ui.core.min.js` contains all widgets supported by the [Kendo UI Core distribution](/intro/supporting/list-of-widgets). The relevant script is available in the Kendo UI Core package as well.
*  `kendo.all.min.js` contains a minified version of all features provided by Kendo UI.

> **Important**  
> `kendo.all.min.js` is available in the Kendo UI Professional, Telerik UI for ASP.NET MVC, Telerik UI for JSP and Telerik UI for PHP bundles. However, `kendo.all.min.js` does not include the `kendo.aspnetmvc.min.js`. To install it, add `kendo.aspnetmvc.min.js` to `kendo.all.min.js` or use the [custom download builder tool](https://www.telerik.com/login/v2/telerik?ReturnUrl=http%3a%2f%2fwww.telerik.com%2fdownload%2fcustom-download).

* `kendo.web.min.js` is available in Kendo UI Professional, JSP, PHP and MVC. It includes the core framework and all desktop browser widgets (previously distributed as Kendo UI Web).
* `kendo.dataviz.min.js` is available in Kendo UI Professional, JSP, PHP and MVC. It includes the core framework and all data visualization widgets (previously distributed as Kendo UI DataViz).
* `kendo.mobile.min.js` is available in Kendo UI Professional, JSP, PHP and MVC. Includes the core framework and all mobile device specific widgets (previously distributed as Kendo UI Mobile).

> **Important**  
> Only one of the combined JavaScript files can be included at a time, because they include the Kendo UI framework. If you want to simultaneously use widgets from different Kendo UI suites, use `kendo.all.min.js` or build a custom script.

In addition, each of the combined script files should not be registered together with an individual widget script from the same suite. For example, `kendo.grid.js` should not be registered together with `kendo.web.js` or `kendo.all.js`, because they already include the Grid scripts.

> **Important**  
> Registering duplicate scripts may cause JavaScript errors and unexpected behavior.

## Individual Widget Scripts

Below are the references to the script files which, whether minified or not, can be included on a per-widget basis depending on the flavor you want to add to your project. 

+ [List of Kendo UI widgets in terms of their bundle support]({% slug bundle_supportfor_kendoui_components %})  
+ [List of script files for the desktop UI widgets for mobile-ready websites and apps]({% slug scirpt_filesfor_desktop_widgets %})  
+ [List of script files for the widgets rendering data visualization]({% slug script_filesfor_datavisualization_widgets %})
+ [List of script files for the frameworks and widgets for mobile applications]({% slug script_filesfor_hybridui_widgets %})
+ [List of script files for the tools and utilities]({% slug script_filesfor_tools_frameworks_utilities %})
+ [List of script files for the server-side wrappers]({% slug script_filesfor_serverside_wrappers %})

## Build Scripts

### With Download Builder

Users with a commercial license may use the [custom download builder tool](https://www.telerik.com/login/v2/telerik?ReturnUrl=http%3a%2f%2fwww.telerik.com%2fdownload%2fcustom-download) to create a single JavaScript file which contains only the required widgets and features.

> **Important**  
> Do not use multiple custom combined scripts, as they will contain duplicate code. Instead, create one combined script file, which includes everything you need.

### Use Grunt

If you use the Kendo UI Core package, you can build a custom distribution using the `grunt` build tool by following the instructions in [README](https://github.com/telerik/kendo-ui-core#building-only-what-you-need).

Since Q3 2014, the necessary build scripts are shipped in the `src/` directory of the downloadable commercial bundles. To build a custom distribution from the shipped source, run the following shell commands:

```sh
    cd src
    npm install -g grunt-cli
    npm install
    grunt custom:autocomplete,dropdownlist
```

List the components you want to be included in the custom build and separated them with comma (`,`). The example above will build a custom minified script which includes the AutoComplete and the DropDownList widgets.

> **Important**  
> When complete, the grunt command will output a `kendo.custom.min.js` file in the `src/dist` directory.
The grunt build task automatically resolves the needed dependencies for each component, so you don't have to list them.
Do not use multiple custom combined scripts, as they will contain duplicate code. Instead, create one combined script file, which includes everything you need.

## See Also

Other articles on getting started with Kendo UI:

* [Getting Started with Kendo UI]({% slug getting_started_installation_kendoui %})
* [Kendo UI Bower Packages]({% slug kendoui_bower_packages_kendoui_installation %})
* [Kendo UI CDN Services]({% slug kendoui_cdn_services_installation %})
* [JavaScript Prerequisites]({% slug javascript_prerequisites_kendoui_installation %})
* [Initialize Widgets Using jQuery Plug-Ins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize Widgets Using Markup]({% slug initialize_widgets_using_markup_installation %})
* [Widget Methods and Events]({% slug widget_methodsand_events_kendoui_installation %})