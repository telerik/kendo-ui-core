---
title: Prevent Editing for Boolean Based Records
page_title: Prevent Editing for Boolean Records | Kendo UI Grid for jQuery
description: "An example on how to prevent editing for records based on Boolean values in the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/Editing/prevent-editing-for-certain-columns
slug: howto_prevent_editingfor_boolean_based_records_grid
tags: prevent, editing, boolean, values, defined, records, grid
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

How can I prevent editing for records based on Boolean values in the Kendo UI Grid for jQuery?

## Solution

The following example demonstrates how to prevent editing for a record based on a Boolean field in the data item.

```dojo
    <h3>You are allowed to edit only products that are not discontinued</h3>
    <div id="grid"></div>

    <script>
      $(document).ready(function () {
        var dataSource1 = new kendo.data.DataSource({
          data: [
            {
              ProductName: "Product1",
              Discontinued: false
            },
            {
              ProductName: "Product2",
              Discontinued: true
            }
          ],
          schema: {
            model: {
              fields: {
                ProductName: { validation :{ required: true}, type: "string" },
                Discontinued: { type: "boolean" }
              }}
          },
          pageSize: 20
        });
        var grid = $("#grid").kendoGrid({
          dataSource: dataSource1,
          pageable: true,
          height: 500,
          toolbar: ["create"],
          columns: [
            { field: "ProductName", title: "Product Name", width: "200px",
             editor: CustomEditor
            },
            { field: "Discontinued", width: "100px" }],
          editable: "incell",
        }).data("kendoGrid");

        function CustomEditor(container, options) {
          if(!options.model.Discontinued){
            var input = $('<input required validationMessage="This field is required" data-text-field="'
                          + options.field +'" data-value-field="'
                          + options.field +'" data-bind="value:'
                          + options.field +'"/>');
            $(container).append(input);
          }
          else{
            var input = kendo.toString(options.model[options.field]);
            $(container).text(input);
            $(container).toggleClass("k-edit-cell");
          }
        };
      });
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
