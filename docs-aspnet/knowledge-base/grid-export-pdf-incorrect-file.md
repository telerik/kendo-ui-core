---
title: Incorrect PDF File When Exporting Grid Data in Firefox
description: The PDF file contains only the headers when exporting the Grid to PDF in Firefox browser.
page_title: Incorrect PDF File When Exporting Grid Data in Firefox
slug: grid-export-pdf-incorrect-file
tags: grid, export, pdf, mozilla, firefox, empty, file, core, mvc, telerik
ticketid: 1657223
res_type: kb
components: ["general"]
component: grid
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2022.1.412</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>{{ site.product }} Grid</td>
		</tr>
	</tbody>
</table>

## Description

When exporting the Grid's data to PDF and using the Firefox browser, the file is being opened but the data is missing. The pages contain only the headers. Also, when opening the document with Adobe Acrobat, an error occurs. How to resolve the issue?

## Solution

Add the `WebComponentsIcons` font that is used for the Kendo UI font icons.

```
<script>
    kendo.pdf.defineFont({"WebComponentsIcons":"https://kendo.cdn.telerik.com/2022.1.412/styles/fonts/glyphs/WebComponentsIcons.ttf"});
</script>

 // Grid declaration

```

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [PDF Export (Overview)](https://docs.telerik.com/{{ site.platform }}/html-helpers/data-management/grid/export/pdf-export)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* {% if site.core %} 
[Server-Side TagHelper API Reference of the Grid for ASP.NET Core](https://docs.telerik.com/aspnet-core/api/taghelpers/grid) 
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)