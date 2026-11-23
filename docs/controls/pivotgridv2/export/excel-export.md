---
title: Excel Export
page_title: jQuery PivotGridV2 Documentation - Excel Export
description: "Get started with the jQuery PivotGridV2 by Kendo UI and learn how to export a Kendo UI PivotGridV2 to Excel."
components: ["pivotgridv2"]
slug: excelexport_kendoui_pivotgridv2
position: 1
---

# Excel Export

The PivotGridV2 provides a built-in Excel export functionality.

The Excel export requires the JSZip library. For more information, refer to the [requirements for the Excel export]({% slug introduction_excelexport_kendoui %}#requirements).

## Exporting the Content

To export the PivotGridV2, call its [`saveAsExcel()`](/api/ui/pivotgridv2/methods/saveasexcel) method. To configure the file name, the Excel filter, and the server proxy, use the [`excel`](/api/ui/pivotgridv2/configuration/excel) configuration options.

Set [`columnWidth`](/api/ui/pivotgridv2/configuration/columnwidth) to specify the width of the exported data columns.

```dojo
<button id="export">Export to Excel</button>
<div id="pivotgrid"></div>
<script>
  $("#pivotgrid").kendoPivotGridV2({
    height: 300,
    columnWidth: 120,
    excel: {
      fileName: "Sales.xlsx"
    },
    dataSource: {
      data: [
        { Region: "North", Quarter: "Q1", Amount: 120 },
        { Region: "North", Quarter: "Q2", Amount: 80 },
        { Region: "South", Quarter: "Q1", Amount: 95 },
        { Region: "South", Quarter: "Q2", Amount: 110 }
      ],
      schema: {
        cube: {
          dimensions: {
            Region: { caption: "All Regions" },
            Quarter: { caption: "All Quarters" }
          },
          measures: {
            "Total Amount": { field: "Amount", aggregate: "sum" }
          }
        }
      },
      columns: [{ name: "Quarter", expand: true }],
      rows: [{ name: "Region", expand: true }],
      measures: ["Total Amount"]
    }
  });

  $("#export").kendoButton({
    icon: "file-excel",
    click: function () {
      $("#pivotgrid").data("kendoPivotGridV2").saveAsExcel();
    }
  });
</script>
```

The exported file contains the row and column headers that are currently expanded and the values of the data cells. The PivotGridV2 exports the cell values, not their formatted text, and does not apply the [`dataCellTemplate`](/api/ui/pivotgridv2/configuration/datacelltemplate) during the export. Numeric values are exported as numbers.

## Customizing the Exported File

The [`excelExport`](/api/ui/pivotgridv2/events/excelexport) event fires before the PivotGridV2 saves the file. Its `workbook` argument exposes the generated [workbook configuration](/api/ooxml/workbook#configuration), so you can change the file name, the cell values, or the cell styles before the file is saved. To prevent the saving of the file, call `e.preventDefault()`.

In the workbook, the header rows have a `type` of `header` and the data rows have a `type` of `data`. Each data row starts with its row header cells and ends with the data cells. Because the row headers are merged, the number of cells before the data cells can differ between the data rows.

The following example sets the file name and changes the background and text colors of the column header rows.

```dojo
<button id="export">Export to Excel</button>
<div id="pivotgrid"></div>
<script>
  $("#pivotgrid").kendoPivotGridV2({
    height: 300,
    columnWidth: 120,
    excelExport: function (e) {
      e.workbook.fileName = "SalesReport.xlsx";

      e.workbook.sheets[0].rows.forEach(function (row) {
        if (row.type === "header") {
          row.cells.forEach(function (cell) {
            cell.background = "#1f4e78";
            cell.color = "#ffffff";
          });
        }
      });
    },
    dataSource: {
      data: [
        { Region: "North", Quarter: "Q1", Amount: 120 },
        { Region: "North", Quarter: "Q2", Amount: 80 },
        { Region: "South", Quarter: "Q1", Amount: 95 },
        { Region: "South", Quarter: "Q2", Amount: 110 }
      ],
      schema: {
        cube: {
          dimensions: {
            Region: { caption: "All Regions" },
            Quarter: { caption: "All Quarters" }
          },
          measures: {
            "Total Amount": { field: "Amount", aggregate: "sum" }
          }
        }
      },
      columns: [{ name: "Quarter", expand: true }],
      rows: [{ name: "Region", expand: true }],
      measures: ["Total Amount"]
    }
  });

  $("#export").kendoButton({
    icon: "file-excel",
    click: function () {
      $("#pivotgrid").data("kendoPivotGridV2").saveAsExcel();
    }
  });
</script>
```

For an example that changes the exported values of specific data cells to match the `dataCellTemplate`, refer to the [Displaying and Exporting a Source Field Value in PivotGridV2 Data Cells]({% slug pivotgridv2-raw-field-display-and-excel %}) article.

## See Also

* [Exporting the PivotGridV2 to Excel (Demo)](https://demos.telerik.com/kendo-ui/pivotgridv2/excel-export)
* [Creating Excel Documents with Kendo UI]({% slug introduction_excelexport_kendoui %})
* [Saving Files with Kendo UI]({% slug overview_savingfiles_kendoui %})
* [PivotGridV2 JavaScript API Reference](/api/ui/pivotgridv2)
