---
title: Customize Rows and Cells Based on Data Item Values
page_title: Customize Rows and Cells Based on Data Item Values | Kendo UI Grid
description: "Learn how to customize kendo UI Grid cells and rows, based on data items values."
slug: howto_customize_rowsand_cells_basedon_dataitem_values_grid
---

# Customize Rows and Cells Based on Data Item Values

The example below demonstrates how to customize the Grid cells and rows based on data items values. The cases apply custom CSS classes, but the same approach can be used to apply inline styles or any other HTML attributes.

The three options are:

1. Use a row template. This approach is the best if you do not use hierarchy, grouping, editing, and frozen columns.
2. Use a databound handler and iterate the table rows. This approach is suitable if you will customize all rows.
3. Use a databound handler and iterate the data items. This approach is convenient if you will customize some of the rows.

###### Example

```html
    <style>

    html {
        font: 14px sans-serif;
    }

    h1 {
        font-size: 1.2em;
    }

    h2 {
        font-size: 1em;
    }

    .k-grid {
        width: 500px;
    }

    .discontinued {
        font-weight: bold;
        color: #f00;
    }
    .critical {
        background-color: #fdd;
    }

    .warning {
        background-color: #fda;
    }

    .ok {
        background-color: #ced;
    }

    </style>

    <h1>Style Grid rows and cells, based on data item values</h1>

    <h2>Use a row template</h2>

    <p>This approach is the best if hierarchy, grouping, editing and frozen columns are not used.</p>

    <div id="grid-rowtemplate"></div>

    <h2>Use a databound handler and iterate the table rows</h2>

    <p>This approach is better if all rows will be customized.</p>

    <div id="grid-databound-rows"></div>

    <h2>Use a databound handler and iterate the data items</h2>

    <p>This approach is better if only some rows will be customized.</p>

    <div id="grid-databound-dataitems"></div>

    <script>
        // sample datasource
        var products = [
            { ID: 1, ProductName: "Foo", UnitsInStock: 9, Discontinued: false },
            { ID: 2, ProductName: "Bar", UnitsInStock: 16, Discontinued: false },
            { ID: 3, ProductName: "Baz", UnitsInStock: 3, Discontinued: true }
        ];

        // configuration settings, which are shared by all Grids
        var commonSettings = {
            dataSource: {
                data: products,
                schema: {
                    model: {
                        id: "ID",
                        fields: {
                            ID: { type: "number" },
                            ProductName: { },
                            UnitsInStock: { type: "number" },
                            Discontinued: { type: "boolean" }
                        }
                    }
                }
            },
            sortable: true,
            columns: [
                { field: "ProductName", title: "Product Name" },
                { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
                { field: "Discontinued", width: "120px" }
            ]
        };

        var rowTemplateString = '<tr class="#: Discontinued ? "discontinued" : "" #" data-uid="#: uid #">' +
            '<td>#: ProductName #</td>' +
            '<td class="#: getUnitsInStockClass(UnitsInStock) #">#: UnitsInStock #</td>' +
            '<td>#: Discontinued #</td>' +
        '</tr>';

        var altRowTemplateString = rowTemplateString.replace('tr class="', 'tr class="k-alt ');

        function getUnitsInStockClass(units) {
            if (units < 5) {
                return "critical";
            } else if (units < 10) {
                return "warning";
            } else {
                return "ok";
            }
        }

        $(document).ready(function () {
            $("#grid-rowtemplate").kendoGrid($.extend({
                rowTemplate: rowTemplateString,
                altRowTemplate: altRowTemplateString
            }, commonSettings));

            $("#grid-databound-rows").kendoGrid($.extend({
                dataBound: function(e) {
                    // get the index of the UnitsInStock cell
                    var columns = e.sender.columns;
                    var columnIndex = this.wrapper.find(".k-grid-header [data-field=" + "UnitsInStock" + "]").index();

                    // iterate the table rows and apply custom row and cell styling
                    var rows = e.sender.tbody.children();
                    for (var j = 0; j < rows.length; j++) {
                        var row = $(rows[j]);
                        var dataItem = e.sender.dataItem(row);

                        var units = dataItem.get("UnitsInStock");
                        var discontinued = dataItem.get("Discontinued");

                        if (discontinued) {
                            row.addClass("discontinued");
                        }

                        var cell = row.children().eq(columnIndex);
                        cell.addClass(getUnitsInStockClass(units));
                    }
                }
            }, commonSettings));

            $("#grid-databound-dataitems").kendoGrid($.extend({
                dataBound: function(e) {
                    // get the index of the UnitsInStock cell
                    var columns = e.sender.columns;
                    var columnIndex = this.wrapper.find(".k-grid-header [data-field=" + "UnitsInStock" + "]").index();

                    // iterate the data items and apply row styles where necessary
                    var dataItems = e.sender.dataSource.view();
                    for (var j = 0; j < dataItems.length; j++) {
                        var units = dataItems[j].get("UnitsInStock");
                        var discontinued = dataItems[j].get("Discontinued");

                        var row = e.sender.tbody.find("[data-uid='" + dataItems[j].uid + "']");
                        if (discontinued) {
                            row.addClass("discontinued");
                        }

                        var cell = row.children().eq(columnIndex);
                        cell.addClass(getUnitsInStockClass(units));
                    }
                }
            }, commonSettings));

        });
    </script>

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
* [How to Load and Append More Records While Scrolling Down]({% slug howto_loadand_append_morerecords_while_scrollingdown_grid %})
* [How to Perform CRUD Operations with Local Storage Data]({% slug howto_perform_crud_operationswith_local_storage_data_grid %})
* [How to Persist Expanded Rows after Refresh]({% slug howto_persist_expanded_rows_afetrrefresh_grid %})
* [How to Set Cell Color Based on ForeignKey Values]({% slug howto_set_cell_color_basedon_foreignkey_values_grid %})
* [How to Show Tooltip for Column Records]({% slug howto_show_tooltipfor_column_records_grid %})
* [How to Update Toolbar Content Using MVVM Binding]({% slug howto_update_toolbar_content_using_mvvmbinding_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
