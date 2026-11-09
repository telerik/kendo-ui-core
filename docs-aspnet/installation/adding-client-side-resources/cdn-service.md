---
title: Using CDN
page_title: Using CDN
description: "Get started with {{ site.product }} and install the helpers by using the Telerik UI CDN services."
components: ["general"]
previous_url: /getting-started/installation/cdn-service, /installation/cdn-service, /installation-mvc/adding-client-side-resources/cdn-service
slug: cdnservices_core
position: 2
---

# Using CDN with {{ site.product }}

The client-side JavaScript and CSS resources for {{ site.product }} are published as `npm` packages. You can load them from an npm-compatible CDN, such as `jsDelivr` or `unpkg`. Including these resources in your project is essential because the Telerik UI helpers are wrappers over the [Kendo UI widgets](https://docs.telerik.com/kendo-ui/intro/first-steps).

> As of the R3 2022 release, you must install a license file in your application to use {{ site.product }}. For more information, check [Installing a License File]({% slug installation_license_key_aspnetcore %}).

The public npm CDN endpoints shown in this article serve package versions published to the `npm` registry. To use a private package or an internal build, host the files in a location your application can access.

For production, it is advisable to pin the package version in the URL. If your CDN provider provides Subresource Integrity (SRI) metadata, it is also advisable to use the hash for the exact file and version and include the `integrity` and `crossorigin` attributes.

## Understanding the CDN Structure

For public npm packages, `jsDelivr` and `unpkg` use the following URL structures:

* `https://cdn.jsdelivr.net/npm/[PACKAGE]@[VERSION]/[MODULE_FORMAT]/[FILE]`
* `https://unpkg.com/[PACKAGE]@[VERSION]/[MODULE_FORMAT]/[FILE]`

Replace `[PACKAGE]`, `[VERSION]`, and `[FILE]` with the npm package name, version, and file path. Use `js`, `umd` or `esm` to load the scripts in the desired module format - `CommonJs`, `UMD` or `ESM`, respectively. For example, to load the configured Kendo JavaScript and Default theme versions from jsDelivr, use:

* `https://cdn.jsdelivr.net/npm/@progress/kendo-ui@{{ site.cdnVersion }}/esm/kendo.all.js`
* `https://cdn.jsdelivr.net/npm/@progress/kendo-theme-default@{{ site.themesCdnVersion }}/dist/default-main.css`

To use unpkg for the same files, replace `https://cdn.jsdelivr.net/npm` with `https://unpkg.com`.

## Adding the Required CSS Files

Adding the Kendo CSS files allows you to use the [Kendo UI visual themes]({% slug sassbasedthemes_overview %}). The compiled `.css` files are available in each theme package's `dist` folder.

To load the Bootstrap theme, reference its package and compiled stylesheet:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@progress/kendo-theme-bootstrap@{{ site.themesCdnVersion }}/dist/bootstrap-main.css" />
```

## Adding the Required JavaScript Files

To import the JavaScript files required for the Telerik UI components, apply either of the following approaches:

 * [Using the JavaScript modules](#using-javascript-modules)&mdash;[A new approach introduced with version `2022.3.1109`]({% slug core_ecmascript_overview %}).
 * [Using the bundled JavaScript](#using-bundled-javascript)&mdash;The traditional way of including the Kendo UI scripts.

### Using JavaScript Modules

The [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) are located in the `esm` folder of the Kendo npm package.

To include a Kendo JavaScript module in your project:

1. Use the `script` tag with the `type=module` attribute.
1. Add a reference to the global `aspnetmvc.js` file.

The two examples below demonstrate how to include individual component modules and all available component modules:

* Including individual component modules.

    ```html
    <script src="https://cdn.jsdelivr.net/npm/@progress/kendo-ui@{{ site.cdnVersion }}/esm/kendo.grid.js" type="module"></script>
    <script src="https://cdn.jsdelivr.net/npm/@progress/kendo-ui@{{ site.cdnVersion }}/esm/kendo.aspnetmvc.js" type="module"></script>
    ```

* Including all available modules.

    ```html
    <script src="https://cdn.jsdelivr.net/npm/@progress/kendo-ui@{{ site.cdnVersion }}/esm/kendo.all.js" type="module"></script>
    <script src="https://cdn.jsdelivr.net/npm/@progress/kendo-ui@{{ site.cdnVersion }}/esm/kendo.aspnetmvc.js" type="module"></script>
    ```

### Using Bundled JavaScript

The Kendo UI bundled JavaScript files are located in the `umd` folder of the Kendo npm package.

To load the full bundle, use a version-pinned URL from your chosen CDN provider:

```html
<script src="https://cdn.jsdelivr.net/npm/@progress/kendo-ui@{{ site.mvcCoreVersion }}/umd/kendo.all.min.js" ></script>
```

## Using the CDN in Your Project

The following complete example demonstrates how to add the [CSS files](#adding-the-required-css-files) and the [bundled JavaScript](#using-bundled-javascript).

>Replace the {{ site.product }} version in the script `src` attribute with the version of the product you are using&mdash;for example, `{{ site.mvcCoreVersion }}`. Replace the theme version in the stylesheet `href` attribute with the respective version of the theme you are using.

{% if site.core %}
1. Open the layout of the application. By default, it is `~\Views\Shared\_Layout.cshtml`.

1. To add the Bootstrap theme files, insert a `link` tag within the `head` tag of the layout and include the style file or files.

    ```HTML
         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@progress/kendo-theme-bootstrap@{{ site.themesCdnVersion }}/dist/bootstrap-main.css"  />
    ```

1. To add the JavaScript files, insert a `script` tag and include `kendo.all.min.js` and `kendo.aspnetmvc.min.js` after the jQuery script.

    ```HTML
        <script src="https://cdn.jsdelivr.net/npm/@progress/kendo-ui@{{ site.mvcCoreVersion }}/umd/kendo.all.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@progress/kendo-ui@{{ site.mvcCoreVersion }}/umd/kendo.aspnetmvc.min.js"></script>
    ```

{% else %}
1. Open the layout of the application. By default, it is `~/Views/Shared/_Layout.cshtml` or `Site.master`, if using ASPX.

1. To add the JavaScript files, insert a `script` tag and include `kendo.all.min.js` and `kendo.aspnetmvc.min.js` after the jQuery script.

    ```HTML
        <script src="https://cdn.jsdelivr.net/npm/@progress/kendo-ui@{{ site.mvcCoreVersion }}/umd/kendo.all.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@progress/kendo-ui@{{ site.mvcCoreVersion }}/umd/kendo.aspnetmvc.min.js"></script>
    ```

1. If using the Telerik MVC Scheduler helper, include `kendo.timezones.min.js` after `kendo.all.min.js`.

    ```HTML
        <script src="https://cdn.jsdelivr.net/npm/@progress/kendo-ui@{{ site.mvcCoreVersion }}/umd/kendo.all.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@progress/kendo-ui@{{ site.mvcCoreVersion }}/umd/kendo.timezones.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@progress/kendo-ui@{{ site.mvcCoreVersion }}/umd/kendo.aspnetmvc.min.js"></script>
    ```
{% endif %}

1. Setup the License File by following the instructions in the [Installing a License File]({% slug installation_license_key_aspnetcore %}).

## Using Legacy Kendo CDNs

Up to Kendo UI version `2026.3.811`, client-side resources were also hosted on the legacy Kendo CDN services:

* `https://kendo.cdn.telerik.com`&mdash;The Kendo CDN.
* `https://cdn.kendostatic.com`&mdash;The cookieless Kendo CDN host.

The historical URL patterns used a Kendo UI version for JavaScript and older CSS files, and a separate theme version for Sass theme CSS:

```text
https://kendo.cdn.telerik.com/{KENDO_VERSION}/js/{FILE}
https://cdn.kendostatic.com/{KENDO_VERSION}/js/{FILE}
https://kendo.cdn.telerik.com/{KENDO_VERSION}/mjs/{FILE}
https://kendo.cdn.telerik.com/{KENDO_VERSION}/styles/{FILE}
https://kendo.cdn.telerik.com/themes/{THEME_VERSION}/{THEME}/{SWATCH}.css
```

For example, a legacy application could build its URLs from the Kendo UI and theme versions:

```javascript
const KENDO_VERSION = "2026.3.811";
const THEME_VERSION = "14.5.0";
const kendoAllUrl = `https://kendo.cdn.telerik.com/${KENDO_VERSION}/js/kendo.all.min.js`;
const cookielessKendoAllUrl = `https://cdn.kendostatic.com/${KENDO_VERSION}/js/kendo.all.min.js`;
const themeUrl = `https://kendo.cdn.telerik.com/themes/${THEME_VERSION}/default/default-main.css`;
```

For new integrations, use a version-pinned URL from an `npm` CDN provider, as described above.

For troubleshooting historical integrations, see:

* [CDN connection issues and general disruption occur]({% slug cdn_connection_issues %})
* [How to refer Kendo UI internal builds from a CDN]({% slug cdn_cannot_refer_internal_builds %})

>tip To check the status of Progress services, visit the [Progress<sup>®</sup> Telerik<sup>®</sup> Live Services Status Page](http://status.telerik.com/). For CDN availability, consult the status page for your chosen provider.

## Troubleshooting

If a file fails to load, verify the package name, version, and file path. Check the selected CDN provider's status page and confirm that your network and security settings allow the request.

## Next Steps

* [Creating Your Own Custom Script Bundles]({% slug creating-custom-bundles %})
* [Using ECMAScript Modules]({% slug core_ecmascript_overview %})
## See Also

* [Including Client-Side Resources]({% slug copyclientresources_aspnetmvc6_aspnetmvc %})
* [Installing {{ site.product }} with NuGet]({% slug nuget_install_aspnetmvc6_aspnetmvc %})
{% if site.core %}
* [Quick Start]({% slug gettingstartedtelerik_aspnetcore %})
{% else %}
* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstartedtelerik_cli_aspnetmvc %})
{% endif %}
