---
title: Exporting
page_title: Exporting | Kendo UI PivotGrid
description: "Learn how to export a Kendo UI PivotGrid to Excel and in PDF."
slug: exporting_functionality_pivotgridwidget
position: 3
---

# Exporting

As of Kendo UI 2015 Q1 and newer versions, the PivotGrid widget provides a built-in PDF and Excel export functionality.

## PDF Export

PDF export is enabled by default when `kendo.all.min.js`, `kendo.web.min.js`, or a custom build that includes PDF scripts are loaded on the page. To set up PDF export, refer to [the PDF configuration option](/api/javascript/ui/pivotgrid#configuration-pdf).

> **Important**  
> * Exporting in older browsers, such as Internet Explorer 9 and older, or Safari, requires the implementation of a server proxy. For more information, see the [`proxyUrl` configuration sections above](/api/javascript/ui/pivotgrid#configuration-pdf).
> * PDF export is not supported in Internet Explorer 8 and older browser versions.

## Excel Export

### Enable Export

The Excel export is enabled by default when `kendo.ooxml.min.js` is loaded on the page. Note that `kendo.ooxml.min.js` is included in `kendo.all.min.js` and `kendo.web.min.js`. To setup the export to Excel, refer to the following configuration knowledge sources:

* [Excel Export Configuration](/api/javascript/ui/pivotgrid#configuration-excel)
* [Online Demo](http://demos.telerik.com/kendo-ui/pivotgrid/excel-export)

To initiate Excel export  via code, call the [`saveAsExcel`](/api/javascript/ui/pivotgrid.html#methods-saveAsExcel) method.

### Features

#### Exported Content

With the default configuration, Kendo UI PivotGrid exports the current data with the sorting and filtering functionalities applied.

The PivotGrid widget does not export the current CSS theme in the Excel file.

For more information on how to change the visual appearance of the Excel document, see the section about [the Excel customizaion](#customize-the-excel-document) below.

The [`dataCellTemplate`](/api/javascript/ui/pivotgrid#configuration-dataCellTemplate), [`columnHeaderTemplate`](/api/javascript/ui/pivotgrid#configuration-columnHeaderTemplate), and
the [`rowHeaderTemplate`](/api/javascript/ui/pivotgrid#configuration-rowHeaderTemplate) options are not used during export. For more information on this, see the section about the [templates](#templates) below.

### Excel Customization

The [`excelExport`](/api/javascript/ui/grid#events-excelExport) event allows customization of the generated Excel document. The `workbook` event argument exposes the generated Excel workbook configuration.

For a better understanding about how Excel documents work, check the [introductory help topic on Excel](/framework/excel/introduction#create-excel-document).

### Templates

Kendo UI PivotGrid does not use [`dataCellTemplate`](/api/javascript/ui/pivotgrid#configuration-dataCellTemplate), [`columnHeaderTemplate`](/api/javascript/ui/pivotgrid#configuration-columnHeaderTemplate), and [`rowHeaderTemplate`](/api/javascript/ui/pivotgrid#configuration-rowHeaderTemplate) during Excel export. It exports only the data. The reason for this is that the templates may contain arbitrary HTML which cannot be converted to Excel column values.

## Troubleshooting

### JavaScript "JSZip Is Not Found" Error

Clicking the **Export to Excel** button or calling the `saveAsExcel` throws an exception if the JSZip JavaScript library is not found. o solve this issue, include JSZip in the page. For more information on this, see the [introductory help topic about exporting to Excel](/framework/excel/introduction#requirements).  

### Export Not Working in Internet Explorer and Safari

Internet Explorer 10, or older, and Safari do not support the option of file saving and require the implementation of a [server proxy](/framework/save-files/introduction#browser-support). Set the [`proxyURL`](/api/javascript/ui/pivotgrid#configuration-excel.proxyURL) option to specify the server proxy URL.

The example below demonstrates how to specify the server proxy URL.

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
                    read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
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

* [Learn More about Creating Excel Documents with Kendo UI]({% slug introduction_excelexport_kendoui %}})
* [Learn How to Save Files with Kendo UI]({% slug overview_savingfiles_kendoui %})
* [API Reference: `kendo.ooxml.Workbook`](/api/javascript/ooxml/Workbook)

## See Also

Other articles on the Kendo UI PivotGrid:

* [Overview]({% slug overview_kendoui_pivotgrid_widget %})
* [PivotConfigurator]({% slug overview_kendoui_pivotconfigurator_pivotgridwidget %})
* [Fundamentals]({% slug fundamentals_pivotgrid_widget %})
* [OLAP Cube Setup]({% slug olap_cube_setup_pivotgrid_widget %})
* [Frequently Asked Questions]({% slug frequently_asked_questions_pivotgrid %})

For how-to examples on the Kendo UI PivotGrid widget, browse its [**How To** documentation folder]({% slug howto_add_dimension_column_axis_pivotgrid %}).
