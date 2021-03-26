---
title: PivotGrid Customize Exported Excel File
description: How to align content in cells, change background and add borders to the exported excel file in the Kendo UI PivotGrid
type: how-to
page_title: How to Add Borders and Change the Background Color of Cells | Kendo UI PivotGrid for jQuery
slug: pivotgrid-excel-export-customize
tags: pivot, pivotgrid, excel, export, custom, cells, border, background, align
ticketid: 1146696
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>PivotGrid for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description

I am playing around with the Excel export of the PivotGrid and would like to know how to:

1. Add borders to the cells
1. Change the background color
1. Align the text of cells that span across several rows to the top

## Solution

The PivotGrid triggers its [`excelExport`](api/javascript/ui/pivotgrid/events/excelexport) event that features the generated [`kendo.ooxml.Workbook`](/api/javascript/ooxml/workbook). You can use it to accomplich the desired outcome by following the steps below:

1. Loop the sheet rows and columns
1. Use the `cells.borderTop`, `cells.borderBottom`, `cells.borderRight` and `cells.borderLeft` `size` and `color` properties to assign the desired border width and color
1. Use the `cells.background` property to assign the new color
1. Check if the cell has a `rowSpan` greater than 1 and use the `cells.verticalAlign` property to align the text as needed

```
    excelExport: function (e) {
        var sheet = e.workbook.sheets[0];
        for (var i = 0; i < sheet.rows.length; i++) {
            for (var ci = 0; ci < sheet.rows[i].cells.length; ci++) {
                var cell = sheet.rows[i].cells[ci];

                // add borders
                cell.borderTop = { color: "black", size: 1 };
                cell.borderRight = { color: "black", size: 1 };
                cell.borderBottom = { color: "black", size: 1 };
                cell.borderLeft = { color: "black", size: 1 };
                  
                // change the cell background
                cell.background == "#dfdfdf" ? cell.background = "#ffffff": cell.background = "#0080ff";
                  
                // align cells top
                if(cell.rowSpan > 1){
                  	cell.verticalAlign = "top";
                }                  
            }
        }
    },
```

```dojo
    <script src="https://kendo.cdn.telerik.com/2020.3.1118/js/jszip.min.js"></script>
    
    <div id="example">
      <button id="export" class="k-button k-button-icontext hidden-on-narrow"><span class="k-icon k-i-excel"></span>Export to Excel</button>
      <div id="pivotgrid" class="hidden-on-narrow"></div>

      <div class="responsive-message"></div>

      <script>
        $(document).ready(function () {
          var pivotgrid = $("#pivotgrid").kendoPivotGrid({
            excelExport: function (e) {
              var sheet = e.workbook.sheets[0];
              for (var i = 0; i < sheet.rows.length; i++) {
                for (var ci = 0; ci < sheet.rows[i].cells.length; ci++) {
                  var cell = sheet.rows[i].cells[ci];
                  // add borders
                  cell.borderTop = { color: "black", size: 1 };
                  cell.borderRight = { color: "black", size: 1 };
                  cell.borderBottom = { color: "black", size: 1 };
                  cell.borderLeft = { color: "black", size: 1 };
                  
                  // change cell background
                  cell.background == "#dfdfdf" ? cell.background = "#ffffff": cell.background = "#0080ff";
                  
                  // align cells top
                  if(cell.rowSpan > 1){
                  	cell.verticalAlign = "top";
                  }
                  
                }
              }
            },
            excel: {
              fileName: "Kendo UI PivotGrid Export.xlsx",
              proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
              filterable: true
            },
            filterable: true,
            sortable: true,
            columnWidth: 200,
            height: 580,
            dataSource: {
              type: "xmla",
              columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Product].[Category]" } ],
              rows: [{ name: "[Geography].[City]", expand: true }],
              measures: ["[Measures].[Reseller Freight Cost]"],
              transport: {
                connection: {
                  catalog: "Adventure Works DW 2008R2",
                  cube: "Adventure Works"
                },
                read: "https://demos.telerik.com/olap/msmdpump.dll"
              },
              schema: {
                type: "xmla"
              },
              error: function (e) {
                alert("error: " + kendo.stringify(e.errors[0]));
              }
            }
          }).data("kendoPivotGrid");

          $("#export").click(function() {
            pivotgrid.saveAsExcel();
          });
        });
      </script>
      <style>
        #export
        {
          margin: 0 0 10px 1px;
        }
      </style>
    </div>
``` 
