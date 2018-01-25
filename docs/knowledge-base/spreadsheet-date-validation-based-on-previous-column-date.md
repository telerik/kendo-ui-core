---
title: Spreadsheet Date Validation Based on Previous Column Date
description: An example on how validate a date in the Kendo UI Spreadsheet, based on the previous column date.
type: how-to
page_title: Date Validation Based on Previous Column Value | Kendo UI Spreadsheet
slug: spreadsheet-date-validation-based-on-previous-column-date
tags: kendo, kendo-ui, spreadsheet, validation, date, previous-column
ticketid: 1149122 
res_type: kb
component: spreadsheet
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Spreadsheet</td>
 </tr>
</table>

## Description

I would like to know how to configure date validation based on the previous column date value. Current column date value should be always greater than or equal to previous column date. If my previous column is blank, the validation should check the column before that instead.

## Solution

In order to achieve the desired, [the cell validation](https://demos.telerik.com/kendo-ui/spreadsheet/validation) should be configured in the following way:

```html
    <div id="spreadsheet" style="width: 100%;"></div>
	
	<script>
	  $(function() {
		$("#spreadsheet").kendoSpreadsheet({
		  sheets: [{
			name: "ContactsForm",
			rows: [{
			  height: 25,
			  cells: [{
				value: 31231,
				format: 'M/d/yyyy'
			  },{
				value: 31232,
				format: 'M/d/yyyy'
			  },{
				value: 31233,
				format: 'M/d/yyyy',
				validation: {
				  dataType: "custom",
				  from: "AND(ISNUMBER(C1),IF(ISNUMBER(B1),C1>=B1,C1>=A1))",
				  allowNulls: true,
				  type: "reject",
				  titleTemplate: "Date validaiton error",
				  messageTemplate: "C1 date should be greater than B1 / A1 date."
				}
			  }]
			}]
		  }]
		});
	  });
	</script>
```

## See Also

* [API Reference of the Spreadsheet](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
