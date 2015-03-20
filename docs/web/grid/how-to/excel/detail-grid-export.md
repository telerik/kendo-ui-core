---
title: Detail Grid Excel Export
description: How to export master and detail grids in Excel
---

# Detail Grid Excel Export

This demo shows how to export the detail grids and merge their workbooks with the master grid workbook. The uses the [excelExport](/api/javascript/ui/grid#events-excelExport) event to get the
workbook of the detail grids. The event is prevented to avoid saving an Excel file for every detail grid. For additional info check [Create Excel Documents](/framework/excel/introduction#create-excel-document).

#### Example - detail grid Excel export

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
