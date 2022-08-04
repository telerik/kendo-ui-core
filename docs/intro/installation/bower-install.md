---
title: Installing with Bower
page_title: Installing with Bower | Download and Installation 
description: "Get started with Kendo UI for jQuery and install the commercial or the open-source Kendo UI distributions by using the Bower package manager."
previous_url: /install/bower, /intro/installation/overview-download
slug: kendoui_bower_packages_kendoui_installation
position: 30
---

# Installing with Bower

[Bower](https://bower.io/) is a popular package manager for the web that handles frameworks, libraries, assets, and utilities.

## 1. Install the Package

Kendo UI for jQuery maintains the [commercial Kendo UI for jQuery (Kendo UI Professional)](#commercial-distribution-on-bower) and the [open-source Kendo UI for jQuery (Kendo UI Core)](#open-source-distribution-on-bower) Bower packages. 

All official releases, service packs, and internal builds are uploaded to both distribution packages.

### Commercial Distribution on Bower

> The commercial Kendo UI Bower package is available only for commercial license holders. For more information, refer to the [list of the Kendo UI components and their bundle support]({% slug welcometo_kendoui %}#list-of-widgets).

The commercial distribution package is available as a private GitHub repository. To access its content, active your subscription for Kendo UI for jQuery or DevCraft. Bower prompts you to enter your username and password during the installation and update processes. 

During the installation of the Bower package, you may be requested to confirm your credentials more than once. For more information, refer to the Knowledge Base article on [how to store your username and password]({% slug troubleshoot_bower_storing_credentials %}).

To install the commercial distribution package, run the `bower install https://bower.telerik.com/bower-kendo-ui.git` command. 

To check the available commercial distribution versions of the package, run the `bower info kendo-ui --verbose` command.

You can also add the package to the `bower.json` file.

```json
"dependencies": {
    "kendo-ui": "https://bower.telerik.com/bower-kendo-ui.git#~{{ site.cdnVersion }}"
}
```


### Open-Source Distribution on Bower

The open-source Bower package is available as a [public GitHub repository](https://github.com/kendo-labs/bower-kendo-ui) and is also registered as `kendo-ui-core` in the Bower registry. 

To install the Kendo UI Core Bower package, run the `bower install kendo-ui-core` command. 

To check the available open-source distribution versions of the package, run the `bower info kendo-ui-core --verbose` command.


## 2. Add the Required JavaScript and CSS Files

Once the scripts and styles are available in your project directory, you can use the installed package directly.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Kendo UI with Bower</title>

    <link rel="stylesheet" href="bower_components\kendo-ui\styles\kendo.default-main.min.css">
    <script src="bower_components\kendo-ui\js\jquery.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="bower_components\kendo-ui\js\kendo.all.min.js" type="text/javascript" charset="utf-8"></script>
  </head>
</html>
```

## 3. Add the HTML Element for Widget Initialization

Depending on the widget you require, you can initialize the Kendo UI controls from different elements. In this step, you will add a new `input` element from which a Kendo UI DropDownList will be created. 

```html
<!DOCTYPE html>
<html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Kendo UI with Bower</title>

      <link rel="stylesheet" href="bower_components\kendo-ui\styles\kendo.default-main.min.css">
      <script src="bower_components\kendo-ui\js\jquery.min.js" type="text/javascript" charset="utf-8"></script>
      <script src="bower_components\kendo-ui\js\kendo.all.min.js" type="text/javascript" charset="utf-8"></script>
    </head>
    <body>
      <input id="ddl" />	  
    </body>
</html>
```

## 4. Initialize and Configure the Widget

The following example demonstrates how to initialize a DropDownList with some basic configuration.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Kendo UI with Bower</title>

      <link rel="stylesheet" href="bower_components\kendo-ui\styles\kendo.default-main.min.css">      
      <script src="bower_components\kendo-ui\js\jquery.min.js" type="text/javascript" charset="utf-8"></script>
      <script src="bower_components\kendo-ui\js\kendo.all.min.js" type="text/javascript" charset="utf-8"></script>
    </head>
    <body>
      <input id="ddl" />
      <script>
	    $("#ddl").kendoDropDownList({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: [
            { text: "Item1", value: "1" },
            { text: "Item2", value: "2" }
          ]
        });
	  </script>	  
    </body>
</html>
```


## Next Steps

* [Create Your Own Custom Bundles]({% slug include_only_what_you_need_kendoui_scripts %})
* [The Widget DOM Element Structure]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Initialize Widgets as jQuery Plugins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize Widgets with MVVM]({% slug mvvm_initialization_kendoui %})
* [jQuery Version Support]({% slug jquerysupport_kendoui %})
* [Web Browser Support]({% slug wbe_browserand_operating_system_support %})
* [Operation System Support]({% slug ossupport_kendo %})
* [PDF and Excel Export Support]({% slug export_support_kendoui %})
* [Widget Script Dependencies]({% slug script_filesfor_barcodes_widgets %})
* [Create Your Own Custom Widgets]({% slug createcustomkendouiwidgets_gettingstarted %})

## See Also

* [Troubleshooting When Installing with Bower]({% slug troubleshoot_bower_installing %})
* [Troubleshooting Restore Fails for ASP.NET Core MVC RC in VS 2015 When Installing with Bower]({% slug restore_fails_core_mvc_vs2015 %})
* [Troubleshooting How to Store Your Username and Password]({% slug troubleshoot_bower_storing_credentials %}).
* [Hosting Kendo UI in Your Project]({% slug hosting_kendoui %})
* [Installing Kendo UI by Using the CDN Services]({% slug kendoui_cdn_services_installation %})
* [Installing Kendo UI with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Installing Kendo UI with NuGet]({% slug kendoui_nuget_packages %})
* [Getting Up and Running with Your Kendo UI Project (Guide)]({% slug getting_started_installation_kendoui %})
* [Using Script License Code]({% slug using-license-code %})
