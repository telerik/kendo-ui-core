---
title: Update Contiguous Cells in Grid's Row While in Inline Edit Mode
description: An example on how to update the value of contiguous cells while on inline edit mode
type: how-to
page_title: Update Contiguous Cells in Grid's Row While in Inline Edit Mode
slug: grid-update-cells-in-inline-edit-mode
tags: grid, inline, edit, mode, update, cells, next, contiguous
ticketid: 1147034
res_type: kb

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

I'm working on an application that takes advantage of the Kendo UI Grid in inline edit mode. There's a ProductName Field and when I change its value, I would like to also update the model and the cells in the row that corresponds to said value.

I tried updating the Model but the change is not reflected in the cells of the row in edit mode.

How can I update the values of the row currently in Edit Mode? 

## Solution

In order to update the value of cells in an inline edit row mode when another field in the same row changes, while having the new value reflected still in edit mode, we subscribe to the `change` event of the Kendo UI Grid API and, when triggered, check if its `action` corresponds to `itemchange` and its `field` to the one we choose.

If both conditions are met, we can get the `DataItem` of the row being edited and update it using the `set` method, which will propagate the changes in the GUI.

```html
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
        change: onChange,
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
          "ProductName",
          { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
          { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
          { field: "Discontinued", width: "120px", editor: customBoolEditor },
          { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
        editable: "inline"
      });
    });

    function customBoolEditor(container, options) {
      var guid = kendo.guid();
      $('<input class="k-checkbox" id="' + guid + '" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
      $('<label class="k-checkbox-label" for="' + guid + '">​</label>').appendTo(container);
    }
  
    function onChange(e) {
      if (e.action == "itemchange" && e.field == "ProductName")
      {
        alert("Product Name Changed");
        var editItemModelId = e.items[0].ProductID;
        var grid = $("#grid").data("kendoGrid");
        var dataItem = grid.dataSource.get(editItemModelId);
        dataItem.set("Discontinued", true);
      }
    }
  </script>
</div>
```

## See Also

* [Set Method API Reference.](https://docs.telerik.com/kendo-ui/api/javascript/data/model#methods-set)
* [Change Event API Reference.](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/change)
