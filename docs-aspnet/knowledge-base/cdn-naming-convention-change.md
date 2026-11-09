---
title: CDN Naming Convention Change
description: "Learn about the new CDN URLs naming convention changes for the required JavaScript and CSS resources in the {{ site.product }}."
page_title: CDN Naming Convention Change
slug: cdn-naming-convention-change
tags: cdn, url, change, upgrade, troubleshoot, application, naming, convention
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }}</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>2023.1.314</td>
 </tr>
</table>

## Description


I was using the following Kendo JS and CSS links before upgrading {{ site.product }}:

```
    https://cdn.jsdelivr.net/npm/@progress/kendo-ui@2022.2.802/css/web/kendo.bootstrap-main.min.css
```

However, as of the latest `R1 2023 SP1` release, these resources seem to be obsolete. How can I reference the themes from jsDelivr?

## Solution

As of version `R1 2023 SP1`, the themes are available as npm packages through jsDelivr. A theme URL identifies:

* Theme version&mdash;for example, `7.0.2`.
* Theme name&mdash;for example, `default`, `bootstrap`, `material`, and so on.
* File name&mdash;is the name of the theme.

The following example shows a jsDelivr URL for the Bootstrap theme:

```
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@progress/kendo-theme-bootstrap@7.0.2/dist/all.css" />
```

## See Also

* [Upgrade Troubleshooting]({% slug upgrade_aspnetcore_troubleshooting %})
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)