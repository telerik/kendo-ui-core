---
title: Displaying and Exporting a Source Field Value in PivotGridV2 Data Cells
page_title: Show a Source Field Value Instead of the Aggregate in Cells and Excel - jQuery PivotGridV2
description: "Learn how to show a source field value, such as N/A, in the Kendo UI for jQuery PivotGridV2 data cells and in the exported Excel file."
type: how-to
slug: pivotgridv2-raw-field-display-and-excel
tags: pivotgridv2, pivotgrid, datacelltemplate, excelexport, excel, export, flat data, source field, raw value, n/a, cellinfo, aggregate
res_type: kb
components: ["pivotgridv2"]
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® PivotGridV2 for jQuery</td>
		</tr>
		<tr>
			<td>Version</td>
			<td>2026.4.1111</td>
		</tr>
	</tbody>
</table>

## Description

My PivotGridV2 is bound to flat data. Each record has a numeric field that the PivotGridV2 aggregates and a separate status field that marks some values as not applicable. How can I display `N/A` for these cells instead of the aggregated number, and how can I get the same `N/A` value in the exported Excel file?

This knowledge base article also answers the following questions:

- Why is a field of my source data not available in the PivotGridV2 `dataCellTemplate`?
- How can I change the value of a PivotGridV2 data cell in the exported Excel file?
- Why does the Excel file show a number when the `dataCellTemplate` renders text?

## Solution

When the PivotGridV2 is bound to flat data, every data cell represents an aggregated result. The [`dataCellTemplate`](/api/ui/pivotgridv2/configuration/datacelltemplate) receives the aggregated `dataItem` and the row and column tuples of the cell, not the source records. Fields that are not part of a measure, such as a status field, are therefore not available in the template. The Excel export uses the aggregated values and does not apply the template.

To show a source field value in both places:

1. Keep a reference to the source data array.
2. In the `dataCellTemplate`, read the row and column members of the cell from the tuples and find the matching source record. Leaf members have a `levelNum` greater than `0`, their `hierarchy` matches the dimension field, and their `caption` contains the field value. Total cells use the `All` member of the dimension instead.
3. In the [`excelExport`](/api/ui/pivotgridv2/events/excelexport) event handler, iterate the `data` rows of the workbook, use the [`cellInfo`](/api/ui/pivotgridv2/methods/cellinfo) method to get the tuples of each data cell, and update the value of the matching workbook cell. The data cells are the last cells of each workbook data row. The number of row header cells before them varies because of merged row headers.

The following example renders `N/A` in the cell and in the exported file for the record whose `AmountStatus` is `NotApplicable`. The total cells keep their aggregated values.

```dojo
<button id="export">Export to Excel</button>
<div id="pivotgrid"></div>
<script>
  var salesData = [
    { Region: "North", Quarter: "Q1", Amount: 120, AmountStatus: "Reported" },
    { Region: "North", Quarter: "Q2", Amount: 0, AmountStatus: "NotApplicable" },
    { Region: "South", Quarter: "Q1", Amount: 95, AmountStatus: "Reported" },
    { Region: "South", Quarter: "Q2", Amount: 110, AmountStatus: "Reported" }
  ];

  function memberCaption(tuple, field) {
    for (var i = 0; i < tuple.members.length; i++) {
      var member = tuple.members[i];

      if (member.hierarchy === field && member.levelNum > 0) {
        return member.caption;
      }
    }

    return null;
  }

  function isNotApplicable(rowTuple, columnTuple) {
    var region = memberCaption(rowTuple, "Region");
    var quarter = memberCaption(columnTuple, "Quarter");

    if (region === null || quarter === null) {
      return false;
    }

    return salesData.some(function (record) {
      return record.Region === region &&
        record.Quarter === quarter &&
        record.AmountStatus === "NotApplicable";
    });
  }

  $("#pivotgrid").kendoPivotGridV2({
    height: 300,
    columnWidth: 120,
    dataCellTemplate: function (data) {
      if (isNotApplicable(data.rowTuple, data.columnTuple)) {
        return "N/A";
      }

      return data.dataItem ? kendo.htmlEncode(data.dataItem.fmtValue) : "";
    },
    excelExport: function (e) {
      var pivotgrid = e.sender;
      var columnCount = 0;
      var rowIndex = 0;

      while (pivotgrid.cellInfo(columnCount, 0)) {
        columnCount++;
      }

      e.workbook.sheets[0].rows.forEach(function (row) {
        if (row.type !== "data") {
          return;
        }

        var firstDataCell = row.cells.length - columnCount;

        for (var columnIndex = 0; columnIndex < columnCount; columnIndex++) {
          var info = pivotgrid.cellInfo(columnIndex, rowIndex);

          if (info && isNotApplicable(info.rowTuple, info.columnTuple)) {
            row.cells[firstDataCell + columnIndex].value = "N/A";
          }
        }

        rowIndex++;
      });
    },
    dataSource: {
      data: salesData,
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

The example assumes that each combination of a row member and a column member matches exactly one source record and that the dimension values are unique. Consider the following points before you adapt it:

- When several source records match one cell, decide how their status values combine, for example, show `N/A` only when all matching records are not applicable.
- Total cells aggregate several records. The example leaves them unchanged. Decide whether a total includes values that are marked as not applicable.
- When you use more dimensions or nested levels, match every relevant member of the row and column tuples.
- The template and the `excelExport` handler must use the same matching logic so the cell and the exported file show the same value.

## See Also

- [Excel Export in the PivotGridV2]({% slug excelexport_kendoui_pivotgridv2 %})
- [Templates in the PivotGridV2]({% slug templates_kendoui_pivotgridv2 %})
- [Defining Cube Measures in the PivotDataSourceV2](/api/data/pivotdatasourcev2/configuration/schema#schemacubemeasures)
- [PivotGridV2 JavaScript API Reference](/api/ui/pivotgridv2)
