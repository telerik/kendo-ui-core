---
title: Using CDN
page_title: Using CDN
description: "Learn how to add the Kendo client-side resources to you Telerik UI ASP.NET MVC project by using the Telerik CDN services."
previous_url: /getting-started/installation/cdn-service
slug: cdnservices_aspnetmvc
position: 3
---

# Using CDN

The Kendo UI client-side resources like JavaScript files and CSS files are available online through the Kendo CDN service. Including these client-side resources in your project is essential because the Telerik UI helpers are wrappers over the [Kendo UI widgets](https://docs.telerik.com/kendo-ui/intro/first-steps).

Only the official Kendo UI releases and serviced packs are uploaded to the CDN. Internal builds are not available on the CDN.

To access the Kendo UI CDN services, you can use either the HTTP or the HTTPS protocol with any of the following CDN services:

* `kendo.cdn.telerik.com`
* `cdn.kendostatic.com` (a cookieless CDN service)

>tip To check the status of the Progress Live Services, like Kendo UI CDN, Telerik NuGet, Kendo UI Dojo playground and others, visit the [Progress<sup>®</sup> Telerik<sup>®</sup> Live Services Status Page](http://status.telerik.com/).

## Understanding the CDN Structure

The URLs of the Telerik CDN have the following structure:

* `https://kendo.cdn.telerik.com/VERSION/js/FILENAME.min.js`
* `https://kendo.cdn.telerik.com/VERSION/styles/FILENAME.min.css`

In the URL above, you must replace `VERSION` and `FILENAME` with the client-side resource that you need and its version. For example, to load version `{{ site.mvcCoreVersion }}` of the minified Kendo UI scripts and the related CSS files, use these URLs:

* `https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js`
* `https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/styles/kendo.common.min.css`

If you prefer the HTTP protocol, replace `https` with `http` in the URLs above.

## Using the CDN in Your Project

> Replace the Kendo UI version from the following code snippets with the version of the product you are using&mdash;for example, `{{ site.mvcCoreVersion }}`.

1. Open the layout of the application. By default, it is `~/Views/Shared/_Layout.cshtml` or `Site.master`, if using ASPX.

1. To add the Bootstrap theme files, include the `kendo.common-bootstrap.min.css` and `kendo.bootstrap.min.css` files. Add a `link` tag within the `head` tag of the layout. For more information on the CSS files which are used by the predefined Less themes, refer to the documentation on the [Less-based themes](https://docs.telerik.com/kendo-ui/styles-and-layout/appearance-styling).

        <link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/styles/kendo.common-bootstrap.min.css" />
        <link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/styles/kendo.bootstrap.min.css" />

1. To add the JavaScript files, insert a `script` tag and include `kendo.all.min.js` and `kendo.aspnetmvc.min.js` after the jQuery script.

        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>
        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.aspnetmvc.min.js"></script>

1. If using the Telerik MVC Scheduler helper, include `kendo.timezones.min.js` after `kendo.all.min.js`.

        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>
        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.timezones.min.js"></script>
        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.aspnetmvc.min.js"></script>

## Troubleshooting

The following articles provide solutions to common issues related to the Telerik and Kendo CDN services:

* [CDN connection issues and general disruption occur]({% slug cdn_connection_issues %})
* [How to refer Kendo UI internal builds from a CDN]({% slug cdn_cannot_refer_internal_builds %})

## Next Steps

* [Check out the jQuery version support]({% slug jquerysupport_aspnetmvc %})
* [Check out the web browser support]({% slug webbrowsersupport_aspnetmvc %})
* [Check out the PDF and Excel export support]({% slug exportsupport_aspnetmvc %})
* [Explore the helper script dependencies]({% slug script_filesfor_barcodes_widgets %})
* [Explore the earlier versions support policy]({% slug oldversionssupportpolicy_aspnetmvc %})

## See Also

* [Including Client-Side Resources]({% slug copyclientresources_aspnetmvc %})
* [Installing Telerik UI for ASP.NET Core with NuGet]({% slug aspnetmvc_nuget %})
* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstarted_aspnetmvc %})
