---
title: Data Source Binding
page_title: jQuery Spreadsheet Documentation | Data Source Binding
description: "Get started with the jQuery Spreadsheet by Kendo UI and learn how to bind a sheet in the widget to a Data Source."
slug: bind_todata_source_spreadsheet_widget
position: 3
---

# Data Source Binding

The Spreadsheet supports binding individual sheets to a [Data Source](/framework/datasource/overview) instance which allows you to quickly bring data from external data sources into the Spreadsheet and edit it.  

For a runnable example, refer to the demo on [binding the Spreadsheet to the DataSource](https://demos.telerik.com/kendo-ui/spreadsheet/datasource). The Spreadsheet DataSource from that example uses the [`read`](/api/javascript/data/datasource/configuration/transport.read) and [`submit`](/api/javascript/data/datasource/configuration/transport.submit) transport options. The `submit` option is required to properly handle a scenario in which the user creates, updates and deletes items simultaneously.

When using separate [`create`](/api/javascript/data/datasource/configuration/transport.create), [`update`](/api/javascript/data/datasource/configuration/transport.update) and [`destroy`](/api/javascript/data/datasource/configuration/transport.destroy) handlers, it is possible that one of them fails, while the others do not. That will result in a mismatch of the data state between the client (the Spreadsheet) and the remote source. The `submit` option handles all operations within a single request. It will not save any changes if any of the items is invalid.

The following example demonstrates how to configure the Spreadsheet to use a DataSource.

```dojo
    <button class="k-button" id="save">Save changes</button>
    <button class="k-button" id="cancel">Cancel changes</button>
    <div id="spreadsheet" style="width: 100%"></div>
    <script>
      $(function() {
        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

        var dataSource = new kendo.data.DataSource({
          transport: {
            read: onRead,
            submit: onSubmit
          },
          batch: true,
          change: function() {
            $("#cancel, #save").toggleClass("k-state-disabled", !this.hasChanges());
          },
          schema: {
            model: {
              id: "ProductID",
              fields: {
                ProductID: { type: "number" },
                ProductName: { type: "string" },
                UnitPrice: { type: "number" },
                Discontinued: { type: "boolean" },
                UnitsInStock: { type: "number" }
              }
            }
          }
        });

        $("#spreadsheet").kendoSpreadsheet({
          columns: 20,
          rows: 100,
          toolbar: false,
          sheetsbar: false,
          sheets: [{
            name: "Products",
            dataSource: dataSource,
            rows: [{
              height: 40,
              cells: [
                {
                  bold: "true",
                  background: "#9c27b0",
                  textAlign: "center",
                  color: "white"
                },{
                  bold: "true",
                  background: "#9c27b0",
                  textAlign: "center",
                  color: "white"
                },{
                  bold: "true",
                  background: "#9c27b0",
                  textAlign: "center",
                  color: "white"
                },{
                  bold: "true",
                  background: "#9c27b0",
                  textAlign: "center",
                  color: "white"
                },{
                  bold: "true",
                  background: "#9c27b0",
                  textAlign: "center",
                  color: "white"
                }]
            }],
            columns: [
              { width: 100 },
              { width: 415 },
              { width: 145 },
              { width: 145 },
              { width: 145 }
            ]
          }]
        });

        function onSubmit(e) {
          $.ajax({
            url: crudServiceBaseUrl + "/Products/Submit",
            data: { models: kendo.stringify(e.data) },
            contentType: "application/json",
            dataType: "jsonp",
            success: function (result) {
              e.success(result.Updated, "update");
              e.success(result.Created, "create");
              e.success(result.Destroyed, "destroy");
            },
            error: function (xhr, httpStatusMessage, customErrorMessage) {
              alert(xhr.responseText);
            }
          });
        }

        function onRead(options) {
          $.ajax({
            url: crudServiceBaseUrl + "/Products",
            dataType: "jsonp",
            success: function (result) {
              options.success(result);
            },
            error: function (result) {
              options.error(result);
            }
          });
        }

        $("#save").click(function() {
          if (!$(this).hasClass("k-state-disabled")) {
            dataSource.sync();
          }
        });

        $("#cancel").click(function() {
          if (!$(this).hasClass("k-state-disabled")) {
            dataSource.cancelChanges();
          }
        });
      });
    </script>
```

## Specific Behavior

Data Source binding switches the sheet to a special data-bound mode. It differs from the standard behavior in the following ways:

* Column headers are inferred from the data item fields. Configure the column headers and ordering by using the [sheet `setDataSource` method](/api/javascript/spreadsheet/sheet/methods/setdatasource).
* Cell styles, formulas, and formats are not persisted in the data source.
* Row height and column width are not persisted in the data source.
* Sorting and filtering are applied locally.

CRUD operations are also handled in a specific way:

* Inserted rows are always appended at the end, regardless of the actual row index.
* Updating cell content translates into update operations.
* Deleting rows translates into destroy operations.
* Inserting and removing columns is not supported.

## Unsupported Scenarios

* The Sheet cannot be bound to a source which does not contain any items because the header row in the sheet is generated based on the data items fields.
* Records cannot be edited after sorting the sheet ([related feature request](https://feedback.telerik.com/kendo-jquery-ui/1402815-allow-sorting-for-spreadsheet-with-datasource)).
* Records cannot be edited after filtering the sheet ([related feature request](https://feedback.telerik.com/kendo-jquery-ui/1402817-allow-filtering-for-spreadsheet-with-datasource)).

## See Also

* [Server-Side Import and Export in the Spreadsheet (Demo)](https://demos.telerik.com/kendo-ui/spreadsheet/server-side-import-export)
* [Spreadsheet JavaScript API Reference](/api/javascript/ui/spreadsheet)
