---
title: Prevent page navigation when in edit mode
page_title: Prevent page navigation when in edit mode
description: Prevent page navigation when in edit mode
---

# Prevent page navigation when in edit mode

The following runnable examples demonstrates how to prevent page navigation when Kendo UI Grid is in batch or inline edit mode.

#### Example for batch editing

Page navigation or sorting will be prevented if the Grid is in edit mode and changes have not been made. Otherwise the new value will be applied and rebind will occur.

```html
  <div id="example">
      <div id="grid"></div>

      <script>
        $(document).ready(function () {
          var crudServiceBaseUrl = "http://demos.telerik.com/kendo-ui/service",
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
            save: function() {
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

#### Example for inline editing

Paging and sorting will be prevented if the Grid is in edit mode.

```html
  <div id="example">
      <div id="grid"></div>

      <script>
        $(document).ready(function () {
          var crudServiceBaseUrl = "http://demos.telerik.com/kendo-ui/service",
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