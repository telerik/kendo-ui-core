---
title: Excel
page_title: Excel Export
description: "Get started with the Telerik UI PivotGrid HtmlHelper for {{ site.framework }} and learn how to export a Telerik UI PivotGrid HtmlHelper for {{ site.framework }} to Excel."
slug: htmlhelpers_pivotgrid_aspnetcore_excelexport
position: 1
---

# Excel Export

The PivotGrid enables you to export its content to Excel.

By default, the Excel export is enabled when `kendo.ooxml.min.js` is loaded on the page. `kendo.ooxml.min.js` is included in `kendo.all.min.js` and `kendo.web.min.js`.

To initiate Excel export by using code, call the [`saveAsExcel`](https://docs.telerik.com/kendo-ui/api/javascript/ui/pivotgrid/methods/saveasexcel) method.

For more information, refer to the following resources:
* [Configuring the export to Excel](https://docs.telerik.com/kendo-ui/api/javascript/ui/pivotgrid/methods/saveasexcel)
* [Exporting the PivotGrid to Excel (demo)](https://demos.telerik.com/{{ site.platform }}/pivotgrid/excel-export)

## Exporting the Content

By default, the PivotGrid exports the current data with the applied sorting and filtering functionalities. The PivotGrid does not export the current CSS theme in the Excel file. For more information on changing the visual appearance of the Excel document, refer to the [following section on customization](#customizing-the-appearance).

The `dataCellTemplate`, `columnHeaderTemplate`, and the `rowHeaderTemplate` options are not used during the export to Excel. For more information, refer to the [following section on templates](#using-templates).

## Customizing the Appearance

`ExcelExport()` allows the customization of the generated Excel document. The workbook event argument exposes the generated Excel workbook configuration. For more information on how the Excel documents work, refer to the article on [Excel export in Kendo UI for jQuery](https://docs.telerik.com/kendo-ui/framework/excel/introduction).

To apply customizations during the export to Excel:

1. Attach an Excel export handler.

    @(Html.Kendo().PivotConfigurator()
        .Name("configurator")
        .Filterable(true)
        .Events(e => e.ExcelExport("excelExport"))
        .Height(570)
    )

1. In the handler, manipulate the generated workbook. The example alternates the [background color of the rows cells](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook/configuration/sheets.rows.cells.background).

        <script>
            function excelExport(e) {
                var sheet = e.workbook.sheets[0];
                for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
                    if (rowIndex % 2 == 0) {
                        var row = sheet.rows[rowIndex];
                        for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                            row.cells[cellIndex].background = "#aabbcc";
                        }
                    }
                }
            }
        </script>

## Using Templates

The PivotGrid does not use `dataCellTemplate`, `columnHeaderTemplate`, and `rowHeaderTemplate` during Excel export and exports only its data because the templates may contain arbitrary HTML which cannot be converted to Excel column values.

## See Also

* [Excel Export by the PivotGrid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pivotgrid/excel-export)
* [Server-Side API](/api/pivotgrid)
