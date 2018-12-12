---
title: Set MVVM Toolbar Template
description: An example on how to set the toolbar template in a Kendo UI MVVM TreeList.
type: how-to
page_title: Set MVVM Toolbar Template | Kendo UI TreeList
slug: treelist-mvvm-toolbar-template
tags: treelist, mvvm, toolbar, template
ticketid: 1153897
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2018.1 221</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>TreeList for Progress® Kendo UI®</td>
	</tr>
</table>

## Description

How can I set the toolbar template in a Kendo UI MVVM TreeList?

## Solution

Use a function that will return the desired template.

```dojo
<script id="toolbar-template" type="text/x-kendo-template">
	<div>
		<button id="myButton">
			Add New #=group.Name#
	</button>
	</div>
</script>
<script>
	function myTemplate() {
		var template = kendo.template($('#toolbar-template').html());
		var result = template({
			group: {
				Name: 'group1'
			}
		});
		return result
	}
</script>
<div id="example">
	<div data-role="treelist" data-selectable="true" data-columns="[
						{ 'field': 'Name' },
						{ 'field': 'Position', 'width': 270 },
						]" data-bind="source: employees" data-toolbar="#=myTemplate()#" style="height: 300px"></div>
	<script>
		var viewModel = kendo.observable({
			employees: new kendo.data.TreeListDataSource({
				data: [{
						EmployeeID: 1,
						ReportsTo: null,
						Name: "Andrew Fuller",
						Position: "CEO"
					},
					{
						EmployeeID: 2,
						ReportsTo: 1,
						Name: "Andrew Hopkins",
						Position: "Sales"
					},
					{
						EmployeeID: 3,
						ReportsTo: 1,
						Name: "Betty Stewart",
						Position: "Legal advisor"
					},
					{
						EmployeeID: 4,
						ReportsTo: 1,
						Name: "Jon Michaels",
						Position: "Product team lead"
					},
					{
						EmployeeID: 5,
						ReportsTo: 1,
						Name: "Rebecca Williams",
						Position: "Software developer"
					},
					{
						EmployeeID: 6,
						ReportsTo: 4,
						Name: "John Smith",
						Position: "Marketing associate"
					},
					{
						EmployeeID: 7,
						ReportsTo: 4,
						Name: "Natasha Andrews",
						Position: "System administrator"
					},
					{
						EmployeeID: 8,
						ReportsTo: 4,
						Name: "Victoria Belmont",
						Position: "Designer"
					},
					{
						EmployeeID: 9,
						ReportsTo: 4,
						Name: "Emma Watkins",
						Position: "Software developer"
					}
				],
				schema: {
					model: {
						id: "EmployeeID",
						parentId: "ReportsTo",
						fields: {
							EmployeeId: {
								type: "number",
								editable: false,
								nullable: false
							},
							ReportsTo: {
								nullable: true,
								type: "number"
							},
							Name: {
								field: "Name",
								type: "string"
							},
							Position: {
								field: "Position",
								type: "string"
							}
						}
					}
				}
			})
		});
		kendo.bind($("#example"), viewModel);
	</script>
</div>
```
