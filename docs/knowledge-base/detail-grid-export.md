---
title: Export Detail Grids
page_title:  Export Detail Grids | Kendo UI Grid for jQuery
description: "Get started with Kendo UI for jQuery enabling you to export to Excel master and detail Grids."
previous_url: /controls/data-management/grid/how-to/excel/detail-grid-export
slug: howto_exportto_excel_masterand_detail_grid
tags: grid, export, detail, grids
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I export master and detail Kendo UI Grids to Excel?

## Solution

The following examples demonstrate how to export detail Grids to Excel and merge their workbooks with the master Grid workbook.

To get the workbook of the detail Grids, the demos use the [`excelExport`](/api/javascript/ui/grid/events/excelexport) event. This event is prevented to avoid the saving of an Excel file for each detail Grid. For more information on how Excel documents work, refer to the [introductory help topic on Excel](/framework/excel/introduction#create-excel-document).

The following example demonstrates how to export a detail Grid to Excel including its all pages and details.

```dojo
<div id="grid"></div>
<script>
  // Used to wait for the children to finish the async export.
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
    dataBound: function() {
      detailExportPromises = [];
      this.expandRow(this.tbody.find("tr.k-master-row").first());
    },
    excelExport: function(e) {
      e.preventDefault();

      var workbook = e.workbook;

      detailExportPromises = [];

      var masterData = e.data;

      for (var rowIndex = 0; rowIndex < masterData.length; rowIndex++) {
        exportChildData(masterData[rowIndex].EmployeeID, rowIndex);
      }

      $.when.apply(null, detailExportPromises)
      .then(function() {
        // Get the export results.
        var detailExports = $.makeArray(arguments);

        // Sort by masterRowIndex.
        detailExports.sort(function(a, b) {
          return a.masterRowIndex - b.masterRowIndex;
        });

        // Add an empty column.
        workbook.sheets[0].columns.unshift({
          width: 30
        });

        // Prepend an empty cell to each row.
        for (var i = 0; i < workbook.sheets[0].rows.length; i++) {
          workbook.sheets[0].rows[i].cells.unshift({});
        }

        // Merge the detail export sheet rows with the master sheet rows.
        // Loop backwards so the masterRowIndex does not need to be updated.
        for (var i = detailExports.length - 1; i >= 0; i--) {
          var masterRowIndex = detailExports[i].masterRowIndex + 1; // compensate for the header row

          var sheet = detailExports[i].sheet;

          // Prepend an empty cell to each row.
          for (var ci = 0; ci < sheet.rows.length; ci++) {
            if (sheet.rows[ci].cells[0].value) {
              sheet.rows[ci].cells.unshift({});
            }
          }

          // Insert the detail sheet rows after the master row.
          [].splice.apply(workbook.sheets[0].rows, [masterRowIndex + 1, 0].concat(sheet.rows));
        }

        // Save the workbook.
        kendo.saveAs({
          dataURI: new kendo.ooxml.Workbook(workbook).toDataURL(),
          fileName: "Export.xlsx"
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

  function exportChildData(EmployeeID, rowIndex) {
    var deferred = $.Deferred();

    detailExportPromises.push(deferred);

    var rows = [{
      cells: [
        // First cell.
        { value: "OrderID" },
        // Second cell.
        { value: "Freight" },
        // Third cell.
        { value: "ShipName" },
        // Fourth cell.
        { value: "OrderDate" },
        // Fifth cell.
        { value: "ShipCity" }
      ]
    }];

    dataSource.filter({ field: "EmployeeID", operator: "eq", value: EmployeeID});

    var exporter = new kendo.ExcelExporter({
      columns: [{
        field: "OrderID"
      }, {
        field: "Freight"
      }, {
        field: "ShipName"
      }, {
        field: "ShipCity"
      }],
      dataSource: dataSource
    });

    exporter.workbook().then(function(book, data) {
      deferred.resolve({
        masterRowIndex: rowIndex,
        sheet: book.sheets[0]
      });
    });
  }

  function detailInit(e) {
    // Initiallize a new jQuery Deferred https://api.jquery.com/jQuery.Deferred/
    // var deferred = $.Deferred();

    // Get the index of the master row
    // var masterRowIndex = e.masterRow.index(".k-master-row");

    // Add the deferred to the list of promises
    // detailExportPromises.push(deferred);

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
      excelExport: function (e) {
        // Prevent the saving of the file.
        e.preventDefault();

        // Resolve the deferred
        // deferred.resolve({
        //  masterRowIndex: masterRowIndex,
        //  sheet: e.workbook.sheets[0]
        //});
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

The following example demonstrates how to export a detail Grid to Excel including the current page only.

```dojo
<div id="grid"></div>
<script>
  // Used to wait for the children to finish the async export.
  var detailExportPromises = [];

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
    dataBound: function() {
      detailExportPromises = [];
      this.expandRow(this.tbody.find("tr.k-master-row").first());
    },
    excelExport: function(e) {
      // Prevent saving the file because you will update the workbook.
      e.preventDefault();

      var workbook = e.workbook;

      // Export all detail grids.
      $("#grid [data-role=grid]").each(function() {
        $(this).data("kendoGrid").saveAsExcel();
      });

      // Wait for all detail grids to finish exporting.
      $.when.apply(null, detailExportPromises)
      .then(function() {
        // Get the export results.
        var detailExports = $.makeArray(arguments);

        // Sort by masterRowIndex.
        detailExports.sort(function(a, b) {
          return a.masterRowIndex - b.masterRowIndex;
        });

        // Add an empty column.
        workbook.sheets[0].columns.unshift( { width: 30 } );

        // Prepend an empty cell to each row.
        for (var i = 0; i < workbook.sheets[0].rows.length; i++) {
          workbook.sheets[0].rows[i].cells.unshift( { });
        }

        // Merge the detail export sheet rows with the master sheet rows.
        // Loop backwards so the masterRowIndex does not need to be updated.
        for (var i = detailExports.length - 1; i >= 0; i--) {
          var masterRowIndex = detailExports[i].masterRowIndex + 1; // Compensate for the header row.

          var sheet = detailExports[i].sheet;

          // prepend an empty cell to each row
          for (var ci = 0; ci < sheet.rows.length; ci++) {
            if (sheet.rows[ci].cells[0].value) {
              sheet.rows[ci].cells.unshift( { } );
            }
          }

          // Insert the detail sheet rows after the master row.
          [].splice.apply(workbook.sheets[0].rows, [masterRowIndex + 1, 0].concat(sheet.rows));
        }

        // Save the workbook.
        kendo.saveAs({
          dataURI: new kendo.ooxml.Workbook(workbook).toDataURL(),
          fileName: "Export.xlsx"
        })
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

  function detailInit(e) {
    // Initialize a new jQuery Deferred https://api.jquery.com/jQuery.Deferred/
    var deferred = $.Deferred();

    // Get the index of the master row.
    var masterRowIndex = e.masterRow.index(".k-master-row");

    // Add the deferred to the list of promises.
    detailExportPromises.push(deferred);

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
      excelExport: function (e) {
        // Prevent the saving of the file.
        e.preventDefault();

        // Resolve the deferred.
        deferred.resolve({
          masterRowIndex: masterRowIndex,
          sheet: e.workbook.sheets[0]
        });
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

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
