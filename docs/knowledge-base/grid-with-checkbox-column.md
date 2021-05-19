---
title: Use Checkbox Column Templates and Edit
page_title:  Checkbox Column Templates | Kendo UI Grid for jQuery
description: "An example on how to use checkbox column templates and perform editing."
previous_url: /kendo-uimvc/web/grid/how-to/Templates/grid-with-checkbox-column, /controls/data-management/grid/how-to/Templates/grid-with-checkbox-column
slug: howto_use_checkbox_column_templateand_edit_grid
tags: grid, use, checkbox, column, templates, perform, edit
component: grid
type: how-to
res_type: kb
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
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I use checkbox column templates and perform editing in the Kendo UI Grid?

## Solution

The following example demonstrates how to use checkboxes in the Grid column templates and perform editing.

For more information on how to apply batch editing with a bound Boolean column, check the article about [adding model-bound and batch-editable checkbox columns to the Grid](/knowledge-base/grid-bound-checkbox-editable-column).

```dojo
  <style>
    .k-grid-content td {
      position:relative;
    }
  </style>
   <div id="grid"></div>
    <script>
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

      $("#grid").kendoGrid({
        dataSource: dataSource,
        pageable: true,
        height: 430,
        toolbar: ["create", "save", "cancel"],
        columns: [
          "ProductName",
          { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 110 },
          { field: "UnitsInStock", title: "Units In Stock", width: 110 },
          { template: '#=dirtyField(data,"Discontinued")#<input type="checkbox" #= Discontinued ? \'checked="checked"\' : "" # class="chkbx k-checkbox" />', width: 110 },
          { command: "destroy", title: "&nbsp;", width: 100 }],
        editable: true
      });

      $("#grid .k-grid-content").on("change", "input.chkbx", function(e) {
        var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));

        dataItem.set("Discontinued", this.checked);
      });

      function dirtyField(data, fieldName){
        var hasClass = $("[data-uid=" + data.uid + "]").find(".k-dirty-cell").length < 1;
        if(data.dirty && data.dirtyFields[fieldName] && hasClass){
          return "<span class='k-dirty'></span>"
        }
        else{
          return "";
        }
      }
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
