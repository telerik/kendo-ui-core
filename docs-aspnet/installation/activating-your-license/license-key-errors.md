---
title: License Key Errors
page_title: Telerik License Key Errors
description: Troubleshooting Telerik license key errors when using {{ site.product }}.
slug: troubleshooting-license-key-errors
tags: license, key, error, troubleshooting
position: 2
---

# License Key Errors

This page provides solutions for license key errors that you may encounter while building {{ site.product_short }} apps.

@[template](/_contentTemplates/licensing-templates.md#ci-cd-support)

## Basics

A Telerik license key error may occur in the following scenarios:

* Missing license key.
* Using an expired subscription license after the end of the subscription term.
* Using a perpetual license with a product version that was released outside the validity period of your license.
* Using an expired trial license.
* Using an outdated license key after making renewals or purchases.
* Using a license key that doesn't include {{ site.product }}.
* Using conflicting license keys in the same environment. For example, using one global license key and one in the app. Or, using a license key file together with an environment variable in CI/CD environment.
* Mismatching versions of the `Kendo.Mvc.dll` and the Kendo UI JavaScript files referenced in the project.

A missing, expired, or invalid license will result in:

* A watermark appearing on application startup.
* A modal dialog appearing on application startup. Clicking the `OK` button of the dialog closes the dialog and removes the banner until the next application startup.
* A warning message in the build log

## Error Messages

* [No license key is detected](#no-license-key-is-detected)
* [Invalid license key](#invalid-license-key)
* [License key is installed but the banner and watermark do not disappear](#license-key-is-installed-but-the-banner-and-watermark-do-not-disappear)
* [Your subscription license has expired](#your-subscription-license-has-expired)
* [Your perpetual license is invalid](#your-perpetual-license-is-invalid)
* [Your trial license has expired](#your-trial-license-has-expired)
* [Your license is not valid for the detected product(s)](#your-license-is-not-valid-for-the-detected-products)
{% if site.mvc %}
* [Could not load file or assembly 'Telerik.Licensing.Runtime'](#could-not-load-file-or-assembly-teleriklicensingruntime)
{% endif %}

### No license key is detected

[Install a license key file]({%slug installation_license_key_aspnetcore%}). If you already downloaded it, make sure it's [saved at the right place]({%slug installation_license_key_aspnetcore%}#manual-installation).

### Invalid license key

Follow the [automatic]({%slug installation_license_key_aspnetcore%}#automatic-installation) or [manual]({%slug installation_license_key_aspnetcore%}#manual-installation) installation steps from scratch.

### License key is installed but the banner and watermark do not disappear

This is a known issue in version {{ site.product }} 2025.1.211 in scenarios related to deferring the initialization of the components, and in editing scenarios. 

The following workaround can be applied to remove the banner and watermark.

1. Go to the [License Keys page](https://www.telerik.com/account/your-licenses/license-keys) in your Telerik account.
2. On the `Progress® Kendo UI® for jQuery` row, click the **View key** link in the **SCRIPT KEY** column.

![Get License Key](../images/get-license-key.png)

3. Copy the JavaScript code snippet into a new file, for example, `telerik-license.js`.
4. Save the file using ASCII or UTF-8 encoding.

{% if site.core %}
5. Add the script file to your project, for example, in the `wwwroot\js` folder.
6. Add the file as a script reference right after the `kendo.aspnetmvc.min.js` reference or the Kendo UI scripts you are using.

```html
<script src="https://kendo.cdn.telerik.com/2024.4.1112/kendo.all.min.js"></script>
<script src="https://kendo.cdn.telerik.com/2024.4.1112/kendo.aspnetmvc.min.js"></script>
<script src="~/js/telerik-license.js"></script>

<!-- Rest of the HTML -->
```
{% else %}
5. Add the script file to your project, for example, in the `Scripts` folder.
6. Add the file as a script reference right after the `kendo.aspnetmvc.min.js` reference or the Kendo UI scripts you are using.

```html
<script src="https://kendo.cdn.telerik.com/2024.4.1112/kendo.all.min.js"></script>
<script src="https://kendo.cdn.telerik.com/2024.4.1112/kendo.aspnetmvc.min.js"></script>
<script src="~/Scripts/telerik-license.js"></script>

<!-- Rest of the HTML -->
```
{% endif %}

This issue can also be caused by referencing different versions of the `Kendo.Mvc.dll` and the required Kendo UI JavaScript files. Ensure that the `Kendo.Mvc.dll` and the required client-side resources referenced in the project have an identical version, for example, 2025.1.211.

### Your subscription license has expired

<a href="https://www.telerik.com/account/your-licenses" target="_blank">Renew your subscribtion</a>. Then, [update your license key]({%slug installation_license_key_aspnetcore%}#license-key-updates).

### Your perpetual license is invalid

You are using a product version released outside the validity period of your perpetual license. To remove the error message, do either of the following:

* <a href="https://www.telerik.com/account/your-licenses" target="_blank">Renew your subscribtion</a>. Then, [update your license key]({%slug installation_license_key_aspnetcore%}#license-key-updates).
* Downgrade your app to a {{ site.product }} version that was released within the subscription period of your perpetual license.

### Your trial license has expired

{% if site.core %}
<a href="https://www.telerik.com/purchase/aspnet-core-ui" target="_blank">Purchase a commercial license to continue using {{ site.product }}</a>.
{% else %}
<a href="https://www.telerik.com/purchase/aspnet-mvc" target="_blank">Purchase a commercial license to continue using {{ site.product }}</a>.
{% endif %}

### Your license is not valid for the detected product(s)

{% if site.core %}
<a href="https://www.telerik.com/purchase/aspnet-core-ui" target="_blank">Review the purchase options for {{ site.product }}</a>. Then, [update your license key]({%slug installation_license_key_aspnetcore%}#license-key-updates).
{% else %}
<a href="https://www.telerik.com/purchase/aspnet-mvc" target="_blank">Review the purchase options for {{ site.product }}</a>. Then, [update your license key]({%slug installation_license_key_aspnetcore%}#license-key-updates).
{% endif %}

{% if site.mvc %}
### Could not load file or assembly 'Telerik.Licensing.Runtime'

If you experience the error *"The located assembly's manifest definition does not match the assembly reference."* use the following assembly redirect:

```
    <dependentAssembly>
        <assemblyIdentity name="Telerik.Licensing.Runtime" publicKeyToken="98bb5b04e55c09ef" culture="neutral" />
        <bindingRedirect oldVersion="0.0.0.0-<latest version of Telerik.Licensing package>" newVersion="<latest version of Telerik.Licensing package>" />
    </dependentAssembly>
```
{% endif %}

### Your Deployed Application Shows a Banner and a Watermark

Ensure that you have set up an environment variable by following the steps from the [Use License Keys in CI/CD]({%slug deployment_license_key_aspnetcore%}) article.

Alternatively, if you have included the telerik-license.txt file into the project and the project is under source control, add the license file under source control as well.

## Error Message Codes

When using {{ site.product }} in a project with an expired or missing license, the `Telerik.Licensing` build task will indicate the following errors or conditions:

| Error or Condition                                                       | Message Code       | Solution                                                                                                                                                            |
| ------------------------------------------------------------------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `No Telerik and Kendo UI License file found`                             | `TKL002`           | [Install a license key]({%slug installation_license_key_aspnetcore%}) to activate the UI controls and remove the error message.                                                   |
| `Corrupted Telerik and Kendo UI License Key content`                     | `TKL003`           | [Download a new license key]({%slug installation_license_key_aspnetcore%}) and install it to activate the UI components and remove the error message. |
| `Unable to locate licenses for all products`                             | `TKL004`           | Your license is not valid for all Telerik and Kendo products added to your project. If you have already purchased the required license, then [Update your license key]({%slug installation_license_key_aspnetcore%}#license-key-updates).                      |
| `{{ site.product }} is not listed in your current license file` | `TKL101`           | Review the purchase options for the listed products. Alternatively, remove the references to the listed packages from `package.json`.                               |
| `Your current license has expired`                                       | `TKL002` | You are using a product version released outside the validity period of your perpetual license. To remove the error message, do either of the following:            |
|                                                                          |                    | - Renew your subscription and [Download a new license key]({%slug installation_license_key_aspnetcore%})                                                                        |
|                                                                          |                    | - Downgrade to a product version included in your perpetual license as indicated in the message.                                                                    |
| `Your subscription has expired`                                          | `TKL103`, `TKL104` | Renew your subscription and [Download a new license key]({%slug installation_license_key_aspnetcore%})                                                                            |
| `Your trial expired`                                                     | `TKL105`           | Purchase a commercial license to continue using the product.                                                                     |
| `No Telerik or Kendo UI product references detected in project`       | `TKL001`           | - If you use Telerik products and see this message, update the `Telerik.Licensing` package to version 1.4.9 or later.                                                 |
|                                                                          |                    | - If you do not use Telerik products, remove the `Telerik.Licensing` NuGet reference from your project.                                                               |

## See Also

* [Download and Install License Key]({%slug installation_license_key_aspnetcore%})
* [Licensing FAQ]({%slug licensing-faq%})
* [Use License Keys in CI/CD]({%slug deployment_license_key_aspnetcore%})
