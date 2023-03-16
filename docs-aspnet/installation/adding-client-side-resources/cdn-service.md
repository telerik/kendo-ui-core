---
title: Using CDN
page_title: Using CDN
description: "Get started with {{ site.product }} and install the helpers by using the Telerik UI CDN services."
previous_url: /getting-started/installation/cdn-service, /installation/cdn-service, /installation-mvc/adding-client-side-resources/cdn-service
slug: cdnservices_core
position: 5
---

# Using CDN with {{ site.product }}

The Kendo UI client-side resources like JavaScript files and CSS files are available online through the Kendo CDN service. Including the client-side resources in your project is essential because the Telerik UI helpers are wrappers over the [Kendo UI widgets](https://docs.telerik.com/kendo-ui/intro/first-steps).

> As of the R3 2022 release, you must install a license file in your application in order to access the resources provided by the CDN service. For more information, check [Using Script License File]({% slug using_license_code %}).

Only the official Kendo UI releases and serviced packs are uploaded to the CDN. Internal builds are not available on the CDN.

To access the Kendo UI CDN services, you can use either the HTTP or the HTTPS protocol with any of the following CDN services:

* `kendo.cdn.telerik.com`
* `cdn.kendostatic.com` (a cookieless CDN service)

>tip To check the status of the Progress Live Services, like Kendo UI CDN, Telerik NuGet, Kendo UI Dojo playground and others, visit the [Progress<sup>®</sup> Telerik<sup>®</sup> Live Services Status Page](http://status.telerik.com/).

## Understanding the CDN Structure

The URLs of the Telerik CDN have the following structure:

* `https://kendo.cdn.telerik.com/[VERSION]/styles/[FILENAME]`&mdash;The `styles` folder contains the [minified `.css` files](#adding-the-required-css-files).
* `https://kendo.cdn.telerik.com/[VERSION]/mjs/[FILENAME]`&mdash;The `mjs` folder contains the [JavaScript modules](#using-javascript-modules).
* `https://kendo.cdn.telerik.com/[VERSION]/js/[FILENAME]`&mdash;The `js` folder contains the [bundled Kendo UI JavaScript files](#using-bundled-javascript).

In the sample URLs above, you must replace `[VERSION]` and `[FILENAME]` with the client-side resource that you need and its version. For example, to load version `{{ site.mvcCoreVersion }}` of the Kendo JavaScript modules and the CSS files for the Kendo Default visual theme, use these URLs:

* `https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/mjs/kendo.all.js`
* `https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/styles/kendo.default-main.min.css`

## Adding the Required CSS Files

Adding the Kendo CSS files allows you to use the [Kendo UI visual themes]({% slug sassbasedthemes_overview %}). The minified versions of the `.css` files are available in the `styles` folder of the Kendo CDN URL&mdash;`https://kendo.cdn.telerik.com/[VERSION]/styles/[FILENAME]`.

To load version `{{site.cdnVersion}}` of the desired visual theme, replace `[VERSION]` and `[FILENAME]` with their actual values, for example, `https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.default-main.min.css`.

## Adding the Required JavaScript Files

To import the JavaScript files required for the Telerik UI components, apply either of the following approaches:

 * [Using the JavaScript modules](#using-javascript-modules)—[A new approach introduced with version `2022.3.1109`]({% slug core_ecmascript_overview %}).
 * [Using the bundled JavaScript](#using-bundled-javascript)—The traditional way of including the Kendo UI scripts.

### Using JavaScript Modules

The [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) are located in the `mjs` folder of the Kendo CDN URL&mdash;`https://kendo.cdn.telerik.com/[VERSION]/mjs/[FILENAME]`.

To include a Kendo JavaScript module in your project:

1. Use the `script` tag with the `type=module` attribute.
1. Add a reference to the global `aspnetmvc.min.js` file.

The two examples below demonstrate how to include individual component modules and all available component modules:

* Including individual component modules.

    ```html
    <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/mjs/kendo.grid.js" type="module"></script> <!-- Include the Grid module. The rest of the dependencies required by the Grid will be loaded automatically. -->
    <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/mjs/kendo.aspnetmvc.js" type="module"></script> <!-- Include the global `kendo.aspnetmvc.js` file. -->
    ```

* Including all available modules.

    ```html
    <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/mjs/kendo.all.js" type="module"></script> <!-- Include all Kendo UI modules. -->
    <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/mjs/kendo.aspnetmvc.js" type="module"></script> <!-- Include the global `kendo.aspnetmvc.js` file. -->
    ```

### Using Bundled JavaScript

The Kendo UI JavaScript files for the traditional format are located in the `js` folder of the Kendo CDN URL&mdash;`https://kendo.cdn.telerik.com/[VERSION]/js/[FILENAME]`.

To load version `{{site.cdnVersion}}` of the bundled Kendo JavaScript files, replace `[VERSION]` and `[FILENAME]` with their actual values, for example, `https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js`.

## Using the CDN in Your Project

The following complete example demonstrates how to add the [CSS files](#adding-the-required-css-files) and the [bundled JavaScript](#using-bundled-javascript).

>Replace the Kendo UI version from the following code snippets with the version of the product you are using&mdash;for example, `{{ site.mvcCoreVersion }}`.

{% if site.core %}
1. Open the layout of the application. By default, it is `~\Views\Shared\_Layout.cshtml`.

1. To add the Bootstrap theme files, insert a `link` tag within the `head` tag of the layout and include the style file or files.

    ```
         <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-main.css" />
    ```

1. To add the JavaScript files, insert a `script` tag and include `kendo.all.min.js` and `kendo.aspnetmvc.min.js` after the jQuery script.

    ```
        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>
        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.aspnetmvc.min.js"></script>
    ```

{% else %}
1. Open the layout of the application. By default, it is `~/Views/Shared/_Layout.cshtml` or `Site.master`, if using ASPX.

1. To add the JavaScript files, insert a `script` tag and include `kendo.all.min.js` and `kendo.aspnetmvc.min.js` after the jQuery script.

        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>
        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.aspnetmvc.min.js"></script>

1. If using the Telerik MVC Scheduler helper, include `kendo.timezones.min.js` after `kendo.all.min.js`.

        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>
        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.timezones.min.js"></script>
        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.aspnetmvc.min.js"></script>
{% endif %}

1. Setup the License File by following the instructions in the [Using Script License File article]({% slug using_license_code %}).

## Troubleshooting

The following articles provide solutions to common issues related to the Telerik and Kendo CDN services:

* [CDN connection issues and general disruption occur]({% slug cdn_connection_issues %})
* [How to refer Kendo UI internal builds from a CDN]({% slug cdn_cannot_refer_internal_builds %})

## Next Steps

* [Explore the helper script dependencies]({% slug script_filesfor_barcodes_widgets %})
* [Using ECMAScript Modules]({% slug core_ecmascript_overview %})
## See Also

* [Including Client-Side Resources]({% slug copyclientresources_aspnetmvc6_aspnetmvc %})
* [Installing {{ site.product }} with NuGet]({% slug nuget_install_aspnetmvc6_aspnetmvc %})
{% if site.core %}
* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Mac (Online Guide)]({% slug gettingstarted_firststeps_vsmac %})
* [First Steps with CLI (Online Guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
{% else %}
* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstarted_aspnetmvc %})
{% endif %}
