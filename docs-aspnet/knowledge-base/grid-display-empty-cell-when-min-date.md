---
title: Display Empty Cell When Min Date
description: An example on how to display an empty string when the value is the min value of the Date type {{ site.framework }}.
type: how-to
page_title: Display an empty string when the value is Min Date
slug: grid-date-min-field
tags: grid, date, datetime, min, value, empty
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2022.3.1109</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Telerik {{site.product_short}} Grid</td>
	</tr>
</table>

## Description

How can I display an empty string when the field value is the minimum Date value?

## Solution

1. Use a ClientTemplate for the pointed column.
1. Call a JavaScript function in the ClientTemplate and pass the current [dataItem](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/dataitem) as a parameter.
1. In the function handler, initialize a custom veriable with value the min one for the Date type.
1. Add one day to the custom variable from point 3 to handle all the timezone transformations.
1. Conditionally check if the date field of the dataItem has value less than the value of the custom variable.
1. If the condition is results in true - return an empty string.
1. Else - return the date value in the proper format.
1. Here is an example:

```Index.cshtml
columns.Bound(p => p.OrderDate).ClientTemplate("#=orderDetails(data)#");
```

```JavaScript
<script>
    function orderDetails(order) {

        var minDate = new Date('0001-01-01T00:00:00Z');
        minDate.setDate(minDate.getDate() + 1);

        if (order.OrderDate < minDate) {
            return "";
        }
        else {
            return kendo.toString(order.OrderDate, "g");
        }
    }
</script>
```
