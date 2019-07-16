---
title: First Steps
page_title: First Steps with Your Kendo UI for jQuery Project Guide | Getting Started | Kendo UI for jQuery
description: "A guide on getting started with Kendo UI for jQuery, how to add the necessary CSS and JavaScript files and implement the DatePicker widget."
previous_url: /install/onsite, /getting-started, /intro/getting-started, /using-kendo-with, /getting-started/using-kendo-with, /bootstrapper
slug: getting_started_installation_kendoui
position: 0
---

# First Steps

Welcome to the First Steps guide on getting started with Kendo UI for jQuery!

This guide creates a use case scenario which demonstrates how to start working with the suite and implement the Kendo UI DatePicker widget for jQuery in your project.

1. Add the required CSS and JavaScript files [locally]({% slug hosting_kendoui %}).

  You can also use the [Kendo UI CDN services]({% slug kendoui_cdn_services_installation %}). The minified CDN versions of the CSS and JavaScript files are available in the `https://kendo.cdn.telerik.com/VERSION/js/FILENAME.min.js` and `https://kendo.cdn.telerik.com/VERSION/styles/FILENAME.min.css` locations.

  Include the Kendo UI CSS and CSS JavaScript in the head tag of your HTML document.

        <!DOCTYPE html>
        <html>
        <head>
            <title>Welcome to Kendo UI!</title>
            <!-- Common (base) Kendo UI stylesheet. Register it before the Kendo UI theme-specific stylesheet. -->
            <link href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.common.min.css" rel="stylesheet" />

            <!-- Default Kendo UI theme stylesheet. -->
            <link href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.default.min.css" rel="stylesheet" />

            <!-- (Optional) Kendo UI Hybrid stylesheet. Include only if you will use the mobile devices features. -->
            <link href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.default.mobile.min.css" rel="stylesheet" />

            <!-- jQuery JavaScript. Register it before the Kendo UI JavaScript file. -->
            <script src="https://code.jquery.com/jquery-1.12.3.min.js"></script>

            <!-- Kendo UI combined JavaScript -->
            <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js"></script>
        </head>
        <body>
            Hello World!
        </body>
        </html>

1. Add the HTML element for the Kendo UI DatePicker widget.
1. Initialize the DatePicker by using its jQuery plugin.

        <!DOCTYPE html>
        <html>
        <head>
            <title>Welcome to Kendo UI!</title>
            <link href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.common.min.css" rel="stylesheet" />
            <link href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.default.min.css" rel="stylesheet" />
            <link href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.default.mobile.min.css" rel="stylesheet" />

            <script src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
            <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js"></script>
        </head>
        <body>
            <!-- HTML element from which the DatePicker would be initialized -->
            <input id="datepicker" />
            <script>
                // Initialize the Kendo UI DatePicker by calling the kendoDatePicker jQuery plugin.
                $(function() {
                    $("#datepicker").kendoDatePicker();
                });
            </script>
        </body>
        </html>

1. Set the de-DE culture locale for the DatePicker.

        <!DOCTYPE html>
        <html>
        <head>
            <title>Welcome to Kendo UI!</title>
            <link href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.common.min.css" rel="stylesheet" />
            <link href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.default.min.css" rel="stylesheet" />
            <link href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.default.mobile.min.css" rel="stylesheet" />

            <script src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
            <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js"></script>
            <!-- Register the culture js file -->
            <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/cultures/kendo.culture.de-DE.min.js"></script>
        </head>
        <body>
            <input id="datepicker" />
            <script>
                // Configure the DatePicker to use German culture.
                $(function() {
                    $("#datepicker").kendoDatePicker({
                        culture: "de-DE"
                    });

                    // Get a reference to the DatePicker and set its value.
                    var datepicker = $("#datepicker").data("kendoDatePicker");
                    datepicker.value(new Date(2016, 10, 1));
                });
            </script>
        </body>
        </html>

## Next Steps

* [Ways to download and install Kendo UI for jQuery]({% slug overviewdownload_kendoui %})
* [Create your own custom bundles]({% slug include_only_what_you_need_kendoui_installation %})
* [Learn about the widget DOM element structure]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Create your own custom widgets]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Initialize widgets with MVVM]({% slug mvvm_initialization_kendoui %})
* [Check out the jQuery version support]({% slug jquerysupport_kendoui %})
* [Explore the widget script dependencies]({% slug script_filesfor_barcodes_widgets %})

## See Also

* [Hosting Kendo UI in Your Project]({% slug hosting_kendoui %})
* [Installing Kendo UI with Bower]({% slug kendoui_bower_packages_kendoui_installation %})
* [Installing Kendo UI by Using the CDN Services]({% slug kendoui_cdn_services_installation %})
* [Installing Kendo UI with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Installing Kendo UI with NuGet]({% slug kendoui_nuget_packages %})
