---
title: Filter the Grid by Time Only with the TimePicker
description: Learn how to filter the data of the Kendo UI for jQuery Grid by the time portion of a DateTime field by using the Kendo UI TimePicker in the filter menu.
type: how-to
page_title: Filter by Time Only with the TimePicker - Kendo UI for jQuery Data Grid
slug: grid-filter-by-time
tags: grid, filter, time, date, datetime, timepicker, filter menu, time of day
res_type: kb
components: ["grid"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® TimePicker for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with the {{ site.cdnVersion }} version</td>
 </tr>
</table>

## Description

How can I filter the Grid data by the time of day only, ignoring the date portion of a `DateTime` field, by using the Kendo UI for jQuery [TimePicker]({% slug overview_kendoui_timepicker_widget %})?

This KB also answers the following questions:

* Why does filtering a `DateTime` field by time return unexpected results?
* Why must the data and filter values use the same base date?
* Can I filter for a time range across different dates?

## Solution

The DataSource compares `Date` values as numbers, which means that the built-in `date` operators always take the date portion into account. A TimePicker value also contains a date (the current day), so comparing it directly with the `DateTime` field does not return the expected records.

The following example demonstrates the full implementation of the suggested approach.

```dojo
<div id="grid"></div>

<script>
    function toTimeOfDay(date) {
        return date ? new Date(1970, 0, 1, date.getHours(), date.getMinutes()) : null;
    }

    var orders = [];
    var firstOrderDate = new Date(2026, 0, 5, 8, 0);

    for (var i = 0; i < 60; i++) {
        orders.push({
            OrderID: i + 1,
            ShipName: "Ship " + (i + 1),
            OrderDate: new Date(firstOrderDate.getTime() + i * (24 * 60 + 37) * 60 * 1000)
        });
    }

    $("#grid").kendoGrid({
        dataSource: {
            data: orders,
            schema: {
                parse: function(response) {
                    for (var i = 0; i < response.length; i++) {
                        response[i].OrderTime = toTimeOfDay(response[i].OrderDate);
                    }
                    return response;
                },
                model: {
                    id: "OrderID",
                    fields: {
                        OrderID: { type: "number" },
                        ShipName: { type: "string" },
                        OrderDate: { type: "date" },
                        OrderTime: { type: "date" }
                    }
                }
            },
            pageSize: 10
        },
        height: 500,
        sortable: true,
        pageable: true,
        filterable: true,
        columns: [
            { field: "OrderID", title: "Order ID", width: 120 },
            { field: "ShipName", title: "Ship Name" },
            { field: "OrderDate", title: "Order Date", format: "{0:yyyy-MM-dd HH:mm}" },
            {
                field: "OrderTime",
                title: "Order Time",
                format: "{0:HH:mm}",
                filterable: {
                    ui: function(element) {
                        element.kendoTimePicker({
                            format: "HH:mm"
                        });
                    }
                }
            }
        ],
        filter: function(e) {
            if (e.field === "OrderTime" && e.filter) {
                e.filter.filters.forEach(function(filter) {
                    filter.value = toTimeOfDay(filter.value);
                });
            }
        }
    });
</script>
```

To compare only the time of day, normalize both the data and the filter value to the same base date:

1. Create a helper function that keeps only the hours and the minutes of a date and moves them to a fixed base date.

    ```
    function toTimeOfDay(date) {
        return date ? new Date(1970, 0, 1, date.getHours(), date.getMinutes()) : null;
    }
    ```

1. Use the [`schema.parse`](/api/data/datasource/configuration/schema#schemaparse) function of the DataSource to add a time-only field to each data item, and declare the new field as a `date` field in the model.

    ```
    schema: {
        parse: function(response) {
            for (var i = 0; i < response.length; i++) {
                response[i].OrderTime = toTimeOfDay(response[i].OrderDate);
            }
            return response;
        },
        model: {
            fields: {
                OrderDate: { type: "date" },
                OrderTime: { type: "date" }
            }
        }
    }
    ```

1. Set the [`columns.filterable.ui`](/api/ui/grid/configuration/columns/filterable#columnsfilterableui) option of the time column to a function that initializes a TimePicker in the filter menu.

    ```
    {
        field: "OrderTime",
        title: "Order Time",
        format: "{0:HH:mm}",
        filterable: {
            ui: function(element) {
                element.kendoTimePicker({
                    format: "HH:mm"
                });
            }
        }
    }
    ```

1. Handle the [`filter`](/api/ui/grid/events/filter) event of the Grid and normalize the TimePicker values in the generated filter expression to the same base date before the Grid applies the filter.

    ```
    filter: function(e) {
        if (e.field === "OrderTime" && e.filter) {
            e.filter.filters.forEach(function(filter) {
                filter.value = toTimeOfDay(filter.value);
            });
        }
    }
    ```

As a result, the built-in **Is equal to**, **Is after**, **Is before**, and the other date operators of the filter menu compare only the time of day. You can also combine two conditions to filter by a time range, for example, all orders between 09:00 and 12:00 on any date.

## See Also

* [JavaScript API Reference of the jQuery Data Grid](/api/ui/grid)
* [JavaScript API Reference of the jQuery TimePicker](/api/ui/timepicker)
* [Filtering in the jQuery Data Grid]({% slug filtering_kendoui_grid_widget %})
* [Filter by Date Only]({% slug howto_filter_date_columns_grid %})
* [Use DropDownList as Boolean Filter in Grid]({% slug grid-boolean-dropdownlist-filter %})
