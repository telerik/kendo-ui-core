---
title: Transposing Grid Data Before PDF Export
description: Learn how to transpose Kendo UI Grid data from rows to columns on the exported PDF, while keeping the Grid display unchanged.
type: how-to
page_title: How to Transpose Kendo UI Grid Data on the Exported PDF
slug: transpose-grid-data-before-pdf-export-kendoui
tags: kendo ui, grid, pdf export, transpose data
res_type: kb
ticketid: 1528457
---

## Environment

| Product | Version |
| --- | --- |
| Grid for Progress® Kendo UI® | 2024.3.806 |

## Description

I want to transpose data before exporting Grid data to PDF. The Grid data will remain the same before and after export, but the exported PDF will have transposed data (Row -> Column, Column -> Row).

This KB article also answers the following questions:
- How can I change the orientation of Grid data for PDF export?
- Is it possible to transpose Grid data only for the PDF export?
- Can the Grid display remain unchanged while exporting transposed data to PDF?

## Solution

To transpose the Grid data on the exported PDF, while keeping the Grid display unchanged, follow the steps below. This solution utilizes a custom function to transpose the Grid's data source and then exports it using the Grid's PDF export functionality.

1. Prepare a regular Kendo UI [Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid) with your data and include a PDF export option.

2. Use the Grid's PDF export event to manipulate the data. Implement a function that transposes the data from rows to columns. This function should create a new instance of the Grid with transposed data which will be exported to PDF.

3. After the PDF is generated, dispose of the temporary Grid instance to ensure it does not interfere with your application.

Here is an example that demonstrates how to achieve the desired PDF export effect:

```javascript
        function exporttoPDF() {
          dataLength = rawData.length;
          propertiesLength = Object.keys(rawData[0]).length;

          for(var i=0; i <propertiesLength; i+=1){
            data[i] = {};
            for(var j =0; j < dataLength; j+=1 ){
              var currentItem = rawData[j]
              var property = Object.keys(currentItem)[i];
              if(j === 0){
                data[i]["Property"] = property;
              }
              data[i][currentItem.FirstName] = currentItem[property]
            }
          }

          var grid = $("#grid").data("kendoGrid");
          //remove grid from Dom
          grid.destroy();
          $("#grid").empty();

          //initialize new grid
          var newgrid = $("#grid").kendoGrid({
            dataSource: {
              data: data,
              pageSize: 20,
            },
            scrollable:true
          }).data("kendoGrid");

          newgrid.saveAsPDF().then(function(){
              newgrid.destroy();
              $("#grid").empty();

              $("#grid").kendoGrid({
                dataSource: {
                  data: rawData,
                  pageSize: 20,
                },
                scrollable:true
              });
          });
        };
```

Remember to call `exportGridToPDF()` function when triggering the PDF export instead of using the default Grid export functionality.


Full example:

```dojo
   <script src="https://demos.telerik.com/kendo-ui/content/shared/js/people.js"></script>

    <div id="example">
      <button id="exportPDF">Export to PDF</button>

      <div id="grid"></div>
      <script>
        var rawData,
            data = [],
            model = {},
            length,
            dataLength,
            propertiesLength;

        $(document).ready(function() {
          rawData = createRandomData(4);

          $("#grid").kendoGrid({
            dataSource: {
              data: rawData,
              pageSize: 20,
            },
            scrollable:true
          });

          $("#exportPDF").kendoButton({
            click: exporttoPDF
          })

        });
        function exporttoPDF() {
          dataLength = rawData.length;
          propertiesLength = Object.keys(rawData[0]).length;

          for(var i=0; i <propertiesLength; i+=1){
            data[i] = {};
            for(var j =0; j < dataLength; j+=1 ){
              var currentItem = rawData[j]
              var property = Object.keys(currentItem)[i];
              if(j === 0){
                data[i]["Property"] = property;
              }
              data[i][currentItem.FirstName] = currentItem[property]
            }
          }

          var grid = $("#grid").data("kendoGrid");
          //remove grid from Dom
          grid.destroy();
          $("#grid").empty();

          //initialize new grid
          var newgrid = $("#grid").kendoGrid({
            dataSource: {
              data: data,
              pageSize: 20,
            },
            scrollable:true
          }).data("kendoGrid");

          newgrid.saveAsPDF().then(function(){
            newgrid.destroy();
            $("#grid").empty();

            $("#grid").kendoGrid({
              dataSource: {
                data: rawData,
                pageSize: 20,
              },
              scrollable:true
            });
          });
        };
      </script>
    </div>
```

## See Also

- [Kendo UI Grid API Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
- [Kendo UI Grid PDF Export Documentation](https://docs.telerik.com/kendo-ui/controls/grid/export/pdf-export)
