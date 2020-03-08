---
title: Filter Hidden Group Columns
description: An example on how to filter a hidden grouped column in the Kendo UI Grid.
type: how-to
page_title: Move the Filter Button of a Hidden Group Column to the First Cell of the Header | Kendo UI Grid for jQuery
slug: grid-filter-hidden-group-column
tags: grid, filter, grouping, hidden column
ticketid: 1149209
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2017.1 117</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Grid</td>
	</tr>
</table>


## Description

How can I create a filter menu inside the first cell of the header for the grouping column in the Grid when the column is hidden?

## Solution

To filter the hidden column:

1. Display the column.
1. In the [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) event handler of the Grid:
	1. Get the HTML of the filter button.
	1. [`Append`](https://api.jquery.com/append/) the button to the `k-group-cell`.
	1. Use the [`hideColumn`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/columnhide) method to hide the column.

		```dojo
		<div id="example">
			<style>
				.k-multicheck-wrap {
					overflow-x: hidden;
				}
			</style>
			<div class="demo-section k-content wide">
				<h4>Client Operations</h4>
				<div id="client"></div>
			</div>
			<script>
				$(document).ready(function() {
					var telerikWebServiceBase = "https://demos.telerik.com/kendo-ui/service/";

					$("#client").kendoGrid({
						dataSource: {
							transport: {
								read: {
									url: telerikWebServiceBase + "/Products",
									dataType: "jsonp"
								},
								update: {
									url: telerikWebServiceBase + "/Products/Update",
									dataType: "jsonp"
								},
								destroy: {
									url: telerikWebServiceBase + "/Products/Destroy",
									dataType: "jsonp"
								},
								create: {
									url: telerikWebServiceBase + "/Products/Create",
									dataType: "jsonp"
								},
								parameterMap: function(options, operation) {
									if (operation !== "read" && options.models) {
										return {
											models: kendo.stringify(options.models)
										};
									}
								}
							},
							batch: true,
							group: {
								field: 'Discontinued'
							},
							schema: {
								model: {
									id: "ProductID",
									fields: {
										ProductID: {
											editable: false,
											nullable: true
										},
										ProductName: {
											validation: {
												required: true
											}
										},
										UnitPrice: {
											type: "number",
											validation: {
												required: true,
												min: 1
											}
										},
										Discontinued: {
											type: "boolean"
										},
										UnitsInStock: {
											type: "number",
											validation: {
												min: 0,
												required: true
											}
										}
									}
								}
							}
						},
						filterable: true,
						height: 550,
						dataBound: function(e) {
							var grid = e.sender;
							var gridEl = grid.element;
							var filterElem = gridEl.find("[data-field='Discontinued']").find(".k-grid-filter");
							var myFilterPlaceholder = gridEl.find("th.k-group-cell.k-header");

							myFilterPlaceholder.append(filterElem);
							grid.hideColumn("Discontinued");
						},
						columns: [{
								field: "ProductName",
								filterable: {
									multi: true,
									search: true
								}
							},
							{
								field: "UnitPrice",
								title: "Unit Price",
								format: "{0:c}",
								width: 120,
								filterable: {
									multi: true
								}
							},
							{
								field: "UnitsInStock",
								title: "Units In Stock",
								width: 120,
								filterable: {
									multi: true
								}
							}, {
								field: "Discontinued",
								groupHeaderTemplate: 'Discontinued: #= value #'
							}
						]
					});

				});
			</script>
		</div>
		```
