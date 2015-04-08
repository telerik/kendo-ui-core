---
title: Style Grid rows and cells based on data item values
page_title: Style Grid rows and cells based on data item values
description: Style Grid rows and cells based on data item values
---

# Style Grid rows and cells, based on data item values

The example below shows three different ways to customize Grid cells and rows, based on data items values.
Custom CSS classes are applied in this case, but the same approach can be used to apply inline styles or any other HTML attributes.

The three options are:

* Use a row template. This approach is the best if hierarchy, grouping, editing and frozen columns are **not** used.
* Use a databound handler and iterate the **table rows**. This approach is better if **all** rows will be customized.
* Use a databound handler and iterate the **data items**. This approach is better if only **some** rows will be customized.

#### Example

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
                    var columnIndex = 0;
                    for (var j = 0; j < columns.length; j++) {
                        if (columns[j].field == "UnitsInStock") {
                            break;
                        }
                        columnIndex++;
                    }
                    
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
                    var columnIndex = 0;
                    for (var j = 0; j < columns.length; j++) {
                        if (columns[j].field == "UnitsInStock") {
                            break;
                        }
                        columnIndex++;
                    }
                    
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
