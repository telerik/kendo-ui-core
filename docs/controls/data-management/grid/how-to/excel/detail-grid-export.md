---
title: Export Detail Grids
page_title:  Export Detail Grids | Kendo UI Grid
description: "Learn how to export to Excel master and detail Kendo UI Grids."
slug: howto_exportto_excel_masterand_detail_grid
---

# Export Detail Grids

The examples below demonstrate how to export to Excel detail Kendo UI Grids and merge their workbooks with the master grid workbook. They use the [`excelExport`](/api/javascript/ui/grid#events-excelExport) event to get the workbook of the detail grids. The event is prevented to avoid saving an Excel file for every detail grid.

For additional information about how Excel documents work, refer to the [introductory help topic on Excel](/framework/excel/introduction#create-excel-document).

###### Example - detail Grid export to Excel (all pages and details)

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
        // get the export results
        var detailExports = $.makeArray(arguments);

        // sort by masterRowIndex
        detailExports.sort(function(a, b) {
          return a.masterRowIndex - b.masterRowIndex;
        });

        // add an empty column
        workbook.sheets[0].columns.unshift({
          width: 30
        });

        // prepend an empty cell to each row
        for (var i = 0; i < workbook.sheets[0].rows.length; i++) {
          workbook.sheets[0].rows[i].cells.unshift({});
        }

        // merge the detail export sheet rows with the master sheet rows
        // loop backwards so the masterRowIndex doesn't need to be updated
        for (var i = detailExports.length - 1; i >= 0; i--) {
          var masterRowIndex = detailExports[i].masterRowIndex + 1; // compensate for the header row

          var sheet = detailExports[i].sheet;

          // prepend an empty cell to each row
          for (var ci = 0; ci < sheet.rows.length; ci++) {
            if (sheet.rows[ci].cells[0].value) {
              sheet.rows[ci].cells.unshift({});
            }
          }

          // insert the detail sheet rows after the master row
          [].splice.apply(workbook.sheets[0].rows, [masterRowIndex + 1, 0].concat(sheet.rows));
        }

        // save the workbook
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
        // First cell
        { value: "OrderID" },
        // Second cell
        { value: "Freight" },
        // Third cell
        { value: "ShipName" },
        // Fourth cell
        { value: "OrderDate" },
        // Fifth cell
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
    // initiallize a new jQuery Deferred http://api.jquery.com/jQuery.Deferred/
    //var deferred = $.Deferred();

    // get the index of the master row
    //var masterRowIndex = e.masterRow.index(".k-master-row");

    // add the deferred to the list of promises
    //detailExportPromises.push(deferred);

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
      excelExport: function (e) {
        // prevent saving the file
        e.preventDefault();

        // resolve the deferred
        //deferred.resolve({
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

###### Example - detail Grid export to Excel (current page only)

```html
<div id="grid"></div>
<script>
  // used to wait for the children to finish async export
  var detailExportPromises = [];

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
    dataBound: function() {
      detailExportPromises = [];
      this.expandRow(this.tbody.find("tr.k-master-row").first());
    },
    excelExport: function(e) {
      // prevent saving the file because we will update the workbook
      e.preventDefault();

      var workbook = e.workbook;

      // Export all detail grids
      $("#grid [data-role=grid]").each(function() {
        $(this).data("kendoGrid").saveAsExcel();
      });

      // wait for all detail grids to finish exporting
      $.when.apply(null, detailExportPromises)
      .then(function() {
        // get the export results
        var detailExports = $.makeArray(arguments);

        // sort by masterRowIndex
        detailExports.sort(function(a, b) {
          return a.masterRowIndex - b.masterRowIndex;
        });

        // add an empty column
        workbook.sheets[0].columns.unshift( { width: 30 } );

        // prepend an empty cell to each row
        for (var i = 0; i < workbook.sheets[0].rows.length; i++) {
          workbook.sheets[0].rows[i].cells.unshift( { });
        }

        // merge the detail export sheet rows with the master sheet rows
        // loop backwards so the masterRowIndex doesn't need to be updated
        for (var i = detailExports.length - 1; i >= 0; i--) {
          var masterRowIndex = detailExports[i].masterRowIndex + 1; // compensate for the header row

          var sheet = detailExports[i].sheet;

          // prepend an empty cell to each row
          for (var ci = 0; ci < sheet.rows.length; ci++) {
            if (sheet.rows[ci].cells[0].value) {
              sheet.rows[ci].cells.unshift( { } );
            }
          }

          // insert the detail sheet rows after the master row
          [].splice.apply(workbook.sheets[0].rows, [masterRowIndex + 1, 0].concat(sheet.rows));
        }

        // save the workbook
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
    // initiallize a new jQuery Deferred http://api.jquery.com/jQuery.Deferred/
    var deferred = $.Deferred();

    // get the index of the master row
    var masterRowIndex = e.masterRow.index(".k-master-row");

    // add the deferred to the list of promises
    detailExportPromises.push(deferred);

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
      excelExport: function (e) {
        // prevent saving the file
        e.preventDefault();

        // resolve the deferred
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

Other articles on the Kendo UI Grid and how-to examples related to its export to Excel:

* [JavaScript API Reference](/api/javascript/ui/grid#configuration-excel)
* [How to Align Footer Cells]({% slug howto_alignfootercells_grid %})
* [How to Configure Color for Alternating Rows]({% slug howto_configure_color_alternating_rows_grid %})
* [How to Export Checked Columns Only]({% slug howto_export_checked_columns_only_grid %})
* [How to Export Multiple Grids]({% slug howto_export_excel_multiple_grids_grid %})
* [How to Format Cell Values]({% slug howto_format_cell_values_grid %})
* [How to Use Column Template]({% slug howto_use_column_template_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
