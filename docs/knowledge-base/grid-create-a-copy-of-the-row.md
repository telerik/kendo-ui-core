---
title: Create Duplicate Grid Rows
description: An example on how to create a copy of a Kendo UI Grid row.
type: how-to
page_title: Create Copies of Rows | Kendo UI Grid
slug: grid-create-a-copy-of-the-row
tags: grid, copy, row
ticketid: 1145126
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2017.3 1026</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Grid</td>
	</tr>
</table>


## Description

How can I create a copy of a Grid row when the user clicks a button?

## Solution

1. Use the built-in methods of the Grid to programmatically add a new row.
1. Set the Grid model values based on the clicked row. As a result, the new row will be added at the top.  

For more information on how to implement the suggested approach, refer to the following examples:
* [http://dojo.telerik.com/Oveja](http://dojo.telerik.com/Oveja)  
* [https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/addrow](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/addrow)  
* [https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/closecell](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/closecell)  
* [https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.command.click](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.command.click)  
