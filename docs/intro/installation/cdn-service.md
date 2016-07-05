---
title: CDN Services
page_title: CDN Services | Kendo UI Getting Started
description: "Install Kendo UI widgets by using CDN services."
previous_url: /install/cdn
slug: kendoui_cdn_services_installation
position: 3
---

# CDN Services

The Kendo UI CDN is hosted on the [Amazon CloudFront](https://aws.amazon.com/cloudfront/). To access the Kendo UI CDN Service, use either of the options described below.

## Protocols

### Use the HTTP

The minified versions of all JavaScript files are available at:
* `http://kendo.cdn.telerik.com/VERSION/js/FILENAME.min.js`
* `http://kendo.cdn.telerik.com/VERSION/styles/FILENAME.min.css`

For example, the `{{ site.cdnVersion }}` version can be loaded from:  
* `http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js`
* `http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.common.min.css`

> **Important**
>
> Only the Kendo UI official releases and service packs are uploaded to the CDN. Internal builds are not published to the CDN.

To load the minified Kendo UI Core script, which is available as of Kendo UI Q1 2014 SP1, use the `http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.ui.core.min.js` URL.

> **Important**
>
> The http://cdn.kendostatic.com/ URL remains active, but is no longer recommended for new projects.

### Use the HTTPS

To access the Kendo UI CDN service through the HTTPS protocol, use the same host name as above, and replace the scheme (protocol) with `https`&mdash;`https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js`.

> **Important**
>
> The https://da7xgjtj801h2.cloudfront.net/ URL remains active, but is no longer recommended for new projects.

## Troubleshooting

### Handle Disruption and Connection Issues

Although the [Amazon CloudFront service](https://aws.amazon.com/cloudfront/) provides a reliable level of uptime support, you might encounter disruption or connection troubles. After you check the status of the systems at [http://status.aws.amazon.com/](http://status.aws.amazon.com/), the CDN status is reported as healthy and is operates normally.

You might be experiencing Internet or network connectivity problems, or DNS problems, or it is possible that firewalls, antivirus, or other security software incorrectly filters out the CDN scripts or modifies (breaks) them on-the-fly.

**Solution**

Contact your system administrator because remote investigation of connection problems is outside the scope of Kendo UI support.

### Refer Kendo UI from CDN with Local Script Fallback

Kendo UI internal builds are not uploaded on CDN, because they are intended only for clients with a commercial license. Only major releases and service packs are uploaded on the Kendo UI CDN.

**Solution**

Use private CDN services for internal builds. It is recommendable to implement a local fallback when using any kind of CDN.

###### Example

    <!DOCTYPE html>
    <html>
    <head>
        <title>Welcome to Kendo UI</title>
        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.common.min.css" />
        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.blueopal.min.css" />

        <script src="http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/jquery.min.js"></script>
        <script>
            if (typeof jQuery == "undefined") {
                // fallback to local jQuery
                document.write(decodeURIComponent('%3Cscript src="/path/to/local/jquery.min.js" %3E%3C/script%3E'));
            }
        </script>

        <script src="http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js"></script>
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
>
> For more information on the topic, see [Scott Hanselman's blog post **Fallback from CDN to Local Scripts**](http://www.hanselman.com/blog/CDNsFailButYourScriptsDontHaveToFallbackFromCDNToLocalJQuery.aspx).

## See Also

Other articles on getting started with Kendo UI:

* [Get Started with Kendo UI]({% slug getting_started_installation_kendoui %})
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
