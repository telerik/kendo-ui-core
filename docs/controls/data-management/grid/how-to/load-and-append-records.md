---
title: Load and Append More Records While Scrolling Down
page_title: Load and Append More Records While Scrolling Down | Kendo UI Grid
description: "Learn how to load and append more records as the user scrolls down the Kendo UI Grid."
slug: howto_loadand_append_morerecords_while_scrollingdown_grid
---

# Load and Append More Records While Scrolling Down

The example below demonstrates how to load more records when scrolling the Grid rows. The difference between this scenario and virtual scrolling is that here the number of records constantly increases, while virtual scrolling replaces the existing records with new ones. Note that increasing the page size will make data requests slower.

There are two things for you to do as prerequisites for applying this functionality:
1. Subscribe to the `scroll` event of the Grid data container and increment the page size by a desired value.
2. Use a flag to prevent multiple simultaneous page size increments. The flag should be set in the `scroll` event handler, and cleared in the `dataBound` event handler of the Grid.

> **Important**
>
> The functionality below is not intended to be used together with virtual scrolling.

###### Example

```html

    <div id="grid"></div>

    <script>
        var gridElement = $("#grid")
        var pagingIncrement = 20;
        var scrollbarWidth = kendo.support.scrollbar();
        var dataBindingFlag = true;

        gridElement.kendoGrid({
            dataSource: {
                type: "odata",
                transport: {
                    read: "http://demos.kendoui.com/service/Northwind.svc/Orders"
                },
                schema: {
                    model: {
                        fields: {
                            OrderID: { type: "number" },
                            Freight: { type: "number" },
                            ShipName: { type: "string" },
                            OrderDate: { type: "date" }
                        }
                    }
                },
                pageSize: 20,
                serverPaging: true
            },
            pageable: true,
            dataBound: function() {
                dataBindingFlag = true;
            },
            columns: [{
                field:"OrderID"
            }, {
                field: "Freight"
            }, {
                field: "OrderDate",
                title: "Order Date",
                format: "{0:MM/dd/yyyy}"
            }, {
                field: "ShipName",
                title: "Ship Name"
            }]
        });

        var gridDataSource = gridElement.data("kendoGrid").dataSource;

        gridElement.children(".k-grid-content")
            .on("scroll", function(e){
                if (dataBindingFlag) {
                    var dataDiv = e.target;
                    var currentPageSize = gridDataSource.pageSize();
                    if (dataDiv.scrollTop >= dataDiv.scrollHeight - dataDiv.offsetHeight - scrollbarWidth && gridDataSource.total() > currentPageSize) {
                        dataBindingFlag = false;
                        gridDataSource.pageSize(currentPageSize + pagingIncrement);
                    }
                }
            });
    </script>

    <style>
        #grid { height: 300px; }
    </style>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Add Cascading DropDownList Editors]({% slug howto_add_cascading_dropdown_list_editors_grid %})
* [How to Copy Data from Excel]({% slug howto_copy_datafrom_excel_grid %})
* [How to Drag and Drop Rows between Grids]({% slug howto_dragand_drop_rows_between_twogrids_grid %})
* [How to Enable ForeignKey Column Sorting by Text]({% slug howto_enable_foreignkey_sotringby_text_grid %})
* [How to Filter Array Columns Using MultiSelect]({% slug howto_filetr_array_columns_using_multiselect_grid %})
* [How to Implement Stable Sort in Chrome]({% slug howto_implement_stable_sortin_chrome_grid %})
* [How to Initialize Data Attribute with Detail Template]({% slug howto_initialize_data_attributewith_detail_template_grid %})
* [How to Perform CRUD Operations with Local Storage Data]({% slug howto_perform_crud_operationswith_local_storage_data_grid %})
* [How to Persist Expanded Rows after Refresh]({% slug howto_persist_expanded_rows_afetrrefresh_grid %})
* [How to Set Cell Color Based on ForeignKey Values]({% slug howto_set_cell_color_basedon_foreignkey_values_grid %})
* [How to Show Tooltip for Column Records]({% slug howto_show_tooltipfor_column_records_grid %})
* [How to Update Toolbar Content Using MVVM Binding]({% slug howto_update_toolbar_content_using_mvvmbinding_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
