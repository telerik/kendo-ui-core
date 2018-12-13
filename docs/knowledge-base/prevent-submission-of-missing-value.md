---
title: Prevent Submission of Value that Is not Present in the ComboBox DataSource
description: An example on how to prevent the submission of a value that is not present in the DataSource of the Kendo UI ComboBox.
type: how-to
page_title: Prevent the Submission of Non-Present Values in the DataSource | Kendo UI ComboBox
slug: prevent-submission-of-missing-value
tags: combobox, prevent, submit, submission, value, missing, not, present, datasource
ticketid: 1133314
res_type: kb
component: combobox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI ComboBox</td>
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

How can I prevent the submission of a value that is entered in the input of the ComboBox when this value does not match any of the items in the DataSource?

## Solution

In the handler of the ComboBox `change` event which fires on blurring the widget, check if the entered text matches an item in the DataSource. If it does not, replace the entered text with an empty string.

```dojo
	<input id="combobox"  />
	<script>
	   $(document).ready(function() {
		var items = [
			{ Value : '1', Name : 'Anna' },
			{ Value : '2', Name : 'Bob' },
			{ Value : '3', Name : 'Daniel' },
			{ Value : '4', Name : 'Charlie' }
		];

		$('#combobox').kendoComboBox({
			dataSource : items,
			dataTextField : 'Name',
			dataValueField : 'Value',
			filter : 'contains',
			change : function (e) {
				if (this.value() && this.selectedIndex == -1) {    
					this.dataSource.filter({
						value: this.value(),
						field: this.options.dataTextField,
						operator: "contains"
					});
					this.select(0);
					if ( this.selectedIndex == -1 ) {                    
						this.text("");
					}
				}
			}
		}).data('kendoComboBox');
	});
	</script>
```

For the full implementation of the approach, refer to [this Dojo example](https://dojo.telerik.com/AzAru).
