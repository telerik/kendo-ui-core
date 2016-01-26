---
title: Get Started with Kendo UI
page_title: Get Started with Kendo UI | Kendo UI Getting Started
description: "Get your HTML5 UI frameworks and widgets by hosting Kendo UI, downloading Kendo UI bower package, or using Kendo UI CDN service."
previous_url: /install/onsite, /getting-started, /intro/getting-started
slug: getting_started_installation_kendoui
position: 1
---

# Get Started with Kendo UI

## Host Kendo UI in Your Project

Depending on your preferences and the requirements of your project, you can:

* [Download Kendo UI for a Trial Period](http://www.telerik.com/download/kendo-ui)
* [Get Your Commercial License for Telerik Kendo UI® Professional](http://www.telerik.com/purchase/kendo-ui)
* [Get Your Commercial License for Telerik UI for ASP.NET MVC](http://www.telerik.com/purchase/aspnet-mvc)
* [Get Your Commercial License for Telerik UI for JSP](http://www.telerik.com/purchase/jsp-ui)
* [Get Your Commercial License for Telerik UI for PHP](http://www.telerik.com/purchase/php-ui)
* [Use the GitHub Open-Source License for Telerik Kendo UI® Core](https://github.com/telerik/kendo-ui-core)

### Download

Once you [download any of the Kendo UI bundles](http://www.telerik.com/download/kendo-ui), you will get the following folders in your local repository:

* `/examples`&mdash;This folder accommodates the quick start demo files. Although they are static HTML files, it is recommended to open them via a web server, instead of directly from the file system. The latter approach will break all Ajax data requests.
* `/js`&mdash;Contains the minified JavaScript files.
* `/src`&mdash;Holds the source code files. Note that it is not available in the trial version.
* `/styles`&mdash;Consists of the minified CSS files and theme images. The folder also includes the LESS files, which can be passed to the compiler, located on the first-level folders inside `styles/folder: styles/web/` and `styles/mobile/`. However, note that the LESS files are not available in the trial version.
* `/wrappers`&mdash;Includes the server-side wrappers. As it is necessary for the Telerik UI for ASP.NET MVC, UI for JSP or UI for PHP distributions only, the folder is available in the commercial packages of these versions.
* `changelog.html`&mdash;Provides the Kendo UI release notes.

### Add CSS and JavaScript References

To use Kendo UI in your project, you need to include the required JavaScript and CSS files.

**Step 1** Extract the `/js` and `/styles` directories from the bundle archive and copy them to your web application root directory.  
**Step 2** Include the Kendo UI JavaScript and CSS files in the `head` tag of your HTML document. Make sure the common CSS file is registered before the theme CSS file.

###### Example

		<!DOCTYPE html>
	        <html>
	        <head>
	            <title>Welcome to Kendo UI!</title>
	            <!-- Common Kendo UI CSS for web and dataviz widgets -->
	            <link href="styles/kendo.common.min.css" rel="stylesheet" />

	            <!-- (optional) Kendo UI web widgets' RTL CSS, include only in right-to-left applications -->
	            <link href="styles/kendo.rtl.min.css" rel="stylesheet" type="text/css" />

	            <!-- Default Kendo UI theme CSS for web and dataviz widgets -->
	            <link href="styles/kendo.default.min.css" rel="stylesheet" />

	            <!-- (optional) Kendo UI Mobile CSS, include only if you will use the mobile devices features -->
	            <link href="styles/kendo.default.mobile.min.css" rel="stylesheet" type="text/css" />

	            <!-- jQuery JavaScript -->
	            <script src="js/jquery.min.js"></script>

	            <!-- Kendo UI combined JavaScript -->
	            <script src="js/kendo.all.min.js"></script>
	        </head>
	        <body>
	            Hello World!
	        </body>
	        </html>

> **Important**  
>
> The code examples onwards assume that the Kendo UI scripts and stylesheets were added to the document.

**Step 3** Initialize a Widget.

The example below demonstrates how to initialize the [DatePicker widget](http://demos.telerik.com/kendo-ui/datepicker/index).

###### Example

        <!-- HTML element from which the DatePicker would be initialized -->
        <input id="datepicker" />
        <script>
        $(function() {
            // Initialize the Kendo UI DatePicker by calling the kendoDatePicker jQuery plugin
            $("#datepicker").kendoDatePicker();
        });
        </script>

The example below demonstrates the full initialization of the [DatePicker widget](http://demos.telerik.com/kendo-ui/datepicker/index).

###### Example

    <!DOCTYPE html>
    <html>
        <head>
            <title>Welcome to Kendo UI!</title>
            <link href="styles/kendo.common.min.css" rel="stylesheet" />
            <link href="styles/kendo.default.min.css" rel="stylesheet" />
            <script src="js/jquery.min.js"></script>
            <script src="js/kendo.all.min.js"></script>
        </head>
        <body>
            <input id="datepicker" />
            <script>
                $(function() {
                    $("#datepicker").kendoDatePicker();
                });
            </script>
        </body>
    </html>

## Install Bower Packages

### Kendo UI Bower Packages

[Bower](http://bower.io/) is a popular package manager for the web. Kendo UI maintains 2 bower packages, namely Kendo UI Core and Kendo UI Professional. Official releases, service packs and internal builds are uploaded to both of them.

For more information on installing Kendo UI as a Bower package, see [this article]({% slug kendoui_bower_packages_kendoui_installation %}).

## Use CDN Services

### Kendo UI CDN Services

Kendo UI CDN is hosted on [Amazon CloudFront](https://aws.amazon.com/cloudfront/). To access the CDN Service, you can use different approaches.

For more information on installing Kendo UI CDN Service, see [this article]({% slug kendoui_cdn_services_installation %}).

## Include Only What You Need

Add to your project only what it requires by picking the right combined scripts, building a custom combined script, or using Grunt to build a custom script.

For more information on customizing the scripts you need, see [this article]({% slug include_only_what_you_need_kendoui_installation %}).

## See Also

Other articles on getting started with Kendo UI:

* [Kendo UI Bower Packages]({% slug kendoui_bower_packages_kendoui_installation %})
* [Kendo UI CDN Services]({% slug kendoui_cdn_services_installation %})
* [Include Only What You Need]({% slug include_only_what_you_need_kendoui_installation %})
* [JavaScript Prerequisites]({% slug javascript_prerequisites_kendoui_installation %})
* [Initialize Widgets Using jQuery Plug-Ins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize Widgets Using Markup]({% slug initialize_widgets_using_markup_installation %})
* [Access Widget DOM Elements: wrapper and element]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Set Data Attributes]({% slug dataattributes_configuration_installation %})
* [Widget Methods and Events]({% slug widget_methodsand_events_kendoui_installation %})
* [Destroy Widgets]({% slug destroywidgets_kendoui_gettingstarted %})
* [Create Custom Widgets]({% slug createcustomkendouiwidgets_gettingstarted %})
