---
title: Getting Started with Kendo UI
page_title: Getting Started with Kendo UI | Kendo UI Getting Started
description: "Host Kendo UI in your project, download the Bower packages, or install it by using the CDN services."
previous_url: /install/onsite, /getting-started, /intro/getting-started, /using-kendo-with, /getting-started/using-kendo-with, /bootstrapper
slug: getting_started_installation_kendoui
position: 1
---

# Getting Started with Kendo UI

Depending on your preferences and the requirements of your project, you can:

* Download [Kendo UI for a Trial Period](http://www.telerik.com/download/kendo-ui).
* Get your [Commercial License for Telerik Kendo UI® Professional](http://www.telerik.com/purchase/kendo-ui).
* Get your [Commercial License for Telerik UI for ASP.NET MVC](http://www.telerik.com/purchase/aspnet-mvc).
* Get your [Commercial License for Telerik UI for JSP](http://www.telerik.com/purchase/jsp-ui).
* Get your [Commercial License for Telerik UI for PHP](http://www.telerik.com/purchase/php-ui).
* Use the [GitHub Open-Source License for Telerik Kendo UI® Core](https://github.com/telerik/kendo-ui-core).

## Hosting Kendo UI in Your Project

To host Kendo UI in your project, you need to:
* [Download the bundles](#download).
* [Add the CSS and JavaScript references](#add-css-and-javascript-references).

### Download the Bundles

After you [download any of the Kendo UI bundles](http://www.telerik.com/download/kendo-ui), the folders listed below are hosted in your local repository.

|FOLDERS 						|CONTENTS |
|:---								|:---			|
|`/apptemplates`		|The folder contains standalone starter templates. Although they are static HTML files, it is recommended that you open them through a web server instead of directly from the file system. The latter approach breaks all Ajax data requests.|
|`/examples`				|Accommodates the quick-start demo files. Although they are static HTML files, it is recommended that you open them through a web server instead of directly from the file system. The latter approach breaks all Ajax data requests.|
|`/js`							|Contains the minified JavaScript files.|
|`/src`							|This folder used to hold the source code files, but they are now provided in a separate download package. Access the source code package from the [Downloads section](https://www.telerik.com/account/my-downloads) of your account. Note that the source code is _not_ available to trial users.|
|`/styles`					|Consists of the minified CSS files and theme images. The folder also includes the LESS files, which can be passed to the compiler, located on the first-level folders inside `styles/folder: styles/web/` and `styles/mobile/`. Note that the LESS files are _not_ available in the trial version.|
|`/wrappers`				|Includes the server-side wrappers. As it is necessary for the UI for ASP.NET MVC, UI for JSP or UI for PHP distributions only, the folder is available in the commercial packages of these versions.|
|`changelog.html`		|Provides the Kendo UI release notes.|

### Add CSS and JavaScript References

To use Kendo UI in your project, include the required JavaScript and CSS files.

**Step 1** Extract the `/js` and `/styles` directories from the bundle archive and copy them to your web application root directory.  

**Step 2** Include the Kendo UI JavaScript and CSS files in the `head` tag of your HTML document. Verify that the common CSS file is registered before the theme CSS file.

###### Example

		<!DOCTYPE html>
	        <html>
	        <head>
	            <title>Welcome to Kendo UI!</title>
	            <!-- Common Kendo UI CSS for web widgets and widgets for data visualization. -->
	            <link href="styles/kendo.common.min.css" rel="stylesheet" />

	            <!-- (Optional) RTL CSS for Kendo UI widgets for the web. Include only in right-to-left applications. -->
	            <link href="styles/kendo.rtl.min.css" rel="stylesheet" type="text/css" />

	            <!-- Default Kendo UI theme CSS for web widgets and widgets for data visualization. -->
	            <link href="styles/kendo.default.min.css" rel="stylesheet" />

	            <!-- (Optional) Kendo UI Hybrid CSS. Include only if you will use the mobile devices features. -->
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
> The code examples onwards assume that the Kendo UI scripts and stylesheets are now added to the document.

**Step 3** Initialize a Widget.

The following example demonstrates how to initialize the [DatePicker widget](http://demos.telerik.com/kendo-ui/datepicker/index).

###### Example

        <!-- HTML element from which the DatePicker would be initialized -->
        <input id="datepicker" />
        <script>
        $(function() {
            // Initialize the Kendo UI DatePicker by calling the kendoDatePicker jQuery plugin
            $("#datepicker").kendoDatePicker();
        });
        </script>

The following example demonstrates the full initialization of the [DatePicker widget](http://demos.telerik.com/kendo-ui/datepicker/index).

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

## Installing Bower Packages

[Bower](https://bower.io/) is a popular package manager for the web that handles frameworks, libraries, assets, and utilities.

### Overview

Kendo UI maintains 2 Bower packages:
* Kendo UI Core.
* Kendo UI Professional.

All official releases, service packs, and internal builds are uploaded to both of them. For more information, refer to the article on [installing the Kendo UI Bower packages]({% slug kendoui_bower_packages_kendoui_installation %}).

### Delimiter for Recurrence Exceptions

As of the Kendo UI 2016 Q2 (2016.2.504) release:
* The Scheduler substitutes the semicolon (`;`) as the delimiter type for recurrence exception with the comma (`,`).
* The Scheduler no longer adds a trailing delimiter to a recurrence exception.

The change was driven by the [RFC 5545](http://tools.ietf.org/html/rfc5545#page-120) specification. Note that the previously demonstrated behavior had been incorrect.

## Using CDN Services

Kendo UI CDN is hosted on [Amazon CloudFront](https://aws.amazon.com/cloudfront/). To access the CDN Service, you can use different approaches. For more information, refer to the article on [installing the Kendo UI CDN Service]({% slug kendoui_cdn_services_installation %}).

## Including Only What You Need

Add to your project only what it requires by picking the right combined scripts, building a custom combined script, or using Gulp to build a custom script. For more information, refer to the article on [customizing the scripts you need]({% slug include_only_what_you_need_kendoui_installation %}).

## See Also

Other articles on getting started with Kendo UI:

* [Kendo UI CDN Services]({% slug kendoui_cdn_services_installation %})
* [Include Only What You Need]({% slug include_only_what_you_need_kendoui_installation %})
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
