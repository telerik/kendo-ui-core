---
title: Insert, Add, and Delete MulticolumnComboBox Records
description: An example on how to add, update, and delete records in the Kendo UI MulticolumnComboBox.
type: how-to
page_title: Perform CRUD Operations | Kendo UI MulticolumnComboBox
slug: multicolumncombobox-crud-operations-custom-buttons
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

How can I insert, update, and remove records in the MulticolumnComboBox?

## Solution

By design, the MulticolumnComboBox is a view-only widget which represents a drop-down list that shows more data than the regular ComboBox, and does not provide full CRUD operation support.

To work around this issue:

1. Use the [templates of the MulticolumnComboBox](https://docs.telerik.com/kendo-ui/controls/editors/multicolumncombobox/overview#templates) to add the buttons for the CRUD operations.
1. Handle the events of the buttons to fire the necessary requests for those operations. For example, you can load partial views for the `Create` and `Edit` operations in a Kendo UI Window, and do a `POST` request to the controller to delete a record.

For a runnable example, refer to the sample project on [CRUD operations with MultiColumnComboBox](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/MultiColumnComboBox/CRUD).
