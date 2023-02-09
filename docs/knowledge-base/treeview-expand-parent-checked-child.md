---
title: How To Expand Parent Node If Child Is Checked
description: Learn how to expand a parent node if at least one child node is checked.
type: how-to
page_title: Expand Parent Node If Child Node Is Checked - Kendo UI TreeView for jQuery
slug: treeview-expand-parent-checked-child
tags: menu, iframe
ticketid: 1524346
res_type: kb
component: treeview, parent, node, check
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® TreeView for jQuery</td>
 </tr> 
</table>

## Description

When the data in the TreeView is loaded I would like to expand parent node automatically only if at least one child is checked.

## Solution
1. You could subscribe to the [dataBound event](/api/javascript/ui/treeview/events/databound) of the TreeView and find all checked items. 
1. Use the expand method to [expand](/api/javascript/ui/treeview/methods/expand) the TreeView to the checked node. 

```dojo
    <div id="treeview-kendo"></div>
    <script>
		$("#treeview-kendo").kendoTreeView({            
			dataSource: [{
			id: 1, text: "My Documents", expanded: true, spriteCssClass: "rootfolder", items: [
				{
				id: 2, text: "Kendo UI Project", spriteCssClass: "folder", items: [
					{ id: 3, text: "about.html", spriteCssClass: "html" },
					{ id: 4, text: "index.html", spriteCssClass: "html", checked:true  },
					{ id: 5, text: "logo.png", spriteCssClass: "image" }
				]
				},
				{
				id: 6, text: "Reports", spriteCssClass: "folder", items: [
					{ id: 7, text: "February.pdf", spriteCssClass: "pdf" },
					{ id: 8, text: "March.pdf", spriteCssClass: "pdf" },
					{ id: 9, text: "April.pdf", spriteCssClass: "pdf",  }
				]
				}
			]
			}],
			dragAndDrop: true,
			dataBound: onDataBound,
			checkboxes: {
			checkChildren: true
			},
			loadOnDemand: false
		});
	
		function onDataBound (e){
			// expands tree to the selected node
			var root = e.node ? $(e.node) : this.element;
	
			this.expand(root.find(".k-item input[type=checkbox]:checked").parents());
		}
    </script>
```
