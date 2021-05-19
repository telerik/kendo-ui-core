---
title: Drag and Drop Nodes from TreeView to ListBox
description: An example on how to drag a node from the Kendo UI TreeView and drop it in the Kendo UI ListBox.
type: how-to
page_title: Drag Nodes from TreeView and Drop Them in ListBox | Kendo UI TreeView and ListBox for jQuery
slug: treeview-listbox-drag-and-drop
tags: treeview, listbox
ticketid: 1163151  
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI TreeView</td>
  <td>Progress Kendo UI ListBox</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I drag a node from the TreeView and drop it in the ListBox?

## Solution

In the `drop` event handler of the TreeView, get the dropped node and add it to the ListBox.

```dojo
<div id="treeview-left"></div>
<select id="optional" ></select>

<script>
	$("#treeview-left").kendoTreeView({
	dragAndDrop: true,
	drop: onDrop,
	dataSource: [
		{ id: 1, text: "Furniture", expanded: true, items: [
		{ id: 2, text: "Tables & Chairs" },
		{ id: 3, text: "Sofas" },
		{ id: 4, text: "Occasional Furniture" }
		] },
		{ id: 5, text: "Decor", items: [
		{ id: 6, text: "Bed Linen" },
		{ id: 7, text: "Curtains & Blinds" },
		{ id: 8, text: "Carpets" }
		] }
	]
	});

	$("#optional").kendoListBox({
	dataTextField: "text",
	dataValueField: "id",
	dataSource: [{ id: 8, text: "Other products" }]
	});

	function onDrop(e){          
	var item = e.sender.dataItem(e.sourceNode);         
	var listbox = $('#optional').data('kendoListBox');         
	listbox.add(item)
	if(item.hasChildren){
		for(var p=0; p <item.items.length;p++){
			listbox.add(item.items[p])
		}
	}
	}
</script>
```
