---
title: Display Delete Confirmation as Button in the Command Column
page_title: Delete Confirmation as Button | Kendo UI Grid for jQuery
description: "An example on how to display the Delete confirmation as a button instead of a dialog in the command column of the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/Editing/display-delete-confirmation-buttons-command-column
slug: howto_display_delete_confirmation_buttons_command_column
tags: grid, show, delete, confirmation, button, command, column
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

How can I display the **Delete** confirmation as a button instead of a dialog in the command column of the Kendo UI Grid for jQuery?

## Solution

The following example demonstrates how to render the delete confirmation for a Grid row as a button instead of a dialog in the command column.

```dojo
    <div id="example">
      <div id="grid"></div>

      <script>
        $(document).ready(function () {
          var crudServiceBaseUrl = "//demos.telerik.com/kendo-ui/service",
              dataSource = new kendo.data.DataSource({
                transport: {
                  read:  {
                    url: crudServiceBaseUrl + "/Products",
                    dataType: "jsonp"
                  },
                  update: {
                    url: crudServiceBaseUrl + "/Products/Update",
                    dataType: "jsonp"
                  },
                  destroy: {
                    url: crudServiceBaseUrl + "/Products/Destroy",
                    dataType: "jsonp"
                  },
                  create: {
                    url: crudServiceBaseUrl + "/Products/Create",
                    dataType: "jsonp"
                  },
                  parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                      return {models: kendo.stringify(options.models)};
                    }
                  }
                },
                batch: true,
                pageSize: 20,
                schema: {
                  model: {
                    id: "ProductID",
                    fields: {
                      ProductID: { editable: false, nullable: true },
                      ProductName: { validation: { required: true } },
                      UnitPrice: { type: "number", validation: { required: true, min: 1} },
                      Discontinued: { type: "boolean" },
                      UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                    }
                  }
                }
              });

          var grid = $("#grid").kendoGrid({
            dataSource: dataSource,
            pageable: true,
            height: 550,
            toolbar: ["create"],
            columns: [
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
              { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
              { field: "Discontinued", width: "120px" },
              { command: ["edit", {
                name: "myDelete",
                text: "Delete"
              }], title: "&nbsp;", width: "350px" }],
            editable: {
              mode: "inline",
              confirmation: false
            },
            dataBound: function() {
              $(".k-grid-myDelete span").addClass("k-icon k-delete");
            },
            cancel: function() {
              setTimeout(function(){
                $(".k-grid-myDelete span").addClass("k-icon k-delete");
              });
            }
          }).data("kendoGrid");

          $("#grid").on("click", ".k-grid-myDelete", function(e) {
            e.preventDefault();

            var command = $(this);
            var cell = command.closest("td");

            command.remove();
            cell.append('<a class="k-button k-button-icontext k-grid-myConfirm" href="#"><span class="k-icon k-update"></span>Confirm</a>');
            cell.append('<a class="k-button k-button-icontext k-grid-myCancel" href="#"><span class="k-icon k-cancel"></span>Cancel</a>');
          });

          $("#grid").on("click", ".k-grid-myConfirm", function(e){
            e.preventDefault();
            grid.removeRow($(this).closest("tr"))
          });

          $("#grid").on("click", ".k-grid-myCancel", function(e){
            e.preventDefault();
            grid.refresh();
          })
        });
      </script>
    </div>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
