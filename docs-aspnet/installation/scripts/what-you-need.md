---
title: Creating Your Own Custom Bundles
page_title: Creating Your Own Custom Bundles
description: "Get started with Telerik UI for ASP.NET Core, customize its components according to your project and add only the helpers that you need."
previous_url: /getting-started/scripts/what-you-need
slug: custombundles_core
position: 1
---

# Creating Your Own Custom Bundles

Depending on your project, you may need to skip some of the Kendo UI utilities and install only what your application requires.  

## Combined Scripts

To facilitate the common project types, Kendo UI ships the following combined scripts in the bundles or on CDN:

*  The `kendo.ui.core.min.js` contains all widgets supported by the [Kendo UI Core distribution](https://docs.telerik.com/kendo-ui/introduction#list-of-widgets). The relevant script is available in the Kendo UI Core package as well.
*  The `kendo.all.min.js` contains a minified version of all features provided by Kendo UI.

  > The `kendo.all.min.js` is available in the Kendo UI Professional, Telerik UI for ASP.NET MVC, Telerik UI for JSP and Telerik UI for PHP bundles. However, the `kendo.all.min.js` does not include the `kendo.aspnetmvc.min.js`. To install it, add `kendo.aspnetmvc.min.js` to `kendo.all.min.js`, or use the [custom download builder tool](https://www.telerik.com/download/custom-download).

* The `kendo.web.min.js` is available in Kendo UI Professional, JSP, PHP, and MVC. It includes the core framework and all desktop browser widgets (previously distributed as Kendo UI Web).
* The `kendo.dataviz.min.js` is available in Kendo UI Professional, JSP, PHP, and MVC. It includes the core framework and all data visualization widgets (previously distributed as Kendo UI DataViz).
* The `kendo.mobile.min.js` is available in Kendo UI Professional, JSP, PHP, and MVC. It includes the core framework and all mobile device specific widgets (previously distributed as Kendo UI Mobile).

    > Only one of the combined JavaScript files can be included at a time, because they include the Kendo UI framework. To simultaneously use widgets from different Kendo UI suites, use the `kendo.all.min.js` or build a custom script.

    Do not register any of the combined script files together with an individual widget script from the same suite. For example, do not register `kendo.grid.js` together with `kendo.web.js` or `kendo.all.js` because they already include the Grid scripts.

    > Registering duplicate scripts might cause JavaScript errors and unexpected behavior.

## Individual Scripts

The following list provides the references to the script files which, whether minified or not and depending on your project, can be included on a per-widget basis.

+ [List of Kendo UI widgets in terms of their bundle support](https://docs.telerik.com/kendo-ui/introduction#list-of-widgets)
+ [Script Files for Data Management]({% slug script_filesfor_datamanagement_widgets %})
+ [Script Files for Editors]({% slug script_filesfor_editors_widgets %})
+ [Script Files for Charts]({% slug script_filesfor_charts_widgets %})
+ [Script Files for Gauges]({% slug script_filesfor_gauges_widgets %})
+ [Script Files for Barcodes]({% slug script_filesfor_barcodes_widgets %})
+ [Script Files for Diagrams and Maps]({% slug script_filesfor_diagramsandmaps_widgets %})
+ [Script Files for Scheduling]({% slug script_filesfor_scheduling_widgets %})
+ [Script Files for Layout]({% slug script_filesfor_layout_widgets %})
+ [Script Files for Navigation]({% slug script_filesfor_navigation_widgets %})
+ [Script Files for Interactivity and UX]({% slug script_filesfor_interactivityandux_widgets %})
+ [Script Files for Hybrid UI]({% slug script_filesfor_hybridui_widgets %})
+ [Script Files for Tools, Frameworks and Utilities]({% slug script_filesfor_tools_frameworks_utilities %})
+ [Script Files for Server-Side Wrappers]({% slug script_filesfor_serverside_wrappers %})

## Custom Scripts

You can create custom scripts that provide only the widgets and features your project requires.

### Employing the Download Builder

Users with a commercial license might use the [custom Download Builder tool](https://www.telerik.com/download/custom-download) to create a single JavaScript file which contains only the required widgets and features.

> * Do not use multiple custom combined scripts, as they will contain duplicate code. Instead, create one combined script file, which includes everything you need.
> * It is not possible to load Download Builder packages by using RequireJS because the tool will not create the required AMD modules.

### Using Gulp

If you use the Kendo UI Core package, you can build a custom distribution by using the `gulp` build tool and by following the instructions in the [`README` article](https://github.com/telerik/kendo-ui-core#building-only-what-you-need). As of the Kendo UI 2014 Q3 release, the necessary build scripts are shipped in the `src/` directory of the downloadable commercial bundles.

To build a custom distribution from the shipped source:

1. Run the following shell commands.

      ```sh
          cd src
          npm install -g gulp
          npm install
          gulp custom -c autocomplete,dropdownlist
      ```

1. List the components you want to be included in the custom build and separate them with a comma (`,`). The previous example builds a custom minified script which includes the AutoComplete and the DropDownList widgets.
1. Build the entire Kendo UI library by running `gulp custom -c all`.

      > When complete, the `gulp` command outputs a `kendo.custom.min.js` file in the `src/dist` directory. The Gulp build task automatically resolves the needed dependencies for each component, so you do not have to list them. Do not use multiple custom combined scripts, as they will contain duplicate code. Instead, create one combined script file, which includes everything you need.

1. To compile a custom script version that is not minified, remove or comment out the following line from the `gulpfile.js`:

      ```JavaScript
          ...
          .pipe(uglify())
          ...
      ```

## Order of Tags

To load and execute the scripts after the HTML markup, place the `script` tags before the closing `body` tag. Usually, the Kendo UI widget initialization statements are executed in the `document.ready` event through a jQuery handler which means that you have to register jQuery before any Kendo UI widget initialization statements. When using the client-side Kendo UI widgets, you can control the placement of the initialization statements so that the jQuery script file can be registered at the bottom of the document.

The server-side wrappers for the Kendo UI widgets are self-initialized which means that each initialization script is rendered right after the HTML markup of the widget. In such cases, the Kendo UI scripts can still be registered at the end of the document while the jQuery script must be registered in the `body` before the first Kendo UI widget on the document, or in the document `head`.

## Next Steps

* [Check out the jQuery version support]({% slug jquerysupport_core %})
* [Check out the web browser support]({% slug webbrowsersupport_core %})
* [Check out the operation system support]({% slug ossupport_core %})
* [Check out the PDF and Excel export support]({% slug exportsupport_core %})
* [Explore the helper script dependencies]({% slug script_filesfor_barcodes_widgets %})

## See Also

* [Including Client-Side Resources]({% slug copyclientresources_aspnetmvc6_aspnetmvc %})
* [Installing Telerik UI for ASP.NET Core with Bower]({% slug bowerpackage_core %})
* [Installing Telerik UI for ASP.NET Core by Using the CDN Services]({% slug cdnservices_core %})
* [Installing Telerik UI for ASP.NET Core with NPM]({% slug npmpackages_core %})
* [Installing Telerik UI for ASP.NET Core with NuGet]({% slug nuget_install_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Mac (Online Guide)]({% slug gettingstarted_firststeps_vsmac %})
* [First Steps with CLI (Online Guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
