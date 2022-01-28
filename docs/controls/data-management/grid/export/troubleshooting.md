---
title: Troubleshooting
page_title: jQuery Grid Documentation | Export Troubleshooting
description: "Get started with the jQuery Grid by Kendo UI and learn how to solve issues you might encounter while exporting the content of the Grid to Excel."
slug: exporttroubleshoot_kendoui_grid_widget
position: 80
---

# Export Troubleshooting

This article provides solutions for issues you might encounter while exporting the content of the Grid to Excel.

* [JavaScript error that JSZip is not found is thrown](#javascript-error-that-jszip-is-not-found-is-thrown)
* [Excel export is not working in Internet Explorer and Safari](#excel-export-is-not-working-in-internet-explorer-and-safari)

## JavaScript error that JSZip is not found is thrown

Clicking **Export to Excel** or calling the `saveAsExcel` throws an exception if the JSZip JavaScript library is not found. To solve this issue, include JSZip in the page. For more information, refer to [the introductory article on Excel export]({% slug exporting_excel_kendoui_grid_widget %}).

## Excel export is not working in Internet Explorer and Safari

Internet Explorer 9 and Safari do not support the option for saving a file and require the implementation of a [server proxy]({% slug overview_savingfiles_kendoui %}#browser-support). To work around this issue, set the [`proxyURL`](/api/javascript/ui/grid/configuration/excel.proxyurl) option to specify the server proxy URL.

```dojo
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.min.js"></script>

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            toolbar: ["excel"],
            excel: {
                fileName: "Kendo UI Grid Export.xlsx",
                proxyURL: "/proxy"
            },
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                },
                pageSize: 7
            },
            sortable: true,
            pageable: true,
            columns: [
                { width: 300, field: "ProductName", title: "Product Name" },
                { field: "UnitsOnOrder", title: "Units On Order" },
                { field: "UnitsInStock", title: "Units In Stock" }
            ]
        });
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Editing Functionality of the Grid]({% slug editing_kendoui_grid_widget %})
* [Rendering and Dimensions of the Grid]({% slug width_kendoui_grid_widget %})
* [Localization of Messages in the Grid]({% slug localization_kendoui_grid_widget %})
* [Adaptive Rendering of the Grid]({% slug adaptive_rendering_kendoui_grid_widget %})
* [Export of the Grid in PDF]({% slug exporting_pdf_kendoui_grid_widget %})
* [Printing of the Grid]({% slug exporting_pdf_kendoui_grid_widget %})
* [Knowledge Base Section](/knowledge-base)
