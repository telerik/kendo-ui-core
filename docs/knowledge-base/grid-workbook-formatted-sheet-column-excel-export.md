---
title: Creating Formatted Column in Workbook Sheet During Grid Excel Export
description: "Create a formatted column on a new, separate sheet during the Kendo UI Grid's excelExport event."
type: how-to
page_title: Exporting Column in New Workbook Sheet During Grid Excel Export
slug: grid-workbook-formatted-sheet-column-excel-export
position:
tags: grid, workbook, format, sheet, column, excel, export
ticketid: 1605832
res_type: kb
components: ["grid"]
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2023.1.425</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Grid for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>

## Description

How can a new workbook's sheet be added with a single column of formatted cells when exporting to Excel from a Kendo UI Grid?

## Solution

A column can be added with [cell formatting](/framework/excel/appearance) during the [excelExport event](/api/javascript/ui/grid/events/excelexport) by defining an array for the rows, and configuring the cells appearance.

```javascript
  //set empty rows array
  var rows = [];

  for (var i = 0; i < 5; i++) {
    //Define each array item with the cell properties
    rows[i] = {
      cells: [
        {
          value: "Value " + i,
          bold: true,
          background: "#0000ff",
          color: "#ffffff",
        },
      ],
    };
  }
```

Then, push a [new workbook sheet](/framework/excel/sheets), and set the [workbook.sheets.columns width](/framework/excel/column-width) for the specific column:

```javascript
  //Add new Sheet
  e.workbook.sheets.push({
    name: "Columns Sheet",

    //sets autoWidth for column
    columns: [{ autoWidth: true }],

    //Rows added to sheet
    rows: rows,
  });
```

```dojo
  <div id="grid"></div>
  <script>
    $("#grid").kendoGrid({
      toolbar: ["excel"],
      excel: {
        fileName: "Grid.xlsx"
      },
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe"},
        { name: "John Doe"}
      ],
      excelExport: function(e) {

        //set empty rows array
        var rows = [];

        for(var i=0;i<5;i++){

          //Define each array item with the cell properties
          rows[i] = {
            cells: [
              {
                value: "Value " + i,
                bold: true,
                background: "#0000ff",
                color: "#ffffff",
              }
            ]
          };
        }


        //Add new Sheet
        e.workbook.sheets.push({
          name: "Columns Sheet",

          //sets autoWidth for column
          columns: [
            { autoWidth: true },
          ],
          
          //Rows added to sheet
          rows: rows
        });

      }
    });
  </script>
```

## See Also

- [JavaScript API Reference of the Kendo ooxml.Workbook](/api/javascript/ooxml/workbook)
- [jQuery Kendo UI Excel Export Overview](/framework/excel/introduction)
- [jQuery Grid Export to Excel(Demo)](https://demos.telerik.com/kendo-ui/grid/excel-export)
