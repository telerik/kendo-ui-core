---
title: Display Hidden Column Values in Detail Template
description: An example on how to show the values of the hidden column in the detail template of the Kendo UI Grid.
type: how-to
page_title: Implement Responsive Value Display | Kendo UI Grid
slug: grid-display-hidden-values-in-details
tags: grid, responsive, details
ticketid: 1180379
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2018.2.620</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Grid for Progress® Kendo UI®</td>
	</tr>
</table>

## Description

How can I display the hidden columns values in the detail template of the rows in the Kendo UI Grid?

## Solution

1. Implement a [`detailTemplate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/detailtemplate).
1. Use [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) to show and hide the desired data in the detail template.

```dojo
<style>
	.k-hierarchy-col,
	.k-hierarchy-cell{
	display: none;
	}

	.k-grid-header .k-hierarchy-cell+th{
	border-left-width: 0;
	}

	.grid-name,
	.grid-age{
	display: none;
	}

	@media only screen and (max-width: 749px){
	.k-hierarchy-col{
		display: table-column;
	}

	.k-hierarchy-cell{
		display: table-cell;
	}

	.k-grid-header .k-hierarchy-cell+th{
		border-left-width: 1px;
	}

	.grid-age{
		display: block;
	}
	}

	@media only screen and (max-width: 499px){
	.grid-name{
		display: block;
	}
	}
</style>

<div id="grid"></div>

<script id="detail-template" type="text/x-kendo-template">
	<div class='grid-name'>
		Name: #: name #
	</div>
	<div class='grid-age'>
	Age: #: age #
	</div>
</script>

<script>
	$("#grid").kendoGrid({
	columns: [
		{ field: "id" },
		{ field: "name", width: 250, minScreenWidth: 500 },
		{ field: "age", width: 250, minScreenWidth: 750 }
	],
	dataSource: [
		{ id: 1, name: "Jane Doe", age: 31, city: "Boston" },
		{ id: 2, name: "John Doe", age: 55, city: "New York" }
	],
	detailTemplate: kendo.template($("#detail-template").html()),
	columnShow: function(e){
		if(window.innerWidth>=750){
		e.sender.collapseRow(".k-master-row");
		}
	}
	});
</script>
```
