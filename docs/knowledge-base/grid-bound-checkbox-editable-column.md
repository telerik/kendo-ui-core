---
title: Add Model-Bound and Batch-Editable Checkbox Columns to the Grid
description: An example on how to add a checkbox that is bound to the model in the batch edit mode to the Kendo UI Grid.
type: how-to
page_title: Implement Checkboxes in Batch Edit Mode Bound to the Model | Kendo UI Grid
slug: grid-bound-checkbox-editable-column
tags: checkbox, template, column, grid, boolean, bound, dirty flag, edit mode, batch, editable
ticketid: 1132606
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
</table>


## Description 

How can I implement a checkbox in the Grid which is bound to the model and which works as expected with editing and the `batch=true` setting?

## Solution

The Grid acquires two modes&mdash;read and edit. Its read mode displays the text of the `dataItems`. When in edit mode, the Grid renders the appropriate editor and binds to its `dataItem` property value. This means that even though the Grid renders an editor as a template, it will still create the respective editor when in edit mode. As a result, you have to configure some settings programmatically.

1. Manage the configuration of the columns. The `editable` setting is added to prevent the template cell from entering edit mode and generating an editor of its own.

    ```
    columns:[
        { field: "Discontinued", template: '<input type="checkbox" #= Discontinued ? \'checked="checked"\' : "" # class="chkbx" />', width: 110, editable: function(e){ return false; } }
    ]
    ```

1. Handle the `change` event of the template checkbox.

    ```
    $("#grid .k-grid-content").on("change", "input.chkbx", function(e) {
        var grid = $("#grid").data("kendoGrid"),
        dataItem = grid.dataItem($(e.target).closest("tr"));
        // add the dirty flag to the cell
        $(e.target).closest("td").prepend("<span class='k-dirty'></span>");

        // use equals, not the set() method because set will trigger the change event of the data source and the grid will rebind
        dataItem.Discontinued = this.checked;

        // mark the item as dirty so it will be added to the next update request
        dataItem.dirty = true;
     });
    ```

The following example demonstrates the full implementation of the approach.

```dojo
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
        filterable:true,
        pageable: true,
        height: 430,
        toolbar: ["create", "save", "cancel"],
        columns: [
          "ProductName",
          { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 110 },
          { field: "UnitsInStock", title: "Units In Stock", width: 110 },
          { field: "Discontinued", template: '<input type="checkbox" #= Discontinued ? \'checked="checked"\' : "" # class="chkbx" />', width: 110, editable: function(e){ return false; } },
          { command: "destroy", title: "&nbsp;", width: 100 }],
        editable: true
      });

      $("#grid .k-grid-content").on("change", "input.chkbx", function(e) {
        var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));
        $(e.target).closest("td").prepend("<span class='k-dirty'></span>");
        dataItem.Discontinued = this.checked;
        dataItem.dirty = true;
      });
    </script>
```
