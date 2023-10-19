---
title: Using the Script License File
page_title: Using the Script License File - Download and Installation
description: "Get started with Kendo UI for jQuery and learn how to acquire the library from the NPM distribution channel and register the script license file."
slug: using-license-code
position: 5
---

# Setting Up the License File

Using any Kendo UI for jQuery scripts that are [installed through NPM]({% slug kendoui_npm_packages_kendoui_installation %}) or imported through the [Kendo UI CDN]({% slug kendoui_cdn_services_installation %}) requires you to provide a license file. Follow the steps in this article to download a license file, add it to your application, and then reference it.

Providing a license file is not required when using distribution methods such as NuGet, Bower, and locally downloaded Kendo UI commercial bundles.

A missing license file triggers [a banner, a watermark, and causes a message]({% slug invalid-license %}) similar to this one to appear in the browser's console:

```console
License activation failed for
@progress/kendo-ui v.2022.3.1109
No license found.
See https://docs.telerik.com/kendo-ui/intro/installation/using-license-code for more information.
```

To add a Kendo UI license file to your application:

1. [Download a license file.](#1-get-a-license-file)
2. [Add the license file in your application.](#2-add-the-license-file)
2. [Add a reference or import the license file.](#3-add-a-reference-or-import-the-license-file)

## 1. Get a License File

> This section contains auto-generated content based on the license information for your account.

To acquire a license file, generate it.

<!-- The following code is a web component - it should never be added as a code snippet. It is part of the web application to generate the license code for the clients. To check it out, log into your account and open the live doc page. -->
<link rel="stylesheet" href="https://d3fu8oi3wk1rz4.cloudfront.net/kendo-docs-demos-assets/2.3.5/styles/license-key/styles.css" />
<script src="https://d3fu8oi3wk1rz4.cloudfront.net/kendo-docs-demos-assets/2.3.5/scripts/license-key/index.js"></script>

<license-download-link
product-codes="KENDOUICOMPLETE, KENDOUI, KENDOUIMVC, UIASPCORE"
product-name="Kendo UI for jQuery";
purchase-url="https://www.telerik.com/purchase/kendo-ui"
trial-url="https://www.telerik.com/try/kendo-ui"
download-code-url="https://docs.telerik.com/kendo-ui/my-license/download">
</license-download-link>

If you experience any issues related to the license key, contact us through the [available support channels]({% slug welcometo_kendoui %}#support-options).

## 2. Add the License File

Place the `kendo-ui-license.js` file in the root of the application or in the main scripts folder.

The following table shows the most common location you can include it according to the type of the application.

|Type of Application|Common Locations
|:---|:---
|JS applications|<ul><li><code>./</code></li><li><code>./src</code></li><li><code>./scripts</code></li><li><code>./js</code></li></ul>
|ASP.NET MVC applications|<ul><li><code>./</code></li><li><code>./Scripts</code></li></ul>
|ASP.NET Core applications|<ul><li><code>./wwwroot</code></li><li><code>./wwwroot/scripts</code></li><li><code>./wwwroot/js</code></li></ul>

## 3. Add a Reference or Import the License File

You can reference the `kendo-ui-license.js` file by using either of the following approaches:

* [Use a script reference](#use-a-script-reference)
* [Use JS or TS Modules](#use-js-or-ts-modules)

As a result, the license key will be distributed along with the scripts and this cannot be avoided. However, Progress recommends that you do not publicly announce it.

### Use a Script Reference

Add the `kendo-ui-license.js` as a script reference right after the `kendo.all.min.js` reference or the Kendo UI scripts you are using.

The following example shows how to use the CDN reference (`kendo.all.min.js`).

```html
<script src="https://kendo.cdn.telerik.com/***/kendo.all.min.js"></script>
<script src="./kendo-ui-license.js"></script>

<!-- Rest of the HTML -->
```

The following example shows how to use the CDN reference by utilizing the predefined list of scripts.

```html
<script src="https://kendo.cdn.telerik.com/***/kendo.core.min.js"></script>
<script src="https://kendo.cdn.telerik.com/***/kendo.userevents.min.js"></script>
<script src="https://kendo.cdn.telerik.com/***/kendo.draganddrop.min.js"></script>
<script src="https://kendo.cdn.telerik.com/***/kendo.popup.min.js	"></script>
<script src="https://kendo.cdn.telerik.com/***/kendo.fx.min.js"></script>
<script src="https://kendo.cdn.telerik.com/***/kendo.window.min.js"></script>
<script src="./kendo-ui-license.js"></script>

<!-- Rest of the HTML -->
```

### Use JS or TS Modules

Import the `kendo-ui-license.js` file right after the import of the Kendo UI modules.

The following example shows how to use the ESM modules.

```js
import "@progress/kendo-ui";
import "./kendo-ui-license.js";

$("#grid").kendoGrid();
```

The following example shows how to use the CJS modules.

```js
require("@progress/kendo-ui");
require("./kendo-ui-license.js");

$("#grid").kendoGrid();
```

Often, you will need two or more imports of the Kendo UI libraries and you will need to import the license file only in one location, which most likely will be the main script file of your application. In that case, import the `kendo.core.js` and register your license code as usual.

The following example shows how to use the ESM modules to import the license file in a single location.

```js
import '@progress/kendo-ui/js/kendo.core';
import './kendo-ui-license.js';

// The rest of the code.
```

The following example shows how to use the CJS modules to import the license files in a single location.

```js
require("@progress/kendo-ui/js/kendo.core");
require("./kendo-ui-license.js");

// The rest of the code.
```

## Next Steps

* [Troubleshooting an Invalid Kendo UI License]({% slug invalid-license %})
* [License File Frequently Asked Questions]({% slug license-code-faq %})

## See Also

* [Hosting Kendo UI in Your Project]({% slug hosting_kendoui %})
* [Installing Kendo UI with Bower]({% slug kendoui_bower_packages_kendoui_installation %})
* [Obtaining Kendo UI by Using the CDN Services]({% slug kendoui_cdn_services_installation %})
* [Installing Kendo UI with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Installing Kendo UI with NuGet]({% slug kendoui_nuget_packages %})
* [Getting Up and Running with Your Kendo UI Project (Guide)]({% slug getting_started_installation_kendoui %})
