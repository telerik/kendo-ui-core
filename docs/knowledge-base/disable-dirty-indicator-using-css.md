---
title: Use CSS to disable dirty indicator in Kendo UI Grid
description: An example on how to disable dirty indicators in the Kendo UI Grid using CSS
type: how-to
page_title: Use CSS to disable dirty indicator in Kendo UI Grid
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
  <td>Grid for Progress® Kendo UI®</td>
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

I'm working with a Kendo UI Grid and would like to disable the dirty indicator that appears when using batch editing.

## Solution

In order to disable the dirty indicator, we can use CSS and take advantage of the `.k-dirty` class:

````css
<style>
  .k-dirty{
    display: none;      
  }
</style>
````

To see a working example, take a look at the following sample in the Kendo UI Dojo:

```html
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
          { field: "Discontinued", width: 120, editor: customBoolEditor },
          { command: "destroy", title: "&nbsp;", width: 150 }],
        editable: true
      });
    });

    function customBoolEditor(container, options) {
      var guid = kendo.guid();
      $('<input class="k-checkbox" id="' + guid + '" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
      $('<label class="k-checkbox-label" for="' + guid + '">​</label>').appendTo(container);
    }
  </script>
</div>
```

## See Also

* [Kendo UI Customization of Appearance.](https://docs.telerik.com/kendo-ui/styles-and-layout/appearance-styling#customization-of-appearance)
