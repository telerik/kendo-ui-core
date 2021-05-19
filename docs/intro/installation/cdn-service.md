---
title: Using CDN
page_title: Using CDN | Download and Installation | Kendo UI for jQuery
description: "Get started with Kendo UI for jQuery and install the Kendo UI widgets by using the Kendo UI CDN services."
previous_url: /install/cdn
slug: kendoui_cdn_services_installation
position: 4
---

# Using CDN

The Kendo UI CDN is hosted on the [Amazon CloudFront](https://aws.amazon.com/cloudfront/).

Only the official Kendo UI releases and serviced packs are uploaded to the CDN. Internal builds are not available on CDN. To access the Kendo UI CDN services, you can use either the [HTTP](#using-the-http-protocol) or the [HTTPS](#using-the-https-protocol) protocol.

## Using the HTTP Protocol

> The http://cdn.kendostatic.com/ URL is still active but is no longer recommended for new projects.

The minified versions of all JavaScript files are available at the following locations:
* `http://kendo.cdn.telerik.com/VERSION/js/FILENAME.min.js`
* `http://kendo.cdn.telerik.com/VERSION/styles/FILENAME.min.css`

For example, the `{{ site.cdnVersion }}` version can be loaded from the following locations:  
* `http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js`
* `http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.common.min.css`

The minified Kendo UI scripts are available as of the Kendo UI Q1 2014 SP1 release.

To load the scripts, use the `http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.ui.core.min.js` URL.

## Using the HTTPS Protocol

To access the Kendo UI CDN service through the HTTPS protocol, use the same host name `kendo.cdn.telerik.com` and replace the scheme (protocol) with `https`. For example:

* `https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js`.

> The https://da7xgjtj801h2.cloudfront.net/ URL remains active but is no longer recommended for new projects.

## Troubleshooting

This section provides solutions for common issues you might encounter while using the Kendo UI CDN services.

### General disruption and connection issues occur

**Description** Although the [Amazon CloudFront service](https://aws.amazon.com/cloudfront/) provides a reliable level of uptime support, you might encounter disruption or connection issues. After you check the status of the systems at [http://status.aws.amazon.com/](http://status.aws.amazon.com/), the CDN status is reported as healthy and operates normally.

**Cause** You might be experiencing Internet, network connectivity, or DNS problems. It is also possible that firewalls, antivirus, or other security software incorrectly filters out the CDN scripts or modifies (breaks) them on the fly.

**Solution** Contact your system administrator because remote investigation of connection problems is outside the scope of the Kendo UI Support Team.

### It is not possible to refer Kendo UI internal builds from CDN

**Cause** The internal Kendo UI builds are not uploaded to CDN because they are intended only for clients with a commercial license. Only major Kendo UI releases and service packs are available on CDN.

**Solution** For internal builds, use private CDN services. It is recommended that you implement a local fallback when you use any kind of CDN. For more information, refer to [Scott Hanselman's blog post **Fallback from CDN to Local Scripts**](http://www.hanselman.com/blog/CDNsFailButYourScriptsDontHaveToFallbackFromCDNToLocalJQuery.aspx).

    <!DOCTYPE html>
    <html>
    <head>
        <title>Welcome to Kendo UI</title>
        <link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.common.min.css" />
        <link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.blueopal.min.css" />

        <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/jquery.min.js"></script>
        <script>
            if (typeof jQuery == "undefined") {
                // Fallback to local jQuery.
                document.write(decodeURIComponent('%3Cscript src="/path/to/local/jquery.min.js" %3E%3C/script%3E'));
            }
        </script>

        <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js"></script>
        <script>
            if (typeof kendo == "undefined") {
                // Checking for loaded CSS files is cumbersome,
                // therefore assume that if the scripts have failed, so have the stylesheets.

                // Fallback to local Kendo UI stylesheets.
                document.write(decodeURIComponent('%3Clink rel="stylesheet" href="/path/to/local/kendo.common.min.css" %3C/%3E'));
                document.write(decodeURIComponent('%3Clink rel="stylesheet" href="/path/to/local/kendo.blueopal.min.css" %3C/%3E'));

                // Fallback to local Kendo UI scripts.
                document.write(decodeURIComponent('%3Cscript src="/path/to/local/kendo.all.min.js" %3E%3C/script%3E'));
                // Also add kendo.aspnetmvc.min.js or kendo.timezones.min.js if needed.
            }
        </script>
    </head>
    <body>
        Hello world!
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

* [Hosting Kendo UI in Your Project]({% slug hosting_kendoui %})
* [Installing Kendo UI with Bower]({% slug kendoui_bower_packages_kendoui_installation %})
* [Installing Kendo UI with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Installing Kendo UI with NuGet]({% slug kendoui_nuget_packages %})
* [Getting Up and Running with Your Kendo UI Project (Guide)]({% slug getting_started_installation_kendoui %})
