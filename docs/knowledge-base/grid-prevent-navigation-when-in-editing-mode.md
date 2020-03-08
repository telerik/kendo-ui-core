---
title: Prevent Page Navigation in Edit Mode
page_title: Prevent Navigation in Edit Mode | Kendo UI Grid for jQuery
description: "An example on how to prevent page navigation while in edit mode of the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/Editing/grid-prevent-navigation-when-in-editing-mode
slug: howto_prevent_page_navigation_inedit_mode_grid
tags: grid, prevent, page, navigation, edit, mode
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

How can I prevent page navigation while in edit mode of the Kendo UI Grid for jQuery?

## Solution

The following examples demonstrate how to prevent page navigation when the Grid is in a batch or inline edit mode.

## Batch Edit Mode

If the Grid is in edit mode and you do not make any changes, the page navigation and sorting are prevented. Otherwise, the new value is applied and a rebinding occurs.

```dojo
  <div id="example">
      <div id="grid"></div>

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
                pageSize: 10,
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
                },
                requestStart: function(e) { //prevent grid navigation
                  if (preventAction) {
                    e.preventDefault();
                  }
                }
              });

          var preventAction = false;
          $("#grid").kendoGrid({
            dataSource: dataSource,
            navigatable: true,
            pageable: true,
            sortable: true,
            height: 400,
            toolbar: ["create", "save", "cancel"],
            columns: [
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
              { field: "UnitsInStock", title: "Units In Stock", width: 120 },
              { field: "Discontinued", width: 120 },
              { command: "destroy", title: " ", width: 160 }],
            editable: true,
            edit: function() {
              preventAction = true;
            },
            saveChanges: function() {
              preventAction = false;
            },
            remove: function(e) {
              if (preventAction) {
                e.preventDefault();
                e.row.show();
              }
            }
          });
        });
      </script>
    </div>
```

## Inline Edit Mode

If the Grid is in edit mode, paging and sorting are prevented.

```dojo
  <div id="example">
      <div id="grid"></div>

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
                pageSize: 10,
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
                },
                requestStart: function(e) { //prevent grid navigation
                  if (preventAction) {
                    e.preventDefault();
                  }
                }
              });

            var preventAction = false;
            $("#grid").kendoGrid({
              dataSource: dataSource,
              navigatable: true,
              pageable: true,
              sortable: true,
              height: 400,
              columns: [
                "ProductName",
                { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
                { field: "UnitsInStock", title: "Units In Stock", width: 120 },
                { field: "Discontinued", width: 120 },
                { command: ["edit", "destroy"], title: " ", width: 280 }],
              editable: "inline",
              edit: function() {
                preventAction = true;
              },
              cancel: function() {
                preventAction = false;
              },
              dataBound: function() {
                preventAction = false;
              }
            });

          });
      </script>
    </div>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
