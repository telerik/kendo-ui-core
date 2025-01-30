---
title: Handling License Key File Name and Environment Variable Name Changes in the 2025 Q1 Release
description: Learn how to handle license key file and environment variable name changes introduced with the 2025 Q1 release of Kendo UI for jQuery.
page_title: Handling License Key File Name and Environment Variable Name Changes in the 2025 Q1 Release
slug: handling-license-file-name-changes
tags: license,key,file,name,2025,change
published: True
res_type: kb
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Progress® Kendo UI® for jQuery</td>
</tr>
<tr>
<td>Version</td>
<td>2025.1.212</td>
</tr>
</tbody>
</table>

## Description

Starting with the 2025 Q1 release, the following changes will apply to the license key file name and the environment variable used to store the license key:

* The name of the downloaded file with the license key changes from `kendo-ui-license.txt` to `telerik-license.txt`. This file is now used for the licensing of the entire Telerik and Kendo products portfolio.

* The name of the environment variable used to store the license key changes from `KENDO_UI_LICENSE` to `TELERIK_LICENSE`.

These are not breaking changes:

* Applications and CI/CD tools using the existing `kendo-ui-license.txt` file and `KENDO_UI_LICENSE` environment variable will remain fully functional.
* If a system or environment has both the new and the old license keys file and environment variables, the licensing mechanism will use the new ones.

## Solution

Although the introduced changes are not breaking changes, the Kendo team recommends applying the following changes to avoid confusion caused by the different naming:

1. Update the `@progress/kendo-licensing` package to the latest version.
2. Remove the legacy license key file and environment variable (if using environment variables to store the license key):
     * `kendo-ui-license.txt`
     * `KENDO_UI_LICENSE`
3. [Download]({% slug using-license-code %}) a new license key file called `telerik-license.txt`.
4. If using [environment variables]({% slug using-license-code %}) or secrets:
     <ol type="a">
       <li>Create a new environment variable called <code>TELERIK_LICENSE</code>.</li>
       <li>Add the newly downloaded license key as a variable value.</li>
     </ol>

Alternatively, only if you have an existing application or CI/CD environment where you cannot update the `@progress/kendo-licensing` package to the latest version: rename the downloaded `telerik-license.txt` file to kendo-ui-license.txt or copy its contents to the `KENDO_UI_LICENSE` environment variable.

## See Also

* [Setting Up Your License Key]({% slug using-license-code %})
* [License Activation Errors and Warnings]({% slug activation-error-warnings %})
* [Adding the License Key to CI Services]({% slug license-key-to-ci-services %})
* [Frequently Asked Questions about Your Kendo UI for jQuery License Key]({% slug license-code-faq %})