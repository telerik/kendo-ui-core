---
title: Selection Export
page_title: jQuery Grid Documentation | Selection Export
description: "The jQuery Grid by Kendo UI allows you to select cells and then export them. This article explains the steps required to configure and use the widget."
slug: exporting_selection_kendoui_grid
position: 4
---

# Selection Export

The Grid widget allows users to select specific cells and then to export them to Excel or a Kendo UI Chart.

For runnable example, refer to the [Demo on copying/exporting selected cells](https://demos.telerik.com/kendo-ui/grid/advanced-export).

## Getting Started

The following sections provide step-by-step instructions and examples on getting started with the Grid Selection Export functionality.

### Enabling Excel Export

1. Include the JSZip script on the page. For more information, refer to the article with the [requirements]({% slug introduction_excelexport_kendoui %}#requirements).

1. Set the [selectable](/api/javascript/ui/grid/configuration/selectable) option of the grid to `multiple, cell`.

### Copying Selected Data

To enable users to copy the selected data, call the [`copySelectionToClipboard`](/api/javascript/ui/grid/methods/copyselectiontoclipboard) method.

```dojo
<script src="../content/shared/js/orders.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.min.js"></script>
<div id="example">
    <div class="configurator">
        <div class="box-col">
            <h4>Information</h4>
            <p>Select the cells you want to copy or export and click on one of the toolbar buttons.</p>
        </div>
    </div>
    <div id="grid"></div>

    <script>
        $(document).ready(function () {
            $("#grid").kendoGrid({
                dataSource: {
                    data: orders,
                    pageSize: 5
                },
                selectable: "multiple cell",
                pageable: true,
                toolbar: [
                    {
                        template: '<a class="k-button" href="\\#" onclick="copySelected()"><span class="k-icon k-i-copy"></span>Copy Selected</a>'
                    }
                ],
                scrollable: false,
                navigatable: true,
                columns: [
                    {
                        field: "OrderID",
                        title: "Order ID",
                        width: 150
                    },
                    {
                        field: "ShipCountry",
                        title: "Ship Country",
                        width: 300
                    },
                    {
                        field: "ShipCity",
                        title: "ShipCity",
                        width: 300
                    },
                    {
                        field: "Freight",
                        width: 300
                    },
                    {
                        field: "OrderDate",
                        title: "Order Date",
                        format: "{0:dd/MM/yyyy}"
                    }
                ]
            });
        });

        function copySelected() {
            var grid = $("#grid").data("kendoGrid");
            let selected = grid.select();
            // Set to true in order to copy the headers as well.
            grid.copySelectionToClipboard(false);
        }
</div>
```

### Exporting Selected Data to Chart

To enable users to export the selected data to a Kendo UI Chart, call the [`getSelectedData`](/api/javascript/ui/grid/methods/getselecteddata) method and initialize a Chart widget with the data.

```dojo
<script src="../content/shared/js/orders.js"></script>
<script src="http://kendo.cdn.telerik.com/2021.1.224/js/jszip.min.js"></script>
<div id="example">
    <div class="configurator">
        <div class="box-col">
            <h4>Information</h4>
            <p>Select the cells you want to copy or export and click on one of the toolbar buttons.</p>
        </div>
    </div>
    /* Add a div that will hold the chart widget. */
    <div id="chart-container"></div>
    <div id="grid"></div>

    <script>
        $(document).ready(function () {
            $("#grid").kendoGrid({
                dataSource: {
                    data: orders,
                    pageSize: 20
                },
                selectable: "multiple cell",
                pageable: true,
                toolbar: [
                    {
                        template: '<a class="k-button" href="\\#" onclick="exportToChart()"><span class="k-icon k-i-column-clustered"></span> Export to Chart</a>'
                    }
                ],
                scrollable: false,
                navigatable: true,
                columns: [
                    {
                        field: "OrderID",
                        title: "Order ID",
                        width: 150
                    },
                    {
                        field: "ShipCountry",
                        title: "Ship Country",
                        width: 300
                    },
                    {
                        field: "ShipCity",
                        title: "ShipCity",
                        width: 300
                    },
                    {
                        field: "Freight",
                        width: 300
                    }
                ]
            });
        });

        function exportToChart() {
            var grid = $('#grid').data('kendoGrid');

            var container = $('#chart-container');

            /* Get a reference to the Kendo Window widget if it has been initialized. */
            var windowInstance = $('#chart-container').data('kendoWindow');
            var currInstance = container.find('.k-chart').data('kendoChart');

            /* Get the data from the selected cells. */
            var data = grid.getSelectedData();
            var categoryField;
            
            if (!data.length) {
                kendo.alert('Please select cells before exporting.');
                return;
            }

            /* Set the categoryField of the chart using one of the grid fields. */
            categoryField = data[0].ShipCountry ? 'ShipCountry' : 'ShipCity';

            /* If the Kendo Window widget is undefined, initialize it. */
            if (!windowInstance) {
                windowInstance = container.kendoWindow({ width: 800 }).data('kendoWindow');
            }

            /* If the chart widget already exists, destroy it. */
            if (currInstance) {
                currInstance.destroy();
            }

            /* Empty the div element. */
            container.empty();
            /* Append an empty div to the container. */
            var element = $('<div></div>').appendTo(container);
            windowInstance.open().center();

            /* Initialize a Chart from the appended div. */
            element.kendoChart({
                series: [{
                    type: "column",
                    categoryField: categoryField,
                    field: 'Freight',
                    data: data
                }]
            });
        }
    </script>
</div>
```

### Exporting Selected Data

To enable users to export the selected data, call the [`exportSelectedToExcel`](/api/javascript/ui/grid/methods/exportselectedtoexcel) method.

```dojo
<script src="../content/shared/js/orders.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.min.js"></script>
<div id="example">
    <div class="configurator">
        <div class="box-col">
            <h4>Information</h4>
            <p>Select the cells you want to copy or export and click on one of the toolbar buttons.</p>
        </div>
    </div>
    <div id="grid"></div>

    <script>
        $(document).ready(function () {
            $("#grid").kendoGrid({
                dataSource: {
                    data: orders,
                    pageSize: 5
                },
                selectable: "multiple cell",
                pageable: true,
                toolbar: [
                    {
                        template: '<a class="k-button" href="\\#" onclick="exportSelected()"><span class="k-icon k-i-excel"></span>Export Selected</a>'
                    }
                ],
                scrollable: false,
                navigatable: true,
                columns: [
                    {
                        field: "OrderID",
                        title: "Order ID",
                        width: 150
                    },
                    {
                        field: "ShipCountry",
                        title: "Ship Country",
                        width: 300
                    },
                    {
                        field: "ShipCity",
                        title: "ShipCity",
                        width: 300
                    },
                    {
                        field: "Freight",
                        width: 300
                    },
                    {
                        field: "OrderDate",
                        title: "Order Date",
                        format: "{0:dd/MM/yyyy}"
                    }
                ]
            });
        });

        function exportSelected() {
            var grid = $("#grid").data("kendoGrid");
            let selected = grid.select();
            // Set to true in order to export the headers as well.
            grid.exportSelectedToExcel(false);
        }
</div>
```

## See Also

* [Copying and Exporting the selected data to Excel (Demo)](https://demos.telerik.com/kendo-ui/grid/advanced-export)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)