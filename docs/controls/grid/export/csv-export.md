---
title: CSV Export
page_title: jQuery Grid Documentation - CSV Export
description: "Get started with the jQuery Grid by Kendo UI and learn how to configure the CSV export functionality."
components: ["grid"]
slug: exporting_csv_kendoui_grid_widget
position: 2
---

# CSV Export

The Grid component provides built-in CSV export functionality.

For a runnable example, refer to the [demo on exporting the Grid to CSV](https://demos.telerik.com/kendo-ui/grid/csv-export).

## Getting Started

To enable CSV export:

1. Include the corresponding toolbar command and set the CSV settings.
    * [Toolbar configuration](/api/javascript/ui/grid/configuration/toolbar)
    * [CSV export configuration](/api/javascript/ui/grid/configuration/csv)
1. To trigger export through code, call the [`saveAsCSV`](/api/javascript/ui/grid/methods/saveascsv) method.

By default, the Grid exports the current page of data with the current sorting, filtering, grouping, and column state.

The following example demonstrates how to enable CSV export from the toolbar.

```dojo
    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            toolbar: ["csv"],
            csv: {
                fileName: "Kendo UI Grid Export.csv"
            },
            dataSource: {
                transport: {
                    read: "https://demos.telerik.com/service/v2/core/Products"
                },
                pageSize: 7
            },
            sortable: true,
            pageable: true,
            columns: [
                { field: "ProductName", title: "Product Name" },
                { field: "UnitPrice", title: "Unit Price" },
                { field: "UnitsOnOrder", title: "Units On Order" },
                { field: "UnitsInStock", title: "Units In Stock" }
            ]
        });
    </script>
```

## Configuration

With regard to its CSV export, the Grid enables you to:

* [Export all pages](#exporting-all-pages)
* [Customize CSV output options](#customizing-csv-options)
* [Export selected rows](#exporting-selected-rows)
* [Customize the generated CSV string](#customizing-the-generated-csv)

### Exporting All Pages

By default, the Grid exports only the current page. To export all pages, set [`csv.allPages`](/api/javascript/ui/grid/configuration/csv.allpages) to `true`.

```dojo
    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            toolbar: ["csv"],
            csv: {
                fileName: "Products.csv",
                allPages: true
            },
            dataSource: {
                transport: {
                    read: "https://demos.telerik.com/service/v2/core/Products"
                },
                pageSize: 10
            },
            pageable: true,
            columns: [
                { field: "ProductName", title: "Product Name" },
                { field: "UnitPrice", title: "Unit Price" },
                { field: "UnitsOnOrder", title: "Units On Order" },
                { field: "UnitsInStock", title: "Units In Stock" }
            ]
        });
    </script>
```

> When `allPages` is enabled and remote paging is used, the Grid requests all data before exporting.

### Customizing CSV Options

You can customize the exported CSV through the [`csv`](/api/javascript/ui/grid/configuration/csv) configuration:

* [`csv.delimiter`](/api/javascript/ui/grid/configuration/csv.delimiter)
* [`csv.lineSeparator`](/api/javascript/ui/grid/configuration/csv.lineseparator)
* [`csv.includeUTF8BOM`](/api/javascript/ui/grid/configuration/csv.includeutf8bom)
* [`csv.preventFormulaInjection`](/api/javascript/ui/grid/configuration/csv.preventformulainjection)
* [`csv.maxCellLength`](/api/javascript/ui/grid/configuration/csv.maxcelllength)

The following example demonstrates a custom delimiter, custom line separator, UTF-8 BOM, and formula injection protection.

```dojo
    <button id="export">Export to CSV</button>
    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            csv: {
                fileName: "Transactions.csv"
            },
            dataSource: {
                transport: {
                    read: "https://demos.telerik.com/service/v2/core/Customers"
                },
                pageSize: 10
            },
            pageable: true,
            columns: [
                { field: "ContactName", title: "Contact Name" },
                { field: "ContactTitle", title: "Contact Title" },
                { field: "CompanyName", title: "Company Name" },
                { field: "Country", title: "Country" }
            ]
        });

        $("#export").on("click", function() {
            var grid = $("#grid").data("kendoGrid");

            grid.setOptions({
                csv: $.extend({}, grid.options.csv, {
                    delimiter: ";",
                    lineSeparator: "\n",
                    includeUTF8BOM: true,
                    preventFormulaInjection: true,
                    maxCellLength: 32767
                })
            });

            grid.saveAsCSV();
        });
    </script>
```

### Exporting Selected Rows

To export only selected rows, enable row selection and call [`exportSelectedToCSV`](/api/javascript/ui/grid/methods/exportselectedtocsv).

```dojo
    <button id="exportSelected">Export Selected to CSV</button>
    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            persistSelection: true,
            selectable: "multiple, row",
            dataSource: {
                transport: {
                    read: "https://demos.telerik.com/service/v2/core/Customers"
                },
                schema: {
                    model: {
                        id: "CustomerID"
                    }
                },
                pageSize: 10
            },
            pageable: true,
            columns: [
                { selectable: true, width: 50 },
                { field: "ContactName", title: "Contact Name" },
                { field: "ContactTitle", title: "Contact Title" },
                { field: "CompanyName", title: "Company Name" },
                { field: "Country", title: "Country" }
            ]
        });

        $("#exportSelected").on("click", function() {
            var grid = $("#grid").data("kendoGrid");
            grid.exportSelectedToCSV(true);
        });
    </script>
```

### Customizing the Generated CSV

Use the [`csvExport`](/api/javascript/ui/grid/events/csvexport) event to inspect or modify the generated CSV string.

```dojo
    <div id="grid"></div>
    <pre id="csvPreview"></pre>
    <script>
        $("#grid").kendoGrid({
            toolbar: ["csv"],
            csv: {
                fileName: "CustomizedExport.csv"
            },
            dataSource: {
                transport: {
                    read: "https://demos.telerik.com/service/v2/core/Products"
                },
                pageSize: 10
            },
            csvExport: function(e) {
                var header = "# Product Report\r\n#\r\n";
                var footer = "\r\n# End of Report";

                e.csv = header + e.csv + footer;
                $("#csvPreview").text(e.csv);
            },
            pageable: true,
            columns: [
                { field: "ProductName", title: "Product Name" },
                { field: "UnitPrice", title: "Unit Price" },
                { field: "UnitsOnOrder", title: "Units On Order" },
                { field: "UnitsInStock", title: "Units In Stock" }
            ]
        });
    </script>
```

## Known Limitations

* When exporting all pages with large remote datasets, the browser may become unresponsive.
* Older browsers may require a server proxy. Configure [`csv.proxyURL`](/api/javascript/ui/grid/configuration/csv.proxyurl) and [`csv.forceProxy`](/api/javascript/ui/grid/configuration/csv.forceproxy) when needed.
* The [`saveAsCSV`](/api/javascript/ui/grid/methods/saveascsv) method does not trigger the [`csvExport`](/api/javascript/ui/grid/events/csvexport) event.

## See Also

* [Grid CSV Export Demo](https://demos.telerik.com/kendo-ui/grid/csv-export)
* [Grid Excel Export]({% slug exporting_excel_kendoui_grid_widget %})
* [Grid PDF Export]({% slug exporting_pdf_kendoui_grid_widget %})
* [Grid Selection & Export]({% slug exporting_selection_kendoui_grid %})
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)