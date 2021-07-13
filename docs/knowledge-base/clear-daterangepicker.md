---
title: Clear DateRangePicker
description: How to Clear DateRangePicker Selection
type: how-to
page_title: How to Clear DateRangePicker Selection | Kendo UI DateRangePicker for jQuery
slug: clear-daterangepicker
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
			<td>DateRangePicker for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description

This sample demonstrates how you can clear the values of the date range picker using the [range](https://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker/methods/range) method.

## Solution

```dojo
  
    <div id="daterangepicker"></div>
    <br/>
    <button onclick='buttonClick();'>Clear Range Picker</button>
    <script>
      $("#daterangepicker").kendoDateRangePicker({
        range: {
          start: new Date(2019, 10, 11),
          end: new Date(2019, 10, 22)
        }
      });
      function buttonClick(){
        var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");
        daterangepicker.range({
          start: null,
          end: null
        });
      }
    </script>
      
``` 
