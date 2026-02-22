---
title: Overview of the Licensing Methods in Kendo UI for jQuery
page_title: Overview of the Licensing Methods in Kendo UI for jQuery - Download and Installation
description: "Get started with Kendo UI for jQuery and learn about the licensing methods and how to acquire the library from the NPM distribution channel and register the script license file."
components: ["general"]
slug: licensing-overview
previous_url: /intro/installation/using-license-code
published: True
position: 1
---

# Licensing Overview

Kendo UI for jQuery requires activation through a license key for both trial and commercial licenses. Activating the license in your project is a straightforward process that ensures the uninterrupted operation of the components and full access to their features. This guide walks you through the steps to properly integrate and activate your license key.

You can activate the Kendo UI for jQuery license in either of the following ways:

* [Using the script license key](#using-the-script-license-key).
* [Setting up your license key with NPM](#setting-up-your-license-key-with-npm).

## Using the Script License Key

With this method, you include your license key as a JavaScript file and reference it directly in your project.

This approach is applicable when:
 
* Using Kendo UI for jQuery versions prior to 2025.1.211.
* Integrating Kendo UI through a [CDN (Content Delivery Network)]({% slug kendoui_cdn_services_installation %}).
* Adding the Kendo UI script files directly to your project.
* Using [custom script bundles]({% slug include_only_what_you_need_kendoui_scripts %}).

 To activate the Kendo UI for jQuery components using this method, follow the steps in the [Adding Your Script License Key]({% slug using-license-code %}) article.

## Setting Up Your License Key With NPM

When installing Kendo UI for jQuery through npm, the `@progress/kendo-licensing` package is automatically retrieved from the npm registry and added to your project using standard package managers such as npm or yarn. The role of the `@progress/kendo-licensing` package is to locate you license key file (`telerik-license.txt`) and to execute the license activation commands during the setup process.

This licensing approach is well‑suited for modern development workflows, particularly when working with module bundlers (e.g., Webpack) or building applications with frameworks such as Angular, React, or Vue.js.

To activate the Kendo UI for jQuery components, [download your assigned license key and install it in your project]({% slug using-license-file %}).

## See Also

* [License Activation Errors and Warnings]({% slug activation-error-warnings %})
* [Adding the License Key to CI Services]({% slug license-key-to-ci-services %})
* [Frequently Asked Questions about Your Kendo UI for jQuery License Key]({% slug license-code-faq %})
* [Adding Your Script License Key]({% slug using-license-code %})
* [Adding a License Key File (NPM)]({% slug using-license-file %})
* [Handling License Key File Name and Environment Variable Name Changes in the 2025 Q1 Release]({% slug handling-license-file-name-changes %})
