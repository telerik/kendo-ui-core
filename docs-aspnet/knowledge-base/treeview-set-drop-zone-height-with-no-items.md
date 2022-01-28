---
title: Control the Height of an Empty Kendo UI TreeView's Drop Zone
description: Increase the size of a Kendo UI TreeView's drop zone to create an accessible location for dropped items.
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
			<td>Progress® Kendo UI® TreeView for ASP.NET MVC</td>
		</tr>
	</tbody>
</table>


## Description
How can I increase the height of a Kendo UI TreeView's drop zone?  Additionally, is there a way to set a border?

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
