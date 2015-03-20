---
title: Prevent page navigation when in edit mode
page_title: Prevent page navigation when in edit mode
description: Prevent page navigation when in edit mode
---

# Prevent page navigation when in edit mode

The following runnable sample demonstrates how to prevent page navigation when Kendo UI Grid is in edit mode.    

#### Example

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
            height: 550,
            toolbar: ["create", "save", "cancel"],
            columns: [
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
              { field: "UnitsInStock", title: "Units In Stock", width: 120 },
              { field: "Discontinued", width: 120 },
              { command: "destroy", title: " ", width: 120 }],
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