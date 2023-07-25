---
title: Using Script License File
page_title: Using Script License File - Download and Installation
description: "Get started with {{ site.product }} and learn how to register the script license file required for the client-side scripts from the CDN and NPM distribution."
slug: using_license_code
position: 2
---

# Setting Up the License File

This article describes how to activate the required client-side scripts from the CDN and NPM distribution by generating a personal license file.

As of the following releases, using any {{ site.product }} components from the Kendo CDN service and from the NPM distribution channel requires a license registration:

* R3 2022 for the [Kendo CDN service]({% slug cdnservices_core %})
* R2 2022 for the NPM distribution channel

Depending on the license you own, you can register an active trial license key or a commercial license key.

If you are experiencing any issues related to the license file, inform the team through the [available support channels]({% slug overview_aspnetmvc6_aspnetmvc %}#support-options).

>* The script license registration is required only for the CDN distribution and the commercial NPM package (`@progress/kendo-ui`). For locally downloaded client-side scripts, you do not need a license registration.
>* The license key will be distributed along with the scripts, which can not be avoided. However, Progress recommends that you do not announce it publicly.

The license key installation process involves the following steps:

1. [Download a license file](#step-1-get-the-license-file)
2. [Add the license file in your application](#step-2-add-the-license-file)
3. [Add a Reference to the License File](#step-3-add-a-reference-to-the-license-file)

## Step 1: Get the License File

> This section contains auto-generated content based on the license information for your account.

To get a license file, generate it:

<link rel="stylesheet" href="https://d3fu8oi3wk1rz4.cloudfront.net/kendo-docs-demos-assets/2.1.2/styles/license-key/styles.css" />
<script src="https://d3fu8oi3wk1rz4.cloudfront.net/kendo-docs-demos-assets/2.1.2/scripts/license-key/index.js"></script>

{% if site.core %}
<license-download-link
product-codes="KENDOUICOMPLETE, KENDOUI, KENDOUIMVC, UIASPCORE"
product-name="Telerik UI for ASP.NET Core";
purchase-url="https://www.telerik.com/purchase/aspnet-core-ui"
trial-url="https://www.telerik.com/try/aspnet-core-ui"
download-code-url="https://docs.telerik.com/kendo-ui/my-license/download">
</license-download-link>
{% else %}
<license-download-link
product-codes="KENDOUICOMPLETE, KENDOUI, KENDOUIMVC, UIASPCORE"
product-name="Telerik UI for ASP.NET MVC";
purchase-url="https://www.telerik.com/purchase/aspnet-mvc"
trial-url="https://www.telerik.com/try/ui-for-asp.net-mvc"
download-code-url="https://docs.telerik.com/kendo-ui/my-license/download">
</license-download-link>
{% endif %}

## Step 2: Add the License File

To register the Kendo UI product, add the `kendo-ui-license.js` file in the root of the application or the main scripts folder. The following table shows the most common location where you can include it in your application.

{% if site.core %}
|Type of Application|Common Locations
|:---|:---
|ASP.NET Core applications|<ul><li><code>./wwwroot</code></li><li><code>./wwwroot/scripts</code></li><li><code>./wwwroot/js</code></li></ul>
{% else %}
|Type of Application|Common Locations
|:---|:---
|ASP.NET MVC applications|<ul><li><code>./</code></li><li><code>./Scripts</code></li></ul>
{% endif %}

## Step 3: Add a Reference to the License File

Add the `kendo-ui-license.js` file as a script reference right after the `kendo.aspnetmvc.min.js` reference or the Kendo scripts you are using.

**An example of using a CDN reference with `kendo.all.min.js` and `kendo.aspnetmvc.min.js`**
```html
<script src="https://kendo.cdn.telerik.com/***/kendo.all.min.js"></script>
<script src="https://kendo.cdn.telerik.com/***/kendo.aspnetmvc.min.js"></script>
<script src="./kendo-ui-license.js"></script>

<!-- Rest of the HTML -->
```

**An example of using a CDN reference with a predefined list of scripts**
```html
<script src="https://kendo.cdn.telerik.com/***/kendo.core.min.js"></script>
<script src="https://kendo.cdn.telerik.com/***/kendo.userevents.min.js"></script>
<script src="https://kendo.cdn.telerik.com/***/kendo.draganddrop.min.js"></script>
<script src="https://kendo.cdn.telerik.com/***/kendo.popup.min.js	"></script>
<script src="https://kendo.cdn.telerik.com/***/kendo.fx.min.js"></script>
<script src="https://kendo.cdn.telerik.com/***/kendo.window.min.js"></script>
<script src="https://kendo.cdn.telerik.com/***/kendo.aspnetmvc.min.js"></script>
<script src="./kendo-ui-license.js"></script>

<!-- Rest of the HTML -->
```

## Frequently Asked Questions

This section lists the answers to the most frequently asked questions (FAQs) about working with the {{ site.product }} license key.

### Do I need to generate a new license file if I have renewed my license?
Yes, but only If you upgrade the version of our product in your application with the new version.

### What happens if a developer leaves?
It does not  affect your licensing key. The license key is generated against a specific range of versions. It will be valid as long as the license code is valid for the product version used (for example, the license file should be changed only when you upgrade the {{ site.product }}).

### Which versions of {{ site.product }} does this affect?

For CDN usage: Starting from R3 2022

For NPM: Starting from R2 2022

### Will projects stop working if we do not renew?
No, the licensing mechanism does not control the components behavior. Also, the licensing mechanism performs a check if the user (who authenticated in the docs to generate the license file) has a license for the version of our product used in the application. Note that our licenses are perpetual (see EULA).

### Will the product function without a license key?
Yes, the product will continue to function normally without a license key. However, a warning message will appear in the browser console if a valid license key is not present.

### Does the license key expire?
Yes, the license key expires at the end of your support subscription:

For trial users, this is at the end of your 30-day trial.

For licensed developers, this is when your subscription expires.

You will need to obtain and install a new license key after starting a trial, renewing a license, or upgrading a license.

> NOTE: An expired license key is valid for all Product versions published before its expiration date.

### I renewed my license key, but the warning message still appears in the console. What should I do?
Make sure that the [script license is present in your project](#step-2-add-the-license-file) and you [have correct references to it](#step-3-add-a-reference-to-the-license-file).

### Do I need an Internet connection to activate the license?
No, the license activation and validation are performed entirely offline.

No network requests are made at any point of the project lifecycle.

### My team has more than one licensed developer. Which key do we have to use?
To activate {{ site.product }}, you can use any of the keys associated with your subscriptions.

### Are earlier versions of {{ site.product }} affected?
No, if you use the CDN service and a version released prior to R3 2022, or NPM with a version released prior to R2 2022, you do not have to set up the licensing.


## Next Steps

* [Using CDN to Add Client-Side Resources]({% slug cdnservices_core %})
* [Creating Your Own Custom Script Bundles with Client-Side Resources]({% slug custombundles_core %})

## See Also

{% if site.core %}
* [Using LibMan to Add Client-Side Resources]({% slug using_libman %})
    {% endif %}
* [Using Local Files to Add Client-Side Resources]({% slug using_local_client_side_resources %})
