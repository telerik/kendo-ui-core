---
title: Set MultiSelects to Behave as TagBoxes
description: An example on how to configure and customize the Kendo UI MultiSelect to accept custom user input and not display its pop-up drop-down.
type: how-to
page_title: Accept Custom Input with No Drop-Down Shown | Kendo UI MultiSelect for jQuery
slug: multiselect-as-tagbox
tags: kendo, multiselect, tagbox, no-dropdown
ticketid: 1131556
res_type: kb
component: multiselect
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI MultiSelect</td>
 </tr>
</table>

## Description

I want to enable the MultiSelect to:

* Accept custom text.
* Display the custom text as a tag by automatically adding the free text entry to its DataSource.
* Not open its drop-down.

How can I configure and customize the MultiSelect to behave as a TagBox?

## Solution

1. Attach a handler for the `keyup` event of `Enter` to the `input` element of the MultiSelect. As a result, the handler adds the new text to the DataSource and selects the newly created entry.

1. Use a CSS rule to force the pop-up to always remain hidden.

````dojo
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

* [JavaScript API Reference of the MultiSelect](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect)
* [Demo on Adding New MultiSelect Items](https://demos.telerik.com/kendo-ui/multiselect/addnewitem)
