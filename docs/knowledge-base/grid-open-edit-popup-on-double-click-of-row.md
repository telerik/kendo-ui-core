---
title: Open the popup editor of a Kendo UI Grid on double click of a row
description: Open the popup editor of a Kendo UI Grid on double click of a row
type: how-to
page_title: Open the popup editor of a Kendo UI Grid on double click of a row | Kendo UI Grid
slug: grid-open-edit-popup-on-double-click-of-row
tags: grid, editor, popup, double, click, row, on, of, open,edit
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
  <td>Progress Kendo UI version</td>
  <td>Created with version 2017.3.1026</td>
 </tr>
</table>

## Description

I have a grid and I want to open the popup editor when I double click a row.

## Solution

Within the [databound event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-dataBound) handler attach a handler to the double click event of the `tr` element. When the double click event of the row is fired, edit the clicked row using the [editRow method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-editRow).
    

```html

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
              { field:"ProductName", title: "Product Name" },
              { field: "UnitPrice", title:"Unit Price", format: "{0:c}", width: "120px" },
              { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
              { field: "Discontinued", width: "120px", editor: customBoolEditor },],
            editable: "popup",
            dataBound: onDataBound
          });
        });

        function onDataBound() {
          var grid = this;

          grid.element.find('tbody tr[data-uid]').dblclick(function (e) {
            grid.editRow($(e.target).closest('tr'));
          })
        }

        function customBoolEditor(container, options) {
          var guid = kendo.guid();
          $('<input class="k-checkbox" id="' + guid + '" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
          $('<label class="k-checkbox-label" for="' + guid + '">​</label>').appendTo(container);
        }
      </script>
    </div>
    
    <style>
      tbody tr:hover{
        cursor: pointer
      }
    </style>
```