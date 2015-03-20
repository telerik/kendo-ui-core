---
title: Use the Kendo UI CDN service
page_title: Use Kendo UI from CDN
description: "Use Kendo UI in your project by referring the scripts hosted on the Kendo UI CDN"
position: 2
---

The Kendo UI CDN is hosted on Amazon CloudFront. The minified versions of all JavaScript files are available via the following URLs:

    http://cdn.kendostatic.com/$VERSION$/js/$FILENAME$.min.js
    http://cdn.kendostatic.com/$VERSION$/styles/$FILENAME$.min.css

For example:

    http://cdn.kendostatic.com/2014.1.318/js/kendo.all.min.js
    http://cdn.kendostatic.com/2014.1.318/styles/kendo.common.min.css

To access the combined minified javascript for Kendo UI Core (available since Q1 2014 SP1), use the following url:

    http://cdn.kendostatic.com/2014.1.416/js/kendo.ui.core.min.js

> **Important:** in order to use **HTTPS**, you need to directly access the CloudFront CDN, or [use your own domain and SSL certificate](http://aws.amazon.com/cloudfront/custom-ssl-domains/).

    https://da7xgjtj801h2.cloudfront.net/$VERSION$/js/$FILENAME$.min.js
    https://da7xgjtj801h2.cloudfront.net/$VERSION$/styles/$FILENAME$.min.css

## CDN Fallback and Troubleshooting

Although the Amazon cloud service provides a very reliable level of uptime, disruptions or connection problems are possible.
You can check the systems' status at [http://status.aws.amazon.com/](http://status.aws.amazon.com/). If the CDN status is reported as healthy and operating normally, but you still have connection problems,
possible reasons may include:

* Internet/network connectivity problems, DNS problems;
* Firewalls, antivirus or other security software, which incorrectly filters out the CDN scripts or modifies (breaks) them on-the-fly;
* **Kendo UI internal builds are not uploaded on CDN**, because they are intended only for clients with a commercial license. Only *major releases* and *service packs* are uploaded on the Kendo UI CDN. For internal builds, please use a private CDN.
* The scripts and stylesheets' URLs **are different when using HTTPS** - see above.

We are unable to investigate connection problems remotely; please contact your system administrators in this case.

When using any kind of CDN, it is recommended to implement a local fallback.

### Refer Kendo UI From CDN With a Local Script Fallback

    <!DOCTYPE html>
    <html>
    <head>
        <title>Welcome to Kendo UI</title>
        <link rel="stylesheet" href="http://cdn.kendostatic.com/2014.1.318/styles/kendo.common.min.css" />
        <link rel="stylesheet" href="http://cdn.kendostatic.com/2014.1.318/styles/kendo.blueopal.min.css" />

        <script src="http://cdn.kendostatic.com/2014.1.318/js/jquery.min.js"></script>
        <script>
            if (typeof jQuery == "undefined") {
                // fallback to local jQuery
                document.write(decodeURIComponent('%3Cscript src="/path/to/local/jquery.min.js" %3E%3C/script%3E'));
            }
        </script>

        <script src="http://cdn.kendostatic.com/2014.1.318/js/kendo.all.min.js"></script>
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

More information regarding this approach is available at [Scott HanselMann - Fallback from CDN to Local Scripts](http://www.hanselman.com/blog/CDNsFailButYourScriptsDontHaveToFallbackFromCDNToLocalJQuery.aspx).
