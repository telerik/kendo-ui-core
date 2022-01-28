---
title: Build Custom dataSource for a Custom Grid Editor
page_title: Build dataSource for Custom Editor | Kendo UI Grid for jQuery
description: "An example on how to build custom dataSource of the Kendo UI Grid for jQuery with currying for a custom editor in the widget."
previous_url: /controls/data-management/grid/how-to/Editing/build-datasource-with-currying-for-a-custom-editor
slug: howto_build_custom_datasourcefor_custom_editor_grid
tags: grid, custom, datasource, editor
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
</table>

## Description

How can I create a custom data source in the Kendo UI Grid based on the data in a custom editor?

## Solution

The following sample demonstrates how to create a custom data source based on the data in a custom editor.

```dojo
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
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
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
            },
            change: function() {
              alert(id);
            }
          });
        }
      </script>
    </div>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
