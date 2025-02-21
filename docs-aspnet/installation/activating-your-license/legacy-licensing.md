---
title: (Legacy) Setting Up Your License Before 2025 Q1
page_title: Setting Up Your License Before 2025 Q1
description: Learn how to create and reference a Telerik script key file, which is required during application building and deployment for older versions of the product.
slug: installation_legacy_licensing_aspnetcore
tags: installation, license, key, old, legacy, script, key
position: 1
---

# (Legacy) Setting Up Your License Before 2025 Q1

{{ site.product }} versions earlier than 2025 Q1 (2025.1.211), require you to reference a script key after the Kendo UI script files. A missing script key will cause a banner and a watermark to appear in your application.

## Referencing the Script Key

Follow the steps in this article to download a script key and add it to your application.

1. Go to the [License Keys page](https://www.telerik.com/account/your-licenses/license-keys) in your Telerik account.
2. On the `Progress® Kendo UI® for jQuery` row, click the **View key** link in the **SCRIPT KEY** column.

![Get License Key](../images/get-license-key.png)

3.  Copy the JavaScript code snippet into a new file, for example, `telerik-license.js`.

{% if site.core %}
4. Add the script file to your project, for example, in the `wwwroot\js` folder.
5. Add the file as a script reference right after the `kendo.aspnetmvc.min.js` reference or the Kendo UI scripts you are using.

```html
<script src="https://kendo.cdn.telerik.com/2024.4.1112/kendo.all.min.js"></script>
<script src="https://kendo.cdn.telerik.com/2024.4.1112/kendo.aspnetmvc.min.js"></script>
<script src="~/js/telerik-license.js"></script>

<!-- Rest of the HTML -->
```
{% else %}
4. Add the script file to your project, for example, in the `Scripts` folder.
5. Add the file as a script reference right after the `kendo.aspnetmvc.min.js` reference or the Kendo UI scripts you are using.

```html
<script src="https://kendo.cdn.telerik.com/2024.4.1112/kendo.all.min.js"></script>
<script src="https://kendo.cdn.telerik.com/2024.4.1112/kendo.aspnetmvc.min.js"></script>
<script src="~/Scripts/telerik-license.js"></script>

<!-- Rest of the HTML -->
```
{% endif %}

As a result, the script key will be distributed along with the other scripts and this cannot be avoided. However, Progress recommends that you do not publicly announce it. 

Starting with the 2025 Q1 release, the script key has been replaced by a [License Key Mechanism]({%slug installation_license_key_aspnetcore%}). 

## See Also

* [Licensing after Q1 2025]({%slug installation_license_key_aspnetcore%})
* [Licensing FAQ]({%slug licensing-faq%})
* [Troubleshoot License Key Errors]({%slug troubleshooting-license-key-errors%})
