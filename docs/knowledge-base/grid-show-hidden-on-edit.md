---
title: Show Hidden Columns When Editing the Grid
description: An example on how to show the hidden columns when editing a Kendo UI Grid.
type: how-to
page_title: Show Hidden Columns When Editing the Grid | Kendo UI Grid for jQuery
slug: grid-show-hidden-on-edit
tags: grid, edit, show, hidden, on, editor
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
  <td>Progress Kendo UI version</td>
  <td>Created with version 2020.3.1021</td>
 </tr>
</table>

## Description

How can I display the hidden rows in a Grid in inline edit mode so that the user is able to edit them?

## Solution

Toggle the visibility of the column by using the built-in methods of the Grid.

1. Within the [`beforeEdit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/beforeedit) event handler, show the column by using the [`showColumn`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/showcolumn) method.
1. When the [`save`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/save) event is fired, hide the column by using the [`hideColumn`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/hidecolumn) method.

```dojo

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
            save:function(){
              this.hideColumn(2);
            },
            cancel:function(){
              this.hideColumn(2);
            },
            beforeEdit:function(){
              this.showColumn(2);
            },
            dataSource: dataSource,
            pageable: true,
            height: 550,
            toolbar: ["create"],
            columns: [
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
              { field: "UnitsInStock", title:"Units In Stock", width: "120px", hidden:true },
              { field: "Discontinued", width: "120px" },
              { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
            editable: "inline"
          });
        });
      </script>
    </div>
```
