---
title: Set Default Value for Date Picker
description: How to Set Default Value for Date Picker
type: how-to
page_title: How to Set Default Value for Date Picker - Kendo UI DatePicker for jQuery
slug: datepicker-set-default-value
position:
tags:
ticketid:
res_type: kb
components: ["datepicker"]
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® DatePicker for jQuery</td>
		</tr>
	</tbody>
</table>


## Description

To set a default value for the DatePicker, use the [`value`](https://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker/methods/value) method provided by the component.

## Solution

Initialize the DatePicker with a `value` option to define the default date. You can also call the `value` method at any time to update the selected date programmatically. The following example sets an initial value and then updates it to the current date.

```dojo

    <input id="datepicker" />
    <script>
      $("#datepicker").kendoDatePicker({
        value: new Date(2013, 10, 10),
        format: "MMM yyyy",
        parseFormats: ["MMM yyyy"],
        depth: "year",
        start: "year"
      });

      var datepicker = $("#datepicker").data("kendoDatePicker");

      datepicker.value(new Date());
    </script>

```
