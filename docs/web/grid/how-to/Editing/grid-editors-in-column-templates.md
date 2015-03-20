---
title: Editing using column template
page_title: Editing using column template
description: Editing using column template
---

# Editing using column template

The following runnable sample demonstrates how to render input editor in a column template, and provide editing functionality.

#### Example: 

```html
    <div id="grid"></div>
    <script>
      function onDataBound(e) {
        editAll();   
      }

      function editAll() {
        var theGrid = $("#grid").data("kendoGrid");
        $("#grid tbody").find('tr').each(function () {
          var model =  theGrid.dataItem(this); 
          kendo.bind(this,model);
        }); 
        $("#grid").focus();
      }

      $(document).ready(function () {
        var crudServiceBaseUrl = "http://demos.kendoui.com/service",
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
              }
            });

        $("#grid").kendoGrid({
          dataSource: dataSource,

          pageable: true,
          height: 430,
          toolbar: ["create", "save", "cancel"],
          columns: [

            { template: "<input data-bind='value:ProductName' />", title: "Product Name", width: 110 },
            { template: "<input data-bind='value:UnitsInStock' />", title: "Units In Stock", width: 110 },
            { field: "Discontinued", width: 110 },
            { command: "destroy", title: "&nbsp;", width: 90 }],
          editable: true,
          dataBound: onDataBound
        });
      });
    </script>
```