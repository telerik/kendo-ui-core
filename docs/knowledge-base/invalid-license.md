---
title: Troubleshooting an Invalid Kendo UI License
page_title: Troubleshooting an Invalid Kendo UI License
description: Find out what can cause a banner and a watermark to appear on pages with Kendo UI for jQuery components, and what triggers the message "License activation failed" message in the browser's console.
slug: invalid-license
type: troubleshooting
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® for jQuery</td>
 </tr>
 <tr>
  <td>Kendo Version</td>
  <td>2022.2.510 (R2 2022) and later</td>
 </tr>
</table>

## Description

An invalid or missing Kendo UI for jQuery license triggers the following behavior on pages that contain any incorrectly licensed Kendo UI components:

* A watermark will appear over select components.

    * Example of a watermark in the `Light Theme`:
       ![Watermark over Grid with Light Theme](../knowledge-base/images/watermark-light-theme.png)     
    * Example of a watermark in the `Dark Theme`:
       ![Watermark over Grid with Dark Theme](../knowledge-base/images/watermark-dark-theme.png)

* A banner will appear on pages that use unlicensed Kendo UI for jQuery components.
    
    ![Banner](../knowledge-base/images/banner.png)

    * Clicking the ? button of the banner will take you to the Kendo UI for jQuery licensing documentation.
    * Clicking the X button of the banner will close the banner until the page is reloaded or a license is activated.

* A warning message similar to the one below will be logged in the browser's console.
    ![Browser console message: License activation failed for @progress/kendo-ui. No license found.](../knowledge-base/images/license-warning.png)

## Cause

An invalid license can be caused by any of the following:

* Using an invalid or expired commercial license.
* Using an expired trial license.
* Not adding your Kendo UI for jQuery [license file]({% slug using-license-code %}) into the application.

## Solution

* Verify that you use Kendo UI for jQuery versions that have been [released](https://www.telerik.com/support/whats-new/kendo-ui/release-history) during the validity period of your license.
* Generate and [add your personal license file]({% slug using-license-code %}) to the application.
* Make sure that the [script license is present in your project]({% slug using-license-code %}#2-add-the-license-file).
* Make sure that the [references to the license file are correct]({% slug using-license-code %}#3-add-a-reference-or-import-the-license-file).

If you still experience issues related to the license key, contact us through the [available support channels]({% slug welcometo_kendoui %}#support-options).

## See Also

* [Generating and Using a License File]({% slug using-license-code %})
* [License File Frequently Asked Questions]({% slug license-code-faq %})
