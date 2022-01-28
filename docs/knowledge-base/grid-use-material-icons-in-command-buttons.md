---
title: Display Material Icons in Grid Command Column
description: An example on how to show Google's Material icons in the Kendo UI Grid edit command buttons.
type: how-to
page_title: Use Material Icons in Edit Command Buttons | Kendo UI Grid for jQuery
slug: grid-use-material-icons
tags: grid, editing, material-icons
ticketid: 1139682
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>


## Description

How can I use Google [Materal icons](https://material.io/icons/) in the edit command buttons of the Grid?

## Solution

The Material icons require specific HTML to be rendered in the column cell and you cannot display them in a command column. To work around this issue, use a column template and declare the needed HTML.

To simulate the built-in `"edit"` command button actions (**Edit**, **Update**, **Cancel**), you also need to add custom JavaScript logic that triggers the corresponding actions in the Grid.

The following example demonstrates how to implement the suggested approach.

```dojo
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet" />
    <div id="example">
      <div id="grid"></div>
    </div>

    <script>
      $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
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
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "220px" },
            { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
            // Declare all three buttons in one template and use a custom class to control their visibility.
            { template: "<a href='\\#' class='custom-button edit-button'><i class='material-icons'>create</i></a><a href='\\#' class='custom-button update-button hidden'><i class='material-icons'>done</i></a><a href='\\#' class='custom-button cancel-button hidden'><i class='material-icons'>block</i></a>", width: 80}],
          editable: "inline",
          edit: function(e){
            // Change buttons visibility when the Grid enters edit mode.
            var editRow = e.container;
            editRow.find(".custom-button").toggleClass("hidden");
          }
        }).data("kendoGrid");

        $("#grid").on("click", ".custom-button", function(e){
          var btn = $(this);

          e.preventDefault();

          if(btn.hasClass("edit-button")){
            var row = btn.closest("tr");
            grid.editRow(row);
          }
          else if(btn.hasClass("cancel-button")){
            grid.cancelRow();
          }
          else if(btn.hasClass("update-button")){
            grid.saveChanges();
          }
        });
      });


    </script>
    <style>
      .hidden {
        display: none;
      }
      .custom-button {
        color: black;
      }
    </style>
```
