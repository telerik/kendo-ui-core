---
title: Using Script License Code
page_title: Using Script License Code | Download and Installation | Kendo UI for jQuery
description: "Get started with Kendo UI for jQuery and learn how to download the library and initialize its widgets."
slug: using-license-code
position: 5
---

# Setting Up Your Kendo UI for jQuery License Key

Kendo UI for jQuery is a professionally developed UI library distributed under a commercial license. Starting from version R2 2022, using any of the Kendo UI for jQuery components from the NPM distribution channel requires a script license registration. Depending on the license type that you own, you can register an active trial license or commercial license key.

> The script license registration is required only for the commercial NPM package (*@progress/kendo-ui*). Currently, all other Kendo UI for jQuery commercial distributions or script sources require only an active license&mdash;no script registration is required when using NuGet, CDN, Bower, and downloaded local Kendo UI bundles. 

Our community is essential to us, and we want to be sure that licensing does not get in your way. Let us know if you experience any issues.

You can send us feedback through the Contact Us form or by opening a support ticket.

The license key installation process involves two steps:

1. [Getting a license key](#getting-a-license-key) from this page.
1. [Registering the license key](#registering-the-license-key) in your application.

## Getting a License Key

<link rel="stylesheet" href="https://d3fu8oi3wk1rz4.cloudfront.net/kendo-docs-demos-assets/0.0.1/styles/license-key/styles.css" />
<script src="https://d3fu8oi3wk1rz4.cloudfront.net/kendo-docs-demos-assets/0.0.1/scripts/license-key/index.js"></script>

<license-download-link
    product-codes="KENDOUICOMPLETE, KENDOUI, KENDOUIMVC, UIASPCORE"
    product-name="Kendo UI for jQuery";
    purchase-url="https://www.telerik.com/purchase/kendo-ui"
    trial-url="https://www.telerik.com/try/kendo-ui"
    download-code-url="https://docs.telerik.com/kendo-ui/my-license/download">
</license-download-link>

## Registering the License key

To register your license key, set it up either by [using the NPM package](#using-npm-package) or a [script reference](#using-script-reference). Then, utilize the `KendoLicensing.setScriptKey()` method.

### Using NPM package

Use the generated code from the [Get a license key](#getting-a-license-key) section, and place it in the main script file the where Kendo UI for jQuery scripts are imported.

```js
require("@progress/kendo-ui");

KendoLicensing.setScriptKey(
    'Your license code'
);

$("#grid").kendoGrid();
```

### Using Script Reference

Use the generated code from the [Get a license key](#getting-a-license-key) section and place it right after the script tag.

```html
<script src="***/kendo.all.min.js"></script>

<script>
    KendoLicensing.setScriptKey(
        'Your license code'
    );
</script>
```

## Next Steps

* [Create your own custom bundles]({% slug include_only_what_you_need_kendoui_scripts %})
* [Create your own custom widgets]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Initialize widgets as jQuery plugins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize widgets with MVVM]({% slug mvvm_initialization_kendoui %})
* [Explore the widget script dependencies]({% slug script_filesfor_barcodes_widgets %})

## See Also

* [Hosting Kendo UI in Your Project]({% slug hosting_kendoui %})
* [Installing Kendo UI with Bower]({% slug kendoui_bower_packages_kendoui_installation %})
* [Obtaining Kendo UI by Using the CDN Services]({% slug kendoui_cdn_services_installation %})
* [Installing Kendo UI with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Installing Kendo UI with NuGet]({% slug kendoui_nuget_packages %})
* [Getting Up and Running with Your Kendo UI Project (Guide)]({% slug getting_started_installation_kendoui %})
