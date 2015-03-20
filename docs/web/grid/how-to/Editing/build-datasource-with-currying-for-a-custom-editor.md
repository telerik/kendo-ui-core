---
title: Build datasource with currying for a custom editor
page_title: Build datasource with currying for a custom editor
description: Build datasource with currying for a custom editor
---

# Build datasource with currying for a custom editor

The following runnable sample demonstrates how to create a custom dataSource based on the data in a custom editor.

#### Example:
```html
    <script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
    <div id="example">
        <div id="grid"></div>
      <script>
        $(document).ready(function () {
          var dataSource = new kendo.data.DataSource({
            pageSize: 20,
            data: products,
            autoSync: true,
            schema: {
              model: {
                id: "ProductID",
                fields: {
                  ProductID: { editable: false, nullable: true },
                  ProductName: { validation: { required: true } },
                  Category: { defaultValue: { CategoryID: 1, CategoryName: "Beverages"} },
                  UnitPrice: { type: "number", validation: { required: true, min: 1} }
                }
              }
            }
          });

          $("#grid").kendoGrid({
            dataSource: dataSource,
            pageable: true,
            height: 550,
            toolbar: ["create"],
            columns: [
              { field:"ProductName",title:"Product Name" },
              { field: "Category", title: "Category", width: "180px", editor: categoryDropDownEditor, template: "#=Category.CategoryName#" },
              { field: "UnitPrice", title:"Unit Price", format: "{0:c}", width: "130px" },
              { command: "destroy", title: " ", width: "120px" }],
            editable: true
          });
        });

        function categoryDropDownEditor(container, options) {
          $('<input required data-text-field="CategoryName" data-value-field="CategoryID" data-bind="value:' + options.field + '"/>')
          .appendTo(container)
          .kendoDropDownList({
            autoBind: false,
            dataSource: createDataSource(options.field)
          });
        }

        function createDataSource(id) {
          return new kendo.data.DataSource({
            type: "odata",
            transport: {
              read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
            },
            change: function() { 
              alert(id);
            }
          });
        }
      </script>
    </div>
```