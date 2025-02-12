---
title: Overview of the Licensing Methods in Kendo UI for jQuery
page_title: Overview of the Licensing Methods in Kendo UI for jQuery - Download and Installation
description: "Get started with Kendo UI for jQuery and learn about the licensing methods and how to acquire the library from the NPM distribution channel and register the script license file."
slug: licensing-overview
previous_url: /intro/installation/using-license-code
published: True
position: 1
---

# Licensing Overview

Activating your Kendo UI for jQuery license in your project is a straightforward process that ensures the uninterrupted operation of the components and full access to their features. This guide walks you through the steps to properly integrate and activate your license key.

You can activate the Kendo UI for jQuery license in either of the following ways:

1. [Using the script license key](#using-the-script-license-key).

2. [Setting up your license key with NPM](#setting-up-your-license-key-with-npm).

## Using the Script License Key

 In this method, you include a JavaScript license file provided by Kendo UI directly in your project. This script contains the license key and needs to be referenced in your HTML or JavaScript file.

 This approach is typically used when you’re integrating Kendo UI through a [CDN (Content Delivery Network)]({% slug kendoui_cdn_services_installation %}) or if you are using the Kendo UI version that is directly downloaded as a ZIP file and added to your project.

 To activate the Kendo UI for jQuery components, follow the steps in the [Adding Your Script License Key]({% slug using-license-code %}) article.

## Setting Up Your License Key With NPM

When using NPM, the Kendo UI package is installed via the npm registry and integrated into your project through package management tools like `npm` or `yarn`. The license key is typically set within the `package.json` or a separate configuration file.

This approach is ideal for modern web development workflows, especially when working with bundlers like Webpack, and projects built using frameworks like Angular, React, or Vue.js.

To activate the Kendo UI for jQuery components, [download your assigned license key and install it in your project]({% slug using-license-file %}).

## See Also

* [License Activation Errors and Warnings]({% slug activation-error-warnings %})
* [Adding the License Key to CI Services]({% slug license-key-to-ci-services %})
* [Frequently Asked Questions about Your Kendo UI for jQuery License Key]({% slug license-code-faq %})
* [Adding Your Script License Key]({% slug using-license-code %})
* [Adding a License Key File (NPM)]({% slug using-license-file %})
* [Handling License Key File Name and Environment Variable Name Changes in the 2025 Q1 Release]({% slug handling-license-file-name-changes %})