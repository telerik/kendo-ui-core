---
title: Using the Script License File
page_title: Using the Script License File - Download and Installation 
description: "Get started with Kendo UI for jQuery and learn how to acquire the library from the NPM distribution channel and register the script license file."
slug: using-license-code
position: 5
---

# Setting Up the License File

This article describes how to activate the Kendo UI for jQuery scripts from the CDN and NPM distribution by generating a personal license file.

Kendo UI for jQuery is a UI library distributed under a commercial license. 

As of the R2 2022 release, using any of the Kendo UI for jQuery components from the NPM distribution channel and as of R3 2022 from the CDN distribution requires a license registration. Depending on the license type you own, you can register an active trial license or a commercial license key.

If you are experiencing any issues related to the license key, inform the team through the [available support channels]({% slug welcometo_kendoui %}#support-options).

>* The script license registration is required only for the commercial NPM package (`@progress/kendo-ui`) and the CDN distribution. The other Kendo UI for jQuery commercial distributions or script sources require only an active license. This means that you don't need license registration when using NuGet, Bower, and for locally downloaded Kendo UI bundles. 
>* The license key will be distributed along with the scripts which cannot not be avoided. However, Progress recommends that you do not publicly announce it.

The license key installation process involves the following steps:

1. [Download a license file](#1-get-a-license-file)
2. [Add the license file in your application](#2-add-the-license-file)
2. [Add a Reference or Import the License File](#3-add-a-reference-or-import-the-license-file)

## 1. Get a License File

> This section contains auto-generated content based on the license information for your account.

To acquire a license file, generate it: 

<!-- The following code is a web component - it should never be added as a code snippet. It is part of the web application to generate the license code for the clients. To check it out, log into your account and open the live doc page. -->
<link rel="stylesheet" href="https://d3fu8oi3wk1rz4.cloudfront.net/kendo-docs-demos-assets/2.1.1/styles/license-key/styles.css" />
<script src="https://d3fu8oi3wk1rz4.cloudfront.net/kendo-docs-demos-assets/2.1.1/scripts/license-key/index.js"></script>

<license-download-link
    product-codes="KENDOUICOMPLETE, KENDOUI, KENDOUIMVC, UIASPCORE"
    product-name="Kendo UI for jQuery";
    purchase-url="https://www.telerik.com/purchase/kendo-ui"
    trial-url="https://www.telerik.com/try/kendo-ui"
    download-code-url="https://docs.telerik.com/kendo-ui/my-license/download">
</license-download-link>

## 2. Add the License File

To register the Kendo UI product, you need to add the `kendo-ui-license.js` file in the root of the application or in the main scripts folder. The following table shows the most common location you can include it according to the type of application you are using.

|Type of Application|Common Locations
|:---|:---
|JS applications|<ul><li><code>./</code></li><li><code>./src</code></li><li><code>./scripts</code></li><li><code>./js</code></li></ul>
|ASP.NET MVC applications|<ul><li><code>./</code></li><li><code>./Scripts</code></li></ul>
|ASP.NET Core applications|<ul><li><code>./wwwroot</code></li><li><code>./wwwroot/scripts</code></li><li><code>./wwwroot/js</code></li></ul>

## 3. Add a Reference or Import the License File

You can reference the `kendo-ui-license.js` file by using either of the following approaches: 

* [Use a script reference](#use-a-script-reference)
* [Use JS or TS Modules](#use-js-or-ts-modules)

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

Often, you will need two or more imports of the Kendo UI libraries and you will need to import the license file only in one location, which most likely will be the main script file of your application. In that case, import the `kendo.core.js` and register your license code as usual: 

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

## Frequently Asked Questions

This section lists the answers to the most frequently asked questions (FAQs) about working with the Kendo UI for jQuery license key.

### Do I need to generate a new license file if I had to renew my license?

Yes, but only If you upgrade the version of our product in your application with the new version.  

### What happens if a developer leaves? 

This doesn’t affect your licensing key. The license key is generated against a specific range of versions and it will be valid as long as the license code is valid for the product version you are using (that is, you need to change the license file only when you upgrade Kendo UI for jQuery).

### Which versions of jQuery does this affect? 

* For CDN usage, version R3 2022 and later.

* For NPM usage, version R2 2022 and later.

### Will projects stop working if I don't renew?

No, the licensing mechanism doesn’t control the components behavior. Also, the licensing mechanism checks if the user account (used to generate the license file) has a license for the product version used in the application. Note that the Kendo UI licenses are perpetual (see the [EULA](https://www.telerik.com/purchase/license-agreement/kendo-ui))..

### Will the product function without a license key?

Yes, the product will continue to function normally without a license key. However, a warning message will appear in the browser console if a valid license key is not present. 

### Does the license key expire?

Yes, the license key expires at the end of your support subscription: 

* (For trial licenses) The license key expires at the end of your 30-day trial. 
* (For commercial licenses) The license key expires when your subscription expires. 

You will need to obtain and install a new license key after starting a trial, renewing a license, or upgrading a license. 

> An expired license key is valid for all Product versions which are published before its expiration date. 

### I renewed my license key, but the warning message still appears in the console. What should I do?

Make sure that the [script license is present in your project](#2-add-the-license-file) and you [have correct references to it](#3-add-a-reference-or-import-the-license-file).

### Do I need an Internet connection to activate the license?

No, the license activation and validation are performed entirely offline. No network requests are made at any point of the project lifecycle. 

### My team has more than one licensed developer. Which key do we have to use?

To activate Kendo UI for jQuery, you can use any of the keys associated with your subscriptions.

### Are earlier versions of Kendo UI for jQuery affected?

No, if you use CDN and Kendo UI for jQuery versions released prior to R3 2022 or NPM and version released prior to R2 2022, you don’t need to set up the licensing. 

>caution Do not include a license file when using Kendo UI versions prior to R3 2022. Including a license file with those versions will cause a `KendoLicensing is not defined` error. 

## Next Steps

* [Create Your Own Custom Bundles]({% slug include_only_what_you_need_kendoui_scripts %})
* [Create Your Own Custom Components]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Initialize Components as jQuery Plugins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize Components with MVVM]({% slug mvvm_initialization_kendoui %})
* [Component Script Dependencies]({% slug script_filesfor_barcodes_widgets %})

## See Also

* [Hosting Kendo UI in Your Project]({% slug hosting_kendoui %})
* [Installing Kendo UI with Bower]({% slug kendoui_bower_packages_kendoui_installation %})
* [Obtaining Kendo UI by Using the CDN Services]({% slug kendoui_cdn_services_installation %})
* [Installing Kendo UI with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Installing Kendo UI with NuGet]({% slug kendoui_nuget_packages %})
* [Getting Up and Running with Your Kendo UI Project (Guide)]({% slug getting_started_installation_kendoui %})
