---
title: Allow Editing When Creating New Records for the New Records Only
description: An example on how to conditionally configure the Kendo UI Grid to allow editing during the Create operation only.
type: how-to
page_title: Modify Specific Fields on Insert and Read-Only while Updating | Kendo UI Grid for jQuery
slug: grid-editable-readonly-edit-create.md
tags: grid, editable, readonly, edit, create
ticketid: 1168477
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2020.3.1021</td>
 </tr>
</table>

## Description

How can I allow user input for a specific field when adding a new row and prevent user input for existing rows?

## Solution

Based on the [`id`](https://docs.telerik.com/kendo-ui/api/javascript/data/model/fields/id) value of the Model, conditionally determine an editable column.

To control the editing capability of the column, the column [`editable`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.editable) property accepts a function. In the following code snippet, based on the `ProductID` value, an `isEditable` function returns a Boolean value. If the value is `null`, the Grid will add a new record&mdash;the value will not be added until the Grid saves its changes. If a value is not `null`, the Grid will update an existing record.  

```       
    var dataSource = new kendo.data.DataSource({
      ...
      schema: {
        model: {
          id: "ProductID",
          fields: {
            ProductID: { editable: false, nullable: true },
            ProductName: { validation: { required: true } },
            ...
          }
        }
      }
    });

    $("#grid").kendoGrid({
        ...
        columns: [
          { field: "ProductName", editable: isEditable},
          ...
        ]
    });

    function isEditable(e){
      var dataSource = $("#grid").data("kendoGrid").dataSource;
      //If the id(ProductID) is null, then it is editable.
      return e.ProductID == null;
    }
```

The following example demonstrates how, upon creating a new record, `ProductName` and `UnitPrice` become editable. When the user updates an existing record, `ProductName` and `UnitPrice` become read-only.

```dojo
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
          pageable: true,
          height: 550,
          toolbar: ["create"],
          columns: [
            /*
            ProductName and UnitPrice will be only editable
            upon adding a new record.
            */
            { field: "ProductName", editable: isEditable},
            { field: "UnitPrice", editable: isEditable, title: "Unit Price", format: "{0:c}", width: "120px" },
            { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
            { field: "Discontinued", width: "120px" },
            { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
          editable: "inline"
        });
      });

      function isEditable(e){
        var dataSource = $("#grid").data("kendoGrid").dataSource;
        // If the id(ProductID) is null, then it is editable.
        return e.ProductID == null;
      }
    </script>
```

## See Also

* [Editing the Kendo UI Grid Widget](https://docs.telerik.com/kendo-ui/controls/data-management/grid/editing)
