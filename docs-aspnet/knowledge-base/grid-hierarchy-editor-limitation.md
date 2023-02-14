---
title: Use Editor Component as an Editor Template for Child Grid in Hierarchy
description: How can I use a Nested Component as EditorTemplate in child Grid?
type: how-to
page_title: Implementing Editor Component as EditorTemplate for Child Grid
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
			<td>Grid for ASP.NET MVC</td>
		</tr>
	</tbody>
</table>

## Description

How can I use the a Nested Component as EditorTemplate in Child Grid?

## Solution

When using a Nested Component internally, the special symbols should be manually escaped. In order to use a Nested Components as an EditorTemplate for a Child Grid in Hierarchy, implement the EditorTemplate as follows:


```EditorTemplate.cshtml
@model TelerikMvcApp90.Models.Course

@Html.Kendo().EditorFor(model => model.Description).Deferred()

@Html.Raw(Html.Kendo().DeferredScriptsFor("Description").ToHtmlString().Replace("\\\"{0}\\\"", "\\\\\"{0}\\\\\""))

```

## See Also
 * [Telerik UI for ASP.NET MVC Grid Hierarchy](https://demos.telerik.com/aspnet-mvc/grid/hierarchy)
 * [Telerik UI for ASP.NET MVC Grid Overview](https://demos.telerik.com/aspnet-mvc/grid)
