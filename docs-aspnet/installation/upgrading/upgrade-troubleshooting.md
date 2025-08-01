---
title: Upgrade Troubleshooting
page_title: Upgrade Troubleshooting
description: "Learn how to troubleshoot your application if you encounter any issues when upgrading to new {{ site.product }} versions."
slug: upgrade_aspnetcore_troubleshooting
position: 3
---

# Upgrade Troubleshooting

The new and improved versions of the UI components sometimes bring changes that require you to take additional steps during or after the upgrade.

This document describes how to troubleshoot your application and what to be wary of when upgrading to new {{ site.product }} releases.

## 2025 Yearly Releases

The issues listed below are common when upgrading to {{ site.product }} versions released in 2025. Follow the link next to each problem to find the solution.

* You have a commercial license, but a license-related warning message appears in the browser's console, as a banner, and as a watermark for the components&mdash;The solution for {{ site.product }} version `2025.1.211` or newer is to [update your license key]({%slug installation_license_key_aspnetcore%}#license-key-updates). The solution for {{ site.product }} version `2024.4.1112` or older is [to generate, add, and reference a license file]({% slug remove-license-warning-message %}).
* Starting with version Q2 2025, the Trial packages are removed and they contain no `Trial` identifier in their name. If you attempt to upgrade a trial NuGet package to a Q2 2025 version, change the name of the referenced NuGet package name.  
* An attempt to use the obsolete Telerik NuGet v2 feed will now result in an error. The solution is to use the [Telerik NuGet v3 feed](https://www.telerik.com/{{ site.platform }}/documentation/installation/installation-options/nuget-install).

## 2023 Yearly Releases

The issues listed below are common when upgrading to {{ site.product }} versions released in 2023. Follow the link next to each problem to find the solution.

* A `License Activation failed` warning appears in the browser's console, as a banner, and as a watermark for the components—The solution is [to generate a license file]({% slug remove-license-warning-message %}) that will remove the warning from the application.
* The Kendo CDN links for the CSS and JS files are obsolete and you cannot access these files on `kendo.cdn.telerik.com`—These URLs have changed due to a shift in the naming convention and the solution is to [use the new URLs]({% slug cdn-naming-convention-change %}).
* The files for the Less themes are missing after upgrading to a new {{ site.product }} version&mdash;The {{ site.product }} components [no longer support Less themes]({% slug missing-less-files %}) and Telerik recommends migrating to Sass-based themes.
* Font icons are missing and their classes are not applied—Starting with version `R3 2023`, the {{ site.product }} UI components use SVG icons by default. Nevertheless, you can [revert to font icons]({% slug missing-font-icons %}).
* The previously included jQuery CDN from Kendo is now missing with new versions&mdash;Starting with version `R3 2023`, the {{ site.product }} library has [discontinued shipment of the jQuery library](https://docs.telerik.com/{{ site.platform }}/installation/system-requirements/jquery-support).
* The previously included JSZip CDN file is not available after upgrading to a new {{ site.product }} version&mdash;Starting with version `Q1 2024`, the JSZip library is no longer shipped with the Kendo UI Distributions. To still use the JSZip library, [replace the CDN reference](https://docs.telerik.com/{{ site.platform }}/installation/system-requirements/export-support#jszip-library) with official distribution channels such as `unpkg` or `Cloudflare`.

## See Also

* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)