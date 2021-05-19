---
title: Validate Spreadsheet Dates Based on Previous Column Date
description: An example on how to validate a date in the Kendo UI Spreadsheet based on the previous column date.
type: how-to
page_title: Date Validation Based on Previous Column Value | Kendo UI Spreadsheet for jQuery
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

I want to set my Spreadsheet in the following way:

1. The date value in the current column to be always greater than or equal to the date value from the previous column.
1. If my previous column is blank, the validation to check the column before the previous one.

How can I configure the date validation in the Spreadsheet based on a date value from a previous column?

## Solution

Configure the [cell validation](https://demos.telerik.com/kendo-ui/spreadsheet/validation) in the following way:

```dojo
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
