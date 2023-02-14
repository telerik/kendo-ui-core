---
title: How to refer Kendo UI internal builds from a CDN?
description: How can I refer Kendo UI internal builds from a CDN if the official Kendo CDN provides only official releases?
type: how-to
page_title: How to refer Kendo UI internal builds from a CDN?
slug: cdn_cannot_refer_internal_builds
tags: refer, internal, kendo, builds, cdn
res_type: kb
---

## Environment

<table>
	<tbody>
        <tr>
			<td>Product</td>
			<td>Progress® Telerik® UI for {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description

How can I refer Kendo UI internal builds from a CDN if the official Kendo CDN provides only official releases?

## Solution

The internal Kendo UI builds are not uploaded to CDN because they are reserved for clients with a commercial license. Only major Kendo UI releases and service packs are available on CDN.

For access to internal builds over CDN, use private CDN services. Always implement a local fallback when you use any kind of CDN. For more information, refer to Scott Hanselman's blog post [Fallback from CDN to Local Scripts](http://www.hanselman.com/blog/CDNsFailButYourScriptsDontHaveToFallbackFromCDNToLocalJQuery.aspx).

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

                // A fallback to the local Kendo UI stylesheets.
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

