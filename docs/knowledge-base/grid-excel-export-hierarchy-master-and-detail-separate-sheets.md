---
title: Export Master and Detail Grids to Excel in Separate Sheets
description: An example on how to export hierarchical Kendo UI Grids in separate sheets in Excel.
type: how-to
page_title: Excel Export Master and Detail Grids in Separate Sheets | Kendo UI Grid
slug: grid-excel-export-hierarchy-master-and-detail-separate-sheets
tags: grid,kendo,excel,export,hierarchy,detail,separate,sheets
ticketid: 1079757
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
  <td>Progress Kendo UI Excel Export</td>
 </tr>
</table>


## Description

I implemented the Excel export of a master-detail Grid based on the URL by following [this example](https://docs.telerik.com/kendo-ui/controls/data-management/grid/how-to/excel/detail-grid-export). However, users want me to change the way the data is exported for each summary row and how the details are injected because this behavior prevents them from instantly checking the pivots and making a detailed analysis.

How can I have separate sheets for the rows of the master Grid and for all detailed records of each row?

## Solution

1. Make a single call to read all the data.
1. Obtain only the sheet configuration of the generated result and assign it to a variable.
1. Obtain only the sheet from the event data of the `excelExpot` event (by default, `e.workbook` is the master Grid workbook) and assign it to a variable.
1. Create a new workbook and pass the sheets in the `sheet` configuration property as an array with the variables from the two previous steps.

```dojo
<div id="grid"></div>
    <script>
      // used to wait for the children to finish async export
      var detailExportPromises = [];


      var dataSource = new kendo.data.DataSource({
        type: "odata",
        transport: {
          read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
        }
      });

      dataSource.read();

      $("#grid").kendoGrid({
        toolbar: ["excel"],
        dataSource: {
          type: "odata",
          transport: {
            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
          },
          pageSize: 6,
          serverPaging: true
        },
        height: 600,
        pageable: true,
        detailInit: detailInit,
        excel: {
          allPages: true
        },
        excelExport: function(e) {
          e.preventDefault();

          var workbook = e.workbook;

          detailExportPromises = [];

          var masterData = e.data;


          exportChildData();

          $.when.apply(null, detailExportPromises)
            .then(function() {
            // get the export results
            var detailExports = $.makeArray(arguments);
            var sheets = [workbook.sheets[0], detailExports[0].sheet ];

            //add sheets name
            sheets[0].title = "Employees";
            sheets[1].title = "Orders";

            var headerColumnsCount = sheets[1].rows[0].cells.length - 1;

            // add filter for second sheet
            sheets[1].filter = {
            	from: 0,
              to: headerColumnsCount
            };

            // save the workbook
           kendo.saveAs({
              dataURI: new kendo.ooxml.Workbook({
                sheets: sheets
              }).toDataURL(),
              fileName: "Employees and Orders.xlsx"
            });
          });
        },
        columns: [
          { field: "FirstName", title: "First Name", width: "110px" },
          { field: "LastName", title: "Last Name", width: "110px" },
          { field: "Country", width: "110px" },
          { field: "City", width: "110px" },
          { field: "Title" }
        ]
      });

      function exportChildData() {
        var deferred = $.Deferred();

        detailExportPromises.push(deferred);

        var exporter = new kendo.ExcelExporter({
          columns: [{
            field: "EmployeeID",
            width: "100px"
          }, {
            field: "OrderID",
            width: "100px"
          }, {
            field: "ShipCountry",
            width: "100px"
          }, {
            field: "ShipAddress"
          },{
            field: "ShipName"
          }],
          dataSource: dataSource
        });

        exporter.workbook().then(function(book, data) {
          deferred.resolve({
            sheet: book.sheets[0]
          });
        });
      }

      function detailInit(e) {

        $("<div/>").appendTo(e.detailCell).kendoGrid({
          dataSource: {
            type: "odata",
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
            },
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            pageSize: 10,
            filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
          },
          scrollable: false,
          pageable: true,
          columns: [
            { field: "OrderID", width: "70px" },
            { field: "ShipCountry", title:"Ship Country", width: "110px" },
            { field: "ShipAddress", title:"Ship Address" },
            { field: "ShipName", title: "Ship Name", width: "300px" }
          ]
        });
      }
    </script>
```

## See Also

* [Exporting All Data](https://docs.telerik.com/kendo-ui/controls/data-management/grid/excel-export#excel-export-of-all-data)
* [sheets.filter API](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook/configuration/sheets.filter)
* [sheets.columns.width API](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook/configuration/sheets.columns.width)
