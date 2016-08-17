---
title: Hide the Vertical Scrollbar
page_title:  Hide the Vertical Scrollbar | Kendo UI Grid
description: "Learn how to hide the vertical scrollbar of the Kendo UI Grid widget when you do not need it."
slug: howto_hide_vertical_scrollbar_grid
---

# Hide the Vertical Scrollbar

The example below demonstrates how to conditionally hide the vertical scrollbar of the Kendo UI Grid, when the total height of all table rows is less than the Grid height.

###### Example

```html
<style>
.no-scrollbar .k-grid-header
{
padding: 0 !important;
}

.no-scrollbar .k-grid-content
{
overflow-y: visible;
}
</style>

<p>Use the Grid pager to go to the last page and see the scrollbar being hidden programmatically.</p>
<div id="grid"></div>

<script>

$(function () {
    function toggleScrollbar(e) {
        var gridWrapper = e.sender.wrapper;
        var gridDataTable = e.sender.table;
        var gridDataArea = gridDataTable.closest(".k-grid-content");

        gridWrapper.toggleClass("no-scrollbar", gridDataTable[0].offsetHeight < gridDataArea[0].offsetHeight);
    }

    $("#grid").kendoGrid({
        dataSource: {
            type: "odata",
            transport: {
                read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
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
            serverSorting: true
        },
        height: 700,
        dataBound: toggleScrollbar,
        filterable: true,
        sortable: true,
        pageable: true,
        columns: [{
            field: "OrderID",
            filterable: false
        },
                    "Freight",
                    {
                        field: "OrderDate",
                        title: "Order Date",
                        format: "{0:MM/dd/yyyy}"
                    }, {
                        field: "ShipName",
                        title: "Ship Name"
                    }, {
                        field: "ShipCity",
                        title: "Ship City"
                    }
        ]
    });
});

</script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples related to its layout:

* [Kendo UI Grid JavaScript API Reference](/api/javascript/ui/grid)
* [How to Adjust Row Height with Virtual Scrolling]({% slug howto_adjust_row_height_withvirtual_scrolling_grid %})
* [How to Apply Minimum Width during Column Resize]({% slug howto_apply_min_width_during_column_resize_grid %})
* [How to Change Group Header Position with Locked Columns]({% slug howto_change_group_header_position_wthlocked_columns_grid %})
* [How to Create and Use Auto Layout]({% slug howto_create_and_use_autolayout_grid %})
* [How to Disable Resizing for Specific Columns]({% slug howto_disable_column_resizing_grid %})
* [How to Resize Grid When Window Is Resized]({% slug howto_resize_whenthe_windowis_resized_grid %})
* [How to Use FontAwesome Icons in Custom Command Buttons]({% slug howto_use_fontawesomeiconsin_custom_command_buttons_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
