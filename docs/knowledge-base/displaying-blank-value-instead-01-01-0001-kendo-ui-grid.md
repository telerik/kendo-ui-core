---
title: Displaying a Blank Cell Instead of 01/01/0001 in Date Columns of the Grid
description: Learn how to display a blank value instead of 01/01/0001 in a {{ site.framework }} Grid when the date field is null or contains the minimum value.
type: how-to
page_title: Display a Blank Value Instead of 01/01/0001 in {{ site.framework }} Grid Date Columns
slug: grid-display-blank-cell-for-date-fields-with-minimum-value
tags: grid, date-field, blank-value, 01/01/0001, default, column
res_type: kb
---

## Environment

| Product | Progress® Kendo UI® Grid for ASP.NET MVC |
| ------- | --------------------------------------- |
| Version | 2019.3.1023                              |

## Description

I want to display a blank value instead of 01/01/0001 in a {{ site.framework }} Grid when the date field is null or contains the minimum value.

## Solution

To achieve this behavior, you can use a ClientTemplate and a JavaScript function to handle the display logic. Here's an example:

1. In the Grid configuration, add the following column definition:

```javascript
columns.Bound(p => p.OrderDate).ClientTemplate("#=orderDetails(data)#");
```

2. Define the `orderDetails` JavaScript function:

```javascript
function orderDetails(order) {
    var minDate = new Date('0001-01-01T00:00:00Z');
    minDate.setDate(minDate.getDate() + 1);

    if (order.OrderDate < minDate) {
        return "";
    } else {
        return kendo.toString(order.OrderDate, "g");
    }
}
```

This function checks if the `OrderDate` value is less than the minimum date value (01/01/0001). If it is, it returns an empty string. Otherwise, it formats the `OrderDate` using the "g" format and returns the result.

Now, the {{ site.framework }} Grid will display a blank value instead of 01/01/0001 when the date field is null or contains the minimum value.

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/overview)

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/kendo-ui/grid/index)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
