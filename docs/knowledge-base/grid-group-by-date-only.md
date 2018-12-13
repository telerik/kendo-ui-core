---
title: Ignore Time Portion of DateTime in Grid When Grouping
description: An example on how to group the Kendo UI Grid data by the datetime field without taking into account different times but only the dates.
type: how-to
page_title: Ignore Time Portion of DateTime when Grouping | Kendo UI Grid
slug: grid-group-by-date-only
tags: ignore, group, grouping, time, datetime, grid
ticketid: 1140806
res_type: kb

---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
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
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

When grouping in a Grid by a `datetime` field, same days with different times are grouped separately.

How can I ignore the time portion of the `datetime` so that grouping happens by date only?

## Solution

1. Generate a new field which contains only the date portion of the `datetime` value by using the `parse` function of a DataSource `schema`.
1. Bind the column to the newly created field and use the `template` property to display the `datetime` field instead.

```dojo
<div id="grid"></div>

<script>
  $("#grid").kendoGrid({
    dataSource: {
      data: [
        { OrderDate: "2017-11-23T18:00:11.511Z", OrderId: "1" },
        { OrderDate: "2017-11-23T15:45:43.511Z", OrderId: "2" },
        { OrderDate: "2017-11-21T14:44:15.511Z", OrderId: "3" },
        { OrderDate: "2017-11-23T18:24:53.511Z", OrderId: "4" },
        { OrderDate: "2017-11-24T18:11:44.511Z", OrderId: "5" },
        { OrderDate: "2017-11-24T10:25:42.511Z", OrderId: "6" },
        { OrderDate: "2017-11-21T05:21:22.511Z", OrderId: "7" },
        { OrderDate: "2017-11-21T01:15:42.511Z", OrderId: "8" }
      ],
      schema: {
        parse: function(response) {
          var orders = [];
          for (var i = 0; i < response.length; i++) {
            var dateNoTime = new Date(response[i].OrderDate);
            var order = {
              OrderId: response[i].OrderId,
              OrderDate: response[i].OrderDate,
              OrderDateNoTime: new Date(
                dateNoTime.getFullYear(),
                dateNoTime.getMonth(),
                dateNoTime.getDate()
              )
            };
            orders.push(order);
          }
          return orders;
        },
        model: {
          fields: {
            OrderId: { type: "int"},
            OrderDate: { type: "date" },
            OrderDateNoTime: { type: "date" }
          }
        }
      }
    },
    columns: [
      { field: "OrderId", title: "Order ID" },
      {
        field: "OrderDateNoTime",
        title: "Order Date",
        template: "#= kendo.toString(OrderDate, 'yyyy/MM/dd HH:mm:ss') #",
        groupHeaderTemplate: "#= kendo.toString(value, 'yyyy/MM/dd') #"
      }
    ],
    groupable: true
  });
</script>
```

## See Also

* [Api Reference of the DataSource schema.parse Function](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/schema.parse)
* [Kendo UI Templates Overview](https://docs.telerik.com/kendo-ui/framework/templates/overview)
