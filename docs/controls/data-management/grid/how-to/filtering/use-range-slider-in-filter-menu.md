---
title: Use Grid Filtering with Kendo UI RangeSliders
page_title: jQuery Grid Documentation | RangeSlider in Filter Menu | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to create range filtering by using the Kendo UI RangeSlider."
previous_url: /controls/data-management/grid/how-to/use-range-slider-in-filter-menu
slug: howto_gridfiltering_rangefilteringwithslider_grid
---

# Use Grid Filtering with Kendo UI RangeSliders

Your project might require you to create range filtering in the Grid by using the Kendo UI RangeSlider.

To see how the following example functions, filter the column by using the Kendo UI RangeSlider. As a result, the Grid filters the data in the given range.

###### Example

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
* [How to Add Cascading DropDownList Editors]({% slug howto_add_cascading_dropdown_list_editors_grid %})
* [How to Copy Data from Excel]({% slug howto_copy_datafrom_excel_grid %})
* [How to Drag and Drop Rows between Grids]({% slug howto_dragand_drop_rows_between_twogrids_grid %})
* [How to Enable ForeignKey Column Sorting by Text]({% slug howto_enable_foreignkey_sotringby_text_grid %})
* [How to Implement Stable Sort in Chrome]({% slug howto_implement_stable_sortin_chrome_grid %})
* [How to Initialize Data Attribute with Detail Template]({% slug howto_initialize_data_attributewith_detail_template_grid %})
* [How to Load and Append More Records While Scrolling Down]({% slug howto_loadand_append_morerecords_while_scrollingdown_grid %})
* [How to Perform CRUD Operations with Local Storage Data]({% slug howto_perform_crud_operationswith_local_storage_data_grid %})
* [How to Persist Expanded Rows after Refresh]({% slug howto_persist_expanded_rows_afetrrefresh_grid %})
* [How to Set Cell Color Based on ForeignKey Values]({% slug howto_set_cell_color_basedon_foreignkey_values_grid %})
* [How to Show Tooltip for Column Records]({% slug howto_show_tooltipfor_column_records_grid %})
* [How to Update Toolbar Content Using MVVM Binding]({% slug howto_update_toolbar_content_using_mvvmbinding_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_adjust_row_heights_template_locked_columns_grid %}).
