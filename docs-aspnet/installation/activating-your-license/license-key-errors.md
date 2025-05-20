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

### No Telerik or Kendo UI product references detected in project (TKL001)

This error can occur when a project references `Telerik.Licensing`, but not any other Telerik packages. In this case, remove the `Telerik.Licensing` package from the project. If your scenario is different, [contact Technical Support](https://www.telerik.com/account/support-center).

### No Telerik and Kendo UI License file found (TKL002)

The error means that the license key is missing or not set up correctly. For example, the environment variable is not set, or [the license file may be located in the wrong place]({%slug installation_license_key_aspnetcore%}#manual-installation).

[Install a license key]({%slug installation_license_key_aspnetcore%}) again. Also, check how to [set up a license key in CI/CD environments]({%slug deployment_license_key_aspnetcore%}).

### Corrupted Telerik and Kendo UI License Key content (TKL003)

The license key is detected, but its value is invalid and cannot be decrypted. For example, if you have set a `TELERIK_LICENSE` environment variable through the Windows operating system's UI, then it may be truncated. In such cases, remove the environment variable and use a license key file instead.

Follow the [automatic]({%slug installation_license_key_aspnetcore%}#automatic-installation) or [manual]({%slug installation_license_key_aspnetcore%}#manual-installation) installation steps from scratch. Also, check how to [set up a license key in CI/CD environments]({%slug deployment_license_key_aspnetcore%}).

### Unable to locate licenses for all products (TKL004)

Your license is not valid for the detected product(s), because it doesn't include them.

{% if site.core %}
[Review the purchase options for {{ site.product }}](https://www.telerik.com/purchase/aspnet-core-ui). If you have already purchased the required license, then [update your license key]({%slug installation_license_key_aspnetcore%}#license-key-updates).
{% else %}
[Review the purchase options for {{ site.product }}](https://www.telerik.com/purchase/aspnet-mvc). If you have already purchased the required license, then [update your license key]({%slug installation_license_key_aspnetcore%}#license-key-updates).
{% endif %}

### {{ site.product }} is not listed in your current license file (TKL101)

Your license key does not include {{ site.product }}.

{% if site.core %}
[Review the purchase options for {{ site.product }}](https://www.telerik.com/purchase/aspnet-core-ui). If you have already purchased the required license, then [update your license key]({%slug installation_license_key_aspnetcore%}#license-key-updates).
{% else %}
[Review the purchase options for {{ site.product }}](https://www.telerik.com/purchase/aspnet-mvc). If you have already purchased the required license, then [update your license key]({%slug installation_license_key_aspnetcore%}#license-key-updates).
{% endif %}

### Your current license has expired (TKL102)

This error applies to perpetual licenses. It means that you are using a product version released outside the validity period of your license. To remove the error message, do either of the following:

* [Renew your license](https://www.telerik.com/account/your-licenses) and then [update your license key]({%slug installation_license_key_aspnetcore%}#license-key-updates).
* Use a {{ site.product }} version that was released within the subscription period of your perpetual license.

### Your subscription has expired (TKL103, TKL104)

This error applies to subscription licenses. [Renew your subscription](https://www.telerik.com/account/your-licenses) and then [update your license key]({%slug installation_license_key_aspnetcore%}#license-key-updates).

### Your trial expired (TKL105)

{% if site.core %}
[Purchase a commercial license to continue using {{ site.product }}](https://www.telerik.com/purchase/aspnet-core-ui).
{% else %}
[Purchase a commercial license to continue using {{ site.product }}](https://www.telerik.com/purchase/aspnet-mvc).
{% endif %}

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


## See Also

* [Download and Install License Key]({%slug installation_license_key_aspnetcore%})
* [Licensing FAQ]({%slug licensing-faq%})
* [Use License Keys in CI/CD]({%slug deployment_license_key_aspnetcore%})
