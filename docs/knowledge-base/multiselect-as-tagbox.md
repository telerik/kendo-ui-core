---
title: MultiSelect to Behave as TagBox
description: How to configure and customize the Kendo UI MultiSelect widget to accept custom user input and not to display its pop-up drop-down.
type: how-to
page_title: Accept custom input with no drop-down shown | Kendo UI MultiSelect
slug: multiselect-as-tagbox
tags: kendo, multiselect, tagbox, no-dropdown
ticketid: 1131556
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI MultiSelect</td>
 </tr>
</table>

## Description

How to configure and customize the **MultiSelect** widget to behave as a **TagBox**. This means to allow the MultiSelect to accept custom text and display it as tag (by automatically adding the free text entry to the DataSource of the widget). Also, the drop-down of the widget should never be opened. 

## Solution

To achieve the desired, a handler for the **Enter** keyup event should be attached for the **input** element of the MultiSelect. This handler simply adds the new text to the DataSource and selects the newly created entry. A CSS rule to force the pop-up to always remain hidden is also used:

````html
<style>
	#products-list {
		display: none !important;
	}
</style>
<select id="products" style="width: 100%;"></select>
<script>
	$(document).ready(function() {
		var currentId = 1;

		function onDataBound(e) {
			$('.k-multiselect .k-input').unbind('keyup');
			$('.k-multiselect .k-input').on('keyup', onClickEnter);
		}
		function onClickEnter(e) {
			if (e.keyCode === 13) {
				var widget = $('#products').getKendoMultiSelect();
				var dataSource = widget.dataSource;
				var input = $('.k-multiselect .k-input');
				var value = input.val().trim();
				if (!value || value.length === 0) {
					return;
				}
				var newItem = {
					ProductID: currentId ++,
					ProductName: value
				};

				dataSource.add(newItem);
				var newValue = newItem.ProductID;
				widget.value(widget.value().concat([newValue]));
			}
		}
		$("#products").kendoMultiSelect({
			dataTextField: "ProductName",
			dataValueField: "ProductID",
			dataSource: {
				data: []
			},
			dataBound: onDataBound
		});
	});
</script>
````

## See Also

* [Kendo UI MultiSelect JavaScript API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect)
* [Kendo UI MultiSelect Add new item demo](http://demos.telerik.com/kendo-ui/multiselect/addnewitem)
