---
title: Enable sorting, filtering and grouping for a column bound to an object
description: An example on how to enable sorting, filtering and grouping for a column which is bound to an object in the Kendo UI Grid.
type: how-to
page_title: Enable sorting, filtering and grouping for a column bound to an object | Kendo UI Grid
slug: enable-operations-for-object-column
tags: grid, object, column, operations, drop, down, filtering, sorting, grouping
res_type: kb
---

## Environment
<table>
	<tr>
		<td>Product Version</td>
		<td>2018.3.1017</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Grid for Progress® Kendo UI®</td>
	</tr>
</table>

## Description

How can I enable sorting, filtering and grouping for a column which is bound to an object in the Kendo UI Grid?

## Solution

To enable sorting, filtering and grouping for a column which is bound to an object, bind to column to a field of the object and the editor to the object itself.

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
              { field: "Category.CategoryName", title: "Category", width: "180px", editor: categoryDropDownEditor },
              { field: "UnitPrice", title:"Unit Price", format: "{0:c}", width: "130px" },
              { command: "destroy", title: " ", width: "150px" }],
            editable: true,
            filterable:true,
            groupable:true,
            sortable:true
          });
        });

        function categoryDropDownEditor(container, options) {
          $('<input required name="Category"/>')
            .appendTo(container)
            .kendoDropDownList({
            autoBind: false,
            dataTextField: "CategoryName",
            dataValueField: "CategoryID",
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
              }
            }
          });
        }

      </script>
    </div>
```