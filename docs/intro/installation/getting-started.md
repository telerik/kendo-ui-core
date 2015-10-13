---
title: Getting Started with Kendo UI
page_title: Getting Started with Kendo UI
description: "project up and running, download and host Kendo UI, Kendo UI bower package, Kendo UI CDN service, include only what you need with Kendo UI"
previous_url: /install/onsite, /getting-started, /intro/getting-started
position: 1
---

# Getting Started with Kendo UI

### Host Kendo UI in Your Project

Depending on your preferences and the requirements of your project, you can:

* [Download Kendo UI for a 30-day trial period](http://www.telerik.com/download/kendo-ui)
* [Get your commercial license for Telerik Kendo UI® Professional](http://www.telerik.com/purchase/kendo-ui)
* [Get your commercial license for Telerik UI for ASP.NET MVC](http://www.telerik.com/purchase/aspnet-mvc)
* [Get your commercial license for Telerik UI for JSP](http://www.telerik.com/purchase/jsp-ui)
* [Get your commercial license for Telerik UI for PHP](http://www.telerik.com/purchase/php-ui)
* [Use the GitHub open-source license for Telerik Kendo UI® Core](https://github.com/telerik/kendo-ui-core)

#### Step 1: Download Kendo UI

Once you [download any of the Kendo UI bundles](http://www.telerik.com/download/kendo-ui), you will get the following folders in your local repository:

* `/examples` - accommodates the quick start demo files
* `/js` - contains the minified JavaScript files
* `/src` - holds the source code files. Note that it is not available in the 30-day trial version.
* `/styles` - consists of the minified CSS files and theme images
* `/wrappers` - includes the server-side wrappers. As it is necessary for the Telerik UI for ASP.NET MVC, UI for JSP or UI for PHP distributions only, the folder is available in the commercial packages of these versions.
* `changelog.html` - provides the Kendo UI release notes

#### Step 2: Add CSS and JavaScript References to Your Project

To use Kendo UI in your project, you need to include the required JavaScript and CSS files.

**Step 1:** Extract the `/js` and `/styles` directories from the bundle archive and copy them to your web application root directory  
**Step 2:** Include the Kendo UI JavaScript and CSS files in the `head` tag of your HTML document. Make sure the common CSS file is registered before the theme CSS file.

**Example:**

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

> The code examples onwards assume that the Kendo UI scripts and stylesheets were added to the document.

**Step 3:** Initialize a Widget

**Example ([DatePicker widget](http://demos.telerik.com/kendo-ui/datepicker/index)):**

        <!-- HTML element from which the DatePicker would be initialized -->
        <input id="datepicker" />
        <script>
        $(function() {
            // Initialize the Kendo UI DatePicker by calling the kendoDatePicker jQuery plugin
            $("#datepicker").kendoDatePicker();
        });
        </script>

**The complete example ([DatePicker widget](http://demos.telerik.com/kendo-ui/datepicker/index)):**

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

### Install Kendo UI as a Bower Package

[Bower](http://bower.io/) is a popular package manager for the web.

Kendo UI maintains 2 bower packages, namely Kendo UI Core and Kendo UI Professional. Official releases, service packs and internal builds are uploaded to both of them.

[Learn more about installing Kendo UI as a Bower package](/intro/installation/bower-install)

### Use Kendo UI with CDN Services

Kendo UI CDN is hosted on [Amazon CloudFront](https://aws.amazon.com/cloudfront/). To access the CDN Service, you can use different approaches.

[Learn more about the Kendo UI CDN Service](/intro/installation/cdn-service)

### Include Only What You Need

Add to your project only what it requires by picking the right combined scripts, building a custom combined script, or using Grunt to build a custom script.

[Learn more about customizing the scripts you need](/intro/installation/what-you-need)
