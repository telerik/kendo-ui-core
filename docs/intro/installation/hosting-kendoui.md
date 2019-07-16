---
title: Hosting Kendo UI in Your Project
page_title: Hosting Kendo UI in Your Project | Download and Installation | Kendo UI for jQuery
description: "Get started with Kendo UI for jQuery and learn how to host the library in your project by downloading the bundles and adding the CSS and JavaScript references."
slug: hosting_kendoui
position: 2
---

# Hosting Kendo UI in Your Project

To start using the Kendo UI for jQuery and host the library into your project, you need to [download the bundles](#downloading-the-bundles) and then [add the CSS and JavaScript references](#adding-css-and-javascript-references).

## Downloading the Bundles

To download the Kendo UI bundles, go to [http://www.telerik.com/download/kendo-ui](http://www.telerik.com/download/kendo-ui). After the download is complete, your local repository will host the following folders:

|Folders 						|Contents |
|:---								|:---			|
|`/apptemplates`		|The folder contains standalone starter templates. Although they are static HTML files, it is recommended that you open them through a web server instead of directly from the file system. The latter approach breaks all AJAX data requests.|
|`/examples`				|Accommodates the quick-start demo files. Although they are static HTML files, it is recommended that you open them through a web server instead of directly from the file system. The latter approach breaks all AJAX data requests.|
|`/js`							|Contains the minified JavaScript files.|
|`/src`							|This folder used to hold the source code files but they are now provided in a separate download package. Access the source code package from the [Downloads section](https://www.telerik.com/account/my-downloads) of your account. Note that the source code is not available to trial users.|
|`/styles`					|Consists of the minified CSS files and theme images. The folder also includes the Less files, which can be passed to the compiler, located on the first-level folders inside `styles/folder: styles/web/` and `styles/mobile/`. Note that the Less files are not available to trial users.|
|`/wrappers`				|Includes the server-side wrappers. As it is necessary for the UI for ASP.NET MVC, UI for JSP or UI for PHP distributions only, the folder is available in the commercial packages of these versions.|
|`changelog.html`		|Provides the Kendo UI release notes.|

## Adding CSS and JavaScript References

To include the required CSS and JavaScript files:

1. Extract the `/js` and `/styles` directories from the bundle archive and copy them to your web application root directory.  
1. Include the Kendo UI JavaScript and CSS files in the `head` tag of your HTML document. Verify that the common CSS file is registered before the theme CSS file.

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


1. Initialize a widget. Note that the examples in this step assume that the Kendo UI scripts and stylesheets are now added to the document.

	 The following example demonstrates how to initialize the [DatePicker](http://demos.telerik.com/kendo-ui/datepicker/index).

        <!-- HTML element from which the DatePicker would be initialized -->
        <input id="datepicker" />
        <script>
        $(function() {
            // Initialize the Kendo UI DatePicker by calling the kendoDatePicker jQuery plugin
            $("#datepicker").kendoDatePicker();
        });
        </script>

		The following example demonstrates the full initialization of the [DatePicker](http://demos.telerik.com/kendo-ui/datepicker/index).

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

## Next Steps

* [Create your own custom bundles]({% slug include_only_what_you_need_kendoui_installation %})
* [Learn about the widget DOM element structure]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Initialize widgets as jQuery plugins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize widgets with MVVM]({% slug mvvm_initialization_kendoui %})
* [Check out the jQuery version support]({% slug jquerysupport_kendoui %})
* [Check out the web browser support]({% slug wbe_browserand_operating_system_support %})
* [Check out the operation system support]({% slug ossupport_kendo %})
* [Check out the PDF and Excel export support]({% slug export_support_kendoui %})
* [Explore the widget script dependencies]({% slug script_filesfor_barcodes_widgets %})
* [Create your own custom widgets]({% slug createcustomkendouiwidgets_gettingstarted %})

## See Also

* [Installing Kendo UI with Bower]({% slug kendoui_bower_packages_kendoui_installation %})
* [Installing Kendo UI by Using the CDN Services]({% slug kendoui_cdn_services_installation %})
* [Installing Kendo UI with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Installing Kendo UI with NuGet]({% slug kendoui_nuget_packages %})
* [Getting Up and Running with Your Kendo UI Project (Guide)]({% slug getting_started_installation_kendoui %})
