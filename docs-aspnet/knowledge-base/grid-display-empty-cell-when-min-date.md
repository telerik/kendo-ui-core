---
title: Displaying Empty Cell When Min Date
description: An example on how to display an empty string when the value is the min value of the Date type {{ site.framework }}.
type: how-to
page_title: Display an Empty String When the Value is Min Date
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
1. In the function handler, initialize a custom variable with value the min one for the Date type.
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

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
