---
title: Adding Kendo UI in Your Project
page_title: Adding Kendo UI in Your Project | Download and Installation | Kendo UI for jQuery
description: "Get started with Kendo UI for jQuery and learn how to host the library in your project by downloading the bundles and adding the CSS and JavaScript references."
slug: hosting_kendoui
position: 2
---

# Adding Kendo UI in Your Project

To start using the Kendo UI for jQuery and host the library into your project, you need to [download the bundles](#step-1-downloading-the-bundles) and then [add the CSS and JavaScript references](#step-2-referencing-the-needed-css-and-javascript-files-to-your-project).

## Step 1: Downloading the Bundles

To download a Kendo UI bundle, go to [https://www.telerik.com/download/kendo-ui](https://www.telerik.com/download/kendo-ui). When the download completes, here is what each folder inside the downloaded archive has:

|Folders 						|Contents |
|:---								|:---			|
|`/apptemplates`		|The folder contains standalone starter templates. Although they are static HTML files, it is recommended that you open them through a web server instead of directly from the file system. The latter approach breaks all AJAX data requests.|
|`/examples`				|Accommodates the quick-start demo files. Although they are static HTML files, it is recommended that you open them through a web server instead of directly from the file system. The latter approach breaks all AJAX data requests.|
|`/js`							|Contains the minified JavaScript files needed by Kendo UI to operates.|
|`/license-agreements`			|Contains the End User License Agreement that has to be read before installing Kendo UI.|
|`/src`							|This folder used to hold the source code files but they are now provided in a separate download package. Access the source code package from the [Downloads section](https://www.telerik.com/account/my-downloads) of your account. Note that the source code is not available to trial users.|
|`/styles`					| This folder contains the definitions of all [SASS](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes) and [LESS](https://docs.telerik.com/kendo-ui/styles-and-layout/appearance-styling)-based themes that Kendo UI provides. |
|`/typescript`				|Includes the Kendo UI [TypeScript definitions](https://docs.telerik.com/kendo-ui/third-party/typescript)|
|`/vsdoc`				|Includes the files that provide the intellisense  |
|`changelog.html`		|Provides the Kendo UI release notes.|

To download the commercial version of Kendo UI go to www.telerik.com and login with your credentials. Navigate to the [Downloads section](https://www.telerik.com/account/my-downloads) of your account. Search for Progress® Kendo UI® for jQuery and download the package.

Based on the preferred technologies, there are also other approaches you can use to add Kendo UI to a project. Here you can find more details about each of them: 
* [Installing Kendo UI by Using the CDN Services]({% slug kendoui_cdn_services_installation %})
* [Installing Kendo UI with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Installing Kendo UI with NuGet]({% slug kendoui_nuget_packages %}) 

## Step 2: Referencing the needed CSS and JavaScript files to your project

To include the required by Kendo UI CSS and JavaScript files first extract the `/js` and `/styles` directories from the downloaded bundle archive. Copy the extracted folders in the root folder of your project. The next step is to include the Kendo UI JavaScript and CSS files in the `head` tag of your main HTML file. As the SASS and LESS-based themes structure is different, below you find two sections discussing the loading of each theme type.  

### Including SASS-based themes to your project

Each SASS-based theme is represented by a single CSS file that combines the layout and the styling of the different components. Thus only one CSS file has to be referenced in the project. 

The CSS files defining the different Kendo UI SASS themes are as follows:
* Kendo UI Default v.2(kendo.default-v2.min.css)
* Kendo UI Bootstrap v.4(kendo.bootstrap-v4.min.css)
* Kendo UI Material(kendo.material-v2.min.css)

Here is how we can define a Kendo UI project that uses the Kendo UI Default v.2 theme:

	<!DOCTYPE html>
		<html>
		<head>
			<title>Welcome to Kendo UI!</title>
			<!-- Reference to the selected SASS-based theme  -->
			<link href="styles/kendo.default-v2.min.css" rel="stylesheet" />

			<!-- (Optional) Reference to the RTL(Right-To-Left) CSS file that changes the direction of all Kendo UI widgets. Include this file only if your project will be with Right-To-Left webpage direction. -->
			<link href="styles/kendo.rtl.min.css" rel="stylesheet" type="text/css" />

			<!-- Reference to the jQuery library. It is important tha the jQuery file is loaded before the JavaScript file of Kendo UI -->
			<script src="js/jquery.min.js"></script>

			<!-- Reference to the Kendo UI JavaScript file -->
			<script src="js/kendo.all.min.js"></script>
		</head>
		<body>
			Hello World!
		</body>
		</html> 

### Including LESS-based themes to your project
To load a LESS-based theme to a project at least two CSS files should be referenced in it. 
* kendo.common.css — This is a common (base) stylesheet. It applies styles related to element positioning and widget dimensions. It is a must for the widgets to look and function properly.

> Some LESS themes require the loading of different "kendo.common.css" file. More details about these themes can be found [here](https://docs.telerik.com/kendo-ui/styles-and-layout/appearance-styling#common-css-files).  

* kendo.[theme name].css — This stylesheet applies theme-specific styles such as color palette, background gradients, and patterns, etc.

More about the different LESS themes can be read [here](https://docs.telerik.com/kendo-ui/styles-and-layout/appearance-styling). 

Here is how we can define a Kendo UI project that uses the Kendo UI Default(LESS) theme:

	<!DOCTYPE html>
		<html>
		<head>
			<title>Welcome to Kendo UI!</title>
			<!-- Reference to the file that is common for all Kendo UI LESS themes. This file should be referenced before the selected LESS theme.-->
			<link href="styles/kendo.common.min.css" rel="stylesheet" />

			<!-- Reference to the selected LESS-based theme  -->
			<link href="styles/kendo.default.min.css" rel="stylesheet" />

			<!-- (Optional) Reference to the RTL(Right-To-Left) CSS file that changes the direction of all Kendo UI widgets. Include this file only if your project will be with Right-To-Left webpage direction. -->
			<link href="styles/kendo.rtl.min.css" rel="stylesheet" type="text/css" />

			<!-- (Optional) Reference to the Kendo UI Hybrid CSS file. Include only if you will use the LESS-based theme on a mobile device. -->
			<link href="styles/kendo.default.mobile.min.css" rel="stylesheet" type="text/css" />

			<!-- Reference to the jQuery library. It is important tha the jQuery file is loaded before the JavaScript file of Kendo UI -->
			<script src="js/jquery.min.js"></script>

			<!-- Reference to the Kendo UI JavaScript file -->
			<script src="js/kendo.all.min.js"></script>
		</head>
		<body>
			Hello World!
		</body>
		</html>


## Step 3: Initializing a widget. 
> The examples in this step assume that all the Kendo UI scripts and stylesheets are correctly referenced.

	 The following example demonstrates how to initialize the [DatePicker](https://demos.telerik.com/kendo-ui/datepicker/index) component.

        <!-- HTML element from which the DatePicker would be initialized -->
        <input id="datepicker" />
        <script>
        $(function() {
            // Initialize the Kendo UI DatePicker by calling the kendoDatePicker jQuery plugin
            $("#datepicker").kendoDatePicker();
        });
        </script>

		The following example demonstrates the full initialization of the [DatePicker](https://demos.telerik.com/kendo-ui/datepicker/index).

		    <!DOCTYPE html>
		    <html>
		        <head>
		            <title>Welcome to Kendo UI!</title>
		            <link href="styles/kendo.default-v2.min.css" rel="stylesheet" />
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

* [Installing Kendo UI by Using the CDN Services]({% slug kendoui_cdn_services_installation %})
* [Installing Kendo UI with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Installing Kendo UI with NuGet]({% slug kendoui_nuget_packages %})
* [Getting Up and Running with Your Kendo UI Project (Guide)]({% slug getting_started_installation_kendoui %})
