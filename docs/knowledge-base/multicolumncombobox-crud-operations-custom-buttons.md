---
title: Insert, add, delete records in MulticolumnComboBox
description: How to add, update, delete records with Kendo MulticolumnComboBox
type: how-to
page_title: CRUD operations with MulticolumnComboBox
slug: multicolumncombobox-crud-operations-custom-buttons
position: 
tags: 
ticketid: 1364943
res_type: kb
---

## Environment
<table>
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® MultiColumnComboBox for ASP.NET MVC</td>
	</tr>
</table>


## Description
How to insert, update, remove records with the Kendo MulticolumnComboBox.

The MulticolumnComboBox widget is view-only by design, as it is, essentially, a dropdown list that shows more data than usual. Thus, it does not provide full CRUD operations like a grid does.

## Solution
You can use its [templates](https://docs.telerik.com/kendo-ui/controls/editors/multicolumncombobox/overview#templates) to add the CRUD operations buttons, and then handle their events to fire your own requests for those operations. For example, load partial views for Create and Edit in a Kendo Window, and do a POST to the controller in order to delete a record.

You can find an example of this in the [CRUD operations with MultiColumnComboBox](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/MultiColumnComboBox/CRUD) sample project.
