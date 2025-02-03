---
title: License Key Errors
page_title: Telerik License Key Errors
description: Troubleshooting Telerik license key errors when using {{ site.product }}.
slug: troubleshooting-license-key-errors
tags: license, key, error, troubleshooting
position: 1
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

Refer to the error messages below for specific tips.

## Error Messages

* [No license key is detected](#no-license-key-is-detected)
* [Invalid license key](#invalid-license-key)
* [Your subscription license has expired](#your-subscription-license-has-expired)
* [Your perpetual license is invalid](#your-perpetual-license-is-invalid)
* [Your trial license has expired](#your-trial-license-has-expired)
* [Your license is not valid for the detected product(s)](#your-license-is-not-valid-for-the-detected-products)

### No license key is detected

[Install a license key file]({%slug installation_license_key_aspnetcore%}). If you already downloaded it, make sure it's [saved at the right place]({%slug installation_license_key_aspnetcore%}#manual-installation).

### Invalid license key

Follow the [automatic]({%slug installation_license_key_aspnetcore%}#automatic-installation) or [manual]({%slug installation_license_key_aspnetcore%}#manual-installation) installation steps from scratch.

### Your subscription license has expired

<a href="https://www.telerik.com/account/your-licenses" target="_blank">Renew your subscribtion</a>. Then, [update your license key]({%slug installation_license_key_aspnetcore%}#license-key-updates).

### Your perpetual license is invalid

You are using a product version released outside the validity period of your perpetual license. To remove the error message, do either of the following:

* <a href="https://www.telerik.com/account/your-licenses" target="_blank">Renew your subscribtion</a>. Then, [update your license key](slug://installation-license-key#license-key-updates).
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

## See Also

* [Download and Install License Key]({%slug installation_license_key_aspnetcore%})
* [Licensing FAQ]({%slug licensing-faq%})
* [Use License Keys in CI/CD]({%slug deployment_license_key_aspnetcore%})
