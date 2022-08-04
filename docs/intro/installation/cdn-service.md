---
title: Using CDN
page_title: Using CDN | Download and Installation 
description: "Get started with Kendo UI for jQuery and install the Kendo UI widgets by using the Kendo UI CDN services."
previous_url: /install/cdn
slug: kendoui_cdn_services_installation
position: 40
---

# Using CDN

The Kendo UI for jQuery CDN resides on the [Amazon CloudFront](https://aws.amazon.com/cloudfront/). The service maintains the official Kendo UI for jQuery releases and service packs, and provides no access to internal builds. 

## 1. Add the Required JavaScript and CSS Files

The Kendo UI CDN provides the following services: 

* `kendo.cdn.telerik.com`
* `cdn.kendostatic.com` (a cookieless CDN service)

To access the services, use either the [HTTP](#using-the-http-protocol) or the [HTTPS](#using-the-https-protocol) protocol. 

### Using the HTTP Protocol

The minified versions of all JavaScript files are available at the following locations:
* `http://kendo.cdn.telerik.com/VERSION/js/FILENAME.min.js`
* `http://kendo.cdn.telerik.com/VERSION/styles/FILENAME.min.css`

For example, the `{{ site.cdnVersion }}` version can be loaded from the following locations:  
* `http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js`
* `http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.common.min.css`

The minified Kendo UI for jQuery scripts are available as of the Kendo UI Q1 2014 SP1 release. To load them, use the `http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.ui.core.min.js` URL.

### Using the HTTPS Protocol

> The https://da7xgjtj801h2.cloudfront.net/ URL remains active but is no longer recommended for new projects.

To access the Kendo UI for jQuery CDN service through the HTTPS protocol, use the same `kendo.cdn.telerik.com` host name and replace the scheme (protocol) with `https`. 

The example below loads Kendo UI for jQuery scripts and styles with the HTTPS protocol CDN:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Kendo UI using CDN</title>

  <link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.default-main.min.css">

  <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/jquery.min.js"></script>
  <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js"></script>
</head>
<body>
</body>
</html>
```

## 2. Add the HTML Element for Widget Initialization

Depending on the widget you require, you can initialize the Kendo UI controls from different elements. In this step, you will add a new `input` element from which a Kendo UI DropDownList will be created. 


```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Kendo UI using CDN</title>
        
        <link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.default-main.min.css">
        
        <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/jquery.min.js"></script>
        <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js"></script>
    </head>
    <body>
      <input id="ddl" />	  
    </body>
</html>
```

## 3. Initialize and Configure the Widget

The following example demonstrates how to initialize a DropDownList with some basic configuration.

```dojo
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Kendo UI using CDN</title>

        <link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.default-ocean-blue.min.css">

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

* [Troubleshooting When Using Kendo UI CDN services]({% slug troubleshoot_cdn_installing %})
* [Troubleshooting When Trying to Refer Kendo UI Internal Builds from CDN]({% slug cannot_refer_internal_builds_cdn %})
* [Hosting Kendo UI in Your Project]({% slug hosting_kendoui %})
* [Installing Kendo UI with Bower]({% slug kendoui_bower_packages_kendoui_installation %})
* [Installing Kendo UI with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Installing Kendo UI with NuGet]({% slug kendoui_nuget_packages %})
* [Getting Up and Running with Your Kendo UI Project (Guide)]({% slug getting_started_installation_kendoui %})
* [Using Script License Code]({% slug using-license-code %})
