---
title: Missing Less files
description: "Learn why the LESS Distribution files have become obsolete when upgrading to new {{ site.product }} versions."
page_title: Missing Less files
slug: missing-less-files
tags: less, missing, files, structure, upgrade, troubleshoot, application
res_type: kb
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

I am upgrading my project to a {{ site.product }} version later than `R1 2023 SP1`. Where can I find the `kendo.common.min.css` file and the `Images` folder of the distributions?


## Solution

As of the {{ site.product }} `R1 2023 SP1` release, the {{ site.product }} components no longer support Less themes and they will no longer be shipped with the component distribution packages.

The `kendo.common.min.css` file and `Images` folder which were a part of the Less themes' distribution have also been deprecated. 

Telerik recommends using Sass-based themes going forward as suggested in the [Less to Sass Theme Migration](https://docs.telerik.com/{{ site.platform }}/styles-and-layout/less-themes/less-themes-migration#less-to-sass-theme-migration) article.

This article also includes the mapping between the dropped Less thems and their respective Sass counterparts.

## See Also

* [Upgrade Troubleshooting]({% slug upgrade_aspnetcore_troubleshooting %})
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)