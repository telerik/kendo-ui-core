---
title: CDN Services
page_title: CDN Services | Kendo UI Installation
description: "Install HTML5 UI frameworks and widgets by using Kendo UI CDN service."
previous_url: /install/cdn
slug: kendoui_cdn_services_installation
position: 3
---

# CDN Services

The Kendo UI CDN is hosted on [Amazon CloudFront](https://aws.amazon.com/cloudfront/). In order to access the Kendo UI CDN Service, you can use either of the options described below.

## Protocols

### Via HTTP Protocol

The minified versions of all JavaScript files are available via the following URLs:  
`https://kendo.cdn.telerik.com/VERSION/js/FILENAME.min.js`
`https://kendo.cdn.telerik.com/VERSION/styles/FILENAME.min.css`

For example, the 2014.1.318 version can be loaded from:  
`https://kendo.cdn.telerik.com/2014.1.318/js/kendo.all.min.js`
`https://kendo.cdn.telerik.com/2014.1.318/styles/kendo.common.min.css`

Use the following URL to load the minified Kendo UI Core script (available since Q1 2014 SP1):
`https://kendo.cdn.telerik.com/2014.1.416/js/kendo.ui.core.min.js`

> **Important**  
> The `http://cdn.kendostatic.com/` URL will remain active, but is no longer recommended for new projects.

### Via HTTPS Protocol

To access the Kendo UI CDN service through the HTTPS protocol, use the same host name as above, only replacing the scheme (protocol) with `https`:  
`https://kendo.cdn.telerik.com/2014.1.318/js/kendo.all.min.js`

> **Important**  
> The `https://da7xgjtj801h2.cloudfront.net/` URL will remain active, but is no longer recommended for new projects.

## Troubleshooting

### Disruption and Connection Issues

Although the Amazon CloudFront service provides for a reliable level of uptime support, you may encounter disruption or connection troubles. After you have checked the status of the systems at [http://status.aws.amazon.com/](http://status.aws.amazon.com/), the CDN status is reported as healthy and is operating normally.

**Cause:** You could be experiencing Internet or network connectivity problems, or DNS problems, or it is possible that firewalls, antivirus or other security software incorrectly filters out the CDN scripts or modifies (breaks) them on-the-fly.

**Fix:** Contact your system administrator, as remote investigation of connection problems is outside the scope of Kendo UI support.

### Refer Kendo UI from CDN with Local Script Fallback

**Cause:** Kendo UI internal builds are not uploaded on CDN, because they are intended only for clients with a commercial license. Only major releases and service packs are uploaded on the Kendo UI CDN.

**Fix:** You should use a private CDN for internal builds. It is recommendable to implement a local fallback when using any kind of CDN in the way displayed here:

    <!DOCTYPE html>
    <html>
    <head>
        <title>Welcome to Kendo UI</title>
        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2014.1.318/styles/kendo.common.min.css" />
        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2014.1.318/styles/kendo.blueopal.min.css" />

        <script src="http://kendo.cdn.telerik.com/2014.1.318/js/jquery.min.js"></script>
        <script>
            if (typeof jQuery == "undefined") {
                // fallback to local jQuery
                document.write(decodeURIComponent('%3Cscript src="/path/to/local/jquery.min.js" %3E%3C/script%3E'));
            }
        </script>

        <script src="http://kendo.cdn.telerik.com/2014.1.318/js/kendo.all.min.js"></script>
        <script>
            if (typeof kendo == "undefined") {
                // checking for loaded CSS files is cumbersome,
                // that's why we assume that if the scripts have failed, so have the stylesheets

                // fallback to local Kendo UI stylesheets
                document.write(decodeURIComponent('%3Clink rel="stylesheet" href="/path/to/local/kendo.common.min.css" %3C/%3E'));
                document.write(decodeURIComponent('%3Clink rel="stylesheet" href="/path/to/local/kendo.blueopal.min.css" %3C/%3E'));

                // fallback to local Kendo UI scripts
                document.write(decodeURIComponent('%3Cscript src="/path/to/local/kendo.all.min.js" %3E%3C/script%3E'));
                // also add kendo.aspnetmvc.min.js or kendo.timezones.min.js, if needed
            }
        </script>
    </head>
    <body>
        Hello world!
    </body>
    </html>

> **Important**  
> You will be able to find more information on the topic at [Scott HanselMann - Fallback from CDN to Local Scripts](http://www.hanselman.com/blog/CDNsFailButYourScriptsDontHaveToFallbackFromCDNToLocalJQuery.aspx).

## See Also

Other articles on getting started with Kendo UI:

* [Getting Started with Kendo UI]({% slug getting_started_installation_kendoui %})
* [Kendo UI Bower Packages]({% slug kendoui_bower_packages_kendoui_installation %})
* [Include Only What You Need]({% slug include_only_what_you_need_kendoui_installation %})
* [JavaScript Prerequisites]({% slug javascript_prerequisites_kendoui_installation %})
* [Initialize Widgets Using jQuery Plug-Ins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize Widgets Using Markup]({% slug initialize_widgets_using_markup_installation %})
* [Widget Methods and Events]({% slug widget_methodsand_events_kendoui_installation %})
