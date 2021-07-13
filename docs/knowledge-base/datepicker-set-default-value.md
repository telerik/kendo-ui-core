---
title: Set Default Value for Date Picker
description: How to Set Default Value for Date Picker
type: how-to
page_title: How to Set Default Value for Date Picker | Kendo UI DatePicker for jQuery
slug: datepicker-set-default-value
position: 
tags: 
ticketid: 
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>DatePicker for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description

You can achieve this requirement using the value method provided by the component:

https://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker/methods/value

## Solution

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
