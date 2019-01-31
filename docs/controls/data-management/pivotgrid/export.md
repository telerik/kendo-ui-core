---
title: Exporting
page_title: Exporting | Kendo UI PivotGrid
description: "Learn how to export a Kendo UI PivotGrid to Excel and in PDF."
slug: exporting_functionality_pivotgridwidget
position: 3
---

# Exporting

As of the Kendo UI 2015 Q1 release and later, the PivotGrid provides a built-in PDF and Excel export functionality.

## PDF Export

PDF export is enabled by default when `kendo.all.min.js`, `kendo.web.min.js`, or a custom build that includes PDF scripts are loaded on the page. To set up PDF export, refer to [the PDF configuration option](/api/javascript/ui/pivotgrid/configuration/pdf).

> **Important**
>
> Exporting in older browsers, such as Internet Explorer 9 or Safari, requires the implementation of a server proxy. For more information, refer to the [`proxyUrl` configuration sections](/api/javascript/ui/pivotgrid/configuration/pdf).

## Excel Export

### Setup

The Excel export is enabled by default when `kendo.ooxml.min.js` is loaded on the page. Note that `kendo.ooxml.min.js` is included in `kendo.all.min.js` and `kendo.web.min.js`. To set up the export to Excel, refer to the following configuration knowledge sources:

* [Excel Export Configuration](/api/javascript/ui/pivotgrid/configuration/excel)
* [Online Demo](http://demos.telerik.com/kendo-ui/pivotgrid/excel-export)

To initiate Excel export by using code, call the [`saveAsExcel`](/api/javascript/ui/pivotgrid/methods/saveasexcel) method.

### Features

#### Exported Content

By default, the PivotGrid exports the current data with the sorting and filtering functionalities applied. The widget does not export the current CSS theme in the Excel file. For more information on how to change the visual appearance of the Excel document, refer to the section about [the Excel customization](#customize-the-excel-document) below.

The [`dataCellTemplate`](/api/javascript/ui/pivotgrid/configuration/datacelltemplate), [`columnHeaderTemplate`](/api/javascript/ui/pivotgrid/configuration/columnheadertemplate), and the [`rowHeaderTemplate`](/api/javascript/ui/pivotgrid/configuration/rowheadertemplate) options are not used during export. For more information on this, refer to the following section on [templates](#templates).

### Excel Customization

The [`excelExport`](/api/javascript/ui/grid/events/excelexport) event allows the customization of the generated Excel document. The `workbook` event argument exposes the generated Excel workbook configuration. For a better understanding about how Excel documents work, refer to the [introductory topic on Excel]({% slug introduction_excelexport_kendoui %}#create-excel-document).

### Templates

The PivotGrid does not use [`dataCellTemplate`](/api/javascript/ui/pivotgrid/configuration/datacelltemplate), [`columnHeaderTemplate`](/api/javascript/ui/pivotgrid/configuration/columnheadertemplate), and [`rowHeaderTemplate`](/api/javascript/ui/pivotgrid/configuration/rowheadertemplate) during Excel export. It exports only the data. The reason for this is that the templates may contain arbitrary HTML which cannot be converted to Excel column values.

## Troubleshooting

### "JSZip Is Not Found" JavaScript Error Is Thrown

If the JSZip JavaScript library is not found, an exception is thrown when you click the **Export to Excel** button or call `saveAsExcel`. To work around this issue, include JSZip in the page. For more information, refer to the [introductory topic on exporting to Excel]({% slug introduction_excelexport_kendoui %}#requirements).

### Export Is Not Working in Internet Explorer and Safari

Internet Explorer 10 or older versions and Safari do not support the option of file saving. These browsers require the implementation of a [server proxy]({% slug overview_savingfiles_kendoui %}#browser-support). To specify the URL of the server proxy, set the [`proxyURL`](/api/javascript/ui/pivotgrid/configuration/excel.proxyurl) option.

###### Example

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

## Further Reading

* [Learn More about Creating Excel Documents with Kendo UI]({% slug introduction_excelexport_kendoui %})
* [Learn How to Save Files with Kendo UI]({% slug overview_savingfiles_kendoui %})
* [API Reference: `kendo.ooxml.Workbook`](/api/javascript/ooxml/workbook)

## See Also

* [Overview]({% slug overview_kendoui_pivotgrid_widget %})
* [PivotConfigurator]({% slug overview_kendoui_pivotconfigurator_pivotgridwidget %})
* [Fundamentals]({% slug fundamentals_pivotgrid_widget %})
* [OLAP Cube Setup]({% slug olap_cube_setup_pivotgrid_widget %})
* [Frequently Asked Questions]({% slug frequently_asked_questions_pivotgrid %})
* [How-To Examples]({% slug howto_change_pivotgrid_fields_names_pivotgrid %})
* [Knowledge Base Section](/knowledge-base)
