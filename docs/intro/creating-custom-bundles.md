---
title: Creating Custom Bundles
page_title: Creating Your Own Custom Bundles - Download and Installation 
description: "Get started with Kendo UI for jQuery, customize its components according to your project and add only those the HTML5 UI controls that you need."
previous_url: /install/custom, /intro/scripts/what-you-need
slug: include_only_what_you_need_kendoui_scripts
position: 4
---

# Creating Custom Bundles

Depending on your project, you may need to skip some of the Kendo UI utilities and install only what your application requires.  

To facilitate the customization of your project, Kendo UI for jQuery delivers a set of combined and custom scripts.

* The [combined scripts bundles](#combined-scripts) contain the scripts of specific types of widgets (for example, desktop, data visualization) available for the different Kendo UI distributions.

* Customizing your project by [creating your custom scripts](#custom-scripts) allows you to add the specific components and features required by your project.

* Starting with version 2022.3.1109, you can use [ECMAScript]({% slug kendoui_ecmascript_overview %}) to import individual modules into your application. The related dependencies will be automatically bundled alongside their respective modules. This will save you the trouble of having to manually select which scripts to include in your project.

## Combined Scripts

To facilitate the common project types, Kendo UI ships the following combined scripts in the bundles or on [CDN]({% slug kendoui_cdn_services_installation%}):

*  The `kendo.ui.core.min.js` contains all widgets supported by the [Kendo UI Core distribution](https://github.com/telerik/kendo-ui-core). The relevant script is available in the [Kendo UI Core package](https://www.nuget.org/packages/KendoUICore/) as well.
*  The `kendo.all.min.js` contains a minified version of all features provided by Kendo UI.

    > The `kendo.all.min.js` is available in the [Kendo UI Professional](https://www.telerik.com/kendo-ui), [Telerik UI for ASP.NET MVC](https://www.telerik.com/aspnet-mvc), and [Telerik UI for ASP.NET Core](https://www.telerik.com/aspnet-core-ui). However, the `kendo.all.min.js` does not include the `kendo.aspnetmvc.min.js`. To install it, add `kendo.aspnetmvc.min.js` to `kendo.all.min.js`, or use the [custom download builder tool](https://www.telerik.com/download/custom-download).

* The `kendo.web.min.js` includes the core framework and all desktop browser widgets (previously distributed as Kendo UI Web). It is available in [Kendo UI Professional](https://www.telerik.com/kendo-ui), [Telerik UI for ASP.NET MVC](https://www.telerik.com/aspnet-mvc), and [Telerik UI for ASP.NET Core](https://www.telerik.com/aspnet-core-ui). 
* The `kendo.dataviz.min.js` includes the core framework and all data visualization widgets (previously distributed as Kendo UI DataViz). It is available in [Kendo UI Professional](https://www.telerik.com/kendo-ui), [Telerik UI for ASP.NET MVC](https://www.telerik.com/aspnet-mvc), and [Telerik UI for ASP.NET Core](https://www.telerik.com/aspnet-core-ui).
* The `kendo.mobile.min.js` includes the core framework and all mobile device specific widgets (previously distributed as Kendo UI Mobile). It is available in [Kendo UI Professional](https://www.telerik.com/kendo-ui), [Telerik UI for ASP.NET MVC](https://www.telerik.com/aspnet-mvc), and [Telerik UI for ASP.NET Core](https://www.telerik.com/aspnet-core-ui).

> Only one of the combined JavaScript files can be included at a time, because they include the Kendo UI framework. To simultaneously use widgets from different Kendo UI suites, use the `kendo.all.min.js` or [build a custom script](#custom-scripts).

Do not register any of the combined script files together with an individual widget script from the same suite. For example, do not register `kendo.grid.js` together with `kendo.web.js` or `kendo.all.js` because they already include the Grid scripts.

> Registering duplicate scripts might cause JavaScript errors and unexpected behavior.

## Custom Scripts

You can create custom scripts that provide only the widgets and features your project requires.

### Employing the Download Builder

Users with a commercial license might use the [custom Download Builder tool](https://www.telerik.com/download/custom-download) to create a single JavaScript file that contains only the required widgets and features.

> * Do not use multiple custom combined scripts, as they contain duplicate code. Instead, create one combined script file, which includes everything you need.
> * It is not possible to load Download Builder packages by using RequireJS because the tool will not create the required AMD modules.

### Using Gulp

If you use the [Kendo UI Core package](https://www.nuget.org/packages/KendoUICore/), you can build a custom distribution by using the `gulp` build tool and by following the instructions in the [`README` article](https://github.com/telerik/kendo-ui-core#building-only-what-you-need). The necessary build scripts are shipped in the `src/` directory of the downloadable bundles.

To build a custom distribution from the shipped source:

1. Run the following shell commands.

      ```sh
          cd src
          npm install
          npx gulp custom -c autocomplete,dropdownlist
      ```

1. List the components you want to be included in the custom build and separate them with a comma (`,`). The previous example builds a custom minified script which includes the AutoComplete and the DropDownList widgets.
1. Build the entire Kendo UI library by running `npx gulp custom -c all`.

      > When complete, the `gulp` command outputs a `kendo.custom.min.js` file in the `src/dist` directory. The `gulp` build task automatically resolves the needed dependencies for each component, so you do not have to list them. Do not use multiple custom combined scripts, as they will contain duplicate code. Instead, create one combined script file that includes everything you need.

1. To compile a custom script version that is not minified, remove or comment out the following line from the `gulpfile.js`:

      ```JavaScript
          ...
          .pipe(uglify())
          ...
      ```

## Order of Tags

To load and execute the scripts after the HTML markup, place the `script` tags before the closing `body` tag. Usually, the Kendo UI widget initialization statements are executed in the `document.ready` event through a jQuery handler, which means that you must register jQuery before any Kendo UI widget initialization statements. When using the client-side Kendo UI widgets, you can control the placement of the initialization statements so that the jQuery script file can be registered at the bottom of the document.

The server-side wrappers for the Kendo UI widgets are self-initialized, which means that each initialization script is rendered right after the HTML markup of the widget. In such cases, the Kendo UI scripts can still be registered at the end of the document while the jQuery script must be registered in the `body` before the first Kendo UI widget on the document, or in the document `head`.

## Next Steps

* [Learn about the widget DOM element structure]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Initialize widgets as jQuery plugins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize widgets with MVVM]({% slug mvvm_initialization_kendoui %})
* [Check out the jQuery version support]({% slug jquerysupport_kendoui %})
* [Check out the web browser support]({% slug wbe_browserand_operating_system_support %})
* [Check out the operation system support]({% slug ossupport_kendo %})
* [Check out the PDF and Excel export support]({% slug export_support_kendoui %})
* [Create your own custom widgets]({% slug createcustomkendouiwidgets_gettingstarted %})

## See Also

* [Hosting Kendo UI in Your Project]({% slug hosting_kendoui %})
* [Installing Kendo UI with Bower]({% slug kendoui_bower_packages_kendoui_installation %})
* [Installing Kendo UI by Using the CDN Services]({% slug kendoui_cdn_services_installation %})
* [Installing Kendo UI with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Installing Kendo UI with NuGet]({% slug kendoui_nuget_packages %})
* [Getting Up and Running with Your Kendo UI Project (Guide)]({% slug getting_started_installation_kendoui %})
