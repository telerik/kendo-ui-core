---
title: Export Master and Detail Grids to Excel
page_title: Export Master and Detail Grids to Excel - Kendo UI for jQuery Data Grid
description: "Learn how to export master and detail Kendo UI for jQuery Grids to Excel, wait for async detail exports with jQuery Deferred objects, and merge their workbooks."
previous_url: /controls/data-management/grid/how-to/excel/detail-grid-export
slug: howto_exportto_excel_masterand_detail_grid
tags: grid, export, excel, detail, master, hierarchy, deferred, promise, async, workbook
type: how-to
res_type: kb
components: ["grid"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
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

How can I export master and detail Kendo UI Grids to a single Excel file and merge the detail Grid workbooks into the master Grid workbook?

How can I coordinate the asynchronous detail Grid exports before saving the final Excel file?

This KB also answers the following questions:

* How can I merge detail Grid workbooks into the master Grid Excel export?
* How can I wait for all child Grid exports before saving a single Excel file?
* How can I use jQuery `$.Deferred()` in a hierarchical Grid Excel export scenario?

## Solution

To export master and detail Grids to a single Excel file, prevent the default master Grid export, track each asynchronous detail Grid export with a jQuery `$.Deferred()` object, wait for all child workbooks, and then merge the child sheets into the master workbook.

Use the following steps:

1. Handle the Grid [`excelExport`](/api/ui/grid/events/excelexport) event and call `e.preventDefault()` so the master Grid workbook can be updated before it is saved.
1. Start a detail Grid export for each master row and store a jQuery `$.Deferred()` object for every asynchronous child export.
1. Wait for all detail Grid promises with `$.when.apply(null, detailExportPromises)` and sort the returned sheets by their master row index.
1. Insert the exported detail rows into the master workbook and save the merged result.

To get the workbook of the detail Grids, the demos use the [`excelExport`](/api/ui/grid/events/excelexport) event. This event is prevented to avoid the saving of an Excel file for each detail Grid. For more information on how Excel documents work, refer to the [introductory help topic on Excel](/framework/excel/introduction#create-excel-document).

The implementation uses jQuery `$.Deferred()` objects to track each asynchronous detail Grid export and waits until all child workbooks are available before merging them into the master workbook.

For more information about how jQuery Deferred objects work, refer to the [jQuery Deferred documentation](https://api.jquery.com/jquery.deferred/).

>With JsZip version 3.x the synchronous methods were deprecated, so you must use the async methods to get the dataURL

### Export All Pages and Detail Rows

Use this approach when the master Grid export must include all available data, not only the rows on the current page. This example reads the related detail data, exports each child workbook asynchronously, and merges the result into the master workbook before saving the file.

The following example demonstrates how to export a detail Grid to Excel including all pages and detail rows.

```dojo
<div id="grid"></div>
<script>
  // Used to wait for the children to finish the async export.
  var detailExportPromises = [];


  var dataSource = new kendo.data.DataSource({
    type: "odata-v4",
    transport: {
      read: "https://demos.telerik.com/service/v2/odata/Orders"
    }
  });

  dataSource.read();

  $("#grid").kendoGrid({
    toolbar: ["excel"],
    dataSource: {
      type: "odata-v4",
      transport: {
        read: "https://demos.telerik.com/service/v2/odata/Employees"
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

        // When using  jsZip version 3.x use the following as the synchronous methods were deprecated
        new kendo.ooxml.Workbook(workbook).toDataURLAsync().then(function(data) {
          kendo.saveAs($.extend({
            dataURI: data,
            fileName: "Export.xlsx"
          }));
        }).always(() => {
          e.sender._progress(false);
          e.sender._isExport = false;
          e.sender.refresh();
        });

        // Save the workbook.
        // kendo.saveAs({
        //   dataURI: new kendo.ooxml.Workbook(workbook).toDataURLAsync(),
        //   fileName: "Export.xlsx"
        // })
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
    // Track the completion of the current detail Grid export.
    var deferred = $.Deferred();

    // Collect all pending detail Grid exports so they can be awaited together.
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
      // Mark the current detail Grid export as completed and return its sheet.
      deferred.resolve({
        masterRowIndex: rowIndex,
        sheet: book.sheets[0]
      });
    });
  }

  function detailInit(e) {
    // Initialize a new jQuery Deferred.
    // var deferred = $.Deferred();

    // Get the index of the master row
    // var masterRowIndex = e.masterRow.index(".k-master-row");

    // Add the deferred to the list of promises
    // detailExportPromises.push(deferred);

    $("<div/>").appendTo(e.detailCell).kendoGrid({
      dataSource: {
        type: "odata-v4",
        transport: {
          read: "https://demos.telerik.com/service/v2/odata/Orders"
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

### Export the Current Page Only

Use this approach when you only need the currently loaded master rows and their rendered detail Grids in the final Excel file. This version triggers the export from the instantiated child Grids on the page and merges their sheets into the master workbook.

The following example demonstrates how to export a detail Grid to Excel including the current page only.

```dojo
<div id="grid"></div>
<script>
  // Used to wait for the children to finish the async export.
  var detailExportPromises = [];

  $("#grid").kendoGrid({
    toolbar: ["excel"],
    dataSource: {
      type: "odata-v4",
      transport: {
        read: "https://demos.telerik.com/service/v2/odata/Employees"
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

        // When using  jsZip version 3.x use the following as the synchronous methods were deprecated
        new kendo.ooxml.Workbook(workbook).toDataURLAsync().then(function(data) {
          kendo.saveAs($.extend({
            dataURI: data,
            fileName: "Export.xlsx"
          }));
        }).always(() => {
          e.sender._progress(false);
          e.sender._isExport = false;
          e.sender.refresh();
        });

        // Save the workbook.
        // kendo.saveAs({
        //   dataURI: new kendo.ooxml.Workbook(workbook).toDataURLAsync(),
        //   fileName: "Export.xlsx"
        // })
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
    // Initialize a new jQuery Deferred.
    var deferred = $.Deferred();

    // Get the index of the master row.
    var masterRowIndex = e.masterRow.index(".k-master-row");

    // Add the deferred to the list of promises.
    detailExportPromises.push(deferred);

    $("<div/>").appendTo(e.detailCell).kendoGrid({
      dataSource: {
        type: "odata-v4",
        transport: {
          read: "https://demos.telerik.com/service/v2/odata/Orders"
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

* [JavaScript API Reference of the Data Grid](/api/ui/grid)
* [Grid excelExport Event API](/api/ui/grid/events/excelexport)
* [Excel Export Overview](/framework/excel/introduction)
* [jQuery Deferred Documentation](https://api.jquery.com/jquery.deferred/)
