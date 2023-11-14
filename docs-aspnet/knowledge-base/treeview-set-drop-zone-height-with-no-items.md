---
title: Control the Height of an Empty Drop Zone in a TreeView
description: Increase the size of a {{ site.product }} TreeView's drop zone to create an accessible location for dropped items.
type: how-to
page_title: Increase the Drop Zone of a TreeView with No Items
slug: treeview-set-drop-zone-height-with-no-items
position: 
tags: treeview, empty, drop zone
ticketid: 1448470
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2020.1.114</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>{{ site.product }} TreeView</td>
		</tr>
	</tbody>
</table>


## Description

How can I increase the height of a {{ site.product }} TreeView's drop zone?  Additionally, is there a way to set a border?

## Solution
In order to modify an empty Kendo UI TreeView's drop zone to make it more accessible for newly dropped items, set a minimum height to a certain value with the HTMLAttributes. Additionally, you can set a border to your preferences in the same settings:

```Razor
    @(Html.Kendo().TreeView()
        .Name("treeview")
        .DragAndDrop(true)
        .HtmlAttributes( new { style = "border: 5px solid red; min-height: 200px;" })
        //...
    )
```

## More {{ site.framework }} TreeView Resources

* [{{ site.framework }} TreeView Documentation]({%slug htmlhelpers_treeview_aspnetcore%})

* [{{ site.framework }} TreeView Demos](https://demos.telerik.com/{{ site.platform }}/treeview)

{% if site.core %}
* [{{ site.framework }} TreeView Product Page](https://www.telerik.com/aspnet-core-ui/treeview)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} TreeView Product Page](https://www.telerik.com/aspnet-mvc/treeview)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the TreeView for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview)
* [Server-Side API Reference of the TreeView for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/treeview)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
