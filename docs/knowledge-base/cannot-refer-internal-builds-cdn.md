---
title: It Is Impossible to Refer Kendo UI Internal Builds from CDN
page_title: It Is Impossible to Refer Kendo UI Internal Builds from CDN
description: "Learn how to refer the Kendo UI for jQuery internal builds when using the CDN services."
slug: cannot_refer_internal_builds_cdn
tags: kendoui, jquery, cannot, refer, internal, builds, cdn, installing
type: troubleshooting
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® for jQuery CDN Installation</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
</table>

## Description

I cannot refer the internal Kendo UI for jQuery builds from the CDN.

## Cause

The internal Kendo UI for jQuery builds are not uploaded to CDN because they are intended only for clients with a commercial license. Only major Kendo UI for jQuery releases and service packs are available on CDN.

## Solution

For internal builds, use private CDN services. It is recommended that you implement a local fallback when you use any kind of CDN. For more information, refer to [Scott Hanselman's blog post **Fallback from CDN to Local Scripts**](http://www.hanselman.com/blog/CDNsFailButYourScriptsDontHaveToFallbackFromCDNToLocalJQuery.aspx).

    <!DOCTYPE html>
    <html>
    <head>
        <title>Welcome to Kendo UI for jQuery</title>
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

                // Fallback to local Kendo UI for jQuery stylesheets.
                document.write(decodeURIComponent('%3Clink rel="stylesheet" href="/path/to/local/kendo.common.min.css" %3C/%3E'));
                document.write(decodeURIComponent('%3Clink rel="stylesheet" href="/path/to/local/kendo.blueopal.min.css" %3C/%3E'));

                // Fallback to local Kendo UI for jQuery scripts.
                document.write(decodeURIComponent('%3Cscript src="/path/to/local/kendo.all.min.js" %3E%3C/script%3E'));
                // Also add kendo.aspnetmvc.min.js or kendo.timezones.min.js if needed.
            }
        </script>
    </head>
    <body>
        Hello world!
    </body>
    </html>
