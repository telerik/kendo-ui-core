---
title: Include Only What You Need
page_title: Include Only What You Need
description: "Customize Kendo UI for your project and add what you need."
previous_url: /install/custom
position: 4
---

# Include Only What You Need

## Pick the Right Combined Script for Your Project

The following combined scripts are available in the bundles or at the CDN in order to facilitate the common project types:

*  `kendo.ui.core.min.js` contains all widgets supported by the [Kendo UI Core distribution](/intro/supporting/list-of-widgets). The relevant script is available in the Kendo UI Core package as well.
*  `kendo.all.min.js` contains a minified version of all features provided by Kendo UI.

> **Important**  
> `kendo.all.min.js` is available in the Kendo UI Professional, Telerik UI for ASP.NET MVC, Telerik UI for JSP and Telerik UI for PHP bundles. However, `kendo.all.min.js` does not include the `kendo.aspnetmvc.min.js`. To install it, add `kendo.aspnetmvc.min.js` to `kendo.all.min.js` or use the [custom download builder tool](http://www.telerik.com/download/custom-download).

* `kendo.web.min.js` is available in Kendo UI Professional, JSP, PHP and MVC. It includes the core framework and all desktop browser widgets (previously distributed as Kendo UI Web).
* `kendo.dataviz.min.js` is available in Kendo UI Professional, JSP, PHP and MVC. It includes the core framework and all data visualization widgets (previously distributed as Kendo UI DataViz).
* `kendo.mobile.min.js` is available in Kendo UI Professional, JSP, PHP and MVC. Includes the core framework and all mobile device specific widgets (previously distributed as Kendo UI Mobile).

> **Important**  
> Only one of the combined JavaScript files can be included at a time, because they include the Kendo UI framework. If you want to simultaneously use widgets from different Kendo UI suites, use `kendo.all.min.js` or build a custom script.

In addition, each of the combined script files should not be registered together with an individual widget script from the same suite. For example, `kendo.grid.js` should not be registered together with `kendo.web.js` or `kendo.all.js`, because they already include the Grid scripts.

> **Important**  
> Registering duplicate scripts may cause JavaScript errors and unexpected behavior.

## Build a Custom Combined Script with the Download Builder

Users with a commercial license may use the [custom download builder tool](http://www.telerik.com/download/custom-download) to create a single JavaScript file which contains only the required widgets and features.

> **Important**  
> Do not use multiple custom combined scripts, as they will contain duplicate code. Instead, create one combined script file, which includes everything you need.

## Build a Custom Script Using Grunt

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

## Include Individual Widget Scripts

Below are the references to the script files which, whether minified or not, can be included on a per-widget basis depending on the flavor you want to add to your project. 

+ [List of Kendo UI widgets in terms of their bundle support](/intro/supporting/list-of-widgets)  
+ [List of script files for the desktop UI widgets for mobile-ready websites and apps](/intro/supporting/scripts-general) 
+ [List of script files for the widgets rendering data visualization](/intro/supporting/scripts-dataviz)
+ [List of script files for the frameworks and widgets for mobile applications](/intro/supporting/scripts-hybridui)
+ [List of script files for the tools and utilities](/intro/supporting/scripts-frameworks)
+ [List of script files for the server-side wrappers](/intro/supporting/scripts-wrappers)