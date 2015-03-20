---
title: Host Kendo UI in your Project
page_title: HTML5, jQuery-based framework | Kendo UI
description: "How to download and host the necessary Kendo UI files in your project file structure"
position: 2
---

# Host Kendo UI in your project

## Download Kendo UI
You can download all Kendo UI bundles from the [download page](http://www.telerik.com/download/kendo-ui).

The distribution archive contains:

* **/examples** - quick start demos;
* **/js** - minified JavaScript files;
* **/src** - complete source code. Not available in the trial distribution;
* **/styles** - minified CSS files and theme images;
* **/wrappers** - server-side wrappers. Available in Telerik UI for ASP.NET MVC, JSP or PHP;
* **changelog.html** - Kendo UI release notes.

## Add Kendo UI CSS and JavaScript References to Your Project

To use Kendo UI in your project, you need to include the required JavaScript and CSS files.

1. Extract the **/js** and **/styles** directories from the bundle archive and copy them to your web application root directory.
1. Include the Kendo UI JavaScript and CSS files in the `head` tag of your HTML document. **Make sure the common CSS file is registered before the theme CSS file**.

        <!DOCTYPE html>
        <html>
        <head>
            <title>Welcome to Kendo UI!</title>
            <!-- Common Kendo UI CSS -->
            <link href="styles/kendo.common.min.css" rel="stylesheet" />

            <!-- Default Kendo UI theme CSS -->
            <link href="styles/kendo.default.min.css" rel="stylesheet" />

            <!-- (optional) Kendo UI DataViz CSS, include only if you will use the data visualisation features -->
            <link href="styles/kendo.dataviz.min.css" rel="stylesheet" />

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

> The rest of the code examples assume that the Kendo UI scripts and stylesheets are present in the document.

1. Initialize a Kendo UI Widget (in this case, the DatePicker):

        <!-- HTML element from which the DatePicker would be initialized -->
        <input id="datepicker" />
        <script>
        $(function() {
            // Initialize the Kendo DatePicker by calling the kendoDatePicker jQuery plugin
            $("#datepicker").kendoDatePicker();
        });
        </script>

Here is the complete example:

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
