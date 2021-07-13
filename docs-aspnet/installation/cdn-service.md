---
title: Using CDN
page_title: Using CDN
description: "Get started with Telerik UI for ASP.NET Core and install the helpers by using the Telerik UI CDN services."
previous_url: /getting-started/installation/cdn-service
slug: cdnservices_core
position: 8
---

# Using CDN

The Kendo UI client-side resources like JavaScript files and CSS files are available online through the Kendo CDN service, which is hosted on the [Amazon CloudFront](https://aws.amazon.com/cloudfront/). Including the client-side resources in your project is essential because the Telerik UI helpers are wrappers over the [Kendo UI widgets](https://docs.telerik.com/kendo-ui/intro/first-steps).

Only the official Kendo UI releases and serviced packs are uploaded to the CDN. Internal builds are not available on the CDN. To access the Kendo UI CDN services, you can use either the [HTTP](#using-the-http-protocol) or the [HTTPS](#using-the-https-protocol) protocol.

## Using the HTTPS Protocol

> The https://da7xgjtj801h2.cloudfront.net/ URL is still active but is no longer recommended for new projects.

The minified versions of all JavaScript files are available at the following locations:
* `https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/FILENAME.min.js`
* `https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/styles/FILENAME.min.css`

For example, the `{{ site.mvcCoreVersion }}` version can be loaded from the following locations:  
* `https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js`
* `https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/styles/kendo.common.min.css`

The minified Kendo UI scripts are available as of the Kendo UI Q1 2014 SP1 release. To load the scripts, use the `https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.ui.core.min.js` URL.

## Using the HTTP Protocol

> The http://cdn.kendostatic.com/ URL remains active but is no longer recommended for new projects.

To access the Kendo UI CDN service through the HTTP protocol, use the same URL from the previous section and replace the scheme (protocol) with `http`&mdash;for example, `http://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js`.

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
        <link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/styles/kendo.common.min.css" />
        <link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/styles/kendo.blueopal.min.css" />

        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/jquery.min.js"></script>
        <script>
            if (typeof jQuery == "undefined") {
                // A fallback to the local jQuery.
                document.write(decodeURIComponent('%3Cscript src="/path/to/local/jquery.min.js" %3E%3C/script%3E'));
            }
        </script>

        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>
        <script>
            if (typeof kendo == "undefined") {
                // Checking for loaded CSS files is cumbersome.
                // Therefore, assume that if the scripts have failed, so have the stylesheets.

                // A fallback to local Kendo UI stylesheets.
                document.write(decodeURIComponent('%3Clink rel="stylesheet" href="/path/to/local/kendo.common.min.css" %3C/%3E'));
                document.write(decodeURIComponent('%3Clink rel="stylesheet" href="/path/to/local/kendo.blueopal.min.css" %3C/%3E'));

                // A fallback to the local Kendo UI scripts.
                document.write(decodeURIComponent('%3Cscript src="/path/to/local/kendo.all.min.js" %3E%3C/script%3E'));
                // Also, add kendo.aspnetmvc.min.js or kendo.timezones.min.js if needed.
            }
        </script>
    </head>
    <body>
        Hello world!
    </body>
    </html>

## Next Steps

* [Create your own custom bundles]({% slug custombundles_core %})
* [Explore the helper script dependencies]({% slug script_filesfor_barcodes_widgets %})
* [Check out the PDF and Excel export support]({% slug exportsupport_core %})

## See Also

* [Including Client-Side Resources]({% slug copyclientresources_aspnetmvc6_aspnetmvc %})
* [Installing Telerik UI for ASP.NET Core with NuGet]({% slug nuget_install_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Mac (Online Guide)]({% slug gettingstarted_firststeps_vsmac %})
* [First Steps with CLI (Online Guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
