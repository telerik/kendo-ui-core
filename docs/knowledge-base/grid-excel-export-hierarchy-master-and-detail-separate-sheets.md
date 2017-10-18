---
title: Grid Excel Export Master and Details in Separate Sheets
description: How to export grid hierarchy in two separate sheets in excel
type: how-to
page_title: Grid - Export Master and Details in Separate Sheets
slug: grid-excel-export-hierarchy-master-and-detail-separate-sheets
position:
tags: grid,kendo,excel,export,hierarchy,detail,separate,sheets
teampulseid:
ticketid: 1079757
pitsid:
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
</table>


## Description

I am tying to implement excel export of a master detail grid based on the url (http://docs.telerik.com/kendo-ui/controls/data-management/grid/how-to/excel/detail-grid-export. I followed your example and was able to implement successfully. But users does not like the way the data is exported for each summary row the details are being injected. It prevents them to instantly do the pivots and do detailed analysis. They propose to have separate sheets for rows of master grid and all detailed records of each row in another sheet.

## Solution
  
- Make a single call to read all the data  
  
- obtain only the sheet configuration of the generated result and assign it to a variable  
  
- obtain only the sheet from the event data of the **excelExpot **event (e.workbook is the master grid workbook by default) and assign it to a variable  
  
- create a new workbook and pass the sheets in the sheet configuration property as array with the variables from 2. and 3.  
  
The runnable demo is available at:  
  
```html
<div id="grid"></div>
    <script>
      // used to wait for the children to finish async export
      var detailExportPromises = [];


      var dataSource = new kendo.data.DataSource({
        type: "odata",
        transport: {
          read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
        }
      });

      dataSource.read();

      $("#grid").kendoGrid({
        toolbar: ["excel"],
        dataSource: {
          type: "odata",
          transport: {
            read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
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
              read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
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
  
Resources:   
  
[Export of all data](http://docs.telerik.com/kendo-ui/controls/data-management/grid/excel-export#excel-export-of-all-data)
  
[Sheets filter API](http://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook#configuration-sheets.filter)
  
[Sheets columns width API](http://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook#configuration-sheets.columns.width)
