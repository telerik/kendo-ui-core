---
title: Use Custom Button Templates instead of Default Commands for Inline Edit and Delete Functionalities.
description: Example of how to use custom button templates, instead of the default commands, to Edit and Delete records in a Grid with inline edit mode enabled.
type: how-to
page_title: Use Custom Button Templates instead of Default Commands for Inline Edit and Delete Functionalities.
slug: inline-edit-with-custom-button-template
tags: inline, edit, delete, custom, button, template, commands, grid
ticketid: 1133582
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
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

I'm working on a Grid with **inline edit** and would like to trigger the default **Edit** and **Delete** functionalities by using my own custom buttons instead of the default command buttons.

## Solution

In order to implement this functionality, we can take advantage of the `addRow` and `removeRow` methods of the Kendo UI Grid API.

First, we use the `columns.template` property to add a custom button to the column:

````html
{ template: "<button class='customEdit'>My Edit</button>", title:"Custom Edit"}
````

Then, we take advantage of the `editRow` method by passing the row for which the button was clicked as an argument:

```html
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

* [editRow method reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-editRow).
* [removeRow method reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-removeRow).
* [columns.template property reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-columns.template).
* [Working with Templates in Kendo UI](https://docs.telerik.com/kendo-ui/framework/templates/overview)
