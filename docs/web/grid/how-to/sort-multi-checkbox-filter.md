---
title: Sort Multi CheckBox Filter
page_title: Sort Multi CheckBox Filter
description: Sort Multi CheckBox Filter
---

# Sort multi checkBox filter

The example below demonstrates how to sort the Kendo UI multiple checkbox filter.

#### Example:

```html

	<div id="client"></div>
      <script>
        $(document).ready(function() {
          var telerikWebServiceBase = "http://demos.telerik.com/kendo-ui/service/";
          $("#client").kendoGrid({
            dataSource: {
              transport: {
                read:  {
                  url: telerikWebServiceBase + "/Products",
                  dataType: "jsonp"
                },
                update: {
                  url: telerikWebServiceBase + "/Products/Update",
                  dataType: "jsonp"
                },
                destroy: {
                  url: telerikWebServiceBase + "/Products/Destroy",
                  dataType: "jsonp"
                },
                create: {
                  url: telerikWebServiceBase + "/Products/Create",
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
            },
            filterMenuInit: function(e) {
              if (e.field === "UnitPrice" || e.field === "UnitsInStock") {
                var filterMultiCheck = this.thead.find("[data-field=" + e.field + "]").data("kendoFilterMultiCheck")
                filterMultiCheck.container.empty();
                filterMultiCheck.checkSource.sort({field: e.field, dir: "asc"});

                filterMultiCheck.checkSource.data(filterMultiCheck.checkSource.view().toJSON());
                filterMultiCheck.createCheckBoxes();
              }
            },
            filterable: true,
            pageable: true,
            height: 550,
            toolbar: ["create", "save", "cancel"],
            columns: [
              { field: "ProductName", filterable: { multi: true } },
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120, filterable: { multi: true } },
              { field: "UnitsInStock", title: "Units In Stock", width: 120, filterable: { multi: true } },
              { field: "Discontinued", width: 120, filterable: { multi: true, dataSource: [{ Discontinued: true }, { Discontinued: false }]} },
              { command: "destroy", title: "&nbsp;", width: 150}],
            editable: true
          });
        });
      </script>
```
