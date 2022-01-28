---
title: Excel
page_title: jQuery PivotGrid Documentation | Excel Export
description: "Get started with the jQuery PivotGrid by Kendo UI and learn how to export a Kendo UI PivotGrid to Excel."
slug: excelexport_functionality_pivotgrid
position: 1
---

# Excel Export

The PivotGrid enables you to export its content to Excel.

By default, the Excel export is enabled when `kendo.ooxml.min.js` is loaded on the page. `kendo.ooxml.min.js` is included in `kendo.all.min.js` and `kendo.web.min.js`.

To initiate Excel export by using code, call the [`saveAsExcel`](/api/javascript/ui/pivotgrid/methods/saveasexcel) method.

For more information, refer to the following resources:
* [Configuring the export to Excel](/api/javascript/ui/pivotgrid/configuration/excel)
* [Exporting the PivotGrid to Excel (demo)](https://demos.telerik.com/kendo-ui/pivotgrid/excel-export)

## Exporting the Content

By default, the PivotGrid exports the current data with the applied sorting and filtering functionalities. The PivotGrid does not export the current CSS theme in the Excel file. For more information on changing the visual appearance of the Excel document, refer to the [following section on customization](#customizing-the-appearance).

The [`dataCellTemplate`](/api/javascript/ui/pivotgrid/configuration/datacelltemplate), [`columnHeaderTemplate`](/api/javascript/ui/pivotgrid/configuration/columnheadertemplate), and the [`rowHeaderTemplate`](/api/javascript/ui/pivotgrid/configuration/rowheadertemplate) options are not used during the export to Excel. For more information, refer to the [following section on templates](#using-templates).

## Customizing the Appearance

[`excelExport`](/api/javascript/ui/grid/events/excelexport) allows the customization of the generated Excel document. The workbook event argument exposes the generated Excel workbook configuration. For more information on how the Excel documents work, refer to the article on [Excel export in Kendo UI for jQuery]({% slug introduction_excelexport_kendoui %}).

## Using Templates

The PivotGrid does not use [`dataCellTemplate`](/api/javascript/ui/pivotgrid/configuration/datacelltemplate), [`columnHeaderTemplate`](/api/javascript/ui/pivotgrid/configuration/columnheadertemplate), and [`rowHeaderTemplate`](/api/javascript/ui/pivotgrid/configuration/rowheadertemplate) during Excel export and exports only its data because the templates may contain arbitrary HTML which cannot be converted to Excel column values.

## Troubleshooting

### A "JSZip Is Not Found" JavaScript error is thrown

If the JSZip JavaScript library is not found, an exception is thrown when you click the **Export to Excel** button or call `saveAsExcel`. To work around this issue, include JSZip in the page. For more information, refer to the [introductory topic on exporting to Excel]({% slug introduction_excelexport_kendoui %}#requirements).

### Excel Export is not working in Internet Explorer and Safari

Internet Explorer 10 and earlier and Safari do not support file saving. These browsers require the implementation of a [server proxy]({% slug overview_savingfiles_kendoui %}#browser-support). To specify the URL of the server proxy, set the [`proxyURL`](/api/javascript/ui/pivotgrid/configuration/excel.proxyurl) option.

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

## See Also

* [Exporting the PivotGrid to Excel (Demo)](https://demos.telerik.com/kendo-ui/pivotgrid/excel-export)
* [Creating Excel Documents with Kendo UI]({% slug introduction_excelexport_kendoui %})
* [Saving Files with Kendo UI]({% slug overview_savingfiles_kendoui %})
* [kendo.ooxml.Workbook](/api/javascript/ooxml/workbook)
* [PivotGrid JavaScript API Reference](/api/javascript/ui/pivotgrid)
* [Knowledge Base Section](/knowledge-base)
