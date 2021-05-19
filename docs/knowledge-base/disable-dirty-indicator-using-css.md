---
title: Disable Dirty Indicators in Grid by Using CSS
description: An example on how to disable dirty indicators in the Kendo UI Grid by using CSS.
type: how-to
page_title: Disable Dirty Indicators by Using CSS | Kendo UI Grid for jQuery
slug: disable-dirty-indicator-using-css
tags: dirty, indicator, grid, disable, css
ticketid: 1136481
res_type: kb
component: grid
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

How can I disable the dirty indicator which appears when the Grid uses batch editing?

## Solution

Use CSS and utilize the `.k-dirty` class.

```css
<style>
  .k-dirty{
    display: none;      
  }
</style>
```

For the full implementation, open the following example in the Dojo.

```dojo
<style>
  .k-dirty{
    display: none;      
  }
</style>
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
        navigatable: true,
        pageable: true,
        height: 550,
        toolbar: ["create", "save", "cancel"],
        columns: [
          "ProductName",
          { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
          { field: "UnitsInStock", title: "Units In Stock", width: 120 },
          { field: "Discontinued", width: 120 },
          { command: "destroy", title: "&nbsp;", width: 150 }],
        editable: true
      });
    });
  </script>
</div>
```

## See Also

* [Customization of Appearance in Kendo UI](https://docs.telerik.com/kendo-ui/styles-and-layout/appearance-styling#customization-of-appearance)
