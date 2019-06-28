---
title: Use Grid Filtering with Kendo UI RangeSliders
page_title: RangeSlider in Filter Menu | Kendo UI Grid for jQuery
description: "An example on how to create range filtering in the Kendo UI Grid for jQuery by using the Kendo UI RangeSlider."
previous_url: /controls/data-management/grid/how-to/use-range-slider-in-filter-menu, /controls/data-management/grid/how-to/filtering/use-range-slider-in-filter-menu
slug: howto_gridfiltering_rangefilteringwithslider_grid
tags: use, create, grid, filtering, rangeslider
component: grid
type: how-to
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

How can I create range filtering in the Kendo UI Grid for jQuery by using the Kendo UI RangeSlider?

## Solution

Your project might require you to create range filtering in the Grid by using the Kendo UI RangeSlider.

To see how the following example functions, filter the column by using the Kendo UI RangeSlider. As a result, the Grid filters the data in the given range.

```dojo
   <div id="grid">
</div>
<script>
    $(document).ready(function () {
        $("#grid").kendoGrid({
            filterMenuInit: onFilterMenuInit,
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                },
                schema: {
                    model: {
                        fields: {
                            OrderID: { type: "number" },
                            Freight: { type: "number" },
                            ShipName: { type: "string" },
                            OrderDate: { type: "date" },
                            ShipCity: { type: "string" }
                        }
                    }
                },
                pageSize: 20,
                serverPaging: true,
                serverFiltering: true,
            },
            height: 550,
            filterable: true,
            pageable: true,
            columns:
            [{
                field: "OrderID"
            },
            {
                field: "ShipName",
                title: "Ship Name"
            }, {
                field: "Freight",

            }, {
                field: "OrderDate",
                title: "Order Date",
                format: "{0:MM/dd/yyyy}"
            }]
        });
    });

    function onFilterMenuInit(e) {

        if (e.field == 'Freight') {
            $(e.container[0]).html(`
            <div id="rangeslider" class="humidity">
                <input  />
                <input  />
            </div>
             `)

            $('#rangeslider').kendoRangeSlider({
                change: submitFilter,
                min: 0,
                max: 100,
                smallStep: 1,
                largeStep: 10,
                tickPlacement: "both"
            })

        }
    }

    function submitFilter(e) {
        var grid = $('#grid').data('kendoGrid');
        grid.dataSource.filter({
            logic: 'and',
            filters: [
                { field: 'Freight', operator: 'gte', value: e.values[0] },
                { field: 'Freight', operator: 'lte', value: e.values[1] }
            ]
        })
    }

</script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
