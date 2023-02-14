---
title: Add row in Grid above selected row
description: "Learn how to add a row above the selected onе in Grid."
type: how-to
page_title: Add a row above the selected one - Kendo UI Grid for jQuery
slug: grid-add-row-above-selected
tags: grid, add, row
ticketid: 1554656
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
</table>

## Description

How can I add add a row above the selected row in the Grid?

## Solution

1. To achieve such behavior you can add a custom button in the toolbar using the Grid [toolbar template](/api/javascript/ui/grid/configuration/toolbar.template) option.

2. Find the index of the currently selected Grid row.

3. Then, you could use the [dataSource insert](/api/javascript/data/datasource/methods/insert) method. 

```dojo
  <div id="grid"></div>

  <script>
    function toolbar_click(e) {
      var index = $('tr.k-state-selected').index(); //index of the selected row
      var grid = $("#grid").data("kendoGrid");
      var dataSource = grid.dataSource;
      var newItem = dataSource.insert(index, {});
      var newRow = grid.items().filter("[data-uid='" + newItem.uid + "']");
      grid.editRow(newRow);
    }
    var crudServiceBaseUrl = "//demos.telerik.com/kendo-ui/service",
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
      selectable: true,
      toolbar: [
        {
          template: '<button class="k-button k-button-md k-button-rectangle k-rounded-md k-button-primary tton-solid-primary" onclick="return toolbar_click()">custom Add Command</button>'
        },
        "create"
      ],
      columns: [
        "ProductName",
        { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
        { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
        { field: "Discontinued", width: "120px" },
        { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
      editable: "inline"
    });
  </script>
```
