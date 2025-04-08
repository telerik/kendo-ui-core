---
title: Using the Editor Component as an Editor Template for Child Grid in Hierarchy
description: How can I use a Nested Component as an Editor Template in a child Grid when working with the {{ site.product }} Grid?
type: how-to
page_title: Implementing Editor Component as Editor Template for a Child Grid
slug: grid-hierarchy-editor-limitation
tags: grid, editor, template, child, hierarchy
res_type: kb
component: grid
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2022.3.1109</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>{{ site.product }} Grid</td>
		</tr>
	</tbody>
</table>

## Description

How can I use a Nested Component as an Editor Template in a Child Grid?

## Solution

When using a Nested Component internally, the special symbols should be manually escaped. To use a Nested Components as an Editor Template for a Child Grid in hierarchy, implement the Editor Template as follows:


```Razor EditorTemplate.cshtml
@model TelerikMvcApp90.Models.Course

@Html.Kendo().EditorFor(model => model.Description).Deferred()

@Html.Raw(Html.Kendo().DeferredScriptsFor("Description").ToHtmlString().Replace("\\\"{0}\\\"", "\\\\\"{0}\\\\\""))

```

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

* [{{ site.framework }} Hierarchy Grid Demo](https://demos.telerik.com/{{ site.platform }}/grid/hierarchy)

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

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
