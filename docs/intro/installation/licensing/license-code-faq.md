---
title: Script License File FAQ
page_title: Script License File FAQ - Download and Installation
description: "Find answers to the most common questions related to the script license file that is required when using Kendo UI for jQuery scripts from CDN and NPM distributions."
components: ["general"]
slug: license-code-faq
published: True
previous_url: /intro/installation/license-code-faq
position: 6
---

# Script License File: Frequently Asked Questions

This article lists the answers to the most frequently asked questions (FAQs) about working with the Kendo UI for jQuery license key.

## Does the license key expire?

Yes, the license key expires at the end of your support subscription:
* For trial users, this is at the end of your 30-day trial.
* For licensed developers, this is when your subscription expires.

You will need to obtain and install a new license key after starting a trial, renewing a license, or upgrading a license.

>note An expired perpetual license key is valid for all Kendo UI for jQuery versions which are published before its expiration date.

## Will the product function with an expired license key?

This depends on your license:

* *Perpetual licenses* will continue to function normally with an expired license key. However, the following will happen if you update or install a package version that is released after the expiration date of the license:
     * A watermark will appear over selected Kendo UI for jQuery components.
     * A licensing banner will pop over a page that uses unlicensed Kendo UI for jQuery components.
     * A warning message will appear when calling the `kendo-ui-license activate` command.
     * A warning message will appear in the browser console.
* *Subscription licenses* will continue to function normally for deployed applications. However, the following will happen when you try to rebuild the application:
     * A warning message will appear when calling the `kendo-ui-license activate` command.
* *Trial licenses* will continue to function normally with an expired license key. The following will happen if you try to build or run the application:
     * A watermark appears on application startup.
     * A modal dialog appears on application startup.
     * A warning message will appear when calling the kendo-ui-license activate command.
     * A warning message similar to the following is logged in the build log.

See the [Invalid License section]({% slug activation-error-warnings %}#invalid-license) for more information.

## I updated the version of the Kendo UI for jQuery packages in my project and the invalid license errors have appeared. What is the cause for this behavior?

The most likely cause is that the newly installed Kendo UI for jQuery Components were released after the expiration date of your current license. To fix this issue:

1. [Download a new license key]({% slug hosting_kendoui %}#downloading-the-license-key).
2. [Activate the new license key]({% slug hosting_kendoui %}#installing-or-updating-the-license-key) in your project.

## Can I use the same license key in multiple builds?

You can use your personal license key in multiple pipelines, builds, and environments.
However, each individual developer must use a unique personal license key.

## Do I need an Internet connection to activate the license?

No, the license activation and validation are performed entirely offline.

## Do I have to add the license key to source control?

No, you do not have to add the `telerik-license.txt` license key file or its contents to source control.

Build servers have to use the `TELERIK_LICENSE` environment variable as previously described.

>note Do not store the license key in plaintext, for example, in a GitHub Actions Workflow definition.

## Is it possible to activate the license without executing commands?

Yes, if present, the license will be activated automatically during package installation. This applies to both the license key files and the environment variable. A diagnostic message will be printed in the npm install log.

Using the `kendo-ui-license activate` command is optional, but recommended in builds as it will return an error if the activation fails.

## What happens if both the environment variable and the license key file are present?

If both the `TELERIK_LICENSE` environment variable and the `telerik-license.txt` file are present, then the environment variable will be used.

To enforce the use of the license key file, unset the environment variable.

## My team has more than one licensed developer. Which key do we have to use?

To activate Kendo UI for jQuery you can use any of the keys associated with your subscriptions.

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

## Are earlier versions of Kendo UI for jQuery affected?

No, if you use CDN and Kendo UI for jQuery versions released prior to R3 2022 or NPM versions released prior to R2 2022, you don’t need to set up the licensing.

>caution Do not include a license file when using Kendo UI versions prior to R3 2022. Including a license file with those versions will cause a `KendoLicensing is not defined` error.

## Will the product function without a license file?

Yes, the product will continue to function without a license file. However, a warning message will appear in the browser console if a valid license file is not present. In addition, any pages that contain unlicensed Kendo UI components will receive a [banner]({% slug activation-error-warnings %}#invalid-license) and select UI components will have a [watermark]({% slug activation-error-warnings %}#invalid-license).

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

## See Also

* [Licensing Overview]({% slug licensing-overview %})
* [License Activation Errors and Warnings]({% slug activation-error-warnings %})
* [Adding the License Key to CI Services]({% slug license-key-to-ci-services %})
* [Handling License Key File Name and Environment Variable Name Changes in the 2025 Q1 Release]({% slug handling-license-file-name-changes %})
