---
title: Show Dialog on TreeView Node Selection
description: An example on how to show the node data in the Kendo UI Dialog on selecting a TreeView node.
type: how-to
page_title: Display Node Data in Dialog | Kendo UI TreeView for jQuery
slug: dialog-on-treeview-node
tags: dialog, treeview, node
ticketid: 1139187
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI TreeView</td>
  <td>Progress Kendo UI Dialog</td>
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

How can I display TreeView node data in a Kendo UI Dialog on node selection?

## Solution

1. Access the `dataItem` of the selected node.
1. Pass the data from the `dataItem` to the `content` method of the Dialog.

```dojo
	<div id="treeview"></div>
	<div id="dialog"></div>               

	<script>
		var data = new kendo.data.HierarchicalDataSource({
			transport: {
				read: {
					url: "https://demos.telerik.com/kendo-ui/service/Employees",
					dataType: "jsonp"
				}
			},
			schema: {
				model: {
					id: "EmployeeId",
					hasChildren: "HasEmployees"
				}
			}
		});

		$("#treeview").kendoTreeView({
			dataSource: data,
			dataTextField: "FullName",
			select: onSelect
		});

		$("#dialog").kendoDialog({                    		
			title: "Customer Details",  			
			visible: false,
				actions:
				[{
					text: "OK",
					action: function(e){
						alert('"OK" button was clicked')
					},
					primary: true
				},
				{
					text: "Cancel"
				}]
		})

		function onSelect(e){    
			var treeView = $('#treeview').data('kendoTreeView');
			var data = treeView.dataItem(e.node);
			var content = '<b>FullName: </b>' + data.FullName + '</br><b>EmployeeId: </b>' + data.EmployeeId;
			var dialog = $("#dialog").data("kendoDialog");
			dialog.content(content);
			dialog.open();
		}
	</script>
```
