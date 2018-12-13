---
title: Use Custom Button Templates instead of Default Commands for Inline Edit and Delete Functionalities
description: An example on how to use custom button templates instead of the default commands to edit and delete records in a Kendo UI Grid in inline edit mode.
type: how-to
page_title: Use Custom Button Templates instead of Default Commands for Inline Edit and Delete Functionalities | Kendo UI Grid
slug: inline-edit-with-custom-button-template
tags: inline, edit, delete, custom, button, template, commands, grid
ticketid: 1133582
res_type: kb
component: scheduler
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
</table>


## Description

How can I trigger the default **Edit** and **Delete** functionalities in a Grid with enabled inline edit mode by using my own custom buttons instead of the default command buttons?

## Solution

Use the `addRow` and `removeRow` methods of the Grid.

1. Use the `columns.template` property to add a custom button to the column.

    ````dojo
    { template: "<button class='customEdit'>My Edit</button>", title:"Custom Edit"}
    ````

1. Apply the `editRow` method by passing the row for which the button was clicked as an argument.

    ```dojo
    <div id="grid"></div>

        <script>
          $("#grid").on("click", ".customEdit", function(){
            var row = $(this).closest("tr");
            $("#grid").data("kendoGrid").editRow(row);
          });

          $("#grid").on("click", ".customDelete", function(){
            var row = $(this).closest("tr");
            $("#grid").data("kendoGrid").removeRow(row);
          });

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
                      ataType: "jsonp"
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

            $("#grid").kendoGrid({
              dataSource: dataSource,
              pageable: true,
              height: 550,
              toolbar: ["create"],
              editable: "inline",
              columns: [
                "ProductName",
                { field: "UnitPrice", title: "Unit Price", format: "{0:c}"},
                { field: "UnitsInStock", title:"Units In Stock"},
                { template: "<button class='customEdit'>My Edit</button>", title:"Custom Edit"},
                { template: "<button class='customDelete'>My Delete</button>", title:"Custom Delete"},
                { field: "Discontinued", width: "120px", editor: customBoolEditor },
                { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }]
            });
          });

          function customBoolEditor(container, options) {
            $('<input class="k-checkbox" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
            $('<label class="k-checkbox-label">​</label>').appendTo(container);
          }
        </script>
    ```

## See Also

* [API Reference of the `editRow` Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/editrow).
* [API Reference of the `removeRow` Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/removerow).
* [API Reference of the `columns.template` Property](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.template).
* [Working with Templates in Kendo UI](https://docs.telerik.com/kendo-ui/framework/templates/overview)
