---
title: Using CDN
page_title: Using CDN - Download and Installation 
description: "Get started with Kendo UI for jQuery and install the Kendo UI components by using the Kendo UI CDN services."
previous_url: /install/cdn
slug: kendoui_cdn_services_installation
position: 40
---

# Using CDN

The Kendo UI for jQuery CDN resides on the [Amazon CloudFront](https://aws.amazon.com/cloudfront/). The service maintains the official Kendo UI for jQuery releases and service packs, and provides no access to internal builds. 

> As of the R3 2022 release, you need to activate the CDN distribution by [using a license file]({% slug using-license-code %}).

## 1. Add the Required JavaScript and CSS Files

> The https://da7xgjtj801h2.cloudfront.net/ URL remains active but is no longer recommended for new projects.

The Kendo UI CDN provides the following services: 

* `kendo.cdn.telerik.com`
* (Without cookies) `cdn.kendostatic.com`

### Adding the Required CSS Files

The `.css` files are available at `https://kendo.cdn.telerik.com/themes/<version>/<theme>/<swatch>.css`. For example, you can load the `{{site.themesCdnVersion }}` version of the `Default` theme  from the `https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-main.css` location.

### Adding the Required JavaScript Files

To import the required JavaScript files for the Kendo UI for jQuery components, use either of the following approaches:

 - [Using the JavaScript modules](#javascript-modules)—[A new approach introduced with the 2022.3.1109 version]({% slug kendoui_ecmascript_overview %}).
 - [Using the bundled JavaScript](#bundled-javascript)—The traditional way of including the scripts.

#### JavaScript Modules

The [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) are located in the `/mjs/` folder. To include a JavaScript module in your project, use the `script` tag with the `type=module` attribute.

The following example demonstrates how to include individual component modules. 

```html
<script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/mjs/kendo.grid.js" type="module"></script> <!-- Include the Grid module. The rest of the dependencies required by the Grid will be loaded automatically. -->
```

The following example showcases how to include all available modules.

```html
<script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/mjs/kendo.all.js" type="module"></script> <!-- Include all Kendo UI modules. -->
```

#### Bundled JavaScript

The bundled version of the Kendo UI for jQuery library is available at `https://kendo.cdn.telerik.com/VERSION/js/FILENAME.min.js`. For example, you can load the `{{site.cdnVersion}}` version from the `https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js` location.

The minified Kendo UI for jQuery scripts are available as of the Kendo UI Q1 2014 SP1 release. To load them, use the `https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.ui.core.min.js` URL.

## 2. Set Up the License File

[Generate a license file]({% slug using-license-code %}) and follow the instructions.

## 3. Add the HTML Element for Component Initialization

Depending on the component you require, you can initialize the Kendo UI controls from different elements. In this step, you will add a new `input` element from which a Kendo UI DropDownList will be created. 


```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Kendo UI using CDN</title>
        
        <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-main.css" />
        
        <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/jquery.min.js"></script>
        <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js"></script>
    </head>
    <body>
      <input id="ddl" />	  
    </body>
</html>
```

## 4. Initialize and Configure the Component

The following example demonstrates how to initialize a DropDownList with some basic configuration.

```dojo
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Kendo UI using CDN</title>

        <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-main.css" />

        <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/jquery.min.js"></script>
        <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/jszip.min.js"></script>
        <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js"></script>
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
* [The Component DOM Element Structure]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Initialize Components as jQuery Plugins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize Components with MVVM]({% slug mvvm_initialization_kendoui %})
* [jQuery Version Support]({% slug jquerysupport_kendoui %})
* [Web Browser Support]({% slug wbe_browserand_operating_system_support %})
* [Operation System Support]({% slug ossupport_kendo %})
* [PDF and Excel Export Support]({% slug export_support_kendoui %})
* [Component Script Dependencies]({% slug script_filesfor_barcodes_widgets %})
* [Create Your Own Custom Components]({% slug createcustomkendouiwidgets_gettingstarted %})

## See Also

* [Troubleshooting When Using Kendo UI CDN services]({% slug troubleshoot_cdn_installing %})
* [Troubleshooting When Trying to Refer Kendo UI Internal Builds from CDN]({% slug cannot_refer_internal_builds_cdn %})
* [Hosting Kendo UI in Your Project]({% slug hosting_kendoui %})
* [Installing Kendo UI with Bower]({% slug kendoui_bower_packages_kendoui_installation %})
* [Installing Kendo UI with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Installing Kendo UI with NuGet]({% slug kendoui_nuget_packages %})
* [Getting Up and Running with Your Kendo UI Project (Guide)]({% slug getting_started_installation_kendoui %})
* [Using Script License Code]({% slug using-license-code %})
