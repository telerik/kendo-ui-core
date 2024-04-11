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

## 2023 Yearly Releases

The issues listed below are common when upgrading to {{ site.product }} versions released in 2023. Follow the link next to each problem to find the solution.

* A `License Activation failed` warning appears in the browser's console, as a banner, and as a watermark for the components—The solution is [to generate a license file]({% slug remove-license-warning-message %}) that will remove the warning from the application.
* The Kendo CDN links for the CSS and JS files are obsolete and you cannot access these files on `kendo.cdn.telerik.com`—These URLs have changed due to a shift in the naming convention and the solution is to [use the new URLs]({% slug cdn-naming-convention-change %}).
* The files for the Less themes are missing after upgrading to a new {{ site.product }} version&mdash;The {{ site.product }} components [no longer support Less themes]({% slug missing-less-files %}) and Telerik recommends migrating to Sass-based themes.
* Font icons are missing and their classes are not applied—Starting with version `R3 2023`, the {{ site.product }} UI components use SVG icons by default. Nevertheless, you can [revert to font icons]({% slug missing-font-icons %}).
* The previously included jQuery CDN from Kendo is now missing with new versions&mdash;Starting with version `R3 2023`, the {{ site.product }} library has [discontinued shipment of the jQuery library](https://docs.telerik.com/{{ site.platform }}/installation/system-requirements/jquery-support).

## See Also

* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)