---
title: Script License File FAQ
page_title: Script License File FAQ - Download and Installation
description: "Find answers to the most common questions related to the script license file that is required when using Kendo UI for jQuery scripts from CDN and NPM distributions."
slug: license-code-faq
position: 7
---

# Script License File: Frequently Asked Questions

This article answers the most frequently asked questions (FAQ) about working with the [Kendo UI for jQuery license file]({% slug using-license-code %}).

## Do I need to generate a new license file when I renew my license?

Yes.

To upgrade the Kendo UI for jQuery components in your application, you must [generate a new license file]({% slug using-license-code %}) and then add it to your application. Your previous license file is valid only for the Kendo UI for jQuery versions that have been released before the expiration of your previous license.

## What happens if the developer who generated the license file leaves my company?

This doesn’t affect your license file. The license file is generated against a specific range of versions and it will be valid as long as the license code is valid for the product version you are using (that is, you need to change the license file only when you upgrade Kendo UI for jQuery).

## Which versions of Kendo UI for jQuery require a license file?

Using any of the Kendo UI for jQuery components distributed through the following channels requires you to add valid license file to your application:

| Distribution channel | Version |
|----------------------|----------------|
| Kendo CDN (`kendo.cdn.telerik.com` and `cdn.kendostatic.com`) | version R3 2022 and later |
| NPM packages (`@progress/kendo-ui`) | version R2 2022 and later |
| Trial installation bundle | version R3 2023 and later |
| `KendoUIProfessional.Trial` NuGet package | version R3 2023 and later |

## Will projects stop working if I don't renew my license?

No, the licensing mechanism doesn’t control the components' behavior, and they cannot stop working when your license file expires.

At the time the license file is generated, the licensing mechanism checks if the currently signed-in user account has a license for the product version used in the application. Note that the Kendo UI licenses are perpetual (see the [EULA](https://www.telerik.com/purchase/license-agreement/kendo-ui)).

## Will the product function without a license file?

Yes, the product will continue to function without a license file. However, a warning message will appear in the browser console if a valid license file is not present. In addition, any pages that contain unlicensed Kendo UI components will receive a [banner]({% slug invalid-license %}) and select UI components will have a [watermark]({% slug invalid-license %}).

## Does the license file expire?

Yes, the license file expires at the end of your support subscription:

* For trial licenses, the license file expires at the end of your 30-day trial. 
* For commercial licenses, the license file expires when your subscription expires. 

You will need to [obtain and install a new license file]({% slug using-license-code %}) after starting a trial, renewing a license, or upgrading a license.

> An expired license file is valid for all product versions published before its expiration date.

## I renewed my license file, but the warning message still appears in the console. What should I do?

Make sure that the [script license is present in your project]({% slug using-license-code %}#2-add-the-license-file) and you [have correct references to it]({% slug using-license-code %}#3-add-a-reference-or-import-the-license-file).

## Do I need an Internet connection to activate the license?

No, the license activation and validation are performed entirely offline. No network requests are made at any point of the project lifecycle.

## My team has more than one licensed developer. Whose license file do we have to use?

To activate Kendo UI for jQuery, you can use any of the license files associated with your subscriptions.

## Are earlier versions of Kendo UI for jQuery affected?

No, if you use CDN and Kendo UI for jQuery versions released prior to R3 2022 or NPM versions released prior to R2 2022, you don’t need to set up the licensing.

>caution Do not include a license file when using Kendo UI versions prior to R3 2022. Including a license file with those versions will cause a `KendoLicensing is not defined` error.

## I have a `KendoLicensing is not defined` error in the console. What should I do?

If you are using Kendo UI versions after `R3 2022` and loading the required scrips asynchronously you need to properly chain the scrips loading order. `loadScript` is an async method and thus it does not reassure that the `kendo.all.min.js` is loaded before loading the `kendo-ui-license.js`.

```js
      Promise.all([
        loadScript(this, ScriptsPath + '/jquery-3.7.0.min.js'),
        loadScript(this, ScriptsPath + '/kendo.all.min.js'),
        loadStyle(this, StylesPath + '/jquery-ui.min.css'),
        loadStyle(this, StylesPath + '/Kendo.css'),
        loadStyle(this, StylesPath + '/kendo.common.min.css'),
      ])
        .then(() => {
        loadScript(this, ScriptsPath + '/kendo-ui-license.js').then(() => {
          console.log('Files loaded');
          this.scriptsLoaded = true; 
        });
      })
        .catch(error => {
        console.error('Error loading KendoUI', error);
      });
```

## Related Articles

* [Troubleshooting an Invalid Kendo UI License]({% slug invalid-license %})
* [Generating and Using a License File]({% slug using-license-code %})
